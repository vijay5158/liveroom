import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import authReducer from './authReducer';
import userReducer from './userReducer';
import classReducer from './classReducer';
import postReducer from './postReducer';


const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
  };

const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
  };
  const classPersistConfig = {
    key: 'class',
    storage: AsyncStorage,
  };


export default combineReducers(
    { 
        authReducer: authReducer, 
        userReducer:  persistReducer(userPersistConfig,userReducer),
        classReducer:persistReducer(classPersistConfig,classReducer),
        postReducer:postReducer
    });