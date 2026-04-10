import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1'); // 👈 auto navigation
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 36,
    color: '#5A00D1',
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: 'serif',
  },
});