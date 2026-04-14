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

       <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                     <Text style={styles.back}>←</Text>
                  {/* <Text style={styles.back}>{'<'}</Text> */}
                    </TouchableOpacity>
                  
                    <Text style={styles.titleCentered}>
Login to Payo             </Text>
                  </View>

      {/* BACK */}
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

    
      <Text style={styles.title}>Login to Payo</Text> */}
      <Text style={styles.sub}>
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

  // back: {
  //   marginTop: 10,
  //   fontSize: 14,
  //   color: '#333',
  // },
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
    marginLeft: "10%", // balance arrow
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
  },

   sub: {
    textAlign: 'center',
    margin: 10,
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
    marginBottom:30
  },

  label: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
    fontWeight:700,
    padding:10,
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