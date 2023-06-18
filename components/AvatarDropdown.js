import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { updateUserData, useUser } from '../redux/reducers/userReducer';
import { useAccessToken } from '../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';
import alertFunc from './Alert';
const defaultAvatar = require("../assets/male-dummy.jpg");


const AvatarDropdown = () => {
const token = useAccessToken();
const userData = useUser();
const dispatch = useDispatch();
const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted' || cameraStatus.status !== 'granted') {
      alertFunc('Sorry, we need camera roll and camera permissions to make this work!');
    }
  };

  const handleImageSelection = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // setAvatar(result.assets[0]);
      const data = result.assets[0];
      const response = await fetch(data.uri);
      const blob = await response.blob();
  
      // Create a File object from the blob
      const fileObj = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  
      uploadImage(fileObj);
    }
  };

  const handleCameraCapture = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // setAvatar(result.assets[0]);
      const data = result.assets[0];
      const response = await fetch(data.uri);
      const blob = await response.blob();
  
      // Create a File object from the blob
      const fileObj = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  
      uploadImage(fileObj);
    }
  };
  const uploadImage = async (data) => {
    const formData = new FormData();
    formData.append('avatar', data);

    try {
      dispatch(updateUserData(formData,userData?.userId,token));
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  

  return (
    <View>
      <TouchableOpacity onPress={()=> setModalVisible(true)} className='relative m-auto w-[fit-content]'>
        <Image source={userData?.profileImg ? {uri:userData?.profileImg}:defaultAvatar} className="w-[100px] h-[100px] rounded-full m-auto" />
        <View className=' bottom-[10px] right-[10px] absolute rounded-full p-2 bg-white'>
        <Entypo name="edit" size={14} color="black" className="" /> 
             
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={handleImageSelection}>
              <Text style={styles.optionText}>Choose from Library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={handleCameraCapture}>
              <Text style={styles.optionText}>Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57c00',
    // backDropFilter:'blur(10px)',
  },
  modalContent: {
    // backgroundColor: 'transparent',
    // backDropFilter:'blur(10px)',
    padding: 20,
    borderRadius: 10,
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#01858a',
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default AvatarDropdown;
