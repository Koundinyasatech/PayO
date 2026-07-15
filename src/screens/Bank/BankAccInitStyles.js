// import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// import { theme } from '../../MainTheme/theme';

// const { width, height } = Dimensions.get('window');

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bgSurface,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },

//   contentContainer: {
//     paddingHorizontal: moderateScale(width * 0.06),
//     paddingVertical: verticalScale(height * 0.02),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: verticalScale(10),
//   },

//   headerTitle: {
//     fontSize: moderateScale(width * 0.045),
//     fontWeight: theme.typography.weight.semibold,
//     color: theme.colors.textMain,
//   },

//   subText: {
//     fontSize: moderateScale(width * 0.035),
//     color: theme.colors.textMuted,
//     textAlign: 'center',
//     marginVertical: verticalScale(12),
//     lineHeight: verticalScale(18),
//   },

//   backButtonCircle: {
//     width: moderateScale(width * 0.1),
//     height: moderateScale(width * 0.1),
//     borderRadius: moderateScale(width * 0.05),
//     backgroundColor: theme.colors.bgSurface,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...theme.shadows.sm,
//   },

//   illustration: {
//     width: '100%',
//     height: verticalScale(height * 0.25),
//     alignSelf: 'center',
//     marginVertical: verticalScale(10),
//   },

//   progressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: verticalScale(8),
//   },

//   progressSegment: {
//     width: moderateScale(width * 0.12),
//     height: verticalScale(4),
//     borderRadius: theme.borderRadius.full,
//     backgroundColor: '#E5E7EB',
//     marginHorizontal: moderateScale(4),
//   },

//   activeSegment: {
//     backgroundColor: theme.colors.primaryIndigo,
//   },

//   featureContainer: {
//     marginTop: verticalScale(20),
//   },

//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(18),
//   },

//   featureIcon: {
//     width: moderateScale(width * 0.1),
//     height: moderateScale(width * 0.1),
//     marginRight: moderateScale(12),
//   },

//   featureTitle: {
//     fontSize: moderateScale(width * 0.04),
//     fontWeight: theme.typography.weight.semibold,
//     color: theme.colors.textMain,
//   },

//   featureDesc: {
//     fontSize: moderateScale(width * 0.035),
//     color: theme.colors.textMuted,
//   },

//   securityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F8FF',
//     borderRadius: theme.borderRadius.md,
//     padding: moderateScale(width * 0.04),
//     marginTop: verticalScale(20),
//     ...theme.shadows.md,
//   },

//   securityIcon: {
//     width: moderateScale(width * 0.1),
//     height: moderateScale(width * 0.1),
//     marginRight: moderateScale(12),
//   },

//   securityTitle: {
//     fontSize: moderateScale(width * 0.04),
//     fontWeight: theme.typography.weight.semibold,
//     color: theme.colors.textMain,
//   },

//   securityDesc: {
//     fontSize: moderateScale(width * 0.035),
//     color: theme.colors.textMuted,
//   },

//   button: {
//     backgroundColor: theme.colors.primaryIndigo,
//     borderRadius: theme.borderRadius.md,
//     paddingVertical: verticalScale(height * 0.02),
//     alignItems: 'center',
//     marginTop: verticalScale(30),
//     ...theme.shadows.md,
//   },

//   buttonText: {
//     color: theme.colors.bgSurface,
//     fontSize: moderateScale(width * 0.045),
//     fontWeight: theme.typography.weight.semibold,
//   },

//   successText: {
//     fontSize: moderateScale(width * 0.04),
//     color: theme.colors.textMain,
//     textAlign: 'center',
//     marginTop: verticalScale(20),
//   },
// });


///////////////


import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { theme } from '../../MainTheme/theme';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgSurface,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight / 2 : 0,
  },
  contentContainer: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(12),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  backButtonCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: theme.colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
    textAlign: 'center',
  },
  helpIcon: {
    width: moderateScale(36),
    alignItems: 'center',
  },
  subText: {
    fontSize: moderateScale(13),
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: verticalScale(20),
    marginVertical: verticalScale(6),
  },
  illustration: {
    width: '100%',
    height: verticalScale(190),
    alignSelf: 'center',
    marginVertical: verticalScale(12),
  },

  // ---------- Features (horizontal row with gray circle behind icon) ----------
  featuresContainer: {
    marginTop: verticalScale(8),
    // If you want the entire list centered, add: alignItems: 'center'
    // but screenshot shows left-aligned, so leave as default.
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(18),
    paddingLeft:50
  },
  featureIconWrapper: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#F0F0F0', // light gray
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(14),
  },
  featureIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  featureTitle: {
    fontSize: moderateScale(16),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
  },
  featureDesc: {
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
  },

  // ---------- Security Container ----------
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
    borderRadius: theme.borderRadius.md,
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(18),
    marginTop: verticalScale(12),
    ...theme.shadows.md,
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityIcon: {
    width: moderateScale(28),
    height: moderateScale(28),
    marginRight: moderateScale(12),
  },
  securityTitle: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
  },
  securityDesc: {
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
  },
  securityIconRight: {
    width: moderateScale(70),
    height: moderateScale(70),
    marginLeft: moderateScale(8),
  },

  // ---------- Button ----------
  button: {
    backgroundColor: '#7B2FF7',
    borderRadius: theme.borderRadius.md,
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(40),
    ...theme.shadows.md,
  },
  buttonText: {
    color: theme.colors.bgSurface,
    fontSize: moderateScale(16),
    fontWeight: theme.typography.weight.semibold,
  },
});