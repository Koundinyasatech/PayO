// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//  SafeAreaView,
//   StatusBar,
// } from 'react-native';

// export default function Onboarding3({ navigation }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#F4F7F5" barStyle="dark-content" />

//       <View style={styles.content}>

//         {/* LOGO */}
//         <Image
//           source={require('../../assets/images/LogoContainer.png')}
//           style={styles.logo}
//         />

//         {/* MAIN IMAGE */}
//         <Image
//           source={require('../../assets/images/onboardingScreen3.png')}
//           style={styles.mainImage}
//         />

//         {/* TITLE */}
//         <Text style={styles.title}>
//           Earn with Every{'\n'}Referral
//         </Text>

//         {/* DESCRIPTION */}
//         <Text style={styles.description}>
//           Invite friends and earn PAYO tokens
//           {'\n'}
//           when they join and transact. Grow
//           {'\n'}
//           your network, Grow your wallet.
//         </Text>

//       </View>

//       {/* FOOTER */}
//       <View style={styles.footer}>

//         {/* SKIP BUTTON */}
//         <TouchableOpacity
//           style={styles.skipBtn}
//           onPress={() => navigation.navigate('Onboarding4')}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>

//         {/* NEXT BUTTON */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Onboarding4')}
//           activeOpacity={0.8}
//         >
//           <Image
//             source={require('../../assets/images/full_load.png')}
//             style={styles.nextImage}
//           />
//         </TouchableOpacity>

//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F7F5', // figma background
//   },

//   content: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 45,
//   },

//   logo: {
//     width: 145,
//     height: 45,
//     resizeMode: 'contain',
//     marginBottom: 55,
//   },

//   mainImage: {
//     width: 320,
//     height: 300,
//     resizeMode: 'contain',
//     marginBottom: 40,
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#7B4DFF',
//     textAlign: 'center',
//     lineHeight: 42,
//     marginBottom: 24,
//   },

//   description: {
//     fontSize: 17,
//     color: '#444',
//     textAlign: 'center',
//     lineHeight: 32,
//     paddingHorizontal: 30,
//     fontWeight: '400',
//   },

//   footer: {
//     position: 'absolute',
//     bottom: 70,
//     left: 35,
//     right: 35,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   skipBtn: {
//     backgroundColor: '#C9F0FF',
//     paddingHorizontal: 22,
//     paddingVertical: 10,
//     borderRadius: 14,
//   },

//   skipText: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#000',
//   },

//   nextImage: {
//     width: 85,
//     height: 85,
//     resizeMode: 'contain',
//   },
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

export default function Onboarding3({ navigation }) {
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
          source={require('../../assets/images/onboardingScreen3.png')}
          style={styles.mainImage}
        />

        {/* TITLE */}
        <Text style={styles.title}>
          Earn with Every{'\n'}Referral
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          Invite friends and earn PAYO tokens
          {'\n'}
          when they join and transact. Grow
          {'\n'}
          your network, Grow your wallet.
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
          onPress={() => navigation.navigate('Onboarding4')}
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
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  nextImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});