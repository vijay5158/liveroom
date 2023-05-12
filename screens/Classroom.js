import React, { useEffect, useState } from 'react'
import { Text, View,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getCurrentClass } from '../redux/reducers/classReducer';
import { useDispatch } from 'react-redux';
import { ImageBackground } from 'react-native';
import { useAccessToken } from '../redux/reducers/authReducer';
import { useRef } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { createPostSuccess, createCommentSuccess, usePosts } from '../redux/reducers/postReducer';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Clipboard } from 'react-native';
import { useUser } from '../redux/reducers/userReducer';
import Post from '../components/post/Post';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker';
import { createPost } from '../redux/reducers/postReducer';

const Classroom = ({navigation}) => {
  const classData = getCurrentClass();
  const webSocket = useRef(null);
  const dispatch = useDispatch();
  const accessToken = useAccessToken();
  const isFocused = navigation.isFocused();
  const posts = usePosts();
  const postIds = Object.keys(posts);
  const userData = useUser();
  const [postText, setPostText] = useState("");
  const [postFile, setPostFile] = useState(null);
  console.log(posts);
  const focused = useIsFocused();
  useEffect(() => {
    
    const path = `ws://localhost:8000/ws/class/${classData?.slug}/`;
    webSocket.current  = new WebSocket(path);
    webSocket.current.onopen = () => {
        console.log("WebSocket open");
        webSocket.current.send(JSON.stringify({
          type: "auth",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }));
    };
    webSocket.current.onmessage = e => {
        const data = JSON.parse(e.data);
        console.log(data);
        if (data.comment != null) {
            dispatch(createCommentSuccess(data.comment))

        }
        if (data.post != null) {
            dispatch(createPostSuccess(data.post));

        }

    };
    webSocket.current.onerror = e => {
        console.log(e);
    };
    webSocket.current.onclose = () => {
        console.log("WebSocket closed let's reopen");
        //   connect();
    };

    return () => {
      // Alert.alert('closing')
      webSocket.current.close();
    };
}
    , [focused]);

    const uploadFile = async () => {
      try {
        // Select a file using the document picker
        const file = await DocumentPicker.getDocumentAsync({
          type: '*/*', // Allow selecting any type of file
          copyToCacheDirectory: false, // Set to true if you want to copy the file to the cache directory
        });
        if (file.type === 'success') {
          // Create a form data object
          console.log(file.output[0]);
          setPostFile(file.output[0]);
          // Handle the API response
        } else {
          // Handle the case when file selection was canceled
          console.log('File selection canceled');
        }
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    const handleSubmitPost = ()=>{
      if(postText !==""){
        const formData = new FormData();
        formData.append("text",postText);
        formData.append("classroom",classData?.id);
        if(postFile && postFile.name){
          formData.append("file",postFile);
          formData.append("file_name",postFile?.name)
        };
        dispatch(createPost(accessToken,formData));
      }
    }
          return (
            <ScrollView>
    <View className="w-full">
     <ImageBackground
      source={{ uri: "https://source.unsplash.com/random/?art,modern,dark,vector" }}
      className='p-4 w-full sm:w-[90%] m-auto flex flex-col items-center justify-center sm:mt-4 overflow-hidden sm:rounded-lg h-[8rem]'
      resizeMode="cover"
    >
      <Text className="text-[white] font-semibold sm:text-lg text-base">{classData?.class_name}</Text>
      <View className="flex flex-row w-full justify-between items-center">
     {userData.is_teacher &&
     <>
     <Pressable className="inline" onPress={()=> Clipboard.setString(classData?.slug)}><Text className="text-[white] font-semibold mr-2">Copy code </Text><Ionicons name="copy" size={18} color="#fff" /></Pressable>
      { classData.lock ?
        <Pressable className="inline" onPress={()=> navigation.navigate("AllClasses")}>
        <Text className="text-[white] font-semibold mr-2">Unlock Class </Text><Entypo name="lock-open" size={18} color="#fff" />
      </Pressable>
      :
      <Pressable className="inline" onPress={()=> Clipboard.setString(classData?.slug)}>
        <Text className="text-[white] font-semibold mr-2">Lock Class </Text><Entypo name="lock" size={18} color="#fff" />
      </Pressable>
      }
      </>
    }
      </View>
    </ImageBackground>
<View className="flex flex-col bg-rgba(0,0,0,0.2) shadow-lg p-3 sm:p-4 gap-4 w-[97%] sm:w-[80%] items-center mt-4 m-auto">
<TextInput
        placeholder="Enter Text..."
        autoCapitalize="none"
        keyboardType="default"
        textContentType="text"
        className="h-[58px] w-[100%] bg-[#F6F7FB] mb-[20px] focus:border-2 border-[#01858a] outline-none transition-all text-[16px] rounded-[10px] p-[12px] "
        // autoFocus={true}
        value={postText}
        onChangeText={(text) => setPostText(text)}
        cursorColor={"#01858a"}
      /> 
      <View className="flex flex-row items-center justify-between w-[100%]">
      <TouchableOpacity className="flex flex-row gap-2 p-2 bg-[rgba(1,133,138,0.1)] w-[fit-content] rounded-lg shadow" onPress={uploadFile}>
    <Text className="text-sm text-[#01858a]">{postFile ? postFile?.name?.slice(0,10):"Upload file"}</Text><MaterialIcons name="file-upload" size={20} color="#01858a" />
</TouchableOpacity>
      <TouchableOpacity className="flex flex-row gap-2 p-2 bg-[rgba(245,124,0,0.1)] w-[fit-content] rounded-lg shadow" onPress={handleSubmitPost}>
    <Text className="text-sm text-[#f57c00]">Post</Text><MaterialCommunityIcons name="file-send" size={20} color="#f57c00" />
</TouchableOpacity>

 

      </View>
</View>
<View className="flex flex-col gap-4 w-[97%] sm:w-[80%] items-center mt-4 m-auto">
    {postIds.map((postId, index) => <Post key={index} slug={classData?.slug} postData={posts[postId]} />)}
    </View>
    </View>
    </ScrollView>
  )
};

export default Classroom;