
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   Platform,
//   ScrollView,
//   ToastAndroid,
//   Alert,
// } from 'react-native';

// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import Clipboard from '@react-native-clipboard/clipboard';
// import api from '../api/axios';
// import BottomNav from './components/bottomNav';
// import Icon from 'react-native-vector-icons/Feather';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // 1. Importing responsive utilities
// import {
//   scale,
//   verticalScale,
//   moderateScale,
// } from '../utils/responsive';

// // 2. Importing theme
// import { theme } from '../MainTheme/theme';

// const Receive = ({ navigation }) => {
//   const [qr, setQr] = useState(null);
//   const [address, setAddress] = useState('');
//   const [timer, setTimer] = useState(900);
//   const [loading, setLoading] = useState(true);

//   const intervalRef = useRef(null);

//   const fetchQr = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get('api/wallet/generate-address');
//       const data = res.data;

//       const qrImage = data.qr?.startsWith('data:image')
//         ? data.qr
//         : `data:image/png;base64,${data.qr}`;

//       setQr(qrImage);
//       setAddress(data.address || 'No Address');

//       setTimer(900);
//       setLoading(false);
//     } catch (err) {
//       console.log('QR ERROR:', err.response?.data || err.message);
//       setQr(null);
//       setAddress('');
//       setTimer(0);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQr();
//   }, []);

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalRef.current);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(intervalRef.current);
//   }, []);

//   useEffect(() => {
//     if (timer === 0 && !loading) {
//       fetchQr();
//     }
//   }, [timer]);

//   const handleCopy = () => {
//     Clipboard.setString(address);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Address copied', ToastAndroid.SHORT);
//     } else {
//       Alert.alert('Copied', 'Address copied');
//     }
//   };

//   const handleShare = async () => {
//     try {
//       if (!qr) return;

//       const base64Data = qr.replace(/^data:image\/png;base64,/, '');
//       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

//       await RNFS.writeFile(filePath, base64Data, 'base64');

//       await Share.open({
//         url: 'file://' + filePath,
//         message: `Send PAYO to this address:\n${address}`,
//       });
//     } catch (error) {
//       console.log('Share error:', error);
//     }
//   };

//   const formatTime = () => {
//     const m = Math.floor(timer / 60);
//     const s = timer % 60;
//     return `${m}:${s < 10 ? '0' : ''}${s}`;
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             style={styles.backBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Icon
//               name="chevron-left"
//               size={moderateScale(28)}
//               color={theme.colors.textMain}
//             />
//           </TouchableOpacity>

//           <Text style={styles.header}>Receive Payo</Text>
//         </View>

//         <View style={styles.qrContainer}>
//           {loading ? (
//             <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
//           ) : qr ? (
//             <Image source={{ uri: qr }} style={styles.qrImage} />
//           ) : (
//             <Text style={styles.errorText}>Failed to load QR</Text>
//           )}
//         </View>

//         <View style={styles.addressCard}>
//           <Text style={styles.label}>WALLET ADDRESS</Text>

//           <Text
//             style={styles.address}
//             numberOfLines={2}
//           >
//             {address}
//           </Text>
//         </View>

//         <View style={styles.buttonRow}>
//           <TouchableOpacity
//             style={styles.actionBtn}
//             onPress={handleCopy}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.actionText}>Copy address </Text>
//             <Icon name="copy" size={moderateScale(16)} color={theme.colors.textMain} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionBtn}
//             onPress={handleShare}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.actionText}>Share address </Text>
//             <Icon name="share" size={moderateScale(16)} color={theme.colors.textMain} />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.timer}>
//           QR expires in {formatTime()} sec
//         </Text>

//         <TouchableOpacity onPress={fetchQr} activeOpacity={0.6}>
//           <Text style={styles.regenerate}>Regenerate</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <BottomNav navigation={navigation} />
//     </SafeAreaView>
//   );
// };

// export default Receive;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp, // Clean white/light background
//   },

//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingTop: verticalScale(16),
//     paddingBottom: verticalScale(100), // padding for bottom nav
//     paddingHorizontal: scale(16),
//   },

//   headerRow: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(24),
//   },

//   backBtn: {
//     paddingRight: scale(16),
//   },

//   header: {
//     fontSize: moderateScale(18),
//     fontWeight: theme.typography.weight.medium || '500',
//     color: theme.colors.textMain, // Dark text
//   },

//   qrContainer: {
//     backgroundColor: '#ffffff', // White box for QR
//     padding: scale(16),
//     borderRadius: theme.borderRadius.xl || 24,
//     borderWidth: 1,
//     borderColor: '#e5e7eb', // Light outline
//     width: scale(260),
//     height: scale(260),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(40),
//     ...theme.shadows.sm, // Subtle shadow for depth
//   },

//   qrImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },

//   addressCard: {
//     width: '100%',
//     backgroundColor: '#f0f9ff', // Very light blue background
//     padding: scale(16),
//     borderRadius: theme.borderRadius.md || 12,
//     borderWidth: 1,
//     borderColor: theme.colors.primaryBlue, // Blue dashed border
//     borderStyle: 'dashed',
//     marginBottom: verticalScale(20),
//   },

//   label: {
//     fontSize: moderateScale(11),
//     fontWeight: theme.typography.weight.semibold || '600',
//     color: theme.colors.primaryBlue, // Blue label
//     marginBottom: verticalScale(8),
//     textTransform: 'uppercase',
//   },

//   address: {
//     fontSize: moderateScale(14),
//     fontWeight: theme.typography.weight.medium || '500',
//     color: theme.colors.textMain,
//   },

//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: verticalScale(32),
//     gap: scale(12),
//   },

//   actionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//     paddingVertical: verticalScale(14),
//     paddingHorizontal: scale(12),
//     borderRadius: theme.borderRadius.md || 12,
//     borderWidth: 1,
//     borderColor: theme.colors.textMuted || '#6b7280', // Dashed gray outline
//     borderStyle: 'dashed',
//     flex: 1,
//   },

//   actionText: {
//     color: theme.colors.textMain, // Dark text
//     fontSize: moderateScale(13),
//     fontWeight: theme.typography.weight.medium || '500',
//   },

//   timer: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(13),
//     marginBottom: verticalScale(16),
//     textAlign: 'center',
//   },

//   regenerate: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(14),
//     fontWeight: theme.typography.weight.medium || '500',
//   },

//   errorText: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(14),
//   },
// });

//////////////////////////////////////////////////////////


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';

// 1. Importing responsive utilities from your project structure
import {
  scale,
  verticalScale,
  moderateScale,
} from '../utils/responsive';

// 2. Importing theme
import { theme } from '../MainTheme/theme';

const ReferEarn = ({ navigation }) => {
  const referralCode = 'PAYO7630';
  const totalReferrals = 6;
  const totalRewards = 100;

  const handleCopy = () => {
    Clipboard.setString(referralCode);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Referral code copied!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Referral code copied to clipboard');
    }
  };

  const handleShare = async () => {
    try {
      await Share.open({
        message: `Join PAYO and earn rewards! Use my referral code: ${referralCode} to get started.`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#F4F8F6" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon
              name="chevron-left"
              size={moderateScale(24)}
              color="#285CE0"
            />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Refer and Earn</Text>
            <Text style={styles.headerSubtitle}>Refer PAYO and earn rewards</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
          
          style={styles.profileBtn} activeOpacity={0.7}>
            <Icon name="user" size={moderateScale(20)} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Hero Banner Section */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/images/addBankdetails/Refer and earn 2 1.png')} // Replace with your exact graphic asset path
            style={styles.heroImage}
          />
        </View>

        {/* Earn Promo Banner Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Earn 50 PAYO</Text>
            <Text style={styles.promoSubtitle}>
              For every friend who joins payo and completes their first transaction
            </Text>
          </View>
          <View style={styles.giftIconContainer}>
            {/* Elegant gift box container fallback if asset not present */}
            {/* <Icon name="gift" size={moderateScale(32)} color="#FFD700" />
             */}
                <Image
            source={require('../../assets/images/addBankdetails/Text.png')} // Replace with your exact graphic asset path
            style={styles.heroImage}
          />
          </View>
        </View>

        {/* Referral Code Box */}
        <View style={styles.referralBox}>
          <View style={styles.giftBoxIconBg}>
            <Icon name="gift" size={moderateScale(22)} color="#7F3DFF" />
          </View>
          <View style={styles.referralCodeTextContainer}>
            <Text style={styles.referralLabel}>Your Referral Code</Text>
            <Text style={styles.referralCode}>{referralCode}</Text>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCopy} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>Copy address</Text>
            <Icon name="copy" size={moderateScale(16)} color="#333" style={styles.actionBtnIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>Share address</Text>
            <Icon name="external-link" size={moderateScale(16)} color="#333" style={styles.actionBtnIcon} />
          </TouchableOpacity>
        </View>

        {/* Statistics Row (Referrals & Rewards) */}
        <View style={styles.statsCard}>
          <View style={styles.statsColumn}>
              <Image 
            source={require('../../assets/images/addBankdetails/wallet (2).png')}  
             style={styles.statsIcon}
            />
            <View>
              <Text style={styles.statsLabel}>Total Referrals</Text>
              <Text style={styles.statsValue}>{totalReferrals}</Text>
            </View>
          </View>
          
          <View style={styles.statsDivider} />

          <View style={styles.statsColumn}>
            <Image 
            source={require('../../assets/images/addBankdetails/Coins.png')} // Replace with your exact graphic asset path
            
            style={styles.statsIcon} />
            <View>
              <Text style={styles.statsLabel}>Total Rewards</Text>
              <Text style={styles.statsValue}>{totalRewards}</Text>
            </View>
          </View>
        </View>

        {/* Instructions Panel "How it Works" */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsHeader}>How it works :</Text>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>1. Share your referral code:</Text>
            <Text style={styles.stepDesc}>Invite friends to join PAYO.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>2. Friend completes KYC:</Text>
            <Text style={styles.stepDesc}>Securely verify their account.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>3. First transaction completed:</Text>
            <Text style={styles.stepDesc}>Receive 50 PAYO instantly in your wallet.</Text>
          </View>
        </View>

        {/* Disclaimer Banner Card */}
        <View style={styles.disclaimerCard}>
          <Icon name="info" size={moderateScale(20)} color="#7F3DFF" />
          <Text style={styles.disclaimerText}>
            The PAYO amount you receive may vary slightly due to market fluctuations
          </Text>
              <Image 
            source={require('../../assets/images/addBankdetails/wallet (1).png')} // Replace with your exact graphic asset path
            
            style={styles.bottom} />
          {/* <Icon name="pocket" size={moderateScale(24)} color="#7F3DFF" /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferEarn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F8F6',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },

  // Header Setup
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50),
    // marginTop: verticalScale(),
  },
  backBtn: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1D21',
  },
  headerSubtitle: {
    fontSize: moderateScale(12),
    color: '#848D9A',
    marginTop: verticalScale(2),
  },
  profileBtn: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(21),
    backgroundColor: '#285CE0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Hero Image Banner Frame
  heroContainer: {
    width: '100%',
    height: verticalScale(270),
    borderWidth: 0.1,
    // borderColor: '#2962FF',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    marginTop: verticalScale(20),
    backgroundColor: '#FFF',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Promotion Information Banner Card
  promoCard: {
    backgroundColor: '#5655FF',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(17),
    ...Platform.select({
      ios: {
        shadowColor: '#5655FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  promoTextContainer: {
    flex: 0.8,
  },
  promoTitle: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#FFF',
    marginBottom: verticalScale(4),
  },
  promoSubtitle: {
    fontSize: moderateScale(12),
    color: '#E0E0FF',
    lineHeight: moderateScale(16),
  },
  giftIconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Referral Code Input Container
  referralBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#adadad',
    borderStyle: 'dashed',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: verticalScale(20),
  },
  giftBoxIconBg: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(12),
    backgroundColor: '#f3ecff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  referralCodeTextContainer: {
    flex: 1,
  },
  referralLabel: {
    fontSize: moderateScale(12),
    color: '#7F3DFF',
    fontWeight: '600',
  },
  referralCode: {
    fontSize: moderateScale(16),
    color: '#1A1D21',
    fontWeight: '800',
    marginTop: verticalScale(2),
  },

  // Action Buttons Setup
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
  },
  actionBtn: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E4E8EE',
    borderRadius: moderateScale(12),
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionBtnText: {
    fontSize: moderateScale(13),
    color: '#333333',
    fontWeight: '600',
  },
  actionBtnIcon: {
    marginLeft: moderateScale(8),
  },

  // Stats Breakdown Styling
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b49dfb',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(16),
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  statsColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsIcon: {
    marginRight: moderateScale(10),
  },
  statsLabel: {
    fontSize: moderateScale(11),
    color: '#6E7179',
    fontWeight: '500',
  },
  statsValue: {
    fontSize: moderateScale(15),
    color: '#285CE0',
    fontWeight: '800',
    marginTop: verticalScale(2),
  },
  statsDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E4DBFF',
  },

  // Instructions Setup
  instructionsCard: {
    backgroundColor: '#F7F8F9',
    borderWidth: 1,
    borderColor: '#E4E8EE',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginTop: verticalScale(20),
  },
  instructionsHeader: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#7F3DFF',
    marginBottom: verticalScale(12),
  },
  stepContainer: {
    marginBottom: verticalScale(14),
  },
  stepTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#1A1D21',
  },
  stepDesc: {
    fontSize: moderateScale(12),
    color: '#6E7179',
    marginTop: verticalScale(2),
    paddingLeft: moderateScale(14),
  },

  // Disclaimer Layout Area
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEBFF',
    borderWidth: 1,
    borderColor: '#D4C9FF',
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    marginTop: verticalScale(20),
  },
  disclaimerText: {
    flex: 1,
    fontSize: moderateScale(11),
    color: '#5E34BA',
    fontWeight: '500',
    lineHeight: moderateScale(16),
    marginHorizontal: moderateScale(12),
  },
  bottom:{
    width:50,
    height:50
  }
});