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
// import LinearGradient from 'react-native-linear-gradient';
// import Clipboard from '@react-native-clipboard/clipboard';
// import api from '../api/axios';
// import BottomNav from './components/bottomNav';
// import Icon from 'react-native-vector-icons/Feather';

// import { SafeAreaView } from 'react-native-safe-area-context';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

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
//     <LinearGradient
//       colors={['#5B21B6', '#2E1065', '#0F021F']}
//       style={styles.gradient}
//     >
//       <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//         <ScrollView
//           contentContainerStyle={styles.container}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.headerRow}>
//             <TouchableOpacity
//               style={styles.backBtn}
//               onPress={() => navigation.goBack()}
//             >
//               <Icon
//                 name="chevron-left"
//                 size={moderateScale(28)}
//                 color="#ffffff"
//               />
//             </TouchableOpacity>

//             <Text style={styles.header}>Receive</Text>
//           </View>

//           <View style={styles.qrContainer}>
//             {loading ? (
//               <ActivityIndicator size="large" color="#6A0DAD" />
//             ) : qr ? (
//               <Image source={{ uri: qr }} style={styles.qrImage} />
//             ) : (
//               <Text style={styles.errorText}>Failed to load QR</Text>
//             )}
//           </View>

//           <View style={styles.addressCard}>
//             <Text style={styles.label}>WALLET ADDRESS</Text>

//             <Text
//               style={styles.address}
//               numberOfLines={2}
//             >
//               {address}
//             </Text>
//           </View>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={handleCopy}
//             >
//               <Icon name="copy" size={18} color="#fff" />
//               <Text style={styles.actionText}> Copy address</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={handleShare}
//             >
//               <Icon name="share-2" size={18} color="#fff" />
//               <Text style={styles.actionText}> Share address</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.timer}>
//             QR expires in {formatTime()} sec
//           </Text>

//           <TouchableOpacity onPress={fetchQr}>
//             <Text style={styles.regenerate}>Regenerate</Text>
//           </TouchableOpacity>
//         </ScrollView>

//         <BottomNav navigation={navigation} />
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default Receive;

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },

//   safeArea: {
//     flex: 1,
//   },

//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingTop: hp('2%'),
//     paddingBottom: hp('18%'),
//     paddingHorizontal: wp('4%'),
//   },

//   headerRow: {
//     width: '100%',
//     minHeight: hp('7%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },

//   backBtn: {
//     position: 'absolute',
//     left: wp('2%'),
//   },

//   header: {
//     fontSize: moderateScale(20),
//     fontWeight: '600',
//     color: '#fff',
//   },

//   qrContainer: {
//     backgroundColor: '#F2F2F2',
//     padding: wp('4%'),
//     borderRadius: moderateScale(26),
//     width: wp('68%'),
//     height: wp('68%'),
//     minWidth: 240,
//     minHeight: 240,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: hp('4%'),
//     marginBottom: hp('3%'),
//   },

//   qrImage: {
//     width: '88%',
//     height: '88%',
//     resizeMode: 'contain',
//   },

//   addressCard: {
//     width: '90%',
//     backgroundColor: '#7C3AED',
//     padding: wp('4.5%'),
//     borderRadius: moderateScale(14),
//     borderWidth: 1,
//     borderColor: '#C4B5FD',
//     borderStyle: 'dashed',
//     marginBottom: hp('3%'),
//   },

//   label: {
//     fontSize: moderateScale(12),
//     color: '#E9D5FF',
//     marginBottom: hp('0.8%'),
//   },

//   address: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     color: '#fff',
//   },

//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%',
//     marginBottom: hp('3%'),
//     flexWrap: 'wrap',
//   },

//   actionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8B5CF6',
//     paddingVertical: hp('1.6%'),
//     paddingHorizontal: wp('4%'),
//     borderRadius: moderateScale(12),
//     flex: 1,
//     marginHorizontal: wp('1%'),
//     minWidth: wp('40%'),
//     marginBottom: hp('1%'),
//   },

//   actionText: {
//     color: '#fff',
//     fontSize: moderateScale(13),
//     fontWeight: '500',
//   },

//   timer: {
//     color: '#E9D5FF',
//     fontSize: moderateScale(14),
//     marginBottom: hp('1.5%'),
//     textAlign: 'center',
//   },

//   regenerate: {
//     color: '#E9D5FF',
//     fontSize: moderateScale(14),
//     textDecorationLine: 'underline',
//   },

//   errorText: {
//     color: '#ccc',
//     fontSize: moderateScale(13),
//   },
// });







import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import api from '../api/axios';
import BottomNav from './components/bottomNav';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Importing responsive utilities
import {
  scale,
  verticalScale,
  moderateScale,
} from '../utils/responsive';

// 2. Importing theme
import { theme } from '../MainTheme/theme';

const Receive = ({ navigation }) => {
  const [qr, setQr] = useState(null);
  const [address, setAddress] = useState('');
  const [timer, setTimer] = useState(900);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef(null);

  const fetchQr = async () => {
    try {
      setLoading(true);

      const res = await api.get('api/wallet/generate-address');
      const data = res.data;

      const qrImage = data.qr?.startsWith('data:image')
        ? data.qr
        : `data:image/png;base64,${data.qr}`;

      setQr(qrImage);
      setAddress(data.address || 'No Address');

      setTimer(900);
      setLoading(false);
    } catch (err) {
      console.log('QR ERROR:', err.response?.data || err.message);
      setQr(null);
      setAddress('');
      setTimer(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQr();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timer === 0 && !loading) {
      fetchQr();
    }
  }, [timer]);

  const handleCopy = () => {
    Clipboard.setString(address);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Address copied', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Address copied');
    }
  };

  const handleShare = async () => {
    try {
      if (!qr) return;

      const base64Data = qr.replace(/^data:image\/png;base64,/, '');
      const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

      await RNFS.writeFile(filePath, base64Data, 'base64');

      await Share.open({
        url: 'file://' + filePath,
        message: `Send PAYO to this address:\n${address}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="chevron-left"
              size={moderateScale(28)}
              color={theme.colors.textMain}
            />
          </TouchableOpacity>

          <Text style={styles.header}>Receive Payo</Text>
        </View>

        <View style={styles.qrContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
          ) : qr ? (
            <Image source={{ uri: qr }} style={styles.qrImage} />
          ) : (
            <Text style={styles.errorText}>Failed to load QR</Text>
          )}
        </View>

        <View style={styles.addressCard}>
          <Text style={styles.label}>WALLET ADDRESS</Text>

          <Text
            style={styles.address}
            numberOfLines={2}
          >
            {address}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleCopy}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>Copy address </Text>
            <Icon name="copy" size={moderateScale(16)} color={theme.colors.textMain} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>Share address </Text>
            <Icon name="share" size={moderateScale(16)} color={theme.colors.textMain} />
          </TouchableOpacity>
        </View>

        <Text style={styles.timer}>
          QR expires in {formatTime()} sec
        </Text>

        <TouchableOpacity onPress={fetchQr} activeOpacity={0.6}>
          <Text style={styles.regenerate}>Regenerate</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default Receive;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white/light background
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(100), // padding for bottom nav
    paddingHorizontal: scale(16),
  },

  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },

  backBtn: {
    paddingRight: scale(16),
  },

  header: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.medium || '500',
    color: theme.colors.textMain, // Dark text
  },

  qrContainer: {
    backgroundColor: '#ffffff', // White box for QR
    padding: scale(16),
    borderRadius: theme.borderRadius.xl || 24,
    borderWidth: 1,
    borderColor: '#e5e7eb', // Light outline
    width: scale(260),
    height: scale(260),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
    ...theme.shadows.sm, // Subtle shadow for depth
  },

  qrImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  addressCard: {
    width: '100%',
    backgroundColor: '#f0f9ff', // Very light blue background
    padding: scale(16),
    borderRadius: theme.borderRadius.md || 12,
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue, // Blue dashed border
    borderStyle: 'dashed',
    marginBottom: verticalScale(20),
  },

  label: {
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.semibold || '600',
    color: theme.colors.primaryBlue, // Blue label
    marginBottom: verticalScale(8),
    textTransform: 'uppercase',
  },

  address: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.medium || '500',
    color: theme.colors.textMain,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: verticalScale(32),
    gap: scale(12),
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(12),
    borderRadius: theme.borderRadius.md || 12,
    borderWidth: 1,
    borderColor: theme.colors.textMuted || '#6b7280', // Dashed gray outline
    borderStyle: 'dashed',
    flex: 1,
  },

  actionText: {
    color: theme.colors.textMain, // Dark text
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },

  timer: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(13),
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },

  regenerate: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.medium || '500',
  },

  errorText: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(14),
  },
});