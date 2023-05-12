import * as SecureStore from 'expo-secure-store';


const isSecureStorageAvailable = async ()=>{
  return await SecureStore.isAvailableAsync()
}

const SecureStorage = {
  async storeTokens(accessToken,refreshToken) {
    try {
      const access_token = JSON.stringify(accessToken)
      const refresh_token = JSON.stringify(refreshToken)
      await SecureStore.setItemAsync('accessToken', access_token)
      await SecureStore.setItemAsync('refreshToken', refresh_token)
    } catch (error) {
      console.log(error)
    }
  },
 async getAccessToken() {
    try {
      return await SecureStore.getItemAsync('accessToken').then((token)=>{
        if (token) {
          return token
        }
        else{
          return false;
        }
      })
    } catch (error) {
      console.log(error);
      return false
    }
  }
,
async getRefreshToken() {
  try {
    return await SecureStore.getItemAsync('refreshToken').then((token)=>{
      if (token) {
        return token
      }
      else{
        return false;
      }
    })
  } catch (error) {
    console.log(error);
    return false
  }
},
async removeTokens() {
  try {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  } catch (error) {
    console.log(error)
  }
}


}

// const storeToken = async (accessToken,refreshToken) => {
//   try {
//     const access_token = JSON.stringify(accessToken)
//     const refresh_token = JSON.stringify(refreshToken)
//     await SecureStore.setItemAsync('accessToken', access_token)
//     await SecureStore.setItemAsync('refreshToken', refresh_token)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const getAccessToken = async () => {
//   try {
    
//     return await SecureStore.getItemAsync('accessToken').then((token)=>{
//       if (token) {
//         return token
//       }
//       else{
//         return false;
//       }
//     })
//   } catch (error) {
//     console.log(error);
//     return false
//   }
// }


// const getRefreshToken = async () => {
//     try {
//       let token = await SecureStore.getItemAsync('refreshToken');
//     if (token) {
//       return token
//     }
//     else{
//         return false;
//     }
//   } catch (error) {
//     console.log(error);
//     return false
//   }
//   }
  

// const removeToken = async () => {
//   try {
//     await SecureStore.deleteItemAsync('accessToken');
//     await SecureStore.deleteItemAsync('refreshToken');
//   } catch (error) {
//     console.log(error)
//   }
// }

export default SecureStorage;