import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function SplashScreen6({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/payo_Text.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020814',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 280,
    height: 140,
  },
});