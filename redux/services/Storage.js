import { Platform } from 'react-native';
import WebStorage from './WebStorage';
import SecureStorage from './SecureStorageService';

function platformStorage() {
  switch (Platform.OS) {
    case 'web':
      return WebStorage;
    default:
      return SecureStorage;
  }
}

export function storeTokens(accessToken,refreshToken) {
  return platformStorage().storeTokens(accessToken,refreshToken);
}

export function getAccessToken() {
  return platformStorage().getAccessToken();
}

export function getRefreshToken() {
  return platformStorage().getRefreshToken();
}
export function removeTokens() {
    return platformStorage().removeTokens();
}