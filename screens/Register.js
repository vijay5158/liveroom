import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch } from 'react-redux';
import { authSignup } from '../redux/reducers/authReducer';
import { ScrollView } from 'react-native';
import AvatarDropdown from '../components/AvatarDropdown';
import alertFunc from '../components/Alert';
import { ActivityIndicator } from "react-native-paper";
const backImage = require("../assets/backImage.png");

export default function Register({ navigation }) {
  const data = ["Teacher","Student"];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isStudent, setIsStudent] = useState(null);
  const dispatch = useDispatch();
  const onHandleSignup = () => {

    if (email?.length>0 && password?.length>0 && name?.length>0 && mobile?.length===10 ) {
      // let userData = {
      //   name: name,
      //   email: email,
      //   mobile: mobile,
      //   password: password,
      //   is_student: isStudent,
      //   is_teacher: !isStudent,
      // };
      setLoading(true);
      const formData = new FormData();
      formData.append('name',name)
      formData.append('email',email)
      formData.append('mobile',mobile)
      formData.append('password',password)
      formData.append('is_student',String(isStudent))
      formData.append('is_teacher',String(!isStudent))
      // if(avatar){
      //   formData.append('avatar',avatar);
      // }
      dispatch(authSignup(formData,setLoading));
    }
    else{
     alertFunc('Please fill all data or data is incorrect!')
    }
  };
  const handleRole = (selectedItem, index) => {
    // console.log(selectedItem, index)
    if(index === 0){
      setIsStudent(false);
    }
    else{
      setIsStudent(true);
    }
  }
  return (
    <ScrollView>
    <View className="flex-1 bg-[#fff] min-h-[100vh]" >
      <Image source={backImage} className="absolute top-0 h-[340px] w-[100%] object-cover" />
      <View className="w-[100%] h-[75%] sm:h-[85%] absolute bottom-0 rounded-tl-[60px] bg-[#fff] " />
      <SafeAreaView className="flex-1 justify-end mx-[30px] pb-[2rem] sm:mx-auto max-w-[600px] sm:w-full">

        <Text className="font-bold text-[36px] text-[#01858a] pb-[24px] self-center " >Sign up</Text>
        <TextInput
        placeholder="Name"
        autoCapitalize="none"
        keyboardType="default"
        textContentType="name"
        className="h-[58px] bg-[#F6F7FB] mb-[20px] focus:border-2 border-[#01858a] outline-none transition-all text-[16px] rounded-[10px] p-[12px] "
        autoFocus={true}
        value={name}
        onChangeText={(text) => setName(text)}
        cursorColor={"#01858a"}
      />  
   
      <View className="mb-[20px] w-[100%] flex flex-col sm:flex-row gap-[20px] ">
   
      <TextInput
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        className="h-[58px] bg-[#F6F7FB] sm:w-[50%] focus:border-2 border-[#01858a] outline-none transition-all text-[16px] rounded-[10px] p-[12px] "
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
      placeholder="Number"
      autoCapitalize="none"
      keyboardType="numeric"
      textContentType="telephoneNumber"
      className="h-[58px] bg-[#F6F7FB] sm:w-[50%] focus:border-2 border-[#01858a] outline-none transition-all text-[16px] rounded-[10px] p-[12px] "
      value={mobile}
      onChangeText={(text) => setMobile(text)}
    />
   </View>
      <TextInput
        placeholder="Enter password"
        className="h-[58px] bg-[#F6F7FB] focus:border-2 border-[#01858a] outline-none transition-all mb-[20px] text-[16px] rounded-[10px] p-[12px] "
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <SelectDropdown
        data={data}
        defaultButtonText="I am ?"
        onSelect={handleRole}
        buttonStyle={{height:58,width:'100%',backgroundColor:'#F6F7FB',fontSize:16, borderRadius:10 ,padding:12 ,marginBottom:20}}
        buttonTextStyle={{textAlign:'start'}}
        // className="h-[58px] bg-[#F6F7FB] focus:border-2 border-[#01858a] outline-none transition-all mb-[20px] text-[16px] rounded-[10px] p-[12px]"
        dropdownStyle={{borderRadius:'1rem'}}
        rowStyle={{padding:10}}
        rowTextStyle={{textAlign:'left',}}
        selectedRowStyle={{backgroundColor:'#01858a'}}
        selectedRowTextStyle={{color:'white'}}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      <TouchableOpacity disabled={loading} className="bg-[#01858a] h-[58px] rounded-[10px] justify-center items-center mt-[40px] " onPress={onHandleSignup}>
      {loading ? (
    <ActivityIndicator color="white" />
  ) : (
        <Text className="font-bold text-[#fff] text-[18px] "> Take off !</Text>
  )}
        </TouchableOpacity>
      <View className="mt-[20px] flex-row items-center self-center">
        <Text className="text-[gray] font-semibold text-[14px] " >Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-[#01858a] font-semibold text-[14px] "> Login</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});