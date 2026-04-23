// src/screens/SplashScreen.jsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C2BD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    marginBottom: 16,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6C2BD9',
    letterSpacing: 0,
    fontFamily: 'serif',
  },
  verticalLine: {
    width: 2,
    height: 80,
    backgroundColor: '#fff',
    marginVertical: 8,
    opacity: 0.9,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default function SplashScreen({ navigate, timeout }) {
  const slideAnim = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      speed: 8,
      bounciness: 12,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!timeout) {
      navigate('welcome');
    }
  }, [timeout, navigate]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.whiteCircle}>
          <Text style={styles.logo}>PAYO</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.dot} />
      </Animated.View>
    </View>
  );
}