// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#120022',
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 28,
//     paddingTop: 20,
//     backgroundColor: '#120022',
//     alignItems: 'center',
//   },

//   header: {
//     width: '100%',
//     marginBottom: 40,
//   },

//   iconWrapper: {
//     marginTop: 40,
//     alignItems: 'center',
//   },

//   successCircle: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   title: {
//     color: '#00FFD1',
//     fontSize: 34,
//     fontWeight: '600',
//     marginTop: 40,
//     textAlign: 'center',
//   },

//   subTitle: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//     lineHeight: 26,
//     marginTop: 30,
//     opacity: 0.9,
//     paddingHorizontal: 10,
//   },

//   homeBtn: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     paddingVertical: 18,
//     alignItems: 'center',
//     marginTop: 80,
//   },

//   homeBtnText: {
//     color: '#000',
//     fontSize: 18,
//     fontWeight: '600',
//   },

//   backBtn: {
//     width: '100%',
//     borderWidth: 2,
//     borderColor: '#fff',
//     borderRadius: 14,
//     paddingVertical: 18,
//     alignItems: 'center',
//     marginTop: 24,
//   },

//   backBtnText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });

// export default styles;


import { StyleSheet, Platform, Dimensions } from 'react-native';

import { theme } from '../../MainTheme/theme';
import { scale, verticalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp || '#ffffff',
  },
  
  // New wrapper to safely contain the absolute image
  mainWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden', // Prevents the tall image from messing up the screen boundaries
  },

  wavesBg: {
    position: 'absolute',
    bottom:-75,
    left: 0,
    width: width,
    // By giving it a height 2.5x the screen width, 'contain' will fill the screen horizontally.
    // The empty transparent top of the image will simply go up behind the text.
    height: width * 2.5, 
    resizeMode: 'contain', 
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },
  
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: theme.colors.statusSuccess || '#03B244',
    fontSize: theme.typography.size.xl || scale(22),
    fontWeight: theme.typography.weight.bold,
    marginTop: verticalScale(10),
    textAlign: 'center',
  },

  illustration: {
    width: scale(280),
    height: scale(200),
    resizeMode: 'contain',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
  },

  subTitle: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    textAlign: 'center',
    lineHeight: scale(22),
    paddingHorizontal: scale(10),
    fontWeight: theme.typography.weight.medium,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: verticalScale(40), 
  },

  homeBtn: {
    width: '100%',
    backgroundColor: theme.colors.primaryBlue || '#285CE0',
    borderRadius: theme.borderRadius.md || 12,
    height: scale(52),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  homeBtnText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.semibold,
  },

  backBtn: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue || '#285CE0',
    borderRadius: theme.borderRadius.md || 12,
    height: scale(52),
    justifyContent: 'center',
    alignItems: 'center',
  },

  backBtnText: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.medium,
  },
});

export default styles;




// import { StyleSheet, Platform, Dimensions } from 'react-native';

// // Import your existing theme and responsive utilities
// import { theme } from '../../MainTheme/theme';
// import { scale, verticalScale } from '../../utils/responsive';

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp || '#ffffff',
//   },

//   wavesBg: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     width: '100%',
//     height: verticalScale(250),
//     resizeMode: 'cover',
//     //zIndex: -1, // Keep it behind the interactive elements
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: scale(24),
//     paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },

//   header: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: verticalScale(20),
//   },
  
//   backButton: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: theme.borderRadius.full,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   title: {
//     color: theme.colors.statusSuccess || '#03B244',
//     fontSize: theme.typography.size.xl || scale(22),
//     fontWeight: theme.typography.weight.bold,
//     marginTop: verticalScale(10),
//     textAlign: 'center',
//   },

//   illustration: {
//     width: scale(280),
//     height: scale(200),
//     resizeMode: 'contain',
//     marginTop: verticalScale(30),
//     marginBottom: verticalScale(30),
//   },

//   subTitle: {
//     color: theme.colors.textMain || '#05070D',
//     fontSize: theme.typography.size.sm || scale(14),
//     textAlign: 'center',
//     lineHeight: scale(22),
//     paddingHorizontal: scale(10),
//     fontWeight: theme.typography.weight.medium,
//   },

//   buttonContainer: {
//     width: '100%',
//     marginTop: 'auto',
//     marginBottom: verticalScale(40), // Spacing above the bottom edge
//   },

//   homeBtn: {
//     width: '100%',
//     backgroundColor: theme.colors.primaryBlue || '#285CE0',
//     borderRadius: theme.borderRadius.md || 12,
//     height: scale(52),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(16),
//   },

//   homeBtnText: {
//     color: '#ffffff',
//     fontSize: theme.typography.size.base || scale(16),
//     fontWeight: theme.typography.weight.semibold,
//   },

//   backBtn: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderColor: theme.colors.primaryBlue || '#285CE0',
//     borderRadius: theme.borderRadius.md || 12,
//     height: scale(52),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   backBtnText: {
//     color: theme.colors.textMain || '#05070D',
//     fontSize: theme.typography.size.base || scale(16),
//     fontWeight: theme.typography.weight.medium,
//   },
// });

// export default styles;