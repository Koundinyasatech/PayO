import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Onboarding3({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.logo}>PAYO</Text>
      </View>

      <View style={styles.content}>
         <View style={styles.imageContainer}>
                  {<Image source={require('..//../assets/images/wallet.png')} style={{ width: 215, height: 200 }} />}
                  
                </View>
        <Text style={styles.title}>Earn with Every Referral</Text>
        <Text style={styles.description}>
          Invite friends and earn PAYO tokens when they join and transact. Grow your network, Grow your wallet.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate('RegisterMobile')}
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text  style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  
    marginTop:20,
    marginBottom:50,
    marginLeft:50,
    marginRight:50

    
    
  },
  header: {
  //  paddingHorizontal: 24,
    marginTop:10,
  paddingTop: 40,
  alignItems: 'center', // ✅ center PAYO
  justifyContent: 'center',
  },
  logo: {
    fontSize: 22,
  fontWeight: 'bold',
  color: '#6C2BD9',
  letterSpacing: 3,
  fontFamily: 'serif',
  },
   content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 240,
    height: 240,
    borderRadius: 110,
    // backgroundColor: '#F3E5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    // shadowColor: '#6C2BD9',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 12,
    // elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C2BD9',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  registerBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
  },
  loginBtn: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});