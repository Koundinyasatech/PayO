import React, { useState } from 'react';
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 32,
    lineHeight: 19,
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
    fontSize: 10,
    color: '#666',
    marginBottom: 24,
    lineHeight: 14,
  },
  disclaimerBold: {
    fontWeight: '600',
    color: '#6C2BD9',
  },
  sendBtn: {
    backgroundColor: '#6C2BD9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#6C2BD9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sendBtnDisabled: {
    backgroundColor: '#ccc',
  },
});

export default function LoginOtpScreen({ navigate }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 10) {
      setPhone(numericValue);
      setError('');
    }
  };

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    navigate('loginverify', { phone });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigate('login')}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Enter Your Mobile Number</Text>
        <Text style={styles.subtitle}>
          We will send a one time code to verify your number. Standard rates may apply.
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

        {error ? (
          <Text style={{ color: '#DC2626', fontSize: 12, marginBottom: 16 }}>
            {error}
          </Text>
        ) : null}

        <Text style={styles.disclaimer}>
          By continuing you agree to PAYO's{' '}
          <Text style={styles.disclaimerBold}>Terms of Service & Privacy Policy</Text>
        </Text>

        <TouchableOpacity
          style={[styles.sendBtn, phone.length !== 10 && styles.sendBtnDisabled]}
          onPress={handleSendOtp}
          disabled={phone.length !== 10}
        >
          <Text style={styles.sendBtnText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
