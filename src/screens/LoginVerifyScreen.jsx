import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    flex: 1,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 32,
    lineHeight: 19,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 32,
  },
  otpInput: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#333',
  },
  otpInputActive: {
    borderColor: '#6C2BD9',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C2BD9',
  },
  timerExpired: {
    color: '#DC2626',
  },
  verifyBtn: {
    backgroundColor: '#6C2BD9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6C2BD9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  verifyBtnDisabled: {
    backgroundColor: '#ccc',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  resendLink: {
    color: '#6C2BD9',
    fontWeight: '600',
  },
  resendDisabled: {
    color: '#999',
  },
});

export default function LoginVerifyScreen({ navigate, phone = '' }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m} : ${s < 10 ? '0' : ''}${s}`;
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setOtp(['', '', '', '']);
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigate('login')}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Verify Your Number</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to{'\n'}+91 {phone}
        </Text>

        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(value, index)}
              style={[styles.otpInput, otp[index] ? styles.otpInputActive : {}]}
              placeholder=""
              placeholderTextColor="#999"
            />
          ))}
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Code expires in</Text>
          <Text style={[styles.timerText, timeLeft <= 10 && styles.timerExpired]}>
            {formatTime(timeLeft)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.verifyBtn, !isOtpComplete && styles.verifyBtnDisabled]}
          onPress={() => isOtpComplete && navigate('loginsuccess')}
          disabled={!isOtpComplete}
        >
          <Text style={styles.verifyBtnText}>Verify OTP</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive code?{' '}
            <Text
              style={[styles.resendLink, timeLeft > 0 && { color: '#999' }]}
              onPress={timeLeft <= 0 ? handleResend : undefined}
            >
              Resend Code
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
