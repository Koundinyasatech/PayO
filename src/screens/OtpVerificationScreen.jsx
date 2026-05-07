


import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar
} from 'react-native';

import api from '../api/axios';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';

export default function OtpVerificationScreen({ route, navigation }) {

  const { mobile, mode = 'register' } = route.params;

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputs = useRef([]);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (error) setError('');

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const saveToken = async (token) => {
    try {
      await Keychain.setGenericPassword('user', token);
    } catch (e) {
      console.log("Token save error:", e);
    }
  };

  const handleVerifyOTP = async () => {

    const finalOtp = otp.join('');

    if (finalOtp.length < 4) {
      setError('Enter valid OTP');
      return;
    }

    try {
      setLoading(true);
      setError('');

      let response;

      // ✅ DIFFERENT VERIFY API BASED ON MODE
      if (mode === 'login') {
        response = await api.post('/api/auth/verify-login-otp', {
          mobile,
          otp: finalOtp
        });
      } else {
        response = await api.post('/api/auth/verify-otp', {
          mobile,
          otp: finalOtp
        });
      }

      if (response.data.token) {

        await saveToken(response.data.token);

        // ✅ NAVIGATION BASED ON MODE
        if (mode === 'login') {
          navigation.replace('Main');
        } else {
          navigation.replace('Profile');
        }

      } else {
        setError('Invalid OTP');
      }

    } catch (error) {
      console.log("VERIFY ERROR:", error?.response?.data || error.message);
      setError(error?.response?.data?.message || 'Enter valid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setOtp(['', '', '', '']);

    if (inputs.current[0]) {
      inputs.current[0].focus();
    }

    try {

      // ✅ DIFFERENT RESEND API BASED ON MODE
      if (mode === 'login') {
        await api.post('/api/auth/login-otp', { mobile });
      } else {
        await api.post('/api/auth/send-otp', { mobile });
      }

      startTimer();

    } catch (error) {
      console.log("RESEND ERROR:", error);
      setError('Resend failed');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}><Icon name="arrow-left" size={22} color="#080808" /></Text>
        </TouchableOpacity>

        <Text style={styles.titleCentered}>
          Verify Your Number
        </Text>
      </View>

      <Text style={styles.sub}>
        Enter the 4 digit code sent to +91 {mobile}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.box}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      {error ? (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {error}
        </Text>
      ) : null}

      <Text style={styles.timer}>
        Code expires in : 00:{timer < 10 ? `0${timer}` : timer}
      </Text>

      <Text style={styles.resend}>
        Didn’t receive code?{' '}
        <Text style={styles.link} onPress={handleResendOTP}>
          Resend Code
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      {/* ✅ HIDE LOGIN OPTION IN LOGIN MODE */}
      {mode !== 'login' && (
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F3F3', padding: 20,     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  back: { fontSize: 22 },
  titleCentered: { flex: 1, textAlign: 'center', fontSize: 22, fontWeight: '700' },
  sub: { textAlign: 'center', marginTop: 30, color: '#666' },
  otpContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  box: {
    width: 55,
    height: 55,
    borderWidth: 1,
    marginHorizontal: 6,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10
  },
  timer: { marginTop: 20, textAlign: 'center' },
  resend: { marginTop: 10, textAlign: 'center' },
  link: { color: '#5A00D1', textDecorationLine: 'underline' },
  button: {
    backgroundColor: '#5A00D1',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center'
  },
  buttonText: { color: '#fff' },
  loginText: { marginTop: 20, textAlign: 'center' }
});

