import ReactNativeBiometrics from 'react-native-biometrics';
import {Alert, Platform} from 'react-native';

class BiometricService {
  constructor() {
    this.rnBiometrics = new ReactNativeBiometrics();
  }

  // Check if biometric hardware is available
  async checkBiometricAvailability() {
    try {
      const {available} = await this.rnBiometrics.isSensorAvailable();
      
      if (available) {
        // Check enrolled biometrics
        const {biometryType} = await this.rnBiometrics.isSensorAvailable();
        return {
          available: true,
          biometryType: biometryType, // 'FaceID', 'TouchID', or 'Biometrics'
        };
      }
      return {
        available: false,
        biometryType: null,
      };
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return {
        available: false,
        biometryType: null,
        error: error.message,
      };
    }
  }

  // Get available biometric type
  async getBiometricType() {
    try {
      const {available, biometryType} = await this.rnBiometrics.isSensorAvailable();
      
      if (available) {
        if (biometryType === 'FaceID') {
          return 'Face ID';
        } else if (biometryType === 'TouchID') {
          return 'Touch ID / Fingerprint';
        } else {
          return 'Biometrics';
        }
      }
      return 'Not Available';
    } catch (error) {
      return 'Not Available';
    }
  }

  // Authenticate user using biometrics
  async authenticateUser(promptMessage = 'Verify your identity') {
    try {
      const {available} = await this.rnBiometrics.isSensorAvailable();
      
      if (!available) {
        return {
          success: false,
          error: 'Biometric authentication is not available on this device',
        };
      }

      const {success} = await this.rnBiometrics.simplePrompt({
        promptMessage: promptMessage,
        cancelButtonText: 'Cancel',
        fallbackPromptMessage: 'Use device passcode',
      });

      if (success) {
        return {
          success: true,
          message: 'Authentication successful',
        };
      } else {
        return {
          success: false,
          error: 'Authentication failed',
        };
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
      return {
        success: false,
        error: error.message || 'Authentication failed',
      };
    }
  }

  // Create biometric keys (for secure storage)
  async createBiometricKeys() {
    try {
      const {publicKey} = await this.rnBiometrics.createKeys();
      return publicKey;
    } catch (error) {
      console.error('Error creating biometric keys:', error);
      return null;
    }
  }

  // Delete biometric keys
  async deleteBiometricKeys() {
    try {
      const result = await this.rnBiometrics.deleteKeys();
      return result;
    } catch (error) {
      console.error('Error deleting biometric keys:', error);
      return false;
    }
  }

  // Biometric sign with keys
  async biometricSign(payload) {
    try {
      const {signature} = await this.rnBiometrics.createSignature({
        payload: payload,
      });
      return signature;
    } catch (error) {
      console.error('Error during biometric signing:', error);
      return null;
    }
  }

  // Validate biometric keys
  async validateBiometricKeys() {
    try {
      const {keysExist} = await this.rnBiometrics.biometricKeysExist();
      return keysExist;
    } catch (error) {
      return false;
    }
  }
}

export default new BiometricService();