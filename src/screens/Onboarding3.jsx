import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Onboarding3({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('../../assets/images/LogoContainer.png')} style={{ width: 120, height: 40 }} />
      </View>

      <View style={styles.content}>
         <View style={styles.imageContainer}>
                  {<Image source={require('..//../assets/images/onboardingScreen3.png')} style={{ width: 325, height: 230, paddingBottom:100 }} />}
                  
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C2BD9',
    marginBottom: 16,
    textAlign: 'center',
    marginTop:30
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight:400
  },
registerBtn: {
  backgroundColor: '#4E00C2',
  borderRadius: 8,
  paddingVertical: 12,   // reduced from 20
  alignItems: 'center',
},

loginBtn: {
  borderWidth: 2,
  borderColor: '#4E00C2',
  borderRadius: 8,
  paddingVertical: 12,   // reduced from 18
  alignItems: 'center',
},

btnText: {
  fontSize: 16,   // slightly smaller
  fontWeight: '600',
  color: '#fff',
},

loginBtnText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#4E00C2',
},

buttonContainer: {
  gap: 12,
},
});