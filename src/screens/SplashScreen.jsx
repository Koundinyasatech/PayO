import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Animation');
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A00D1',
  },
});