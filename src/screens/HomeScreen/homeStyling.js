// homeStyling.js — PART 1

import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B0A6B',
  },

  scrollContent: {
    paddingBottom: hp('15%'),
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1%'),
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },

  profileIcon: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },

  walletNumber: {
    color: '#fff',
    fontSize: moderateScale(11),
  },

  /* CARD */
  cardContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },

  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(20),
    padding: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    minHeight: hp('18%'),
  },

  topRightCurve: {
    position: 'absolute',
    top: hp('-2%'),
    right: wp('-5%'),
    width: wp('22%'),
    height: wp('24%'),
    borderRadius: moderateScale(50),
    backgroundColor: '#F59E0B',
  },

  bottomLeftCurve: {
    position: 'absolute',
    bottom: hp('-2%'),
    left: wp('-5%'),
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: moderateScale(40),
  },

  balanceLabel: {
    color: '#d8d4d4',
    fontSize: moderateScale(13),
    marginBottom: hp('0.7%'),
    fontWeight: '700',
  },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },

  balanceAmount: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  payoLabel: {
    color: '#22c55e',
    fontSize: moderateScale(11),
    marginLeft: wp('1.5%'),
  },

  cardRight: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletText: {
    color: '#ccc',
    marginRight: wp('2%'),
    fontSize: moderateScale(12),
  },

  arrowCircle: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addBankButton: {
    position: 'absolute',
    bottom: hp('2%'),
    left: wp('4%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },

  bankIcon: {
    marginRight: wp('1.5%'),
  },

  addBankText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#000',
  },

  /* ACTIONS */
  actionsContainer: {
    marginTop: hp('1.8%'),
    paddingHorizontal: wp('5%'),
  },

   actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },

  actionTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDE68A',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
    borderRadius: moderateScale(30),
    zIndex: 2,
  },

  iconCircle: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    marginLeft: wp('2%'),
    fontWeight: '600',
    fontSize: moderateScale(12),
    color: '#000',
  },

  connector: {
    height: hp('1.4%'),
    width: wp('5%'),
    backgroundColor: '#FDE68A',
    marginHorizontal: wp('-0.5%'),
    zIndex: 1,
  },
 

  statsContainer: {
    marginTop: hp('2.5%'),
    paddingHorizontal: wp('5%'),
  },

  statsCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textBlock: {
    marginLeft: wp('2.5%'),
  },

  statLabel: {
    color: '#aaa',
    fontSize: moderateScale(11),
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },


//   quickSummaryCard: {
//   marginHorizontal: 16,
//   marginTop: 18,
//   backgroundColor: '#251a46',
//   borderRadius: 26,
//   paddingVertical: 22,
//   paddingHorizontal: 18,

//   borderWidth: 1,
//   borderColor: 'rgba(255,255,255,0.06)',

//   shadowColor: '#000',
//   shadowOpacity: 0.35,
//   shadowRadius: 12,
//   elevation: 10,
// },

// actionHeader: {
//   marginBottom: 18,
// },

// actionTitle: {
//   fontSize: 22,
//   fontWeight: '700',
//   color: '#fff',
// },

// // actions: {
// //   flexDirection: 'row',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// // },

// // button: {
// //   flex: 1,
// //   height: 58,
// //   backgroundColor: '#FFE88A',
// //   borderRadius: 30,

// //   flexDirection: 'row',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// // },

// // iconCircle: {
// //   width: 32,
// //   height: 32,
// //   borderRadius: 16,
// //   backgroundColor: '#111',

// //   justifyContent: 'center',
// //   alignItems: 'center',

// //   marginRight: 8,
// // },

// // label: {
// //   fontWeight: '700',
// //   color: '#111',
// //   fontSize: 15,
// // },

// // connector: {
// //   width: 22,
// //   height: 6,
// //   backgroundColor: '#FFE88A',
// // },

// actions: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginBottom: 18,
// },

// actionButton: {
//   width: 100,
//   height: 46,
//   backgroundColor: '#FFE88A',

//   borderRadius: 15,

//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',

//   elevation: 3,
// },

// actionIcon: {
//   width: 25,
//   height: 25,
//   borderRadius: 12,
//   backgroundColor: '#181818',

//   justifyContent: 'center',
//   alignItems: 'center',

//   marginRight: 8,
// },

// actionText: {
//   color: '#111',
//   fontSize: 16,
//   fontWeight: '700',
// },

// actionConnector: {
//     height: hp('1%'),
//     width: wp('5%'),
//   backgroundColor: '#FFE88A',
// },


summaryDivider: {
  height: 1,
  backgroundColor: 'rgba(255,255,255,0.08)',
  marginVertical: 22,
},

summaryRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

summaryItem: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
},

verticalDivider: {
  width: 1,
  height: 65,
  backgroundColor: 'rgba(255,255,255,0.15)',
},

summaryIconGreen: {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: 'rgba(83,210,88,0.15)',

  justifyContent: 'center',
  alignItems: 'center',

  marginRight: 12,
},

summaryIconRed: {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: 'rgba(255,107,107,0.15)',

  justifyContent: 'center',
  alignItems: 'center',

  marginRight: 12,
},

summaryLabel: {
  color: '#A7A7B5',
  fontSize: 14,
},

summaryValue: {
  color: '#fff',
  fontSize: 26,
  fontWeight: '700',
},

summaryUnit: {
  marginLeft: 5,
  color: '#53D258',
  fontWeight: '700',
  alignSelf: 'flex-end',
  marginBottom: 4,
},

amountRow: {
  flexDirection: 'row',
  alignItems: 'flex-end',
},

  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(17),
  },

  unit: {
    color: '#53D258',
    fontSize: moderateScale(9),
    marginLeft: wp('1%'),
  },

  divider: {
    width: 1,
    height: hp('4.5%'),
    backgroundColor: '#444',
  },

  expertContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('4%'),
  },

  expertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },

  expertTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  viewAllText: {
    color: '#FDE68A',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },

  expertCard: {
    width: wp('42%'),
    backgroundColor: '#fff',
    borderRadius: moderateScale(16),
    padding: wp('3.5%'),
    marginRight: wp('3%'),
  },

  expertTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coinImage: {
    width: wp('6.5%'),
    height: wp('6.5%'),
    marginRight: wp('1.5%'),
  },

  coinSymbol: {
    fontWeight: '700',
    fontSize: moderateScale(13),
  },

  badge: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: moderateScale(6),
  },

  longBadge: {
    backgroundColor: '#22c55e',
  },

  shortBadge: {
    backgroundColor: '#ef4444',
  },

  badgeText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontWeight: '600',
  },

  entryLabel: {
    marginTop: hp('1.5%'),
    color: '#6b7280',
    fontSize: moderateScale(11),
  },

  entryPrice: {
    fontSize: moderateScale(14),
    fontWeight: '700',
  },

  profitBox: {
    marginTop: hp('1.5%'),
    backgroundColor: '#ecfdf5',
    padding: wp('2%'),
    borderRadius: moderateScale(8),
  },

  profitText: {
    color: '#16a34a',
    fontWeight: '700',
    fontSize: moderateScale(10),
  },

  marketCardsContainer: {
    marginTop: hp('3%'),
    paddingHorizontal: wp('4%'),
  },

  marketCard: {
    width: '100%',
    backgroundColor: '#fcf2bd',
    borderRadius: moderateScale(28),
    padding: wp('5%'),
    elevation: 5,
    marginBottom: hp('2%'),
  },

  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  marketCoinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  marketCoinImage: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    marginRight: wp('3%'),
  },

  marketCoinName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#111',
  },

  marketCoinSymbol: {
    fontSize: moderateScale(13),
    color: '#888',
    marginTop: hp('0.3%'),
  },

  marketBadge: {
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    borderRadius: moderateScale(30),
  },

  priceSection: {
    marginTop: hp('2%'),
  },

  marketPrice: {
    fontSize: moderateScale(24),
    fontWeight: '800',
    color: '#000',
  },

  marketChange: {
    marginTop: hp('1%'),
    fontSize: moderateScale(15),
    fontWeight: '700',
  },

  chartStyle: {
    marginTop: hp('2%'),
    borderRadius: moderateScale(20),
  },

bottomNav: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,

  backgroundColor: '#2E1065',

  borderTopLeftRadius: moderateScale(30),
  borderTopRightRadius: moderateScale(30),

  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',

  paddingHorizontal: wp('2%'),

  elevation: 20,
  zIndex: 999,
},

  navItem: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  paddingTop: hp('1%'),
},

  navLabel: {
    fontSize: moderateScale(9),
    marginTop: hp('0.5%'),
    fontWeight: '600',
  },

  navActive: {
    color: '#F472B6',
  },

  navInactive: {
    color: '#aaa',
  },

  centerIcon: {
    position: 'absolute',
    top: hp('-4.2%'),
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 25,
    zIndex: 1000,
  },

  // Add these to your existing styles
// Add these to your existing styles
chartControls: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 12,
  paddingTop: 8,
  borderTopWidth: 1,
  borderTopColor: '#2A2F3E',
},
zoomResetButton: {
  backgroundColor: '#2A2F3E',
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 6,
},
zoomResetText: {
  color: '#FCD535',
  fontSize: 11,
  fontWeight: '600',
},
chartHint: {
  color: '#6B7280',
  fontSize: 10,
},
globalTooltip: {
  backgroundColor: '#1A1F2E',
  borderRadius: 8,
  padding: 6,
  minWidth: 80,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#FCD535',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
globalTooltipText: {
  color: '#FCD535',
  fontSize: 12,
  fontWeight: 'bold',
},
globalTooltipArrow: {
  position: 'absolute',
  bottom: -6,
  left: '50%',
  marginLeft: -6,
  width: 0,
  height: 0,
  borderLeftWidth: 6,
  borderRightWidth: 6,
  borderTopWidth: 6,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderTopColor: '#FCD535',
},
zoomIndicator: {
  position: 'absolute',
  bottom: 5,
  right: 10,
  backgroundColor: 'rgba(0,0,0,0.7)',
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 4,
},
zoomIndicatorText: {
  color: '#FCD535',
  fontSize: 10,
  fontWeight: '600',
},
centerContent: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

newsContainer: {
 marginTop: hp('4%'),
  // marginBottom: hp('2%'),
  paddingHorizontal: 18,
},

newsHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 18,
},

newsTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
},

newsCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#1C1C1E',
  borderRadius: 16,
  padding: 14,
  marginBottom: 14,
},

newsLeft: {
  flex: 1,
  paddingRight: 12,
},

newsSource: {
  color: '#8B8B8B',
  fontSize: 13,
  marginBottom: 5,
},

newsHeadline: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  lineHeight: 22,
},

newsDate: {
  marginTop: 8,
  color: '#999',
  fontSize: 12,
},

newsImage: {
  width: 80,
  height: 80,
  borderRadius: 12,
  backgroundColor: '#2A2A2A',
},
});