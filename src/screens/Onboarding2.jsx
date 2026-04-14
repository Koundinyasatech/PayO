import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';




export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>

      {/* <Text style={styles.logo}>PAYO</Text>

      <View style={styles.content}>
        <Text style={styles.title}>Instant QR Payments</Text>
        <Text style={styles.desc}>
          Scan QR code to send tokens instantly. Fast wallet transfers.
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
          {/* <Text style={styles.icon}>�</Text> */}
          {<Image source={require('..//../assets/images/work_flow.png')} style={{ width: 215, height: 200 }} />}

        </View>
        <Text style={styles.title}>Instant QR{'\n'}Payments</Text>
        <Text style={styles.description}>
          Scan a QR code to send tokens in seconds. Safe, secure and lightning -fast wallet-to-wallet transfers.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn}
          onPress={() => navigation.navigate('Onboarding3')}
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
    margin: 20
  },
  // header: {
  //   paddingHorizontal: 24,
  //   paddingTop: 40,
  //   flexDirection: 'row',
  //   // justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 32,
  // },
  // logo: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#6C2BD9',
  //   letterSpacing: 3,
  //   fontFamily: 'serif',

  // },
  // skipBtn: {
  //   paddingVertical: 6,
  //   paddingHorizontal: 12,
  // },
  header: {
    paddingHorizontal: 24,
    marginTop: 10,
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