import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { Image } from 'react-native'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Clipboard } from 'react-native'
import { useDispatch } from 'react-redux'
import { getAnnouncements, getCurrentClassSuccess, setCurrentClass } from '../redux/reducers/classReducer'
import { getComment, getPost } from '../redux/reducers/postReducer'
import { useAccessToken } from '../redux/reducers/authReducer'

const ClassCard = ({classData,navigation}) => {
const dispatch = useDispatch();
const accessToken = useAccessToken();
const goClassRoom = ()=>{
dispatch(setCurrentClass(classData));
dispatch(getCurrentClassSuccess(accessToken, classData.slug))
// dispatch(getPost(accessToken, classData.slug));
// dispatch(getComment(accessToken, classData.slug));
// dispatch(getAnnouncements(accessToken, classData.slug));
navigation.navigate("Classroom");
}
  return (
    <TouchableOpacity
    onPress={goClassRoom}
    style={styles.cardContainer}
    className="bg-white border-[1px] border-[lightgray] overflow-hidden m-auto rounded-xl w-full max-w-xs"
  >
    <ImageBackground
      source={{ uri: classData.poster || "https://source.unsplash.com/random/?art,modern,dark,vector" }}
      className='p-4 rounded-t-lg h-[8rem]'
      resizeMode="cover"
    >
      <View style={styles.overlay} />
        <View className="flex flex-col gap-2 justify-start items-center">
            <View className="flex flex-row gap-2 items-start justify-between w-full">
<View className="flex flex-col">
<Text className="text-[#fff] font-bold text-lg">{classData?.class_name?.length<25?classData?.class_name:classData?.class_name.slice(0,22)+'...'}</Text>
<Text className="text-[lightgray] font-bold text-sm">{classData?.subject}</Text>
</View>
<TouchableOpacity
className="p-2"
onPress={()=> Clipboard.setString(classData?.slug)}
// className="py-2 px-4 flex flex-row items-center justify-center gap-2 rounded text-semibold text-sm hover:bg-[rgb(1,133,138,0.1)] delay-100 hover:text-[#035c60] text-[#01858a] bg-[transparent]"
>
{/* <MaterialIcons name="more-vert" size={16} color="#fff" /> */}
<Ionicons name="copy" size={18} color="#fff" />
</TouchableOpacity>
            </View>
            <Text className="text-white text-base text-start w-full">
                {classData?.teacher}
            </Text>
        </View>
        </ImageBackground>
    <View className="py-6 px-3 flex flex-row gap-4 items-center min-h-[7rem] justify-start">
    <TouchableOpacity className="p-2 font-bold">
    <AntDesign name="folder1" size={20} color="black" />
    </TouchableOpacity>
    <TouchableOpacity className="p-2 font-bold">
    <MaterialCommunityIcons name="google-analytics" size={20} color="black" />
    </TouchableOpacity>
    <TouchableOpacity className="p-2">
    <Feather name="users" size={20} color="black" />
    </TouchableOpacity>
    </View>

  </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    cardContainer: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the opacity as desired
      },
})

export default ClassCard