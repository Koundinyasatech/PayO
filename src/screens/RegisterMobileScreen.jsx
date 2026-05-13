import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function RegisterMobileScreen({ navigation, route }) {

  const { mode = 'register' } = route.params || {};

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidMobile = mobile?.length === 10;

  const handleSendOTP = async () => {

    if (!mobile || mobile.length !== 10) {
      Alert.alert('Error', 'Enter valid mobile number');
      return;
    }

    try {

      setLoading(true);

      let response;

      if (mode === 'login') {
        response = await api.post('/api/auth/send-login-otp', {
          mobile,
        });
      } else {
        response = await api.post('/api/auth/send-otp', {
          mobile,
        });
      }

      if (response.data?.message === 'OTP sent') {

        navigation.navigate('OTP', {
          mobile,
          mode,
        });

      } else {

        Alert.alert(
          'Error',
          response.data?.message || 'Something went wrong'
        );
      }

    } catch (error) {

      Alert.alert(
        'Error',
        error.response?.data?.message || error.message
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F5F5"
      />

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>

          <Text style={styles.titleCentered}>
            {mode === 'login'
              ? 'Login with Mobile'
              : 'Enter Your Mobile Number'}
          </Text>

        </View>

        {/* DESCRIPTION */}
        <Text style={styles.desc}>
          We will send a one time code to verify your number.
          Standard rates may apply.
        </Text>

        {/* LABEL */}
        <Text style={styles.label}>
          Mobile Number
        </Text>

        {/* PHONE ROW */}
        <View style={styles.phoneRow}>

          {/* COUNTRY CODE */}
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>+91</Text>
          </View>

          {/* MOBILE INPUT */}
          <TextInput
            style={styles.mobileInput}
            placeholder="9876543210"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={mobile}
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, '');
              setMobile(numeric);
            }}
            maxLength={10}
          />

        </View>

        {/* TERMS */}
        <Text style={styles.terms}>
          By continuing you agree to PAYO’s{" "}
          <Text style={styles.link}>
            Terms of Service
          </Text>{" "}
          &{" "}
          <Text style={styles.link}>
            Privacy Policy
          </Text>
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          disabled={!isValidMobile || loading}
          onPress={handleSendOTP}
        >

          <LinearGradient
            colors={
              isValidMobile
                ? ['#6A00F4', '#4B00B5']
                : ['#ccc', '#ccc']
            }
            style={styles.button}
          >

            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                Send OTP
              </Text>
            )}

          </LinearGradient>

        </TouchableOpacity>

        {/* LOGIN */}
        <Text style={styles.loginText}>
          Already have an account?{" "}

          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>

        </Text>

        {/* BOTTOM TEXT */}
        <Text style={styles.bottomText}>
          By Continuing, you agree to our{" "}

          <Text style={styles.link}>
            Privacy Policy
          </Text>

        </Text>

      </View>

    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  container: {
    flex: 1,

    paddingHorizontal: wp('5%'),

    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight || 0) + hp('1%')
        : hp('2%'),

    paddingBottom: hp('3%'),

    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: hp('2%'),
  },

  titleCentered: {
    flex: 1,

    textAlign: 'center',

    fontSize: moderateScale(18),

    fontWeight: '700',

    color: '#000',

    marginRight: wp('6%'),
  },

  desc: {
    color: '#666',

    fontSize: moderateScale(13),

    marginBottom: hp('2.5%'),

    lineHeight: moderateScale(20),
  },

  label: {
    fontSize: moderateScale(14),

    fontWeight: '700',

    marginBottom: hp('1%'),

    color: '#222',
  },

  phoneRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: hp('2%'),
  },

  codeBox: {
    width: wp('18%'),

    height: hp('6.5%'),

    backgroundColor: '#F2F2F2',

    borderRadius: moderateScale(12),

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: wp('3%'),
  },

  codeText: {
    fontSize: moderateScale(14),

    fontWeight: '600',

    color: '#000',
  },

  mobileInput: {
    flex: 1,

    height: hp('6.5%'),

    borderWidth: 1,

    borderColor: '#E0E0E0',

    borderRadius: moderateScale(12),

    paddingHorizontal: wp('4%'),

    backgroundColor: '#fff',

    fontSize: moderateScale(14),

    color: '#000',
  },

  terms: {
    fontSize: moderateScale(11),

    color: '#666',

    marginBottom: hp('3%'),

    lineHeight: moderateScale(18),
  },

  link: {
    color: '#6A00F4',

    fontWeight: '600',
  },

  button: {
    paddingVertical: hp('2%'),

    borderRadius: moderateScale(12),

    alignItems: 'center',

    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',

    fontSize: moderateScale(15),

    fontWeight: '600',
  },

  loginText: {
    textAlign: 'center',

    marginTop: hp('3%'),

    fontSize: moderateScale(13),

    color: '#555',
  },

  bottomText: {
    textAlign: 'center',

    marginTop: hp('1%'),

    fontSize: moderateScale(11),

    color: '#777',

    lineHeight: moderateScale(16),
  },

});