import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  card: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  loader: {
    fontSize: 24,
    marginBottom: 20,
  },
 
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
 
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
});
 