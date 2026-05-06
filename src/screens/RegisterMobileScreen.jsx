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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../api/axios';

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
        response = await api.post('/api/auth/send-login-otp', { mobile });
      } else {
        response = await api.post('/api/auth/send-otp', { mobile });
      }

      if (response.data?.message === "OTP sent") {
        navigation.navigate('OTP', { mobile, mode });
      } else {
        Alert.alert('Error', response.data?.message || 'Something went wrong');
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
    <View style={styles.root}>

      {/* TOP PURPLE AREA */}
      <SafeAreaView style={styles.safeTop} />

      {/* MAIN CONTENT */}
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            Enter Your Mobile Number
          </Text>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.desc}>
          We will send a one time code to verify your number.
          Standard rates may apply.
        </Text>

        {/* LABEL */}
        <Text style={styles.label}>Mobile Number</Text>

        {/* 🔥 SEPARATE BOXES */}
        <View style={styles.phoneRow}>

          {/* +91 BOX */}
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>+91</Text>
          </View>

          {/* MOBILE INPUT */}
          <TextInput
            style={styles.mobileInput}
            placeholder="9876543210"
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
          <Text style={styles.link}>Terms of Service</Text> &{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          disabled={!isValidMobile || loading}
          onPress={handleSendOTP}
        >
          <LinearGradient
            colors={
              isValidMobile
                ? ["#6A00F4", "#4B00B5"]
                : ["#ccc", "#ccc"]
            }
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* LOGIN */}
        <Text style={styles.loginText}>
          Already have an account ?{" "}
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
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>

      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: "#5A00D1",
  },

  safeTop: {
    backgroundColor: "#5A00D1",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 25,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  back: {
    fontSize: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },

  desc: {
    color: "#666",
    fontSize: 13,
    marginBottom: 20,
    lineHeight: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  /* 🔥 NEW INPUT STRUCTURE */
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  codeBox: {
    width: 70,
    height: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  codeText: {
    fontWeight: "600",
    fontSize: 14,
  },

  mobileInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },

  terms: {
    fontSize: 11,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },

  link: {
    color: "#6A00F4",
    fontWeight: "500",
  },

  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#555",
  },

  bottomText: {
    textAlign: "center",
    fontSize: 11,
    color: "#777",
    marginTop: 5,
  },

});