import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Onboarding3({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>PAYO</Text>

      <View style={styles.content}>
        <Text style={styles.title}>Earn with Every Referral</Text>
        <Text style={styles.desc}>
          Invite friends and grow your wallet easily.
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('RegisterMobile')}
        >
          <Text style={{ color: '#fff' }}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('Login')}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    fontSize: 22,
    color: '#5A00D1',
    fontWeight: '700',
    marginBottom: 80,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A00D1',
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  buttons: {
    position: 'absolute',
    bottom: 60,
    width: '80%',
  },
  register: {
    backgroundColor: '#0A7C2F',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  login: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
});