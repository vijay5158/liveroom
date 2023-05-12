import AsyncStorage from '@react-native-async-storage/async-storage';

const WebStorage = {
    async storeTokens (accessToken,refreshToken) {
        try {
          const access_token = (accessToken)
          const refresh_token = (refreshToken)
          await AsyncStorage.setItem('accessToken', access_token)
          await AsyncStorage.setItem('refreshToken', refresh_token)
        } catch (error) {
          console.log(error)
        }
      },
      async getAccessToken() {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          if (token) {
            return token
          }
          else{
              return false;
          }
        } catch (error) {
          console.log(error);
          return false
        }
      },
      async getRefreshToken() {
        try {
          
          const token = await AsyncStorage.getItem('refreshToken');
          if (token) {
            return token
          }
          else{
              return false;
          }
        } catch (error) {
          console.log(error);
          return false
        }
      },
      async removeTokens() {
        try {
          await AsyncStorage.clear()
        } catch (error) {
          console.log(error)
        }
      }
    
 
}

// const storeToken = async (accessToken,refreshToken) => {
//     try {
//       const access_token = JSON.stringify(accessToken)
//       const refresh_token = JSON.stringify(refreshToken)
//       await AsyncStorage.setItem('accessToken', access_token)
//       await AsyncStorage.setItem('refreshToken', refresh_token)
//     } catch (error) {
//       console.log(error)
//     }
//   }
  
//   const getAccessToken = async () => {
//     try {
      
//       const token = await AsyncStorage.getItem('accessToken');
//       if (token) {
//         return token
//       }
//       else{
//           return false;
//       }
//     } catch (error) {
//       console.log(error);
//       return false
//     }
//   }
  
  
//   const getRefreshToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('refreshToken');
//         if (token) {
//         return token
//       }
//       else{
//           return false;
//       }
//     } catch (error) {
//       console.log(error);
//       return false
//     }
//     }
    
  
//   const removeToken = async () => {
//     try {
//       await AsyncStorage.clear()
//     } catch (error) {
//       console.log(error)
//     }
//   }
  
  export default WebStorage;