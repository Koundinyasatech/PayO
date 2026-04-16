import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import api from '../api/axios';

export default function RegisterMobileScreen({ navigation }) {

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const isValidMobile = mobile?.length === 10;

  const handleSendOTP = async () => {

     if (mobile?.length == 0) {
      Alert.alert('Error', 'Enter mobile number');
      return;
    }
    if (mobile?.length < 10) {
      Alert.alert('Error', 'Enter valid mobile number');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/api/auth/send-otp', {
        mobile: mobile   // 🔥 FIXED (was phone before)
      });

      console.log('API Response:', response?.data);

      // ✅ ALWAYS NAVIGATE (even if backend fails)
      navigation.navigate('OTP', { mobile });

    } catch (error) {

      console.log('AXIOS ERROR:', error.response?.data || error.message);

      // ⚠️ Show warning but continue
      Alert.alert('Warning', 'Server Issue, Please try after some time');

      // ✅ STILL NAVIGATE
      // navigation.navigate('OTP', { mobile });

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

     <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
   <Text style={styles.back}>←</Text>
{/* <Text style={styles.back}>{'<'}</Text> */}
  </TouchableOpacity>

  <Text style={styles.titleCentered}>
    Enter Your Mobile Number
  </Text>
</View>

      <Text style={styles.desc}>
        We will send a one time code to verify your number.
        Standard rates may apply.
      </Text>

      <Text style={styles.label}>Mobile Number</Text>

      <View style={styles.inputRow}>
        <View style={styles.codeBox}>
          <Text>+91</Text>
        </View>

        {/* <TextInput
          style={styles.input}
          placeholder="9876543210"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          maxLength={10}
        /> */}

        <TextInput
  style={styles.input}
  placeholder="9876543210"
  keyboardType="phone-pad"
  value={mobile}
  onChangeText={(text) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setMobile(numeric);
  }}
  maxLength={10}
/>
      </View>

      <Text style={styles.terms}>
        By continuing you agree to PAYO’s{' '}
        <Text style={styles.link}>Terms of Service</Text> &{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={handleSendOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity> */}

      <TouchableOpacity
  style={[
    styles.button,
    { backgroundColor: isValidMobile ?'#4E00C2' : '#ccc' } // optional UI feedback
  ]}
  onPress={handleSendOTP}
  disabled={!isValidMobile || loading}
  
>
  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.buttonText}>Send OTP</Text>
    
  )}
</TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>

      <Text style={styles.footer}>
        By Continuing, you agree to our{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },

 header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
back: {
  fontSize: 20,
  marginRight: 10,
},

titleCentered: {
  flex: 1,
  textAlign: 'center',
  fontSize: 22,
  fontWeight: '700',
  marginLeft: "2%", // balances arrow space
},
  desc: {
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
    marginBottom: 30,
    fontSize: 13,padding:10
  },

  label: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
    fontWeight:700,
    padding:10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },

  codeBox: {
    padding: 12,
    backgroundColor: '#cfcdcd',
  },

  input: {
    flex: 1,
    padding: 12,
  },

  terms: {
    fontSize: 12,
    marginTop: 30,
    marginBottom: 15,
       marginLeft: 15,
        marginRight: 15,
    color: '#555',
    padding:10
  },

link: {
  color: '#4E00C2',
  textDecorationLine: 'underline',
},

  button: {
    backgroundColor: '#4E00C2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
  },

  footer: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: '#555',
  },
});