// src/utils/biometric.js
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BIOMETRICS_ENABLED_KEY = '@biometrics_enabled';

const rnBiometrics = new ReactNativeBiometrics();

/**
 * Check if biometrics are available (hardware + enrolled)
 * Returns: { available: boolean, biometryType: 'Face ID' | 'Touch ID' | 'Biometrics' | null }
 */
export const checkBiometrics = async () => {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    return { available, biometryType };
  } catch (error) {
    console.warn('Biometric check error:', error);
    return { available: false, biometryType: null };
  }
};

/**
 * Prompt the user for biometrics (or device credentials)
 * Returns: { success: boolean, error?: string }
 */
export const authenticateWithBiometrics = async (options = {}) => {
  const {
    promptMessage = 'Authenticate to enable biometric login',
    cancelTitle = 'Cancel',
    allowDeviceCredential = true,
    fallbackTitle = 'Use Passcode',
  } = options;

  try {
    const { success, error } = await rnBiometrics.simplePrompt({
      promptMessage,
      cancelButtonText: cancelTitle,
      deviceCredentialAllowed: allowDeviceCredential, // Android
      fallbackTitle, // iOS
    });

    if (success) {
      return { success: true };
    } else {
      return { success: false, error: error || 'Authentication failed' };
    }
  } catch (error) {
    console.error('Biometric authentication error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Save a flag indicating biometrics are enabled
 */
export const setBiometricsEnabled = async (enabled = true) => {
  await AsyncStorage.setItem(BIOMETRICS_ENABLED_KEY, JSON.stringify(enabled));
};

/**
 * Check if biometrics are enabled (user has previously enabled)
 */
export const getBiometricsEnabled = async () => {
  const value = await AsyncStorage.getItem(BIOMETRICS_ENABLED_KEY);
  return value ? JSON.parse(value) : false;
};