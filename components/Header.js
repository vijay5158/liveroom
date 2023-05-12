import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity, ImageBackground,} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

const headerBg = require("../assets/headerbg.jpg");

export default function Header({screen}){
 const navigation = useNavigation();
  return(
<ImageBackground source={headerBg} resizeMode="cover" style={headerStyles.container}>

<View className="flex flex-row justify-between gap-4 items-center">
<TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
<AntDesign name="menu-fold" size={24} color="#fff" />
</TouchableOpacity>
<Text className="font-bold text-xl text-[white]">{screen==="Dashboard"?"LiveRoom":screen}</Text>
</View>

<View className="flex flex-row justify-between gap-4 items-center">
<TouchableOpacity>
<FontAwesome name="user-circle-o" size={24} color="#fff" />
</TouchableOpacity>
<TouchableOpacity>
<MaterialIcons name="more-vert" size={24} color="#fff" />
</TouchableOpacity>
</View>
</ImageBackground>
  )
}

const headerStyles=StyleSheet.create({
   container:{
      //  position:'absolute',
       top:0,
       left:0,
       width:'100%',
      //  backgroundColor:'#f57c00',
       elevation:5,
       height:70,
       display:'flex',
       flexDirection:'row',
       paddingHorizontal:20,
       alignItems:'center',
       justifyContent:'space-between',
       color:'#fff',
      paddingTop: StatusBar.currentHeight || 0,

   },
   imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
});