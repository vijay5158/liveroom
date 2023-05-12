import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import colors from '../colors';
import { Octicons } from '@expo/vector-icons';
import ClassCard from '../components/ClassCard';
import { useUser } from '../redux/reducers/userReducer';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Modal } from 'react-native';
import JoinClass from '../components/class/JoinClass';
import CreateClass from '../components/class/CreateClass';
import { getAllClasses, getClasses } from '../redux/reducers/classReducer';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';

const Classes = ({ navigation }) => {
  const userData = useUser();
  console.log(userData)
  const [modalVisible, setModalVisible] = useState(false);
  const classes = getAllClasses();
  return (
    <ScrollView>
    <View style={styles.container}>

       <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="backdrop-blur h-full flex items-center justify-center">
          <View style={styles.modalView} className=" w-[95%] sm:w-[60%]">
        {userData.is_teacher?  
        <CreateClass setModalVisible={setModalVisible} />
        :userData.is_student?
        <JoinClass setModalVisible={setModalVisible} />
        :   
      <Pressable
      onPress={() => setModalVisible(false)}>
      <Text className="font-bold text-[gray] text-sm">Cancel</Text>
    </Pressable>
      }
          </View>
        </View>
      </Modal>
      <View className="px-2 sm:px-5 md:px-10 flex gap-4 my-4 flex-col py-4">
<View className="flex gap-3 flex-row">
<TouchableOpacity
        // onPress={() => navigation.navigate("Chat")}
       className="py-2 px-4 flex flex-row items-center justify-center gap-2 rounded text-semibold text-sm hover:bg-[rgb(1,133,138,0.1)] delay-100 hover:text-[#035c60] text-[#01858a] bg-[transparent]"
    >
      <Octicons name="checklist" size={18} color="#01858a" />
<Text>To-do</Text>
    </TouchableOpacity>
    <TouchableOpacity
       
       className="py-2 px-4 flex flex-row items-center justify-center gap-2 rounded text-semibold text-sm hover:bg-[rgb(1,133,138,0.1)] delay-100 hover:text-[#035c60] text-[#01858a] bg-[transparent]"
    >
      <Entypo name="calendar" size={18} color="#01858a" />
      <Text>Calendar</Text>
    </TouchableOpacity>
</View>
<SafeAreaView className="grid grid-cols-1 py-4 gap-y-8 gap-x-8  
     sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
     {classes.map((classData,index)=> <ClassCard classData={classData} navigation={navigation} key={index} />)}
</SafeAreaView >
</View>
    <TouchableOpacity
        // onPress={() => navigation.navigate("Chat")}
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.chatButton}
    >
       <Entypo name="plus" size={24} color={colors.lightGray} />
    </TouchableOpacity>
</View>
</ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      // justifyContent: 'flex-end',
      // alignItems: 'flex-end',
      // position:'relative',
      // marginTop:70,
      // minHeight:'100vh',
      backgroundColor: "#fff",
  },
  chatButton: {
    position:'sticky',
    bottom:'1rem',
    left:'1rem',
      backgroundColor: colors.primary,
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: .9,
      shadowRadius: 8,
      // marginRight: 20,
      // marginBottom: 50,
  },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Classes;