import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  /* ===== ROOT ===== */
  container: {
    flex: 1,
    backgroundColor: '#2E1065',
  },

  scrollContent: {
    paddingBottom: 170, // 🔥 prevents bottom overlap
  },

  /* ===== HEADER ===== */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  menuIcon: {
    fontSize: 22,
    color: '#fff',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationIcon: {
    fontSize: 18,
    color: '#fff',
    marginRight: 12,
  },

  profileIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FACC15',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ===== BALANCE CARD ===== */
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },

  cardWrapper: {
    height: 160,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#1F1F1F',
  },

  topRightCurve: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FACC15',
    top: -50,
    right: -50,
  },

  bottomLeftCurve: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E5E5E5',
    bottom: -40,
    left: -40,
  },

  cardContent: {
    flex: 1,
    padding: 18,
  },

  balanceLabel: {
    color: '#BDBDBD',
    fontSize: 14,
  },

  balanceTopRight: {
    position: 'absolute',
    top: 45,
    right: 20,
    alignItems: 'flex-end',
  },

  balanceAmount: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 3,
  },

  payoLabel: {
    color: '#22c55e',
    fontWeight: '600',
    marginTop: 2,
  },

  eyeIcon: {
    position: 'absolute',
    top: 18,
    right: 18,
  },

  walletRow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletText: {
    color: '#fff',
    marginRight: 8,
  },

  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ===== ACTION BUTTONS ===== */
  actionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionBlock: {
    flex: 1,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDE68A',
    paddingVertical: 12,
    borderRadius: 30,
  },

  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    marginLeft: 6,
    fontWeight: '600',
    color: '#000',
    fontSize: 13,
  },

  connector: {
    width: 18,
    height: 12,
    backgroundColor: '#FDE68A',
  },

  /* ===== STATS ===== */
  statsContainer: {
    marginTop: 22,
    paddingHorizontal: 20,
  },

  statsCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statValue: {
    color: '#fff',
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#aaa',
  },

  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#333',
  },

  /* ===== TRANSACTIONS ===== */
  transactionsHeader: {
    marginTop: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  transactionsTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  viewAllText: {
    color: '#FDE68A',
  },

  transactionsList: {
    paddingHorizontal: 20,
    marginTop: 14,
    paddingBottom: 160,
  },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    alignItems: 'center',
  },

  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  transactionName: {
    color: '#fff',
    fontWeight: '600',
  },

  transactionTime: {
    color: '#aaa',
    fontSize: 11,
  },

  transactionAmount: {
    fontWeight: 'bold',
  },

  amountPositive: {
    color: '#22c55e',
  },

  amountNegative: {
    color: '#f87171',
  },

  /* ===== BOTTOM NAV ===== */
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 110,
  },

  bottomSvg: {
    position: 'absolute',
    bottom: 0,
  },

  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20,
  },

  tabItem: {
    alignItems: 'center',
  },

  tabLabel: {
    fontSize: 11,
    color: '#ccc',
    marginTop: 2,
  },

  activeTab: {
    color: '#FF7FD8',
  },

  scanButton: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

});