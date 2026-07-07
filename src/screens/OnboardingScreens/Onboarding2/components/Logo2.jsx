import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Logo2({ animatedStyle }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/images/LogoContainer.png')} 
        style={[styles.logo, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(40),
    resizeMode: 'contain',
  },
});