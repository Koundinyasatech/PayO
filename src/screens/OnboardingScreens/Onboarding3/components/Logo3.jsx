import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Logo3() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/images/LogoContainer.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: verticalScale(30), // Increased since Header is gone
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(40),
    resizeMode: 'contain',
  },
});