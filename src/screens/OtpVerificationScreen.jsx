import React, { useState, useEffect, useRef } from 'react';
 
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
 
import { moderateScale } from 'react-native-size-matters';
 
import api from '../api/axios';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';
 
export default function OtpVerificationScreen({ route, navigation }) {
 
  const { mobile, mode = 'register' } = route.params;
 
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const inputs = useRef([]);
 
  useEffect(() => {
    startTimer();
  }, []);
 
  const startTimer = () => {
    setTimer(30);
 
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
 
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
 
    if (error) setError('');
 
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };
 
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };
 
  const saveToken = async (token) => {
    try {
      await Keychain.setGenericPassword('user', token);
    } catch (e) {
      console.log("Token save error:", e);
    }
  };
 
  const handleVerifyOTP = async () => {
 
    const finalOtp = otp.join('');
 
    if (finalOtp.length < 4) {
      setError('Enter valid OTP');
      return;
    }
 
    try {
      setLoading(true);
      setError('');
 
      let response;
 
      if (mode === 'login') {
        response = await api.post('/api/auth/verify-login-otp', {
          mobile,
          otp: finalOtp
        });
      } else {
        response = await api.post('/api/auth/verify-otp', {
          mobile,
          otp: finalOtp
        });
      }
 
      if (response.data.token) {
 
        await saveToken(response.data.token);
 
        if (mode === 'login') {
          navigation.replace('Main');
        } else {
          navigation.replace('Profile');
        }
 
      } else {
        setError('Invalid OTP');
      }
 
    } catch (error) {
      console.log("VERIFY ERROR:", error?.response?.data || error.message);
      setError(error?.response?.data?.message || 'Enter valid OTP');
    } finally {
      setLoading(false);
    }
  };
 
  const handleResendOTP = async () => {
    setError('');
    setOtp(['', '', '', '']);
 
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
 
    try {
 
      if (mode === 'login') {
        await api.post('/api/auth/login-otp', { mobile });
      } else {
        await api.post('/api/auth/send-otp', { mobile });
      }
 
      startTimer();
 
    } catch (error) {
      console.log("RESEND ERROR:", error);
      setError('Resend failed');
    }
  };
 
  return (
    <View style={styles.container}>
 
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>
            <Icon name="chevron-left" size={28} color="#000" />
          </Text>
        </TouchableOpacity>
 
        <Text style={styles.titleCentered}>
          Verify Your Number
        </Text>
      </View>
 
      {/* SUBTEXT */}
      <Text style={styles.sub}>
        Enter the 4 digit code sent to +91 {mobile}
      </Text>
 
      {/* OTP BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.box}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
 
      {/* ERROR */}
      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
 
      {/* TIMER */}
      <Text style={styles.timer}>
        Code expires in : 00:{timer < 10 ? `0${timer}` : timer}
      </Text>
 
      {/* RESEND */}
      <Text style={styles.resend}>
        Didn’t receive code?{' '}
        <Text style={styles.link} onPress={handleResendOTP}>
          Resend Code
        </Text>
      </Text>
 
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
 
      {/* LOGIN / REGISTER */}
      {mode === 'login' ? (
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate('RegisterMobile', {
                mode: 'register',
              })
            }
          >
            Register
          </Text>
        </Text>
      ) : (
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>
      )}
 
      {/* FOOTER */}
      <Text style={styles.footer}>
        By Continuing, you agree to our{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
 
    </View>
  );
}
 
/* ================= STYLES ================= */
 
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
 
    backgroundColor: '#F3F3F3',
 
    paddingHorizontal: wp('5%'),
 
    paddingBottom: hp('3%'),
 
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + hp('1%')
        : hp('2%'),
  },
 
  header: {
    flexDirection: 'row',
 
    alignItems: 'center',
 
    marginTop: hp('1%'),
 
    marginBottom: hp('3%'),
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
 
    marginTop: hp('2%'),
 
    color: '#666',
 
    fontSize: moderateScale(13),
 
    lineHeight: moderateScale(20),
 
    paddingHorizontal: wp('5%'),
  },
 
  otpContainer: {
    flexDirection: 'row',
 
    justifyContent: 'center',
 
    marginTop: hp('4%'),
  },
 
  box: {
    width: wp('14%'),
 
    height: hp('7%'),
 
    borderWidth: 1,
 
    borderColor: '#DADADA',
 
    marginHorizontal: wp('1.5%'),
 
    textAlign: 'center',
 
    fontSize: moderateScale(20),
 
    borderRadius: moderateScale(12),
 
    backgroundColor: '#fff',
 
    color: '#000',
  },
 
  errorText: {
    color: 'red',
 
    textAlign: 'center',
 
    marginTop: hp('1.5%'),
 
    fontSize: moderateScale(12),
  },
 
  timer: {
    marginTop: hp('3%'),
 
    textAlign: 'center',
 
    fontSize: moderateScale(13),
 
    color: '#444',
  },
 
  resend: {
    marginTop: hp('1.5%'),
 
    textAlign: 'center',
 
    fontSize: moderateScale(13),
 
    color: '#555',
  },
 
  link: {
    color: '#5A00D1',
 
    fontWeight: '600',
  },
 
  button: {
    backgroundColor: '#5A00D1',
 
    paddingVertical: hp('2%'),
 
    borderRadius: moderateScale(12),
 
    marginTop: hp('4%'),
 
    alignItems: 'center',
  },
 
  buttonText: {
    color: '#fff',
 
    fontSize: moderateScale(15),
 
    fontWeight: '600',
  },
 
  loginText: {
    marginTop: hp('3%'),
 
    textAlign: 'center',
 
    fontSize: moderateScale(13),
 
    color: '#555',
  },
 
  registerText: {
    textAlign: 'center',
 
    marginTop: hp('3%'),
 
    color: '#555',
 
    fontSize: moderateScale(13),
  },
 
  footer: {
    marginTop: hp('1.5%'),
 
    textAlign: 'center',
 
    color: '#555',
 
    fontSize: moderateScale(12),
 
    lineHeight: moderateScale(18),
  },
});
 