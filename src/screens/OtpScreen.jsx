import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: '#6C2BD9',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  stepText: {
    fontSize: 11,
    color: '#999',
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
  verifyBtnDisabled: {
    backgroundColor: '#ccc',
  },
  verifyBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 12,
    color: '#666',
  },
  resendLink: {
    color: '#6C2BD9',
    fontWeight: '600',
  },
});

export default function OtpScreen({ navigate, phone = '' }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m} : ${s < 10 ? '0' : ''}${s}`;
  };

  const handleOtpChange = (index, value) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    if (numericValue && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const prev = [...otp];
      prev[index - 1] = '';
      setOtp(prev);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigate('register')}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[styles.dot, i === 1 ? styles.activeDot : styles.inactiveDot]}
              />
            ))}
          </View>
          <Text style={styles.stepText}>2/3</Text>
        </View>

        <Text style={styles.title}>Verify Your Number</Text>
        <Text style={styles.subtitle}>
          Enter the 4 digit code sent to {'\n'}+91 {phone}
        </Text>

        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, otp[index] && styles.otpInputActive]}
              maxLength={1}
              keyboardType="numeric"
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
            />
          ))}
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Code expires in:</Text>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.verifyBtn, !isOtpComplete && styles.verifyBtnDisabled]}
          onPress={() => navigate('profile')}
          disabled={!isOtpComplete}
        >
          <Text style={styles.verifyBtnText}>Verify OTP</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive code?{' '}
            <Text
              style={[styles.resendLink, timeLeft > 0 && { color: '#999' }]}
              onPress={timeLeft <= 0 ? () => setTimeLeft(60) : undefined}
            >
              Resend Code
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}