// src/screens/RegisterScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    textAlign: 'center',
    fontWeight: '500',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 13,
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#16A34A',
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
    padding:10,
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
    lineHeight: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  countryCode: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
  },
  disclaimer: {
    fontSize: 11,
    color: '#666',
    marginBottom: 24,
    lineHeight: 16,
    textAlign: 'center',
  },
  sendBtn: {
    backgroundColor: '#6C2BD9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loginLink: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  loginLinkBold: {
    color: '#6C2BD9',
    fontWeight: '600',
  },
  bottomText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
  disclaimerLink: {
    color: '#6C2BD9',
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
});

export default function RegisterScreen({ navigate }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 10) {
      setPhone(numericValue);
      setError('');
    }
  };

  const handleNext = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    navigate('otp', { phone });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* <TouchableOpacity style={styles.backBtn} onPress={() => navigate('on3')}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
          </View>
          <Text style={styles.stepText}>1/3</Text>
        </View> */}

        <Text style={styles.title}>Enter Your Mobile Number</Text>
        <Text style={styles.subtitle}>
          We will send a one-time call to verify your number. Standard rates may apply
        </Text>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            placeholder="Enter your Mobile Number"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={10}
            style={styles.phoneInput}
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.disclaimer}>
          By continuing you agree to PAYO's <Text style={styles.disclaimerLink}>Terms of Service</Text> & <Text style={styles.disclaimerLink}>Privacy Policy</Text>
        </Text>

        <TouchableOpacity
          style={[styles.sendBtn, phone.length !== 10 && { backgroundColor: '#ccc' }]}
          onPress={handleNext}
          disabled={phone.length !== 10}
        >
          <Text style={styles.sendBtnText}>Send OTP</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginLink}>Already have an account?{' '}</Text>
          <TouchableOpacity onPress={() => navigate('login')}>
            <Text style={[styles.loginLink, styles.loginLinkBold]}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.bottomText}>
          By Continuing, you agree to our <Text style={styles.bottomTextBold}>Privacy Policy</Text>
        </Text>
      </View>
    </ScrollView>
  );
}