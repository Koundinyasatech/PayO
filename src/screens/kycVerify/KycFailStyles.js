// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F3F3F3',
//   },

//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 28,
//     backgroundColor: '#F3F3F3',
//   },

//   iconWrapper: {
//     marginBottom: 40,
//   },

//   warningBox: {
//     width: 120,
//     height: 120,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   title: {
//     color: '#FF1F1F',
//     fontSize: 26,
//     textAlign: 'center',
//     fontWeight: '500',
//     lineHeight: 44,
//     marginBottom: 28,
//   },

//   subTitle: {
//     color: '#444',
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//   },

//   instructions: {
//     color: '#555',
//     fontSize: 16,
//     textAlign: 'center',
//     lineHeight: 28,
//     marginBottom: 60,
//   },

//   retryBtn: {
//     width: '100%',
//     backgroundColor: '#009933',
//     paddingVertical: 10,
//     borderRadius: 14,
//     alignItems: 'center',
//     marginBottom: 22,
//   },

//   retryBtnText: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: '600',
//   },

//   supportBtn: {
//     width: '100%',
//     borderWidth: 1.5,
//     borderColor: '#009933',
//     paddingVertical: 10,
//     borderRadius: 14,
//     alignItems: 'center',
//   },

//   supportBtnText: {
//     color: '#009933',
//     fontSize: 22,
//     fontWeight: '500',
//   },
// });

// export default styles;




import { StyleSheet, Platform, Dimensions } from 'react-native';

// Import your existing theme and responsive utilities
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp || '#ffffff',
  },

  mainWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden', // Prevents the tall image from messing up the screen boundaries
  },

  wavesBg: {
    position: 'absolute',
    bottom: -75,
    left: 0,
    width: width,
    // By giving it a height 2.5x the screen width, 'contain' will fill the screen horizontally.
    // The empty transparent top of the image will simply go up behind the text.
    height: width * 2.5, 
    resizeMode: 'contain', 
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
    backgroundColor: 'transparent',
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(40), // Slightly bumps the content up from the buttons
  },

  warningIcon: {
    width: scale(80),
    height: scale(80),
    resizeMode: 'contain',
    marginBottom: verticalScale(24),
  },

  title: {
    color: '#FF1F1F', // Red error color from your Figma design
    fontSize: theme.typography.size.lg || scale(20),
    textAlign: 'center',
    fontWeight: theme.typography.weight.semibold,
    lineHeight: scale(28),
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(10),
  },

  subTitle: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    textAlign: 'center',
    marginBottom: verticalScale(4),
  },

  instructions: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    textAlign: 'center',
    lineHeight: scale(22),
  },

  buttonContainer: {
    width: '100%',
    marginBottom: verticalScale(40),
  },

  retryBtn: {
    width: '100%',
    backgroundColor: theme.colors.statusSuccess || '#009933',
    height: scale(52),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  retryBtnText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.semibold,
  },

  supportBtn: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: theme.colors.statusSuccess || '#009933',
    height: scale(52),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  supportBtnText: {
    color: theme.colors.statusSuccess || '#009933',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.medium,
  },
});

export default styles;