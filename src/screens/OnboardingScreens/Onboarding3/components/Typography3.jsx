// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { moderateScale, verticalScale } from '../../../../utils/responsive';

// export default function Typography3() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleBlack}>Welcome!</Text>
      
//       <Text style={styles.titleRow}>
//         <Text style={styles.titlePurple}>Scan. </Text>
//         <Text style={styles.titleBlue}>Pay. Earn Payo.</Text>
//       </Text>
      
//       <Text style={styles.description}>
//         Join millions who trust PAYO for fast,{'\n'}
//         secure, and rewarding digital payments.
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(30),
//     marginTop: verticalScale(0),
//   },
//   titleBlack: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#000000',
//     textAlign: 'center',
//   },
//   titleRow: {
//     textAlign: 'center',
//     marginBottom: verticalScale(15),
//     marginTop: verticalScale(5),
//   },
//   titlePurple: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#8A2BE2', // Purple shade from design
//   },
//   titleBlue: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#2962FF', // Brand blue
//   },
//   description: {
//     fontSize: moderateScale(15),
//     color: '#555555',
//     textAlign: 'center',
//     lineHeight: moderateScale(18),
//   },
// });



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

// 🚨 Added props here
export default function Typography3({ title, subtitlePurple, subtitleBlue, description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleBlack}>{title}</Text>
      
      <Text style={styles.titleRow}>
        <Text style={styles.titlePurple}>{subtitlePurple}</Text>
        <Text style={styles.titleBlue}>{subtitleBlue}</Text>
      </Text>
      
      <Text style={styles.description}>
        {description}
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
  titleRow: {
    textAlign: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(5),
  },
  titlePurple: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#8A2BE2', // Purple shade from design
  },
  titleBlue: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#2962FF', // Brand blue
  },
  description: {
    fontSize: moderateScale(15),
    color: '#555555',
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
});
