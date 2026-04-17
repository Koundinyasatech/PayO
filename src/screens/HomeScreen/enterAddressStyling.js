import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a0033',
  },
 
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
 
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#3b008f',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
 
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
 
  activeTab: {
    backgroundColor: '#fff',
  },
 
  tabText: {
    color: '#ccc',
    fontSize: 12,
  },
 
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
 
  label: {
    color: '#ccc',
    marginBottom: 6,
  },
 
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 20,
  },
 
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
 
  amountInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
  },
 
  token: {
    color: '#00ff99',
    fontWeight: '600',
  },
 
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
 
  quickBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
 
  balanceBox: {
    backgroundColor: '#5e2bb8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
 
  balanceText: {
    color: '#ddd',
    fontSize: 12,
  },
 
  balanceAmount: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
  },
 
  button: {
    backgroundColor: '#00a651',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
 
  placeholder: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
  },
});
 