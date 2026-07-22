// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#120022',
//   },

//   scrollContent: {
//     flexGrow: 1,
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal:
//       wp('5%'),
//     paddingTop:
//       hp('7%'),
//     paddingBottom:
//       hp('4%'),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },

//   heading: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: '700',
//   },

//   subText: {
//     color: '#ddd',
//     marginTop: 20,
//     lineHeight: 22,
//     fontSize: 14,
//   },

//   label: {
//     color: '#fff',
//     marginTop: 25,
//     marginBottom: 16,
//     fontSize: 12,
//   },

//   tabContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },

//   tabButton: {
//   borderWidth: 1,
//   borderColor: '#fff',
//   borderRadius: 10,
//   paddingVertical: 12,
//   alignItems: 'center',
//   justifyContent: 'center',
// },

//   activeTab: {
//     backgroundColor: '#fff',
//   },

//   tabText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 13,
//   },

//   activeTabText: {
//     color: '#5A00D1',
//   },

//   inputBox: {
//     height: 58,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     color: '#fff',
//     fontSize: 18,
//     marginBottom: 25,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },

//   uploadBox: {
//     borderWidth: 2,
//     borderStyle: 'dashed',
//     borderColor: '#13F5C5',
//     borderRadius: 30,
//     padding: 35,
//     alignItems: 'center',
//     backgroundColor: '#7B2CFF',
//     marginBottom: 28,
//     marginTop: 28,
//   },

//   uploadIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 14,
//     borderWidth: 2,
//     borderColor: '#13F5C5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },

//   uploadTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 10,
//     textAlign:"center"
//   },

//   uploadInfo: {
//     color: '#E6D8FF',
//     fontSize: 13,
//   },

//   fileName: {
//     color: '#fff',
//     marginTop: 18,
//     fontSize: 13,
//     fontWeight: '600',
//   },

//   faceBox: {
//     borderWidth: 3,
//     borderColor: '#4D9365',
//     borderStyle: 'dashed',
//     borderRadius: 24,
//     padding: 24,
//     backgroundColor: '#601AC8',
//   },

//   faceIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     borderWidth: 2,
//     borderColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },

//   faceTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   faceSub: {
//     color: '#ddd',
//     marginTop: 8,
//     fontSize: 13,
//   },

//   cameraBtn: {
//     backgroundColor: '#11CFFF',
//     paddingVertical: 14,
//     borderRadius: 14,
//     marginTop: 18,
//     alignItems: 'center',
//   },

//   cameraBtnText: {
//     color: '#fff',
//     fontWeight: '700',
//   },

//   instructions: {
//   marginTop: 20,
// },

// pointRow: {
//   flexDirection: 'row',
//   alignItems: 'flex-start',
//   marginBottom: 10,
// },

// bullet: {
//   color: '#fff',
//   fontSize: 14,
//   fontWeight: 'bold',
//   marginRight: 8,
//   width: 18,
// },

// instructionText: {
//   flex: 1,
//   color: '#fff',
//   fontSize: 13,
//   lineHeight: 20,
// },

//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 12,
//   },

//   checkbox: {
//     width: 22,
//     height: 22,
//     borderRadius: 4,
//     backgroundColor: '#fff',
//     marginRight: 10,
//   },

//   checkboxText: {
//     color: '#fff',
//     flex: 1,
//     fontSize: 14,
//     lineHeight: 20,
//   },

//   submitBtn: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginTop: 35,
//     marginBottom: 40,
//   },

//   submitBtnText: {
//     color: '#000',
//     fontSize: 18,
//     fontWeight: '600',
//   },


//   dropdown: {
//     backgroundColor: '#1D0A32',
//     borderRadius: 14,
//     paddingHorizontal: 15,
//     height: 55,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#4A2B6A',
//   },

//   dropdownPlaceholder: {
//     color: '#B9A8D4',
//     fontSize: 15,
//   },

//   dropdownSelectedText: {
//     color: '#fff',
//     fontSize: 15,
//   },
// });

// export default styles;





import { StyleSheet, Platform } from 'react-native';

// Import your existing theme and responsive utilities
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale } from '../../utils/responsive';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(30),
  },
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: scale(15),
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  subText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: scale(18),
  },
  helpIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(40),
  },
  progressSegment: {
    height: scale(4),
    flex: 1,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.borderLight || '#E5E7EB',
    marginHorizontal: scale(3),
  },
  progressActive: {
    backgroundColor: theme.colors.primaryBlue,
  },

  tabsRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(12),
  },
  tabButton: {
    flex: 1,
    height: scale(44),
    borderRadius: theme.borderRadius.sm,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: theme.colors.primaryBlue,
  },
  tabText: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.primaryBlue,
  },
  activeTabText: {
    color: '#ffffff',
  },
  tabMarginRight: {
    marginRight: scale(10),
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },

  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    padding: scale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight || '#E5E7EB',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    marginBottom: verticalScale(12),
  },
  cardTitle: {
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.textMain,
    marginBottom: verticalScale(6),
  },
  cardSub: {
    fontSize: scale(11),
    color: theme.colors.textMuted,
  },
  fileName: {
    marginTop: verticalScale(10),
    fontSize: theme.typography.size.sm,
    color: theme.colors.statusSuccess,
    fontWeight: theme.typography.weight.medium,
  },

  instructions: {
    marginTop: verticalScale(20),
    width: '100%',
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  bulletSuccess: {
    color: theme.colors.statusSuccess,
    fontSize: scale(14),
    fontWeight: 'bold',
    marginRight: scale(10),
    marginTop: Platform.OS === 'ios' ? scale(1) : scale(2),
  },
  bulletDanger: {
    color: theme.colors.statusDanger,
    fontSize: scale(14),
    fontWeight: 'bold',
    marginRight: scale(10),
    marginTop: Platform.OS === 'ios' ? scale(1) : scale(2),
  },
  instructionText: {
    flex: 1,
    color: theme.colors.textMain,
    fontSize: scale(12),
    lineHeight: scale(18),
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(5),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight || '#E5E7EB',
    borderRadius: 4,
    marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.statusSuccess,
    borderColor: theme.colors.statusSuccess,
  },
  checkboxText: {
    flex: 1,
    fontSize: scale(12),
    color: theme.colors.textMuted,
    lineHeight: scale(18),
  },

  // Adjusted bottomContainer and button margins for tighter spacing like Figma
  bottomContainer: {
    paddingTop: verticalScale(10),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(15) : verticalScale(16), 
    backgroundColor: theme.colors.bgApp,
  },
  submitBtn: {
    backgroundColor: theme.colors.primaryIndigo,
    borderRadius: theme.borderRadius.md,
    height: scale(52),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12), // Reduced margin to bring the secure badge closer
  },
  submitBtnDisabled: {
    backgroundColor: '#A5B4FC',
    opacity: 0.7,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.semibold,
    marginRight: scale(8),
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC', // Lighter background 
    alignSelf: 'center',
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
    borderRadius: theme.borderRadius.full,
  },
  secureIcon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    marginRight: scale(6),
  },
  secureText: {
    fontSize: scale(12),
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weight.medium,
  },
});

export default styles;




// import { StyleSheet, Platform } from 'react-native';

// // Import your existing theme and responsive utilities
// import { theme } from '../../MainTheme/theme';
// import { scale, verticalScale } from '../../utils/responsive';

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: scale(20),
//     paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(30),
//   },
  
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(20),
//   },
//   backButton: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: theme.borderRadius.full,
//     backgroundColor: theme.colors.bgSurface,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   titleWrapper: {
//     flex: 1,
//     paddingHorizontal: scale(15),
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: theme.typography.size.lg,
//     fontWeight: theme.typography.weight.bold,
//     color: theme.colors.textMain,
//     textAlign: 'center',
//     marginBottom: verticalScale(8),
//   },
//   subText: {
//     fontSize: theme.typography.size.sm,
//     color: theme.colors.textMuted,
//     textAlign: 'center',
//     lineHeight: scale(18),
//   },
//   helpIcon: {
//     width: scale(24),
//     height: scale(24),
//     resizeMode: 'contain',
//   },

//   progressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(24),
//     paddingHorizontal: scale(40),
//   },
//   progressSegment: {
//     height: scale(4),
//     flex: 1,
//     borderRadius: theme.borderRadius.full,
//     backgroundColor: theme.colors.borderLight || '#E5E7EB',
//     marginHorizontal: scale(3),
//   },
//   progressActive: {
//     backgroundColor: theme.colors.primaryBlue,
//   },

//   tabsRow: {
//     flexDirection: 'row',
//     marginBottom: verticalScale(12),
//   },
//   tabButton: {
//     flex: 1,
//     height: scale(44),
//     borderRadius: theme.borderRadius.sm,
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderColor: theme.colors.primaryBlue,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   activeTab: {
//     backgroundColor: theme.colors.primaryBlue,
//   },
//   tabText: {
//     fontSize: theme.typography.size.sm,
//     fontWeight: theme.typography.weight.medium,
//     color: theme.colors.primaryBlue,
//   },
//   activeTabText: {
//     color: '#ffffff',
//   },
//   tabMarginRight: {
//     marginRight: scale(10),
//   },

//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: verticalScale(30),
//   },

//   card: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: theme.borderRadius.lg,
//     padding: scale(20),
//     borderWidth: 1,
//     borderColor: theme.colors.borderLight || '#E5E7EB',
//     alignItems: 'center',
//     marginBottom: verticalScale(16),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 1,
//   },
//   cardIcon: {
//     width: scale(48),
//     height: scale(48),
//     resizeMode: 'contain',
//     marginBottom: verticalScale(12),
//   },
//   cardTitle: {
//     fontSize: theme.typography.size.base,
//     fontWeight: theme.typography.weight.medium,
//     color: theme.colors.textMain,
//     marginBottom: verticalScale(6),
//   },
//   cardSub: {
//     fontSize: scale(11),
//     color: theme.colors.textMuted,
//   },
//   fileName: {
//     marginTop: verticalScale(10),
//     fontSize: theme.typography.size.sm,
//     color: theme.colors.statusSuccess,
//     fontWeight: theme.typography.weight.medium,
//   },

//   instructions: {
//     marginTop: verticalScale(20),
//     width: '100%',
//   },
//   pointRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: verticalScale(12),
//   },
//   bulletSuccess: {
//     color: theme.colors.statusSuccess,
//     fontSize: scale(14),
//     fontWeight: 'bold',
//     marginRight: scale(10),
//     marginTop: Platform.OS === 'ios' ? scale(1) : scale(2),
//   },
//   bulletDanger: {
//     color: theme.colors.statusDanger,
//     fontSize: scale(14),
//     fontWeight: 'bold',
//     marginRight: scale(10),
//     marginTop: Platform.OS === 'ios' ? scale(1) : scale(2),
//   },
//   instructionText: {
//     flex: 1,
//     color: theme.colors.textMain,
//     fontSize: scale(12),
//     lineHeight: scale(18),
//   },

//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: verticalScale(10),
//     paddingHorizontal: scale(5),
//   },
//   checkbox: {
//     width: scale(20),
//     height: scale(20),
//     borderWidth: 1,
//     borderColor: theme.colors.borderLight || '#E5E7EB',
//     borderRadius: 4,
//     marginRight: scale(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//   },
//   checkboxChecked: {
//     backgroundColor: theme.colors.statusSuccess,
//     borderColor: theme.colors.statusSuccess,
//   },
//   checkboxText: {
//     flex: 1,
//     fontSize: scale(12),
//     color: theme.colors.textMuted,
//     lineHeight: scale(18),
//   },

//   bottomContainer: {
//     paddingTop: verticalScale(10),
//     backgroundColor: theme.colors.bgApp,
//   },
//   submitBtn: {
//     backgroundColor: theme.colors.primaryIndigo,
//     borderRadius: theme.borderRadius.md,
//     height: scale(52),
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(16),
//   },
//   submitBtnDisabled: {
//     backgroundColor: '#A5B4FC', // Lighter purple/indigo for disabled state
//     opacity: 0.7,
//   },
//   submitBtnText: {
//     color: '#ffffff',
//     fontSize: theme.typography.size.base,
//     fontWeight: theme.typography.weight.semibold,
//     marginRight: scale(8),
//   },
//   secureBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F3F4F6',
//     alignSelf: 'center',
//     paddingVertical: scale(8),
//     paddingHorizontal: scale(16),
//     borderRadius: theme.borderRadius.full,
//   },
//   secureIcon: {
//     width: scale(16),
//     height: scale(16),
//     resizeMode: 'contain',
//     marginRight: scale(6),
//   },
//   secureText: {
//     fontSize: scale(12),
//     color: theme.colors.textMuted,
//     fontWeight: theme.typography.weight.medium,
//   },
// });

// export default styles;