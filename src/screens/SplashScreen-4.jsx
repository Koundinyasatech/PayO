import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen4({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SplashScreen5');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#7B2FF7', '#00C6FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});