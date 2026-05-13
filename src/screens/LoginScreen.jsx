import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import api from '../api/axios';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';


export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
            <Icon name="chevron-left" size={28} color="#000" />
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

      <View
  style={[
    styles.passwordContainer,
    errors.password && { borderColor: 'red' },
  ]}
>
  <TextInput
    style={styles.passwordInput}
    placeholder="Your password"
    secureTextEntry={!showPassword}
    value={password}
    onChangeText={(text) => {
      setPassword(text);
      setErrors(prev => ({ ...prev, password: '' }));
    }}
  />

  <TouchableOpacity
    onPress={() => setShowPassword(!showPassword)}
  >
    <Icon
      name={showPassword ? 'eye' : 'eye-off'}
      size={16}
      color="#555"
    />
  </TouchableOpacity>
</View>

      {errors.password ? (
        <Text style={{ color: 'red', marginBottom: 5 }}>
          {errors.password}
        </Text>
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor: '#EAEAEA',

    paddingHorizontal: wp('5%'),

    paddingBottom: hp('4%'),

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + hp('2%')
        : hp('6%'),
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: hp('1%'),

    marginBottom: hp('2%'),
  },

  back: {
    fontSize: moderateScale(22),

    color: '#000',
  },

  titleCentered: {
    flex: 1,

    textAlign: 'center',

    fontSize: moderateScale(22),

    fontWeight: '700',

    marginRight: wp('6%'),
  },

  sub: {
    textAlign: 'center',

    marginTop: hp('1%'),

    marginBottom: hp('4%'),

    color: '#666',

    fontSize: moderateScale(13),

    lineHeight: moderateScale(20),

    paddingHorizontal: wp('3%'),
  },

  label: {
    fontSize: moderateScale(12),

    color: '#333',

    marginBottom: hp('0.7%'),

    fontWeight: '700',

    paddingLeft: wp('1%'),
  },

  input: {
    backgroundColor: '#fff',

    borderRadius: moderateScale(12),

    paddingVertical: hp('1.8%'),

    paddingHorizontal: wp('4%'),

    borderWidth: 1,

    borderColor: '#E0E0E0',

    fontSize: moderateScale(14),

    marginBottom: hp('1%'),
  },
  passwordContainer: {
  backgroundColor: '#fff',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#E0E0E0',
  paddingHorizontal: 14,
  flexDirection: 'row',
  alignItems: 'center',
},

passwordInput: {
  flex: 1,
  paddingVertical: 14,
},

  forgot: {
    textAlign: 'right',

    marginTop: hp('0.5%'),

    color: '#5A00D1',

    fontSize: moderateScale(12),
  },

  button: {
    backgroundColor: '#5A00D1',

    paddingVertical: hp('2%'),

    borderRadius: moderateScale(10),

    alignItems: 'center',

    marginTop: hp('3%'),
  },

  buttonText: {
    color: '#fff',

    fontWeight: '600',

    fontSize: moderateScale(15),
  },

  orRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: hp('3%'),
  },

  line: {
    flex: 1,

    height: 1,

    backgroundColor: '#ccc',
  },

  or: {
    marginHorizontal: wp('3%'),

    color: '#777',

    fontSize: moderateScale(13),
  },

  otpBtn: {
    borderWidth: 2,

    borderColor: '#5A00D1',

    paddingVertical: hp('2%'),

    borderRadius: moderateScale(10),

    alignItems: 'center',
  },

  otpText: {
    color: '#5A00D1',

    fontWeight: '600',

    fontSize: moderateScale(15),
  },

  registerText: {
    textAlign: 'center',

    marginTop: hp('3%'),

    color: '#555',

    fontSize: moderateScale(13),
  },

  link: {
    color: '#5A00D1',

    fontWeight: '600',
  },
});
