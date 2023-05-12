import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { authLogin, useAccessToken, useAuthentication } from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useUser } from "../redux/reducers/userReducer";
import { ScrollView } from "react-native";

const backImage = require("../assets/backImage.png");

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useAuthentication();    
  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
     console.log(email,password);
     dispatch(authLogin(email,password));
    }
  };
  return (
    <ScrollView>
    <View className="flex-1 bg-[#fff]" >
      <Image source={backImage} className="absolute top-0 h-[340px] w-[100%] object-cover" />
      <View className="w-[100%] h-[75%] sm:h-[80%] absolute bottom-0 rounded-tl-[60px] bg-[#fff] " />
      <SafeAreaView className="flex-1 justify-center mx-[30px] sm:mx-auto max-w-[600px] sm:w-full ">
        <Text className="font-bold text-[36px] text-[#f57c00] pb-[24px] self-center " >Log In</Text>
         <TextInput
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        className="h-[58px] bg-[#F6F7FB] focus:border-2 border-[#f57c00] outline-none transition-all mb-[20px] text-[16px] rounded-[10px] p-[12px] "
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Enter password"
        className="h-[58px] bg-[#F6F7FB] focus:border-2 border-[#f57c00] outline-none transition-all mb-[20px] text-[16px] rounded-[10px] p-[12px] "
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity className="bg-[#f57c00] h-[58px] rounded-[10px] justify-center items-center mt-[40px] " onPress={onHandleLogin}>
        <Text className="font-bold text-[#fff] text-[18px] ">Enter the room !</Text>
      </TouchableOpacity>
      <View className="mt-[20px] flex-row items-center self-center">
        <Text className="text-[gray] font-semibold text-[14px] " >Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-[#f57c00] font-semibold text-[14px] "> Sign Up</Text>
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