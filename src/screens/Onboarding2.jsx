// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons'
// export default function Onboarding2({ navigation }) {
//   return (
//     <View style={styles.container}>

//       {/* <Text style={styles.logo}>PAYO</Text>

//       <View style={styles.content}>
//         <Text style={styles.title}>Instant QR Payments</Text>
//         <Text style={styles.desc}>
//           Scan QR code to send tokens instantly. Fast wallet transfers.
//         </Text>
//       </View> */}

//       <View style={styles.header}>
//         <Image source={require('../../assets/images/LogoContainer.png')} style={{ width: 120, height: 40 }} />
//         <TouchableOpacity style={styles.skipBtn} 
//         onPress={() => navigation.navigate('Onboarding3')}
//         >
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.content}>
//         <View style={styles.imageContainer}>
//           {/* <Text style={styles.icon}>�</Text> */}
//           {<Image source={require('..//../assets/images/onboardingScreen1.png')} style={{ width: 325, height: 230, paddingBottom:100 }}/>}

//         </View>
//         <Text style={styles.title}>Instant QR{'\n'}Payments</Text>
//         <Text style={styles.description}>
//           Scan a QR code to send tokens in seconds. Safe, secure, and    lightning -fast wallet-to-wallet transfers.
//         </Text>
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Onboarding3')}
//           activeOpacity={0.8}
//         >
//           <Image
//             source={require('../../assets/images/full_load.png')}
//             style={styles.nextImage}
//           />
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     margin: 20
//   },
//   // header: {
//   //   paddingHorizontal: 24,
//   //   paddingTop: 40,
//   //   flexDirection: 'row',
//   //   // justifyContent: 'space-between',
//   //   alignItems: 'center',
//   //   marginBottom: 32,
//   // },
//   // logo: {
//   //   fontSize: 18,
//   //   fontWeight: 'bold',
//   //   color: '#6C2BD9',
//   //   letterSpacing: 3,
//   //   fontFamily: 'serif',

//   // },
//   // skipBtn: {
//   //   paddingVertical: 6,
//   //   paddingHorizontal: 12,
//   // },
//   header: {
//     paddingHorizontal: 24,
//     marginTop: 10,
//     paddingTop: 40,
//     alignItems: 'center', // ✅ center PAYO
//     justifyContent: 'center',
//   },

//   logo: {

//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#6C2BD9',
//     letterSpacing: 3,
//     fontFamily: 'serif',
//   },

//   skipBtn: {
//     position: 'absolute', // ✅ take it out of flow
//     right: 24,
//     top: 40,
//   },
//   skipText: {
//     fontSize: 12,
//     color: '#0a0a0a',
//     fontWeight: '700',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imageContainer: {
//     width: 240,
//     height: 240,
//     borderRadius: 110,
//     // backgroundColor: '#F3E5FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 32,
//     // shadowColor: '#6C2BD9',
//     // shadowOffset: { width: 0, height: 4 },
//     // shadowOpacity: 0.1,
//     // shadowRadius: 12,
//     // elevation: 4,
//   },
//   icon: {
//     fontSize: 100,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#6C2BD9',
//     marginBottom: 16,
//     textAlign: 'center',
//     lineHeight: 34,
//     marginTop:30
//   },
//   description: {
//     fontSize: 17,
//         fontWeight:400,
//     lineHeight: 20,
//     textAlign: 'center',
//     marginBottom: 48,
//   },
//  footer: {
//   alignItems: 'center',
//   marginBottom: 40,
// },

// nextImage: {
//  width: 90,
//   height: 90,
//   resizeMode: 'contain',
// },

// });


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

export default function Onboarding2({ navigation }) {
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
          source={require('../../assets/images/onboardingScreen1.png')}
          style={styles.mainImage}
        />

        {/* TITLE */}
        <Text style={styles.title}>
          Instant QR{'\n'}Payments
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          Scan a QR code to send tokens in seconds.
          {'\n'}
          Safe, secure, and lightning-fast
          {'\n'}
          wallet-to-wallet transfers.
        </Text>

      </View>

      {/* FOOTER */}
      <View style={styles.footer}>

        {/* SKIP BUTTON */}
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => navigation.navigate('Onboarding4')}
          activeOpacity={0.8}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* NEXT BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding3')}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../assets/images/full_load.png')}
            style={styles.nextImage}
          />
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

  logo: {
    width: 110,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 40,
  },

  mainImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 35,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7B4DFF',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 18,
  },

  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 25,
  },

  footer: {
    position: 'absolute',
    bottom: 80,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  skipBtn: {
    backgroundColor: '#C9F0FF',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 14,
  },

  skipText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  nextImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});