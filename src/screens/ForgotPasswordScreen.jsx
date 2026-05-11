import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
  ActivityIndicator
} from 'react-native';
 
import styles from "./ForgotPasswordStyles";
import api from '../api/axios';
import Icon from "react-native-vector-icons/Feather";

 
export default function ForgotPassword({ navigation }) {
 
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resetToken, setResetToken] = useState('');
const [errors, setErrors] = useState(''); 
  // BACK HANDLER
  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      return true;
    };
 
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
 
    return () => backHandler.remove();
  }, [navigation]);
 
  // ✅ SEND OTP
  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      Alert.alert('Error', 'Enter valid 10-digit number');
      return;
    }
 
    try {
      setLoading(true);
 
      const res = await api.post('/api/auth/reset-send-otp', {
        mobile: phone,
      });
 
      setOtpSent(true);
 
      Alert.alert('Success', res?.data?.message || 'OTP Sent');
 
    } catch (error) {
      console.log(error?.response?.data || error.message);
      Alert.alert('Error', 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };
 


  const handleVerifyOtp = async () => {
  if (!otpSent) {
    Alert.alert('Error', 'Please send OTP first');
    return;
  }

  if (otp.length < 4) {
    Alert.alert('Error', 'Enter valid OTP');
    return;
  }

  try {
    setLoading(true);

    const res = await api.post('/api/auth/reset-verify-otp', {
      mobile: phone,
      otp: otp,
    });

    setOtpVerified(true);

    // ✅ SAVE TOKEN
    setResetToken(res?.data?.token);

    Alert.alert('Success', res?.data?.message || 'OTP Verified');

  } catch (error) {
    console.log(error?.response?.data || error.message);
    Alert.alert('Error', 'Invalid OTP');
  } finally {
    setLoading(false);
  }
};
 
  // ✅ RESET PASSWORD
 const handleSubmit = async () => {

  if (!otpVerified) {
    Alert.alert('Error', 'Please verify OTP first');
    return;
  }

  if (!password || !confirmPassword) {
    Alert.alert('Error', 'Enter all fields');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  try {
    setLoading(true);

    const res = await api.post(
      '/api/auth/reset-password',
      {
        mobile: phone,
        password: password,
        confirmPassword: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${resetToken}`, // ✅ TOKEN SENT
        },
      }
    );

    Alert.alert('Success', res?.data?.message || 'Password Reset', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'),
      },
    ]);

  } catch (error) {
    console.log(error?.response?.data || error.message);
  setErrors(error?.response?.data?.message || error.message)
  } finally {
    setLoading(false);
  }
};
  return (
    <SafeAreaView style={styles.container}>
 
      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>←

          <Icon name="chevron-left" size={28} color="#ffffff" />   
        </Text>
      </TouchableOpacity>
 
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your mobile number and verify OTP
      </Text>
 
      {/* PHONE */}
      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={phone}
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, '');
            if (cleaned.length <= 10) setPhone(cleaned);
          }}
          placeholder="Enter your mobile number"
          placeholderTextColor="#aaa"
          keyboardType="number-pad"
          maxLength={10}
          style={styles.textInput}
        />
 
        <TouchableOpacity
          style={[
            styles.inlineBtn,
            { opacity: phone.length === 10 ? 1 : 0.5 }
          ]}
          disabled={phone.length !== 10 || loading}
          onPress={handleSendOtp}
        >
          <Text style={styles.inlineBtnText}>
            {loading ? "..." : "Send OTP"}
          </Text>
        </TouchableOpacity>
      </View>
 
      {/* OTP */}
      <Text style={styles.label}>Enter OTP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={otp}
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, '');
            setOtp(cleaned);
          }}
          placeholder="Enter OTP"
          placeholderTextColor="#aaa"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.textInput}
        />
 
        <TouchableOpacity
          style={[
            styles.inlineBtn,
            { opacity: otpSent ? 1 : 0.5 }
          ]}
          onPress={handleVerifyOtp}
          disabled={!otpSent || loading}
        >
          <Text style={styles.inlineBtnText}>
            {loading ? "..." : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
 
      {/* NEW PASSWORD */}
      <Text style={styles.label}>New Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your new password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />

{errors ? <Text style={styles.error}>{errors}</Text> : null}      
 
      {/* CONFIRM PASSWORD */}
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />
 
      {/* SUBMIT */}
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: otpVerified ? 1 : 0.5 }
        ]}
        onPress={handleSubmit}
        disabled={!otpVerified || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
 
    </SafeAreaView>
  );
}