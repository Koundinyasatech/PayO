import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { verticalScale, windowWidth } from '../../../../utils/responsive';

export default function HeroIllustration3() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.04, 
          duration: 2500, 
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../../../assets/images/ob3.png')} 
        style={[
          styles.mainIllustration,
          { transform: [{ scale: scaleAnim }] } 
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(260),
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  mainIllustration: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    zIndex: 1,
  },
});