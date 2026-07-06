import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function FeatureGrid1() {
  const features = [
    { id: 1, icon: require('../../../../../assets/images/flash.png'), label: 'Instant\nTransfers'},
    { id: 2, icon: require('../../../../../assets/images/shield.png'), label: 'Secure &\nTrusted' },
    { id: 3, icon: require('../../../../../assets/images/wallet.png'), label: 'Easy Wallet\nAccess'},
  ];

  return (
    <View style={styles.container}>
      {features.map((item) => (
        <View key={item.id} style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30),
    marginTop: verticalScale(30),
    width: '100%',
  },
  featureItem: {
    alignItems: 'center',
    width: moderateScale(90),
  },
  iconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: '#F5F5FF',
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  icon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },
});