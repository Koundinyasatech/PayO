import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#120022',
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    padding: 22,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  heading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  subText: {
    color: '#ddd',
    marginTop: 20,
    lineHeight: 22,
    fontSize: 14,
  },

  label: {
    color: '#fff',
    marginTop: 25,
    marginBottom: 16,
    fontSize: 12,
  },

  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  tabButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#fff',
  },

  tabText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  activeTabText: {
    color: '#5A00D1',
  },

  inputBox: {
    height: 58,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 18,
    marginBottom: 25,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#13F5C5',
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
    backgroundColor: '#7B2CFF',
    marginBottom: 28,
  },

  uploadIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#13F5C5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  uploadTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  uploadInfo: {
    color: '#E6D8FF',
    fontSize: 13,
  },

  fileName: {
    color: '#fff',
    marginTop: 18,
    fontSize: 13,
    fontWeight: '600',
  },

  faceBox: {
    borderWidth: 3,
    borderColor: '#11CFFF',
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#5B1DD6',
  },

  faceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  faceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  faceSub: {
    color: '#ddd',
    marginTop: 8,
    fontSize: 13,
  },

  cameraBtn: {
    backgroundColor: '#11CFFF',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 18,
    alignItems: 'center',
  },

  cameraBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  instructions: {
    marginTop: 20,
  },

  instructionText: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 13,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 10,
  },

  checkboxText: {
    color: '#fff',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },

  submitBtn: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 40,
  },

  submitBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;