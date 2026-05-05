import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
 
  back: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000',
  },
 
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6D28D9',
    textAlign: 'center',
    marginBottom: 10,
  },
 
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
 
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#333',
  },
 
  /* 🔥 INPUT WITH BUTTON INSIDE */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    paddingRight: 5,
  },
 
  textInput: {
    flex: 1,
    padding: 15,
    color: '#000',
  },
 
  inlineBtn: {
    backgroundColor: '#6D28D9',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
 
  inlineBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
 
  /* NORMAL INPUT */
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
 
  button: {
    backgroundColor: '#0A8F3C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});