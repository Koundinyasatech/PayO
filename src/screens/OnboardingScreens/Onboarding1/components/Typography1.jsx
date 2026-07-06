import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Typography1() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleBlack}>Your Digital Wallet,</Text>
      <Text style={styles.titleBlue}>Simplified</Text>
      
      <Text style={styles.description}>
        Store, send & receive Payo tokens {'\n'}
        instantly. No bank account needed – {'\n'}
        just your phone.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(30),
    marginTop: verticalScale(0),
  },
  titleBlack: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },
  titleBlue: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#2962FF', // Match brand blue
    textAlign: 'center',
    marginBottom: verticalScale(15),
  },
  description: {
    fontSize: moderateScale(15),
    color: '#555555',
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
});