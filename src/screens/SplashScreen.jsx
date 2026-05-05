import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {

  const [showLogo, setShowLogo] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // 1️⃣ Violet screen for 2 seconds
    const violetTimer = setTimeout(() => {
      setShowLogo(true);

      // start logo animation
      Animated.timing(slideAnim, {
        toValue: 140,
        duration: 1000,
        useNativeDriver: true,
      }).start();

    }, 2000);

    // 2️⃣ After total 5 seconds go to Welcome
    const navTimer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 5000);

    return () => {
      clearTimeout(violetTimer);
      clearTimeout(navTimer);
    };

  }, []);

  return (
    <View style={styles.container}>

      {/* Violet Screen */}
      {!showLogo && (
        <View style={styles.violetScreen} />
      )}

      {/* Logo Screen */}
      {showLogo && (
        <Animated.Image
          source={require('../../assets/images/payoLogo.png')}
          style={[
            styles.logoImage,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        />
      )}

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

  violetScreen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#6C2BD9',
  },

  logoImage: {
    width: width * 1.1,
    height: width * 1.2,
    resizeMode: 'contain',
  },

});