import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { logout } from "./authReducer";
import AxiosInstance from "../../utils/AxiosInstance";
import alertFunc from "../../components/Alert";




const initialState = {
  user: {},
  errors: {},
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    //Actions
    setUserInfo: (state, action) => {
      state.user = action.payload;
      state.errors = null;
    },
    updateUserInfo: (state, action) => {
      // console.log({...action.payload,...state.user},action.payload);
      Object.assign(state.user, action.payload)
      state.errors = null;
    }, 
    userError: (state, action) => {
      state.errors = action.payload;
    },
    unSetUserInfo: (state, action) => {
      state.user = {};
    }
  },
});

export const { setUserInfo,updateUserInfo,unSetUserInfo,userError } = userSlice.actions;


export const useUser = () => {
    return useSelector((root) => root.userReducer.user);
  };

  export const getUserData = (token) => {
    return dispatch => {
      AxiosInstance.defaults.headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
  
      AxiosInstance.get(`list/user/`)
        .then((res) => {
          const data = res.data;
          const userData = {
            profileImg: data?.profile_img,
            name: data?.name,
            mobile: data?.mobile,
            email: data?.email,
            expirationDate: new Date().getTime() + 36000 * 1000,
            is_student: data?.is_student,
            is_teacher: data?.is_teacher,
            userId: data?.id,
            error: null,
            loading: false,
          };
          dispatch(setUserInfo(userData));
  
          // dispatch(checkAuthTimeout(36000));
  
  
        })
        .catch((error) => {
          alertFunc(error);
          dispatch(logout());
        })
    }
  }
  
  
  export const updateUserData = (userData, userId, token) => {
    return dispatch => {
      AxiosInstance.defaults.headers = {
        // "Accept": "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
  
      AxiosInstance.patch(`list/user/${userId}/`, userData)
        .then((res) => {
          const userData = {
            name: res.data.name,
            mobile: res.data.mobile,
            profileImg: res.data.profile_img,
            error: null,
            loading: false,
            email: res.data.email,
          };
         
          dispatch(updateUserInfo(userData));
  
  
  
        })
        .catch((error) => {
          alertFunc(error);
        })
    }
  }
  

export default userSlice.reducer;