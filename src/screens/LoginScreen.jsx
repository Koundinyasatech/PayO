import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>Login to Payo</Text>
      <Text style={styles.subtitle}>
        Welcome back! Please enter your details.
      </Text>

      {/* EMAIL */}
      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.input}
        placeholder="your@email.com"
        value={email}
        onChangeText={setEmail}
      />

      {/* PASSWORD */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* FORGOT PASSWORD */}
      <Text style={styles.forgot}>Forgot Password?</Text>

      {/* SUBMIT BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* OR LINE */}
      <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.or}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* OTP LOGIN */}
      <TouchableOpacity style={styles.otpBtn}>
        <Text style={styles.otpText}>Login with OTP</Text>
      </TouchableOpacity>

      {/* REGISTER */}
      <Text style={styles.registerText}>
        Don’t have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('RegisterMobile')}
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
  },

  back: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
  },

  subtitle: {
    color: '#777',
    marginBottom: 20,
  },

  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 13,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
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