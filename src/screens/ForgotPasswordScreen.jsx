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
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ ADD

export default function ForgotPassword({ navigation }) {

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false); // 👁
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👁

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

  // SEND OTP
  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      Alert.alert('Error', 'Enter valid 10-digit number');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/api/auth/send-otp', {
        mobile: phone,
      });

      setOtpSent(true);
      Alert.alert('Success', res?.data?.message || 'OTP Sent');

    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
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

      await api.post('/api/auth/verify-otp', {
        mobile: phone,
        otp: otp,
      });

      setOtpVerified(true);
      Alert.alert('Success', 'OTP Verified');

    } catch (error) {
      Alert.alert('Error', 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD
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

      const res = await api.post('/api/auth/reset-password', {
        mobile: phone,
        password: password,
      });

      Alert.alert('Success', res?.data?.message || 'Password Reset', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);

    } catch (error) {
      Alert.alert('Error', 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>←</Text>
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
      <View style={{ position: 'relative' }}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your new password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          style={[styles.input, { paddingRight: 50 }]}
        />

        <TouchableOpacity
          style={{ position: 'absolute', right: 15, top: 15 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* CONFIRM PASSWORD */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={{ position: 'relative' }}>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showConfirmPassword}
          style={[styles.input, { paddingRight: 50 }]}
        />

        <TouchableOpacity
          style={{ position: 'absolute', right: 15, top: 15 }}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#000"
          />
        </TouchableOpacity>
      </View>

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