import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import api from '../api/axios';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';
 
export default function LoginScreen({ navigation }) {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
 
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
 
  const validate = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };
 
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }
 
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
 
    setErrors(newErrors);
    return valid;
  };
 
  const handleSubmit = async () => {
    if (!validate()) return;
 
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
 
      if (response?.data?.message === "Login success") {
        const token = response?.data?.token;
 
        await Keychain.setGenericPassword("userToken", token);
 
        setMessage("");
        navigation.navigate('Main');
      } else {
        setMessage(response?.data?.message || "Login failed");
      }
 
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
      );
    }
  };
 
  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>
              <Icon name="arrow-left" size={22} color="#080808" />
          </Text>
        </TouchableOpacity>
 
        <Text style={styles.titleCentered}>
          Login to Payo
        </Text>
      </View>
 
      <Text style={styles.sub}>
        Welcome back! Please enter your details.
      </Text>
 
      {message ? (
        <Text style={{ color: 'red', margin: 10, textAlign: 'center' }}>
          {message}
        </Text>
      ) : null}
 
      {/* EMAIL */}
      <Text style={styles.label}>Email ID</Text>
 
      <TextInput
        style={[styles.input, errors.email && { borderColor: 'red' }]}
        placeholder="your@email.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors(prev => ({ ...prev, email: '' }));
        }}
      />
 
      {errors.email ? (
        <Text style={{ color: 'red', marginBottom: 5 }}>
          {errors.email}
        </Text>
      ) : null}
 
      {/* PASSWORD */}
      <Text style={styles.label}>Password</Text>
 
      <TextInput
        style={[styles.input, errors.password && { borderColor: 'red' }]}
        placeholder="Your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors(prev => ({ ...prev, password: '' }));
        }}
      />
 
      {errors.password ? (
        <Text style={{ color: 'red', marginBottom: 5 }}>
          {errors.password}
        </Text>
      ) : null}
 
      <Text style={styles.forgot}>Forgot Password?</Text>
 
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
 
      <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.or}>OR</Text>
        <View style={styles.line} />
      </View>
 
      {/* ✅ LOGIN WITH OTP (UPDATED) */}
      <TouchableOpacity
        style={styles.otpBtn}
        onPress={() => navigation.navigate('RegisterMobile', { mode: 'login' })}
      >
        <Text style={styles.otpText}>Login with OTP</Text>
      </TouchableOpacity>
 
      {/* REGISTER */}
      <Text style={styles.registerText}>
        Don’t have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('RegisterMobile', { mode: 'register' })}
        >
          Register
        </Text>
      </Text>
 
    </View>
  );
}
 
/* ================= STYLES ================= */
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
  },
 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
 
  back: {
    fontSize: 22,
  },
 
  titleCentered: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: "0%",
  },
 
  sub: {
    textAlign: 'center',
    margin: 10,
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 30
  },
 
  label: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
    fontWeight: 700,
    padding: 10,
  },
 
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
 
  forgot: {
    textAlign: 'right',
    marginTop: 5,
    color: '#5A00D1',
    fontSize: 12,
  },
 
  button: {
    backgroundColor: '#5A00D1',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
 
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
 
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
 
  or: {
    marginHorizontal: 10,
    color: '#777',
  },
 
  otpBtn: {
    borderWidth: 2,
    borderColor: '#5A00D1',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
 
  otpText: {
    color: '#5A00D1',
    fontWeight: '600',
  },
 
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
 
  link: {
    color: '#5A00D1',
    fontWeight: '600',
  },
});
 
