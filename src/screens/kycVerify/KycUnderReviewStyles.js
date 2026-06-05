import { StyleSheet, Dimensions } from 'react-native';
 
const { width } = Dimensions.get('window');
 
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
    paddingHorizontal: 24,
    backgroundColor: '#120022',
    paddingBottom: 30,
  },
 
  header: {
    marginBottom: 30,
  },
 
  loaderWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
 
  loaderOuter: {
    width: width * 0.26,
    height: width * 0.26,
    borderRadius: width * 0.13,
    borderWidth: 12,
    borderColor: 'rgba(255,255,255,0.2)',
    borderTopColor: '#fff',
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  loaderInner: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    backgroundColor: '#4B0082',
  },
 
  kycText: {
    color: '#00FFD1',
    fontSize: 14,
    marginTop: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
 
  title: {
    color: '#fff',
    fontSize: width * 0.085,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 35,
  },
 
  subTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 28,
    marginTop: 18,
    opacity: 0.9,
    paddingHorizontal: 10,
  },
 
  card: {
    backgroundColor: '#7B2CFF',
    borderRadius: 28,
    padding: 24,
    marginTop: 50,
    marginBottom: 20,
  },
 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
});
 
export default styles;