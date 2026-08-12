import * as Keychain from 'react-native-keychain';

export const saveToken = async (token) => {
  await Keychain.setGenericPassword('user', token);
};

export const getToken = async () => {
  const creds = await Keychain.getGenericPassword();
  return creds ? creds.password : null;
};

export const removeToken = async () => {
  await Keychain.resetGenericPassword();
};