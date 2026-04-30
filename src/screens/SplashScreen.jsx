// import React, { useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';

// export default function SplashScreen({ navigation }) {

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('Animation');
//     }, 5000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [navigation]);

//   return <View style={styles.container} />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4E00C2',
//   },
// });

// src/screens/SplashScreen.jsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Move logo from center to bottom
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/payoLogo.png')}
        style={[
          styles.logoImage,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C2BD9',
    justifyContent: 'center',
    alignItems: 'center',
  },

logoImage: {
  width: width * 1.1,
  height: width * 1.1,
  resizeMode: 'contain',
}
});