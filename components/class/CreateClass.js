import React from 'react'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { TextInput } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { createCLS } from '../../redux/reducers/classReducer'
import { useAccessToken } from '../../redux/reducers/authReducer'
import { useUser } from '../../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'
import { ActivityIndicator } from "react-native-paper";

const CreateClass = ({setModalVisible}) => {
  const userData = useUser();
  const [loading, setLoading] = useState(false);
  const accessToken = useAccessToken();
    const dispatch = useDispatch();
    const initialFormData = Object.freeze({
        classname: '',
        subject : '',
        standard : '',
        email: ''

    })
    const [FormData, setFormData] = useState(initialFormData);
    // const handleChange = (event)=>{
    //     setFormData({
    //         ...FormData,
    //         [event.target.name] : event.target.value.trim(),
    //     });
    // };
    const createClass = ()=>{
        if(FormData.classname!=='' && FormData.standard!=='' && FormData.subject!==''){
          setLoading(true);
          const cls = {
            class_name : FormData.classname,
            standard : FormData.standard,
            subject : FormData.subject,
            teacher : userData?.email
        }
        dispatch(createCLS(accessToken,cls,setModalVisible,setLoading));
        
    }
    }

  return (
    <View className="flex flex-col gap-3 w-full">
    <Text className="text-lg font-semibold">To Create , Enter Class details</Text>
    <TextInput
        placeholder="Class name.."
        autoCapitalize="none"
        keyboardType="default"
        className="px-3 py-2 bg-[#F6F7FB] focus:border-2 border-[#01858a] outline-none transition-all text-sm rounded-[10px]"
        autoFocus={true}
        // value={name}
        onChangeText={(text) => setFormData({
            ...FormData,
            classname:text
        })}
        cursorColor={"#01858a"}
        />  
          <TextInput
        placeholder="Standard.."
        autoCapitalize="none"
        keyboardType="default"
        className="px-3 py-2 bg-[#F6F7FB] focus:border-2 border-[#01858a] outline-none transition-all text-sm rounded-[10px]"
        // autoFocus={true}
        // value={name}
        onChangeText={(text) => setFormData({
            ...FormData,
            standard:text
        })}
        cursorColor={"#01858a"}
        />  
          <TextInput
        placeholder="Subject.."
        autoCapitalize="none"
        keyboardType="default"
        className="px-3 py-2 bg-[#F6F7FB] focus:border-2 border-[#01858a] outline-none transition-all text-sm rounded-[10px]"
        // autoFocus={true}
        // value={name}
        onChangeText={(text) => setFormData({
            ...FormData,
            subject:text
        })}
       cursorColor={"#01858a"}
        />  
    <View className="w-full flex flex-row items-center justify-between">
    <Pressable
      onPress={() => setModalVisible(false)}>
      <Text className="font-bold text-[gray] text-sm">Cancel</Text>
    </Pressable>
    <Pressable
     className="bg-[#f57c00] py-2 px-3 rounded-[10px] justify-center items-center"
    disabled={loading}
    onPress={createClass}>
       {loading ? (
    <ActivityIndicator color="white" />
  ) : (
     <Text className="font-bold text-[#fff] text-sm">Create class</Text>
  )}
     </Pressable>
    </View>
  </View>
  )
}

export default CreateClass;