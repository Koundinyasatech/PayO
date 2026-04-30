import React, { useEffect } from 'react';
import { Image } from 'react-native';
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
      <Image
        source={require('../../assets/images/welcome.png')}
        style={styles.image}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 36,
    color: '#4E00C2',
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: 'Limelight',
  },
  image:{
    width:200,
    height:80,
    resizeMode:'contain'

  }
});
