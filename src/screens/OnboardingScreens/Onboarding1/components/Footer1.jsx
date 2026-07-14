// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
// import { moderateScale, verticalScale, windowWidth } from '../../../../utils/responsive';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export default function Footer1({ onSkip, onNext }) {
//   const insets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
    
//       <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + verticalScale(45) }]}>
        
//         {/* BOTTOM SKIP BUTTON */}
//         <TouchableOpacity onPress={onSkip} style={styles.bottomSkipBtn}>
//           {/* UPDATE BUTTON STYLES HERE: Bottom outlined Skip Button */}
//           <Text style={styles.bottomSkipText}>Skip</Text>
//         </TouchableOpacity>

//         {/* NEXT BUTTON */}
//         <TouchableOpacity onPress={onNext} style={styles.nextBtn}>
//            {/* UPDATE BUTTON STYLES HERE: Next Button (Blue Circle) */}
//            <View style={styles.nextIconContainer}>
//              <Image 
//                source={require('../../../../../assets/images/bluearrow.png')} 
//                style={styles.nextIcon} 
//              />
//            </View>
//         </TouchableOpacity>

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     width: windowWidth,
//     height: verticalScale(150),
//     justifyContent: 'flex-end',
//     zIndex: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(35),
//     paddingVertical: moderateScale(2),
//     zIndex: 2,
//   },
//   bottomSkipBtn: {
//     paddingVertical: moderateScale(10),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(25),
//     borderWidth: 1,
//     borderColor: '#CCC',
//     backgroundColor: 'transparent',
//   },
//   bottomSkipText: {
//     fontSize: moderateScale(15),
//     color: '#333',
//     fontWeight: '500',
//   },
//   nextBtn: {
//     // Adding a subtle shadow for the floating effect seen in design
//     shadowColor: '#2962FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
// //   nextIconContainer: {
// //     width: moderateScale(65),
// //     height: moderateScale(65),
// //     backgroundColor: '#2962FF',
// //     borderRadius: moderateScale(35),
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
//   nextIcon: {
//     width: moderateScale(70),
//     height: moderateScale(70),
//     resizeMode: 'contain',
//   },
// });



import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated } from 'react-native';
import { moderateScale, verticalScale, windowWidth } from '../../../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Footer1({ onSkip, onNext }) {
  const insets = useSafeAreaInsets();
  
  const bounceAnim = useRef(new Animated.Value(40)).current; 
  const opacityAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0,
        speed: 12,
        bounciness: 6, // Slightly less bouncy for the footer so it feels grounded
        useNativeDriver: true,
      }),
    ]).start();
  }, [bounceAnim, opacityAnim]);

  return (
    // Wrap the whole footer in an Animated.View
    <Animated.View 
      style={[
        styles.container, 
        { opacity: opacityAnim, transform: [{ translateY: bounceAnim }] }
      ]}
    >
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
    </Animated.View>
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
  nextIcon: {
    width: moderateScale(70),
    height: moderateScale(70),
    resizeMode: 'contain',
  },
});