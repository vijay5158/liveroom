import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { updateUserData, useUser } from '../redux/reducers/userReducer';
import AvatarDropdown from '../components/AvatarDropdown';
import { useDispatch } from 'react-redux';
import { useAccessToken } from '../redux/reducers/authReducer';

export default function ProfilePage() {
  const userData = useUser();
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [number, setNumber] = useState(userData?.mobile);
//   const [avatar, setAvatar] = useState(userData?.profileImg);
    const token = useAccessToken();
    const dispatch = useDispatch();

  const handleOnBlur = (event,name) => {
    // Perform save/update logic here
    const inputValue = event.nativeEvent.text;
    const formData = {
        [name]:inputValue
    }
    // console.log(formData);
      dispatch(updateUserData(formData,userData?.userId,token));
  };

  return (
    <View className='flex-1 p-5'>
      <View className='mb-4'>
    <AvatarDropdown />
        <Text className='text-lg font-bold mb-1 text-[#01858a]'>Name</Text>
        <TextInput
          className='h-[58px] bg-[#F6F7FB] focus:border-2 border-[#f57c00] outline-none transition-all mb-[20px] text-[16px] rounded-[10px] p-[12px]'
          value={name}
          onBlur={(event)=> handleOnBlur(event,'name')}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View className='mb-4'>
        <Text className='text-lg font-bold mb-1 text-[#01858a]'>Email</Text>
        <TextInput
          className='h-[58px] bg-[#F6F7FB] focus:border-2 border-[#f57c00] outline-none transition-all mb-[20px] text-[16px] rounded-[10px] p-[12px]'
          value={email}
          onBlur={(event)=> handleOnBlur(event,'email')}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View className='mb-4'>
        <Text className='text-lg font-bold mb-1 text-[#01858a]'>Number</Text>
        <TextInput
          className='h-[58px] bg-[#F6F7FB] focus:border-2 border-[#f57c00] outline-none transition-all mb-[20px] text-[16px] rounded-[10px] p-[12px]'
          value={number}
          onBlur={(event)=> handleOnBlur(event,'mobile')}
          onChangeText={(text) => setNumber(text)}
        />
      </View>
    </View>
  );
}
