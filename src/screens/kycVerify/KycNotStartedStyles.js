import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#120022',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#120022',
  },

  header: {
    marginTop: 10,
    marginBottom: 30,
  },

  loaderWrapper: {
    alignItems: 'center',
  },

  loaderOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: 'rgba(255,255,255,0.2)',
    borderTopColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4B0082',
    justifyContent: 'center',
    alignItems: 'center',
  },

  kycText: {
    color: '#FFB84D',
    fontSize: 14,
    marginTop: 16,
    fontWeight: '500',
  },

  title: {
    color: '#fff',
    fontSize: width * 0.085,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 32,
  },

  subTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 16,
    opacity: 0.9,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: '#7B2CFF',
    borderRadius: 28,
    padding: 24,
    marginTop: 40,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  leftText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },

  completedText: {
    color: '#00FFD1',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },

  pendingText: {
    color: '#E5D8FF',
    fontSize: 16,
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});