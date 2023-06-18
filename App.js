import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import Classroom from './screens/Classroom';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { authLogout, processEnd, processStart, setAccessTokenSuccess, setRefreshTokenSuccess, useAccessToken, useAuthentication, useLoading } from './redux/reducers/authReducer';
import { getAccessToken, getRefreshToken } from './redux/services/Storage';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator, useDrawerProgress } from '@react-navigation/drawer';
import Header from './components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Classes from './screens/Classes';
import Settings from './screens/Settings';
import Animated from 'react-native-reanimated';
import { getClasses } from './redux/reducers/classReducer';
import { getUserData } from './redux/reducers/userReducer';
import ProfilePage from './screens/Profile';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = ({isAuthenticated})=>{
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" options={{
        title: 'Login',
        animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
      }}
                                component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

const ClassStack = ()=>{
  return (
    <Stack.Navigator initialRouteName='AllClasses' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AllClasses" options={{
                                    title: 'Classes',
                                    animationTypeForReplace: 'push',
                                  }}
                                component={Classes} />
      <Stack.Screen name="Classroom" component={Classroom} />
    </Stack.Navigator>
  )
}


function CustomDrawerContent(props) {
  const progress = useDrawerProgress();

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });
const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <View className="mt-4 p-4">
        <Text className="text-lg font-semibold text-[black]">
          LiveRoom
        </Text>
      </View>
      <hr />
      <Animated.View style={{ transform: [{ translateX }] }}>
        <DrawerItemList {...props} />
        <hr />
        <DrawerItem icon={() => (<AntDesign name="logout" size={18} color="red" />)} label="Logout" onPress={() => dispatch(authLogout())} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}


const DashboardDrawer = ()=>{
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  const dispatch = useDispatch();
  const accessToken = useAccessToken();
  useEffect(()=>{
    dispatch(getClasses(accessToken));
    dispatch(getUserData(accessToken))
  },[]);
  return (
    <Drawer.Navigator
    useLegacyImplementation={true}
    drawerType="front"
    initialRouteName="Classes"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    
    screenOptions={{
      // drawerType: isLargeScreen ? 'permanent' : 'front',
      // drawerStyle: isLargeScreen ? null : { width: '100%' },
      // overlayColor: 'transparent',
    }}
>
{/* <Drawer.Screen
           key="Dashboard"
           name="Dashboard"
           options={{
              drawerIcon:({focused})=> <MaterialIcons name="dashboard" size={18} color={focused ? "#01858a" : "#f57c00"}/>,
              headerShown:true,
              header: ({ route }) => {
                const title = route?.name;
                 return (
                <Header screen={title}/>
                 );
               }
           }}
           component={Dashboard}
         /> */}
         <Drawer.Screen
           key="Classes"
           name="Classes"
           options={{
              drawerIcon:({focused})=> <FontAwesome name="group" size={18} color={focused ? "#01858a" : "#f57c00"}/>,
              headerShown:true,
              header: ({ route }) => {
                const title = route?.name;
                 return (
                <Header screen={title}/>
                 );
               }
           }}
           component={ClassStack}
         />
          <Drawer.Screen
           key="Profile"
           name="Profile"
           options={{
              drawerIcon:({focused})=> <FontAwesome name="user-circle-o" size={18} color={focused ? "#01858a" : "#f57c00"}/>,
              headerShown:true,
              header: ({ route }) => {
                const title = route?.name;
                 return (
                <Header screen={title}/>
                 );
               }
           }}
           component={ProfilePage}
         />


          <Drawer.Screen
           key="Settings"
           name="Settings"
           options={{
              drawerIcon:({focused})=> <Feather name="settings" size={18} color={focused ? "#01858a" : "#f57c00"}/>,
              headerShown:true,
              header: ({ route }) => {
                const title = route?.name;
                 return (
                <Header screen={title}/>
                 );
               }
           }}
           component={Settings}
         />
</Drawer.Navigator>
  )
}



const RootNavigator = ()=>{
  const isAuthenticated = useAuthentication();
  const dispatch = useDispatch();
  const loading = useLoading();
  const setAccessToken = async ()=>{
      dispatch(processStart());
      try {
        await getAccessToken().then((token)=>{
          // console.log(token);
          if(token){
            dispatch(setAccessTokenSuccess(token));
          }
          dispatch(processEnd());
        })
          
      } catch (error) {
        dispatch(processEnd());        
      }
  }
  const setRefreshToken = async ()=>{
      await getRefreshToken().then((token)=>{
        if(token){
          dispatch(setRefreshTokenSuccess(token));
        }
      })
    }
        
 
  useEffect(()=>{
    setAccessToken();
    setRefreshToken();
  },[])

  if(loading){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text className="text-[#01858a] mb-4 font-semibold text-xl">Getting Ready...</Text>
        <ActivityIndicator size="large" color="#f57c00" />
      </View>
    )
  }

  return (
    <NavigationContainer>
  {isAuthenticated ? 
  <DashboardDrawer isAuthenticated={isAuthenticated} /> 
  : 
  <AuthStack  isAuthenticated={isAuthenticated} /> }
    </NavigationContainer>
  )
}

export default function App() {


  return ( 
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
 <RootNavigator />
    </PersistGate>
  </Provider>
  )
};
