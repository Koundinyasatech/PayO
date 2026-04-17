import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
 
  cancel: {
    color: '#333',
  },
 
  logo: {
    color: '#6a0dad',
    fontWeight: '700',
  },
 
  details: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
 
  label: {
    color: '#888',
    fontSize: 12,
  },
 
  value: {
    color: '#000',
    marginBottom: 10,
  },
 
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 
  amount: {
    color: '#00a651',
    fontWeight: '600',
  },
 
  pinTitle: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
  },
 
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
 
  pinBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  pinText: {
    fontSize: 18,
  },
 
  warning: {
    backgroundColor: '#ffe4b5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
 
  warningText: {
    fontSize: 12,
    color: '#333',
  },
 
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
 
  key: {
    width: '30%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
  },
 
  keyText: {
    fontSize: 18,
  },
 
  submit: {
    width: '30%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#1f7a3f',
    borderRadius: 10,
    alignItems: 'center',
  },
 
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
});
 