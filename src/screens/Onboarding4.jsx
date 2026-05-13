// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// export default function Onboarding4({ navigation }) {
//   return (
//     <View style={styles.container}>

//       <View style={styles.header}>
//         <Image source={require('../../assets/images/LogoContainer.png')} style={{ width: 120, height: 40 }} />
//       </View>

//       <View style={styles.content}>
//          <View style={styles.imageContainer}>
//                   {<Image source={require('..//../assets/images/onboardingScreen3.png')} style={{ width: 325, height: 230, paddingBottom:100 }} />}
                  
//                 </View>
//         <Text style={styles.title}>Earn with Every Referral</Text>
//         <Text style={styles.description}>
//           Invite friends and earn PAYO tokens when they join and transact. Grow your network, Grow your wallet.
//         </Text>
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.registerBtn}
//           onPress={() => navigation.navigate('RegisterMobile')}
//         >
//           <Text style={styles.btnText}>Register</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.loginBtn}
//           onPress={() => navigation.navigate('Login')}
//         >
//           <Text  style={styles.loginBtnText}>Login</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
  
//     marginTop:20,
//     marginBottom:50,
//     marginLeft:50,
//     marginRight:50

    
    
//   },
//   header: {
//   //  paddingHorizontal: 24,
//     marginTop:10,
//   paddingTop: 40,
//   alignItems: 'center', // ✅ center PAYO
//   justifyContent: 'center',
//   },
//   logo: {
//     fontSize: 22,
//   fontWeight: 'bold',
//   color: '#6C2BD9',
//   letterSpacing: 3,
//   fontFamily: 'serif',
//   },
//    content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imageContainer: {
//     width: 240,
//     height: 240,
//     borderRadius: 110,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 32,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#6C2BD9',
//     marginBottom: 16,
//     textAlign: 'center',
//     marginTop:30
//   },
//   description: {
//     fontSize: 17,
//     textAlign: 'center',
//     lineHeight: 20,
//     fontWeight:400
//   },
// registerBtn: {
//   backgroundColor: '#008431',
//   borderRadius: 8,
//   paddingVertical: 12,   // reduced from 20
//   alignItems: 'center',
// },

// loginBtn: {
//   borderWidth: 2,
//   borderColor: '#21793E',
//   borderRadius: 8,
//   paddingVertical: 12,   // reduced from 18
//   alignItems: 'center',
// },

// btnText: {
//   fontSize: 16,   // slightly smaller
//   fontWeight: '600',
//   color: '#fff',
// },

// loginBtnText: {
//   fontSize: 16,
//   fontWeight: '600',
//   color: '#21793E',
// },

// buttonContainer: {
//   gap: 12,
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

export default function Onboarding4({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F4F7F5" barStyle="dark-content" />

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

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate('RegisterMobile')}
          activeOpacity={0.8}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
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
    backgroundColor: '#F4F7F5',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 45,
  },

  logo: {
    width: 145,
    height: 45,
    resizeMode: 'contain',
    marginBottom: 55,
  },

  mainImage: {
    width: 340,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 45,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#7B4DFF',
    marginBottom: 30,
    textAlign: 'center',
  },

  description: {
    fontSize: 20,
    color: '#444',
    textAlign: 'center',
    fontWeight: '400',
  },

  buttonContainer: {
    paddingHorizontal: 12,
    paddingBottom: 35,
    gap: 18,
  },

  registerBtn: {
    backgroundColor: '#5B00D6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  registerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },

  loginBtn: {
    borderWidth: 1.5,
    borderColor: '#6C2BD9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  loginText: {
    color: '#5B00D6',
    fontSize: 20,
    fontWeight: '500',
  },
});