// src/screens/ProfileScreen.jsx
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
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
    lineHeight: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 13,
  },
  continueBtn: {
    backgroundColor: '#6C2BD9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default function ProfileScreen({ navigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [referralCode, setReferralCode] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigate('otp')}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
          <Text style={styles.stepText}>3/3</Text>
        </View>

        <Text style={styles.title}>Create your Profile</Text>
        <Text style={styles.subtitle}>
          Tell us a little bit about yourself to get started
        </Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="John Doe"
          value={formData.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="your@email.com"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Create Password</Text>
        <TextInput
          placeholder="••••••••••••••"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="••••••••••••••"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Referral Code (Optional)</Text>
        <TextInput
          placeholder="Enter referral code"
          value={referralCode}
          onChangeText={setReferralCode}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.continueBtn} onPress={() => navigate('success')}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}