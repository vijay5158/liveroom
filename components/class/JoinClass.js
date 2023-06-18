import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { TextInput } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useAccessToken } from '../../redux/reducers/authReducer'
import { useUser } from '../../redux/reducers/userReducer'
import { ActivityIndicator } from "react-native-paper";
import { joinCLS } from '../../redux/reducers/classReducer'

const JoinClass = ({setModalVisible}) => {
  const [code,setCode] = useState("");
  const userData = useUser();
  const accessToken = useAccessToken();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const onSubmit = ()=>{
if(code!==""){
  setLoading(true);
  const data = {
    slug:code,
    student_id:userData?.userId
  }
  dispatch(joinCLS(accessToken,data,setLoading));
  setModalVisible(false);
}
  }
  return (
    <View className="flex flex-col gap-3 w-full">
    <Text className="text-lg font-semibold">To Join , Enter Class Code</Text>
    <TextInput
        placeholder="class code..."
        autoCapitalize="none"
        keyboardType="default"
        className="px-3 py-2 bg-[#F6F7FB] focus:border-2 border-[#01858a] outline-none transition-all text-sm rounded-[10px]"
        autoFocus={true}
        value={code}
        onChangeText={(text) => setCode(text)}
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
    onPress={onSubmit}>
        {loading ? (
    <ActivityIndicator color="white" />
  ) : (
     <Text className="font-bold text-[#fff] text-sm">Join</Text>
  )}
     </Pressable>
    </View>
  </View>
  )
}

export default JoinClass