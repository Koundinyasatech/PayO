// import { StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// export default StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#120022',
//   },

//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: 30,
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     backgroundColor: '#120022',
//   },

//   header: {
//     marginTop: 10,
//     marginBottom: 30,
//   },

//   loaderWrapper: {
//     alignItems: 'center',
//   },

//   loaderOuter: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 8,
//     borderColor: 'rgba(255,255,255,0.2)',
//     borderTopColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   loaderInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#4B0082',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   kycText: {
//     color: '#FFB84D',
//     fontSize: 14,
//     marginTop: 16,
//     fontWeight: '500',
//   },

//   title: {
//     color: '#fff',
//     fontSize: width * 0.085,
//     textAlign: 'center',
//     fontWeight: '600',
//     marginTop: 32,
//   },

//   subTitle: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     lineHeight: 26,
//     marginTop: 16,
//     opacity: 0.9,
//     paddingHorizontal: 10,
//   },

//   card: {
//     backgroundColor: '#7B2CFF',
//     borderRadius: 28,
//     padding: 24,
//     marginTop: 40,
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 22,
//   },

//   leftText: {
//     color: '#fff',
//     fontSize: 16,
//     flex: 1,
//   },

//   completedText: {
//     color: '#00FFD1',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 10,
//   },

//   pendingText: {
//     color: '#E5D8FF',
//     fontSize: 16,
//     marginLeft: 10,
//   },

//   button: {
//     backgroundColor: '#8B5CF6',
//     paddingVertical: 16,
//     borderRadius: 14,
//     alignItems: 'center',
//     marginTop: 28,
//     marginBottom: 20,
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });






import { StyleSheet, Dimensions, Platform } from 'react-native';

// Import your existing theme and responsive utilities
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    backgroundColor: theme.colors.bgApp,
  },

  header: {
    marginTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
    marginBottom: verticalScale(30),
  },

  loaderWrapper: {
    alignItems: 'center',
  },

  loaderOuter: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: scale(8),
    borderColor: '#E5E7EB', // Light grey track
    borderTopColor: theme.colors.primaryBlue, // Blue indicator
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderInner: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(27),
    backgroundColor: '#F0F4FF', // Very light blue inner circle
    justifyContent: 'center',
    alignItems: 'center',
  },

  kycStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },

  kycStatusDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#F59E0B', // Amber/Warning dot
    marginRight: scale(6),
  },

  kycText: {
    color: '#F59E0B', // Amber text to indicate action needed
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.medium,
  },

  title: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.xl || scale(24),
    textAlign: 'center',
    fontWeight: theme.typography.weight.bold,
    marginTop: verticalScale(24),
  },

  subTitle: {
    color: theme.colors.textMuted || '#6B7280',
    textAlign: 'center',
    fontSize: theme.typography.size.sm || scale(14),
    lineHeight: scale(22),
    marginTop: verticalScale(12),
    paddingHorizontal: scale(10),
  },

  card: {
    backgroundColor: '#F0F4FF', // Light blue inner box as requested
    borderRadius: theme.borderRadius.xl || 24,
    padding: scale(24),
    marginTop: verticalScale(40),
    borderWidth: 1,
    borderColor: 'rgba(40, 92, 224, 0.1)', // Very subtle blue border
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(22),
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  listBullet: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: theme.colors.primaryBlue,
    marginRight: scale(10),
  },

  leftText: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.medium,
  },

  completedText: {
    color: theme.colors.statusSuccess,
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.semibold,
  },

  pendingText: {
    color: theme.colors.textMuted || '#6B7280',
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.medium,
  },

  button: {
    backgroundColor: theme.colors.primaryBlue || '#285CE0', // Blue button as requested
    height: scale(52),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
  },

  buttonText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.semibold,
  },
});

export default styles;