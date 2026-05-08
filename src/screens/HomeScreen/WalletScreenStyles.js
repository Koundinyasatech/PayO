import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },

  walletId: {
    color: '#ccc',
    fontSize: 12,
  },

  walletNumber: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginLeft: 10,
  },

  card: {
    backgroundColor: '#6A1B9A',
    margin: 16,
    padding: 18,
    borderRadius: 20,
  },

  active: {
    color: '#00E5FF',
    marginBottom: 8,
  },

  label: {
    color: '#ccc',
  },

  balance: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 6,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 14,
  },

  btnWhite: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  btnOutline: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 10,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
  },

  history: {
    color: '#00E5FF',
  },

  box: {
    backgroundColor: '#eee',
    margin: 16,
    padding: 14,
    borderRadius: 12,
  },

  boxTitle: {
    fontWeight: '600',
  },

  amount: {
    textAlign: 'right',
    fontWeight: 'bold',
  },

  pending: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
  },

  locked: {
    marginTop: 6,
    color: '#777',
    fontSize: 12,
  },

  limit: {
    color: '#16a34a',
    fontWeight: '600',
  },

  progressBg: {
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginVertical: 8,
  },

  progressFill: {
    height: 6,
    backgroundColor: '#16a34a',
    borderRadius: 10,
  },

  subText: {
    fontSize: 11,
    color: '#666',
  },

  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },

  freezeBtn: {
    // backgroundColor: '#dc2626',
    // padding: 12,
    // borderRadius: 10,
  },

  freezeText: {
    color: '#fff',
    fontWeight: '600',
  },

  sendBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 12,
    borderRadius: 10,
  },

  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});