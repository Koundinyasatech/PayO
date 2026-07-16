// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';

// export default StyleSheet.create({
//   container: {
//     paddingHorizontal: wp('5%'),
//     paddingTop: hp('2%'),
//   },

//   headerRow: {
//     minHeight: hp('7%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//     marginBottom: hp('2%'),
//   },

//   backBtn: {
//     position: 'absolute',
//     left: wp('2%'),
//   },

//   back: {
//     fontSize: moderateScale(22),
//     color: '#fff',
//   },

//   header: {
//     fontSize: moderateScale(18),
//     fontWeight: '600',
//     color: '#fff',
//   },

//   card: {
//     backgroundColor: '#6a1bb9',
//     padding: wp('6%'),
//     borderRadius: moderateScale(20),
//     alignItems: 'center',
//     marginBottom: hp('2.5%'),
//   },

//   icon: {
//     fontSize: moderateScale(30),
//     marginBottom: hp('1.2%'),
//   },

//   earn: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     marginBottom: hp('1.2%'),
//     textAlign: 'center',
//   },

//   desc: {
//     color: '#ddd',
//     textAlign: 'center',
//     lineHeight: moderateScale(20),
//     fontSize: moderateScale(13),
//   },

//   codeBox: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderStyle: 'dashed',
//     padding: wp('4.5%'),
//     borderRadius: moderateScale(12),
//     marginBottom: hp('2.5%'),
//   },

//   codeLabel: {
//     color: '#ccc',
//     marginBottom: hp('0.8%'),
//     fontSize: moderateScale(12),
//   },

//   code: {
//     color: '#ffffff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },

//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('2.5%'),
//     flexWrap: 'wrap',
//   },

//   btn: {
//     backgroundColor: '#5e2bb8',
//     paddingVertical: hp('1.6%'),
//     borderRadius: moderateScale(10),
//     width: '48%',
//     alignItems: 'center',
//     minHeight: hp('6%'),
//     justifyContent: 'center',
//     marginBottom: hp('1%'),
//   },

//   btnText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: moderateScale(13),
//   },

//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('2.5%'),
//     flexWrap: 'wrap',
//   },

//   statBox: {
//     backgroundColor: '#6a1bb9',
//     paddingVertical: hp('2.5%'),
//     paddingHorizontal: wp('3%'),
//     borderRadius: moderateScale(15),
//     width: '48%',
//     alignItems: 'center',
//     marginBottom: hp('1%'),
//   },

//   statValue: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },

//   statValueGreen: {
//     color: '#ffffff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },

//   statLabel: {
//     color: '#ddd',
//     fontSize: moderateScale(12),
//     marginTop: hp('0.5%'),
//     textAlign: 'center',
//   },

//   info: {
//     marginTop: hp('1%'),
//   },

//   infoTitle: {
//     color: '#fff',
//     fontWeight: '600',
//     marginBottom: hp('1.2%'),
//     fontSize: moderateScale(14),
//   },

//   infoText: {
//     color: '#ccc',
//     marginBottom: hp('0.8%'),
//     lineHeight: moderateScale(20),
//     fontSize: moderateScale(13),
//   },
// });




import { StyleSheet } from 'react-native';

// 1. Importing responsive utilities
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

// 2. Importing theme
import { theme } from '../../MainTheme/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white background
  },

  container: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },

  backBtn: {
    paddingRight: scale(12),
  },

  header: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.semibold || '600',
    color: theme.colors.textMain,
    marginLeft: scale(8),
  },

  // Main Card
  card: {
    backgroundColor: '#eff6ff', // Light blue background
    borderColor: '#93c5fd', // Blue border
    borderWidth: 1,
    paddingVertical: verticalScale(32),
    paddingHorizontal: scale(24),
    borderRadius: theme.borderRadius.xl || 24,
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },

  iconBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    width: scale(48),
    height: scale(48),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  earn: {
    color: theme.colors.textMain,
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.semibold || '600',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },

  desc: {
    color: theme.colors.textMain,
    textAlign: 'center',
    fontWeight: theme.typography.weight.medium || '500',
    lineHeight: moderateScale(22),
    fontSize: moderateScale(13),
  },

  // Referral Code Box
  codeBox: {
    backgroundColor: '#f0f9ff', // Very light blue fill
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue, // Blue dashed border
    borderStyle: 'dashed',
    padding: scale(16),
    borderRadius: theme.borderRadius.md || 12,
    marginBottom: verticalScale(24),
  },

  codeLabel: {
    color: theme.colors.primaryBlue, // Blue label
    marginBottom: verticalScale(8),
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  code: {
    color: theme.colors.textMain,
    fontSize: moderateScale(16),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  // Action Buttons (Copy / Share)
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
    gap: scale(12),
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.textMuted || '#6b7280', // Gray dashed border
    borderStyle: 'dashed',
    paddingVertical: verticalScale(14),
    borderRadius: theme.borderRadius.md || 12,
    flex: 1,
  },

  btnText: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(13),
    marginRight: scale(8),
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(32),
    gap: scale(16),
  },

  statBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#93c5fd', // Blue border
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    borderRadius: theme.borderRadius.md || 12,
    width: '40%',
    alignItems: 'center',
  },

  statValue: {
    color: theme.colors.textMain,
    fontSize: moderateScale(20),
    fontWeight: theme.typography.weight.bold || '700',
  },

  statValueGreen: {
    color: theme.colors.statusSuccess || '#10b981', // Green text for rewards
    fontSize: moderateScale(20),
    fontWeight: theme.typography.weight.bold || '700',
  },

  statLabel: {
    color: theme.colors.textMain,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    textAlign: 'center',
    fontWeight: theme.typography.weight.medium || '500',
  },

  // Instructions
  info: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(24),
  },

  infoTitle: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    marginBottom: verticalScale(16),
    fontSize: moderateScale(15),
  },

  infoText: {
    color: theme.colors.textMain,
    marginBottom: verticalScale(12),
    lineHeight: moderateScale(22),
    fontSize: moderateScale(13),
  },
});