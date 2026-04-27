import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';



export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>

      {/* <Text style={styles.logo}>PAYO</Text>

      <View style={styles.content}>
        <Text style={styles.title}>Your Digital Wallet, Simplified</Text>
        <Text style={styles.desc}>
          Store, send & receive PAYO tokens instantly. No bank account needed.
        </Text>
      </View> */}

       <View style={styles.header}>
        <Text style={styles.logo}>PAYO</Text>
        <TouchableOpacity style={styles.skipBtn} 
        onPress={() => navigation.navigate('Onboarding3')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

       <View style={styles.content}>
        <View style={styles.imageContainer}>
          {<Image source={require('..//../assets/images/wallet.png')} style={{ width: 215, height: 200 }} />}
          
        </View>
        <Text style={styles.title}>Your Digital{'\n'}Wallet, Simplified</Text>
        <Text style={styles.description}>
          Store, send &amp; receive Payo tokens instantly. No bank account needed - just your mobile number!
        </Text>
      </View>

 <View style={styles.footer}>
      <TouchableOpacity
      style={styles.nextBtn}
        onPress={() => navigation.navigate('Onboarding2')}
      >
        <Text style={styles.nextBtnText}>→</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    margin:20
  },
   header: {
  paddingHorizontal: 24,
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

skipBtn: {
  position: 'absolute', // ✅ take it out of flow
  right: 24,
  top: 40,
},
  skipText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
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
  icon: {
    fontSize: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C2BD9',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 34,
  },
  description: {
    fontSize: 17,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 48,
  },
  footer: {
    width: '100%',
    height: 150,
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
   
  },

//   wrapper: {
//   width: 100,
//   height: 100,
//   alignItems: 'center',
//   justifyContent: 'center',
// },

// arc: {
//   position: 'absolute',
//   width: 100,
//   height: 100,
//   borderRadius: 50,
//   borderWidth: 3,
//   borderColor: '#6C2BD9',

//   // hide parts to create arc
//   borderTopColor: '#6C2BD9',
//   borderRightColor: '#6C2BD9',
//   borderBottomColor: 'transparent',
//   borderLeftColor: 'transparent',

//   transform: [{ rotate: '40deg' }],
// },

// nextBtn: {
//   width: 80,
//   height: 80,
//   borderRadius: 40,
//   backgroundColor: '#fff',
//   alignItems: 'center',
//   justifyContent: 'center',
//   elevation: 5,
// },
  nextBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#6C2BD9',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#6C2BD9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextBtnText: {
    paddingBottom: 0,
    fontSize: 45,
    color: '#6C2BD9',
    fontWeight: '900',
  },
});