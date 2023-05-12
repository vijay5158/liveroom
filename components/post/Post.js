import React from 'react'
import { Linking, Pressable, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { useUser } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux/reducers/postReducer';
import { useState } from 'react';
import { useAccessToken } from '../../redux/reducers/authReducer';

const Post = ({postData, slug}) => {
    console.log(postData);
    const userData = useUser();
    const [newComment, setNewComment] = useState("");
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();
    const accessToken = useAccessToken();
    const comments = postData?.comments;
    const commentKeys = Object.keys(comments);
    

    const handleCreateComment = ()=>{
        if(newComment !== ""){
            const newCommentData = {
                "text":newComment,
                "post":postData.id
            }
            // console.log(newCommentData,accessToken);
            dispatch(createComment(accessToken,newCommentData,setNewComment));
        }
    }

  return (
    <View className="w-full gap-3 py-2 px-3 bg-[white] flex flex-col border-[1px] border-[lightgray] shadow-lg rounded-lg">
<View className="flex flex-row items-center justify-between w-full">
<View className="flex flex-row items-center gap-3">
<View>
{/* profile */}
{postData?.user?.profile_img ? <Avatar.Image
                size={50}
                source={{
                    uri: 
`${postData.user.profile_img}`,
                }}
            />
            :
            <Avatar.Text size={50} label={postData?.user?.name?.slice(0,1)} />
}
    </View>
    <View>
<Text className="text-base font-semibold">{postData?.user?.name}</Text>
<Text className="text-xs text-[gray] font-semibold">{new Date(postData.created_at).toGMTString()}</Text>
    </View>
    </View>
    <View>
<TouchableOpacity
className="p-2"
>
<MaterialIcons name="more-vert" size={16} color="black" />
</TouchableOpacity>
    </View>
</View>
<View className="w-flex">
    <Text>{postData?.text}</Text>
    </View>
    <View className="w-full">
<TouchableOpacity className="flex flex-row gap-2 p-2 bg-[rgba(245,124,0,0.1)] w-[fit-content] rounded-lg shadow" onPress={()=> Linking.openURL(postData?.file)}>
    <Text className="text-sm text-[#f57c00]">{postData?.file_name}</Text><Ionicons name="cloud-download-sharp" size={20} color="#f57c00" />
</TouchableOpacity>
    </View>
    {commentKeys?.length>0 && 
    <View className="flex flex-col gap-2 w-full">
<TouchableOpacity onPress={()=> setShowComment(!showComment)} className="px-2 w-[fit-content] rounded-lg shadow py-2 bg-[rgba(1,133,138,0.1)]"><Text className="text-[#01858a]">{showComment ? "Hide comments":"Show "+commentKeys?.length+" comments" }</Text></TouchableOpacity>
   {showComment &&
    <View className="flex flex-col gap-3 w-full">
        {commentKeys.map((commentKey)=>(
            <View className="flex flex-row items-center gap-2">
                {comments[commentKey]?.User?.profile_img ? 
                <Avatar.Image
                size={40}
                source={{
                    uri: 
`${comments[commentKey]?.User?.profile_img}`,
                }}
            />
            :
            <Avatar.Text size={40} label={comments[commentKey]?.User?.name?.slice(0,1)} />
}
<View className="flex flex-col gap-1">
<View className="flex flex-row items-center gap-2">
    <Text className="text-base font-semibold">{comments[commentKey]?.User?.name}</Text>
    <Text className="text-xs text-[gray]">{new Date(comments[commentKey].created_at).toGMTString()}</Text>
</View>
<View>
<Text className="text-xs">
    {comments[commentKey]?.text}
    </Text>
</View>
</View>
                </View>
        ))}
    </View>
}
    </View>
}
    <View className="flex flex-row gap-2 items-center w-full p-2 justify-between border-t-[1px] border-[gray]">
   {userData.profileImg ? <Avatar.Image
                size={30}
                source={{
                    uri: 
`https://media.geeksforgeeks.org/wp-content/uploads/20220305133853/gfglogo-300x300.png`,
                }}
            />
            :
            <Avatar.Text size={30} label={userData?.name?.slice(0,1)} />
}
{/* comment */}
<View className="flex flex-row gap-2 border-2 border-[#01858a] w-[90%] rounded-full px-3 py-2">
    <TextInput className="bg-[transparent] border-0 outline-none w-[-webkit-fill-available] "
    autoCapitalize="none"
    keyboardType="default"
    textContentType="name"
    placeholder='Add class comment...'
    value={newComment}
    onChangeText={(text) => setNewComment(text)} />
    <Pressable onPress={handleCreateComment}><Ionicons name="send" size={24} color="#f57c00" /></Pressable>
</View>
    </View>
    </View>
  )
}

export default Post