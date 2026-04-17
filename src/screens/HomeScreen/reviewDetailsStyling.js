import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0033',
    padding: 20,
  },
 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 
  cancel: {
    color: '#ccc',
  },
 
  title: {
    color: '#fff',
    fontWeight: '600',
  },
 
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
 
  avatarText: {
    fontWeight: '600',
  },
 
  label: {
    textAlign: 'center',
    color: '#ccc',
  },
 
  amount: {
    textAlign: 'center',
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    marginVertical: 10,
  },
 
  token: {
    color: '#00ff99',
    fontSize: 14,
  },
 
  section: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingBottom: 10,
  },
 
  smallLabel: {
    color: '#aaa',
    marginBottom: 5,
  },
 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 
  name: {
    color: '#fff',
  },
 
  address: {
    color: '#ccc',
  },
 
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
 
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 20,
    backgroundColor: '#999',
    justifyContent: 'center',
    padding: 3,
  },
 
  toggleActive: {
    backgroundColor: '#00a651',
  },
 
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
 
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
 
  button: {
    backgroundColor: '#00a651',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
 