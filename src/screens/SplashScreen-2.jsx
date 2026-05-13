import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen2({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SplashScreen3');
    }, 700);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7B2FF7', '#00C6FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.dot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});