import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen5({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SplashScreen6');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#7B2FF7', '#00C6FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require('../../assets/images/payo_Text.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 260,
    height: 120,
  },
});