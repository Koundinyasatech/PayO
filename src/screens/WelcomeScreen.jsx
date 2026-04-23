import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2D0A7B',
    letterSpacing: -1,
  },
});

export default function WelcomeScreen({ navigate }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('on1');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
    </View>
  );
}
