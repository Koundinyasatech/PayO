import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

export default function SplashScreen1({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SplashScreen2');
    }, 800);
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});