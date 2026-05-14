

import React from 'react';
import {
  View,
  Text,
 StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.content}>

        {/* LOGO */}
        <Image
          source={require('../../assets/images/LogoContainer.png')}
          style={styles.logo}
        />

        {/* MAIN IMAGE */}
        <Image
          source={require('../../assets/images/onboarding4.png')}
          style={styles.mainImage}
        />

        {/* TITLE */}
        <Text style={styles.title}>Welcome!</Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          Scan. Pay. Earn Payo.
        </Text>

      </View>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>

        {/* REGISTER */}
        <TouchableOpacity
          style={styles.registerBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('RegisterMobile')}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* LOGIN */}
        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },

  /* LOGO */
  logo: {
    width: 110,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 40,
  },

  /* MAIN IMAGE */
  mainImage: {
    width: 285,
    height: 285,
    resizeMode: 'contain',
    marginBottom: 45,
  },

  /* TITLE */
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7B4DFF',
    marginBottom: 12,
    textAlign: 'center',
  },

  /* DESCRIPTION */
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 26,
  },

  /* BUTTON CONTAINER */
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
  },

  /* REGISTER BUTTON */
  registerBtn: {
    backgroundColor: '#6200EE',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  registerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },

  /* LOGIN BUTTON */
  loginBtn: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#7B4DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#6200EE',
    fontSize: 22,
    fontWeight: '600',
  },
});