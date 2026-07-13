// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2b007a',
//     paddingHorizontal: wp('5%'),
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     minHeight: hp('7%'),
//     marginTop: hp('1%'),
//   },

//   back: {
//     color: '#fff',
//     fontSize: moderateScale(20),
//   },

//   title: {
//     color: '#fff',
//     fontSize: moderateScale(22),
//     fontWeight: '700',
//   },

//   profileSection: {
//     alignItems: 'center',
//     marginVertical: hp('2.5%'),
//   },

//   profileCircle: {
//     width: moderateScale(90),
//     height: moderateScale(90),
//     borderRadius: moderateScale(45),
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('1.2%'),
//   },

//   profileText: {
//     fontSize: moderateScale(30),
//   },

//   phone: {
//     color: '#fff',
//     marginTop: hp('0.5%'),
//     fontSize: moderateScale(14),
//   },

//   verified: {
//     color: '#00ff99',
//     fontSize: moderateScale(12),
//     marginTop: hp('0.5%'),
//   },

//   balanceCard: {
//     backgroundColor: '#111',
//     borderRadius: moderateScale(15),
//     padding: wp('4%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('2%'),
//     alignItems: 'center',
//   },

//   label: {
//     color: '#aaa',
//     fontSize: moderateScale(12),
//   },

//   balance: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },

//   token: {
//     color: '#00ff99',
//     fontSize: moderateScale(12),
//   },

//   transactionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   transactions: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },

//   divider: {
//     width: 1,
//     backgroundColor: '#333',
//     height: hp('6%'),
//   },

//   referralBox: {
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderColor: '#aaa',
//     padding: wp('4%'),
//     borderRadius: moderateScale(12),
//     marginBottom: hp('2%'),
//   },

//   refLabel: {
//     color: '#ccc',
//     fontSize: moderateScale(13),
//   },

//   refCode: {
//     color: '#fff',
//     fontWeight: '700',
//     marginTop: hp('0.6%'),
//     fontSize: moderateScale(14),
//   },

//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('2%'),
//     flexWrap: 'wrap',
//   },

//   btn: {
//     backgroundColor: '#5e2bb8',
//     paddingVertical: hp('1.6%'),
//     borderRadius: moderateScale(10),
//     width: '48%',
//     alignItems: 'center',
//   },

//   btnText: {
//     color: '#fff',
//     fontSize: moderateScale(13),
//   },

//   addBankBtn: {
//     marginTop: hp('2%'),
//     marginBottom: hp('1.5%'),
//     backgroundColor: '#5e2bb8',
//     borderRadius: moderateScale(16),
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('4.5%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   addBankText: {
//     flex: 1,
//     color: '#fff',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     marginLeft: wp('4%'),
//   },

//   sectionTitle: {
//     color: '#fff',
//     marginBottom: hp('1.2%'),
//     marginTop: hp('1.2%'),
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },

//   card: {
//     backgroundColor: '#6a1bb9',
//     padding: wp('4%'),
//     borderRadius: moderateScale(15),
//     marginBottom: hp('1.8%'),
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('1.2%'),
//     alignItems: 'flex-start',
//   },

//   item: {
//     color: '#fff',
//     fontSize: moderateScale(13),
//   },

//   labelItem: {
//     color: '#ccc',
//     fontSize: moderateScale(13),
//     width: '35%',
//   },

//   value: {
//     color: '#ccc',
//     fontSize: moderateScale(12),
//     width: '60%',
//     textAlign: 'right',
//   },

//   arrow: {
//     color: '#fff',
//   },

//   green: {
//     color: '#00ff99',
//     fontSize: moderateScale(13),
//   },

//   logoutBtn: {
//     marginTop: hp('2%'),
//     marginBottom: hp('18%'),
//     borderWidth: 1.5,
//     borderColor: '#ff4d4d',
//     paddingVertical: hp('1.8%'),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },

//   logoutText: {
//     color: '#ff4d4d',
//     fontWeight: '700',
//     fontSize: moderateScale(16),
//   },

//   // logoutText: {
//   //   color: '#ff4d4d',
//   //   fontWeight: '700',
//   //   fontSize: 16,
//   // },


//   bankCard: {
//     backgroundColor: "#6a1bb9",
//     borderRadius: 14,
//     padding: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 10
//   },

//   bankLeft: {
//     flexDirection: "row",
//     alignItems: "center"
//   },

//   bankIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 8,
//     backgroundColor: "#5e2bb8",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12
//   },
//   helpButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   helpImage: {
//     width: 45,
//     height: 45,
//     borderRadius: 22.5,
//   },

//   bankName: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600"
//   },

//   bankSub: {
//     color: "#ccc",
//     fontSize: 12
//   },
// });



import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive'; // Updated to use your new custom utility

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    paddingHorizontal: scale(16),
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: scale(12),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginTop: verticalScale(2),
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(8),
    fontWeight: 'bold',
  },
  
  // --- Profile Card ---
  profileCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: scale(16),
    padding: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  profileAvatarText: {
    fontSize: moderateScale(30),
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: '#4F46E5',
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EEF2FF',
  },
  profileInfo: {
    marginLeft: scale(16),
    flex: 1,
  },
  profileName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1F2937',
  },
  profilePhone: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    marginTop: verticalScale(2),
  },
  kycBadge: {
    backgroundColor: '#FEE2E2',
    alignSelf: 'flex-start',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
    marginTop: verticalScale(6),
  },
  kycText: {
    color: '#EF4444',
    fontSize: moderateScale(10),
    fontWeight: '700',
  },

  // --- Balance & Transactions ---
  balanceContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(12),
    resizeMode: 'contain',
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: '#6B7280',
  },
  statValue: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2937',
    marginTop: verticalScale(2),
  },
  token: {
    fontSize: moderateScale(12),
    color: '#10B981',
    fontWeight: '600',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: scale(12),
  },

  // --- Referral Card ---
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: scale(12),
    padding: scale(12),
    backgroundColor: '#F8FAFC',
    marginBottom: verticalScale(16),
  },
  rewardIcon: {
    width: scale(36),
    height: scale(36),
    marginRight: scale(12),
    resizeMode: 'contain',
  },
  referralLabel: {
    fontSize: moderateScale(12),
    color: '#6B7280',
  },
  referralCode: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#4F46E5',
    marginTop: verticalScale(2),
  },

  // --- Action Buttons ---
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  actionBtnOutline: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
  },
  actionBtnText: {
    fontSize: moderateScale(13),
    color: '#374151',
    fontWeight: '500',
    marginRight: scale(8),
  },
  addBankPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4F46E5',
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(24),
  },
  addBankPrimaryText: {
    flex: 1,
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: scale(12),
  },

  // --- Lists & Sections ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    paddingHorizontal: scale(4),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2937',
  },
  viewAll: {
    fontSize: moderateScale(12),
    color: '#4F46E5',
    fontWeight: '500',
  },
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  listItemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  listLabel: {
    fontSize: moderateScale(14),
    color: '#6B7280',
  },
  listLabelDark: {
    fontSize: moderateScale(14),
    color: '#374151',
    fontWeight: '500',
  },
  listValue: {
    fontSize: moderateScale(14),
    color: '#1F2937',
    fontWeight: '500',
  },
  dangerText: {
    fontSize: moderateScale(14),
    color: '#EF4444',
    fontWeight: '500',
  },

  // --- Security Banner ---
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(24),
    position: 'relative',
    overflow: 'hidden',
  },
  bannerIcon: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(12),
    resizeMode: 'contain',
  },
  bannerTextContainer: {
    flex: 1,
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#1F2937',
  },
  bannerSub: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginTop: verticalScale(4),
  },
  watermarkIcon: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: scale(80),
    height: scale(80),
    opacity: 0.1,
    resizeMode: 'contain',
  },

  // --- Logout ---
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    marginBottom: verticalScale(40),
    backgroundColor: '#ffffff',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});