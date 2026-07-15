// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: wp('5%'),
//     paddingBottom: hp('18%'),
//   },

//   title: {
//     color: '#fff',
//     fontSize: moderateScale(22),
//     fontWeight: '600',
//     marginBottom: hp('3%'),
//   },

//   label: {
//     color: '#fff',
//     fontWeight: '600',
//     marginBottom: hp('0.8%'),
//     marginTop: hp('1.8%'),
//     fontSize: moderateScale(13),
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: '#7A5DB0',
//     borderRadius: moderateScale(14),
//     paddingVertical: hp('1.8%'),
//     paddingHorizontal: wp('4%'),
//     color: '#fff',
//     marginBottom: hp('0.8%'),
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     fontSize: moderateScale(14),
//   },

//   infoText: {
//     color: '#aaa',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(12),
//   },

//   successText: {
//     color: '#00FFAA',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(13),
//     fontWeight: '500',
//   },

//   errorText: {
//     color: '#FF4D4D',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(12),
//   },

//   amountRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#7A5DB0',
//     borderRadius: moderateScale(14),
//     paddingHorizontal: wp('4%'),
//     marginBottom: hp('1.5%'),
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },

//   amountInput: {
//     flex: 1,
//     color: '#fff',
//     paddingVertical: hp('1.6%'),
//     fontSize: moderateScale(16),
//   },

//   token: {
//     color: '#00FFAA',
//     fontWeight: '600',
//     fontSize: moderateScale(14),
//   },

//   quickRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: hp('1%'),
//     marginBottom: hp('2.5%'),
//     flexWrap: 'wrap',
//   },

//   quickBtn: {
//     backgroundColor: '#E5E5E5',
//     paddingVertical: hp('1%'),
//     paddingHorizontal: wp('4.5%'),
//     borderRadius: moderateScale(10),
//     marginBottom: hp('1%'),
//     minWidth: wp('18%'),
//     alignItems: 'center',
//   },

//   quickText: {
//     color: '#000',
//     fontWeight: '500',
//     fontSize: moderateScale(13),
//   },

//   balanceBox: {
//     backgroundColor: '#7B3FE4',
//     borderRadius: moderateScale(14),
//     paddingVertical: hp('1.8%'),
//     paddingHorizontal: wp('4%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('2.5%'),
//   },

//   balanceText: {
//     color: '#fff',
//     fontSize: moderateScale(12),
//   },

//   balanceAmount: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(14),
//     minWidth: wp('30%'),
//     textAlign: 'right',
//   },

//   button: {
//     backgroundColor: '#0AA84F',
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(14),
//     alignItems: 'center',
//     marginTop: hp('1%'),
//     marginBottom: hp('2%'),
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//   },
// });



import { StyleSheet, Platform } from 'react-native';

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
    backgroundColor: theme.colors.bgApp,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },

  label: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.sm || moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
    marginBottom: verticalScale(8),
    marginLeft: scale(4),
  },

  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: theme.borderRadius.sm || 8,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(16),
    backgroundColor: theme.colors.bgSurface,
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
  },

  infoText: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(16),
    marginLeft: scale(4),
  },
  
  userNameContainer: {
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(16),
    marginLeft: scale(4),
  },

  userNameLabel: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
  },

  successText: {
    color: theme.colors.statusSuccess || '#10b981',
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  errorText: {
    color: theme.colors.statusDanger || '#ef4444',
    fontSize: moderateScale(12),
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(16),
    marginLeft: scale(4),
  },

  errorAlert: {
    color: theme.colors.statusDanger || '#ef4444',
    textAlign: 'center',
    marginBottom: verticalScale(12),
    fontSize: moderateScale(13),
    marginTop: verticalScale(-10),
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: theme.borderRadius.sm || 8,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(20),
    backgroundColor: theme.colors.bgSurface,
  },

  amountInput: {
    flex: 1,
    fontSize: moderateScale(15),
    color: theme.colors.textMain,
    padding: 0, // Reset default Android padding
  },

  token: {
    color: theme.colors.statusSuccess || '#10b981', // Green text for PAYO
    fontSize: theme.typography.size.sm || moderateScale(13),
    fontWeight: theme.typography.weight.semibold || '600',
    marginLeft: scale(8),
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },

  quickBtn: {
    backgroundColor: '#e5e7eb', // Light gray background
    paddingVertical: verticalScale(10),
    flex: 1,
    marginHorizontal: scale(4),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    ...theme.shadows.sm,
  },

  quickText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.medium || '500',
  },

  balanceBox: {
    backgroundColor: '#e0f2fe', // Light blue background
    borderWidth: 1,
    borderColor: '#bae6fd', // Slightly darker blue border
    borderRadius: theme.borderRadius.md || 12,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(32),
    ...theme.shadows.sm,
  },

  balanceText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.medium || '500',
  },

  balanceAmount: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  button: {
    backgroundColor: theme.colors.primaryBlue,
    paddingVertical: verticalScale(14),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: theme.typography.weight.semibold || '600',
  },
});