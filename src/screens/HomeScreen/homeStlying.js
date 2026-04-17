// import { StyleSheet } from 'react-native';
 
// const HomeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6C2BD9',
//     paddingTop: 12,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     marginBottom: 16,
//   },
//   menuIcon: {
//     fontSize: 24,
//     color: '#fff',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     gap: 16,
//     alignItems: 'center',
//   },
//   notificationIcon: {
//     fontSize: 20,
//     color: '#fff',
//   },
//   profileIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#FFD700',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: 16,
//   },
//   cardContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 24,
//   },
//   card: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     padding: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   cardLeft: {
//     flex: 1,
//   },
//   balanceLabel: {
//     fontSize: 12,
//     color: '#999',
//     marginBottom: 8,
//     fontWeight: '600',
//   },
//   balanceAmount: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//     letterSpacing: 2,
//     marginBottom: 4,
//   },
//   payoLabel: {
//     fontSize: 11,
//     color: '#FFD700',
//     fontWeight: '600',
//   },
//   cardRight: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     minWidth: 120,
//   },
//   walletDecoration: {
//     width: 80,
//     height: 60,
//     backgroundColor: '#FFD700',
//     borderRadius: 12,
//     opacity: 0.8,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#333',
//   },
//   walletLabel: {
//     fontSize: 12,
//     color: '#999',
//     fontWeight: '600',
//   },
//   walletButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   walletButtonText: {
//     fontSize: 13,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   walletArrow: {
//     fontSize: 18,
//     color: '#FFD700',
//   },
//   actionsContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 24,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     gap: 16,
//   },
//   actionButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#FFD700',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#FFD700',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   actionIcon: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   actionLabel: {
//     fontSize: 11,
//     color: '#fff',
//     marginTop: 6,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   actionWrapper: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statsContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 24,
//   },
//   statsCard: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   statItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statIcon: {
//     fontSize: 24,
//     marginBottom: 8,
//   },
//   statValue: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 11,
//     color: '#999',
//     fontWeight: '600',
//   },
//   divider: {
//     width: 1,
//     backgroundColor: '#333',
//     marginHorizontal: 16,
//   },
//   transactionsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     marginBottom: 16,
//   },
//   transactionsTitle: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   viewAllText: {
//     fontSize: 12,
//     color: '#FFD700',
//     fontWeight: '600',
//   },
//   transactionsList: {
//     paddingHorizontal: 24,
//     marginBottom: 100,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   transactionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     flex: 1,
//   },
//   transactionAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: 18,
//   },
//   transactionInfo: {
//     flex: 1,
//   },
//   transactionName: {
//     fontSize: 13,
//     color: '#fff',
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   transactionTime: {
//     fontSize: 11,
//     color: '#999',
//   },
//   transactionAmount: {
//     fontSize: 13,
//     fontWeight: 'bold',
//   },
//   amountPositive: {
//     color: '#10B981',
//   },
//   amountNegative: {
//     color: '#EF4444',
//   },
//   bottomNav: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#1a1a1a',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingBottom: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#333',
//   },
//   navItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//   },
//   navIcon: {
//     fontSize: 24,
//     marginBottom: 4,
//   },
//   navLabel: {
//     fontSize: 10,
//     color: '#999',
//     fontWeight: '600',
//   },
//   navActive: {
//     color: '#FFD700',
//   },
//   navInactive: {
//     color: '#666',
//   },
//   centerIcon: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#6C2BD9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: -24,
//     shadowColor: '#6C2BD9',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 12,
//     elevation: 8,
//   },
// });
 
// export default HomeStyles;
 
import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E1065', // deep purple base
  },
 
  //  actions: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 20,
  //   marginTop: 20,
  // },
actions: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

button: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FDE68A',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 30,
  zIndex: 2, // keeps button above line
},

label: {
  marginLeft: 8,
  fontWeight: '600',
},

iconCircle: {
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
},

// 🔥 MAGIC LINE
connector: {
  height: 12,
  width: 20, // adjust this for spacing
  backgroundColor: '#FDE68A',
  marginHorizontal: -2, // removes gap between button & line
  zIndex: 1,
},



  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 22,
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationIcon: {
    fontSize: 18,
    color: '#fff',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  /* BALANCE CARD */
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
  backgroundColor: '#1C1C1E',
  borderRadius: 20,
  padding: 18,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
  balanceLabel: {
    color: '#aaa',
    fontSize: 12,
  },
 balanceAmount: {
  color: '#fff',
  fontSize: 24,
  fontWeight: 'bold',
  letterSpacing: 4,
},
  payoLabel: {
    color: '#22c55e',
    fontSize: 12,
  },
 
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
 
  /* WALLET */
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },
  walletLabel: {
    color: '#ccc',
    fontSize: 12,
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletButtonText: {
    color: '#fff',
    marginRight: 6,
  },
  walletArrow: {
    color: '#fff',
    fontSize: 16,
  },
 
  /* ACTION BUTTONS (FIXED LIKE FIGMA) */
  actionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
//  actions: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
// },

actionButton: {
  backgroundColor: '#FDE68A',
  paddingVertical: 12,
  paddingHorizontal: 22,
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  elevation: 3,
},
  actionWrapper: {
    alignItems: 'center',
  },
  // actionButton: {
  //   backgroundColor: '#FDE68A',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 25,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  actionIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  actionLabel: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
 
  /* INCOME / OUTCOME */
  statsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  statsCard: {
  backgroundColor: '#1C1C1E',
  borderRadius: 16,
  paddingVertical: 14,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 11,
  },
  divider: {
    width: 1,
    backgroundColor: '#333',
  },
 
  /* TRANSACTIONS */
  transactionsHeader: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#FDE68A',
    fontSize: 12,
  },
 
  transactionsList: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 120,
  },
 
 transactionItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  alignItems: 'center',
},
 
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  transactionAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
 
  transactionName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
 
  transactionTime: {
    color: '#aaa',
    fontSize: 10,
  },
 
  transactionAmount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
 
  amountPositive: {
    color: '#22c55e',
  },
  amountNegative: {
    color: '#f87171',
  },
 
  /* BOTTOM NAV */
 bottomNav: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 85,
  backgroundColor: '#2E1065',
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingBottom: 10,
},
  navItem: {
    alignItems: 'center',
  },
 
  navIcon: {
    fontSize: 20,
  },
 
  navLabel: {
    fontSize: 10,
    marginTop: 4,
  },
 
  navActive: {
    color: '#F472B6',
  },
 
  navInactive: {
    color: '#aaa',
  },
 
  /* CENTER BUTTON */
centerIcon: {
  width: 65,
  height: 65,
  borderRadius: 35,
  backgroundColor: '#7C3AED',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: -30,
  alignSelf: 'center',
  elevation: 10,
},
});