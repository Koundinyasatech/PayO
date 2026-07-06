import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { moderateScale, verticalScale, windowWidth } from '../../../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Footer2({ onSkip, onNext }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + verticalScale(45) }]}>
        
        {/* BOTTOM SKIP BUTTON */}
        <TouchableOpacity onPress={onSkip} style={styles.bottomSkipBtn}>
          <Text style={styles.bottomSkipText}>Skip</Text>
        </TouchableOpacity>

        {/* NEXT BUTTON */}
        <TouchableOpacity onPress={onNext} style={styles.nextBtn}>
           <View style={styles.nextIconContainer}>
             <Image 
               source={require('../../../../../assets/images/bluearrow.png')} 
               style={styles.nextIcon} 
             />
           </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: verticalScale(150),
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(2),
    zIndex: 2,
  },
  bottomSkipBtn: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: 'transparent',
  },
  bottomSkipText: {
    fontSize: moderateScale(15),
    color: '#333',
    fontWeight: '500',
  },
  nextBtn: {
    shadowColor: '#2962FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  // If bluearrow.png is just the white arrow, you need this container to make the blue circle. 
  // If bluearrow.png is ALREADY a blue circle, you can remove this background color.
  // nextIconContainer: {
  //   width: moderateScale(65),
  //   height: moderateScale(65),
  //   backgroundColor: '#2962FF', // Remove this if your bluearrow.png includes the blue circle
  //   borderRadius: moderateScale(35),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  nextIcon: {
    width: moderateScale(70), // Adjust if you are using the full blue circle image
    height: moderateScale(70),
    resizeMode: 'contain',
  },
});