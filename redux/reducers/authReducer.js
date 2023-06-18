import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { setUserInfo, unSetUserInfo } from "./userReducer";
import AxiosInstance from "../../utils/AxiosInstance";
import { removeTokens, storeTokens } from "../services/Storage";
import alertFunc from "../../components/Alert";



const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  errors: {},
  loading:false,
};


export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    //Actions
    processStart: (state,action) => {
      state.loading=true;
    },
    processEnd: (state,action) => {
      state.loading=false;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload?.access;
      state.refreshToken = action.payload?.refresh;
      state.errors = null;
      state.loading = false;
    },
    setAccessTokenSuccess: (state, action) => {
      state.accessToken=action.payload;
      state.isAuthenticated = true;
      state.errors = null;
      state.loading=false;
    },
    setRefreshTokenSuccess: (state,action) => {
      state.refreshToken = action.payload;
      state.loading = false;
    },
    authError: (state, action) => {
      state.errors = action.payload;
      state.loading=false;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.errors = null;
      state.loading=false;
    }
  },
});

export const { login, authError, logout,setAccessTokenSuccess,setRefreshTokenSuccess,processStart,processEnd } = authSlice.actions;

export const useAuthentication = () => {
  return useSelector((root) => root.authReducer.isAuthenticated);
};

export const useAccessToken = () => {
    return useSelector((root) => root.authReducer.accessToken);
  };
  export const useLoading = () => {
    return useSelector((root) => root.authReducer.loading);
  };

  export const authLogout = () => {
    return async dispatch => {
      dispatch(logout());
      dispatch(unSetUserInfo());
      removeTokens();
      
    }
  }
  
// export const checkAuthTimeout = expirationTime => {
//   return dispatch => {
//     setTimeout(() => {
//     dispatch(authLogout)
//     }, expirationTime * 1000);
//   };
// };

export const authLogin = (email, password,setLoading) => {
  return async dispatch => {
   
try {
  await AxiosInstance.post('login/', {
    email: email,
    password: password,
  }).then((res) => {
    if(res.data.success){
    const data = res.data?.user;
    const tokens = res.data?.tokens;
    const user = {
      // profile_img: data?.profile_img,
      name: data?.name,
      mobile: data?.mobile,
      email: data?.email,
      expirationDate: new Date().getTime() + 36000 * 1000,
      // is_student: data?.is_student,
      // is_teacher: data?.is_teacher,
      userId: data?.id
    };
    dispatch(login(tokens))
    dispatch(setUserInfo(user));
    // dispatch(checkAuthTimeout(36000));
        storeTokens(tokens?.access,tokens?.refresh);

  }
  else{
    alertFunc(res.data?.message);
    dispatch(authError({login:res.data?.message}));
  }})
  .catch(err => {
    alertFunc(err.message)
    dispatch(authError(err.message));
  })
  .finally(()=> setLoading(false))

} catch (error) {
  setLoading(false);
alertFunc('Error, Try again!');
}
  };
};


export const authSignup = (userData,setLoading) => {
  return async dispatch => {
  try {
    await AxiosInstance.post('register/', userData).then((res) => {
      const data = res.data?.user;
      const tokens = res.data?.tokens;
      const user = {
        profile_img: data?.profile_img,
        name: data?.name,
        mobile: data?.mobile,
        email: data?.email,
        expirationDate: new Date().getTime() + 36000 * 1000,
        is_student: data?.is_student,
        is_teacher: data?.is_teacher,
        userId: data?.id
      };
      dispatch(login(tokens))
      dispatch(setUserInfo(user));
      // dispatch(checkAuthTimeout(36000));
          storeTokens(tokens?.access,tokens?.refresh);

    })
    .catch(err => {
      alertFunc(err?.message)
      dispatch(authError(err?.message));
    })
    .finally(()=> setLoading(false))
  
  } catch (error) {
    setLoading(false);
    alertFunc('Some Error occured!')
  }
  };
};

export default authSlice.reducer;