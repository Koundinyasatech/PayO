// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ScrollView,
// //   ActivityIndicator,
// //   ToastAndroid,
// //   Platform,
// // } from 'react-native';

// // import LinearGradient from 'react-native-linear-gradient';
// // import Icon from 'react-native-vector-icons/Feather';
// // import api from '../../api/axios';
// // import styles from './WalletScreenStyles';
// // import Header from '../components/header';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import Clipboard from '@react-native-clipboard/clipboard';
// // import Share from 'react-native-share';
// // import RNFS from 'react-native-fs';

// // export default function WalletScreen({
// //   navigation,
// // }) {
// //   const [wallet, setWallet] =
// //     useState(null);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [qr, setQr] =
// //     useState(null);

// //   const [address, setAddress] =
// //     useState('');

// //   useEffect(() => {
// //     fetchWallet();
// //   }, []);

// //   const fetchWallet = async () => {
// //     try {
// //       const res = await api.get(
// //         '/api/wallet/getwalletdashboard',
// //       );

// //       setWallet(res?.data);
// //     } catch (error) {
// //       console.log(
// //         'Wallet API error:',
// //         error?.response ||
// //         error.message,
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const progress =
// //     wallet?.dailyLimit > 0
// //       ? ((wallet?.dailyUsed || 0) /
// //         wallet?.dailyLimit) *
// //       100
// //       : 0;

// //   const fetchQr = async () => {
// //     try {
// //       const res = await api.get(
// //         'api/wallet/generate-address',
// //       );

// //       const data = res.data;

// //       const qrImage =
// //         data.qr?.startsWith(
// //           'data:image',
// //         )
// //           ? data.qr
// //           : `data:image/png;base64,${data.qr}`;

// //       setQr(qrImage);
// //       setAddress(data.address);

// //       return {
// //         qrImage,
// //         address: data.address,
// //       };
// //     } catch (err) {
// //       console.log(
// //         'QR ERROR:',
// //         err.message,
// //       );
// //       return null;
// //     }
// //   };

// //   const handleCopy = () => {
// //     const walletAddress =
// //       wallet?.id;

// //     if (!walletAddress) return;

// //     Clipboard.setString(
// //       walletAddress,
// //     );

// //     if (Platform.OS === 'android') {
// //       ToastAndroid.show(
// //         'Address copied',
// //         ToastAndroid.SHORT,
// //       );
// //     }
// //   };

// //   const handleShare = async () => {
// //     try {
// //       const result =
// //         await fetchQr();

// //       if (!result) return;

// //       const {
// //         qrImage,
// //         address,
// //       } = result;

// //       const base64Data =
// //         qrImage.replace(
// //           /^data:image\/png;base64,/,
// //           '',
// //         );

// //       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

// //       await RNFS.writeFile(
// //         filePath,
// //         base64Data,
// //         'base64',
// //       );

// //       await Share.open({
// //         url: 'file://' + filePath,
// //         message: `Send PAYO to this address:\n${address}`,
// //       });
// //     } catch (error) {
// //       console.log(
// //         'Share error:',
// //         error,
// //       );
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <LinearGradient
// //         colors={[
// //           '#7B2CFF',
// //           '#1C0033',
// //         ]}
// //         style={styles.loader}>
// //         <ActivityIndicator
// //           size="large"
// //           color="#fff"
// //         />
// //       </LinearGradient>
// //     );
// //   }

// //   return (
// //     <LinearGradient
// //       colors={[
// //         '#7B2CFF',
// //         '#1C0033',
// //       ]}
// //       style={{ flex: 1 }}>
// //       <SafeAreaView
// //         style={{ flex: 1 }}
// //         edges={['top']}>
// //         <ScrollView
// //           showsVerticalScrollIndicator={false}
// //           keyboardShouldPersistTaps="handled"
// //           contentContainerStyle={styles.scrollContent}>
// //           <View style={styles.walletHeader}>
// //             <View style={styles.headerLeft}>
// //               <TouchableOpacity
// //                 style={
// //                   styles.cancelContainer
// //                 }
// //                 activeOpacity={0.8}
// //                 onPress={() =>
// //                   navigation.goBack()
// //                 }>
// //                 <Icon
// //                   name="chevron-left"
// //                   size={28}
// //                   color="#ffffff"
// //                 />
// //               </TouchableOpacity>

// //               <View>
// //                 <Text
// //                   style={
// //                     styles.walletTitle
// //                   }>
// //                   My Wallet
// //                 </Text>

// //                 <Text
// //                   style={
// //                     styles.walletId
// //                   }
// //                   numberOfLines={1}>
// //                   {wallet?.id}
// //                 </Text>
// //               </View>
// //             </View>

// //             <Header type="" />
// //           </View>

// //           <View style={styles.card}>
// //             <Text style={styles.active}>
// //               • Active Wallet
// //             </Text>

// //             <Text style={styles.label}>
// //               Total Balance
// //             </Text>

// //             <Text style={styles.balance}>
// //               {wallet?.balance?.toLocaleString()}
// //               <Text
// //                 style={{
// //                   fontSize: 16,
// //                   color: '#74FFA3',
// //                 }}>
// //                 {' '}
// //                 PAYO
// //               </Text>
// //             </Text>

// //             <View style={styles.actions}>
// //               <TouchableOpacity
// //                 style={
// //                   styles.btnWhite
// //                 }
// //                 activeOpacity={0.8}
// //                 onPress={
// //                   handleCopy
// //                 }>
// //                 <Text>
// //                   Copy Address
// //                 </Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity
// //                 style={
// //                   styles.btnOutline
// //                 }
// //                 activeOpacity={0.8}
// //                 onPress={
// //                   handleShare
// //                 }>
// //                 <Text
// //                   style={{
// //                     color:
// //                       '#fff',
// //                   }}>
// //                   Share QR
// //                 </Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>

// //           <View
// //             style={
// //               styles.rowBetween
// //             }>
// //             <Text
// //               style={
// //                 styles.sectionTitle
// //               }>
// //               Token Holdings
// //             </Text>
// //           </View>

// //           <View style={styles.box}>
// //             <View
// //               style={
// //                 styles.rowBetween
// //               }>
// //               <Text
// //                 style={
// //                   styles.boxTitle
// //                 }>
// //                 Referral Rewards
// //               </Text>

// //               <View
// //                 style={{
// //                   alignItems:
// //                     'flex-end',
// //                 }}>
// //                 <Text
// //                   style={
// //                     styles.amount
// //                   }>
// //                   {wallet?.referralRewards ||
// //                     0}{' '}
// //                   PAYO
// //                 </Text>

// //                 <Text
// //                   style={[
// //                     styles.pending,
// //                     {
// //                       color:
// //                         wallet?.referralStatus ===
// //                           'Unlocked'
// //                           ? '#22c55e'
// //                           : '#facc15',
// //                     },
// //                   ]}>
// //                   {
// //                     wallet?.referralStatus
// //                   }
// //                 </Text>
// //               </View>
// //             </View>

// //             {wallet?.referralStatus ===
// //               'Locked' ? (
// //               <Text
// //                 style={
// //                   styles.locked
// //                 }>
// //                 • Unlocks in{' '}
// //                 {
// //                   wallet?.unlockInDays
// //                 }{' '}
// //                 days
// //               </Text>
// //             ) : (
// //               <Text
// //                 style={[
// //                   styles.locked,
// //                   {
// //                     color:
// //                       '#22c55e',
// //                   },
// //                 ]}>
// //                 • Rewards Available
// //               </Text>
// //             )}
// //           </View>

// //           <View style={styles.box}>
// //             <Text
// //               style={
// //                 styles.boxTitle
// //               }>
// //               Daily Transaction
// //               Limit
// //             </Text>

// //             <View
// //               style={
// //                 styles.rowBetween
// //               }>
// //               <Text
// //                 style={
// //                   styles.subText
// //                 }>
// //                 Used{' '}
// //                 {wallet?.dailyUsed ||
// //                   0}
// //               </Text>

// //               <Text
// //                 style={
// //                   styles.subText
// //                 }>
// //                 Limit:{' '}
// //                 {wallet?.dailyLimit ||
// //                   0}
// //               </Text>
// //             </View>

// //             <View
// //               style={
// //                 styles.progressBg
// //               }>
// //               <View
// //                 style={[
// //                   styles.progressFill,
// //                   {
// //                     width: `${Math.min(
// //                       progress,
// //                       100,
// //                     )}%`,
// //                   },
// //                 ]}
// //               />
// //             </View>
// //           </View>

// //           <View
// //             style={
// //               styles.bottomButtons
// //             }>
// //             <TouchableOpacity
// //               style={
// //                 styles.freezeBtn
// //               } />

// //             <TouchableOpacity
// //               style={styles.sendBtn}
// //               activeOpacity={0.8}
// //               onPress={() =>
// //                 navigation.navigate(
// //                   'SendScreen',
// //                 )
// //               }>
// //               <Text
// //                 style={
// //                   styles.sendText
// //                 }>
// //                 Send PAYO
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </ScrollView>
// //       </SafeAreaView>
// //     </LinearGradient>
// //   );
// // }



























// //////////////////////////////////////////////////////////////////////////////////////////////////////



// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ScrollView,
// //   ActivityIndicator,
// //   ToastAndroid,
// //   Platform,
// // } from 'react-native';

// // import LinearGradient from 'react-native-linear-gradient';
// // import Icon from 'react-native-vector-icons/Feather';
// // import api from '../../api/axios';
// // import styles from './WalletScreenStyles';
// // import Header from '../components/header';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import Clipboard from '@react-native-clipboard/clipboard';
// // import Share from 'react-native-share';
// // import RNFS from 'react-native-fs';

// // // 1. Import the AddMoneyModal
// // import AddMoneyModal from '../components/AddMoneyModal'; 

// // export default function WalletScreen({
// //   navigation,
// // }) {
// //   const [wallet, setWallet] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [qr, setQr] = useState(null);
// //   const [address, setAddress] = useState('');
  
// //   // 2. Add state to control modal visibility
// //   const [isModalVisible, setModalVisible] = useState(false);

// //   useEffect(() => {
// //     fetchWallet();
// //   }, []);

// //   const fetchWallet = async () => {
// //     try {
// //       const res = await api.get('/api/wallet/getwalletdashboard');
// //       setWallet(res?.data);
// //     } catch (error) {
// //       console.log(
// //         'Wallet API error:',
// //         error?.response || error.message,
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const progress =
// //     wallet?.dailyLimit > 0
// //       ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
// //       : 0;

// //   const fetchQr = async () => {
// //     try {
// //       const res = await api.get('api/wallet/generate-address');
// //       const data = res.data;

// //       const qrImage = data.qr?.startsWith('data:image')
// //         ? data.qr
// //         : `data:image/png;base64,${data.qr}`;

// //       setQr(qrImage);
// //       setAddress(data.address);

// //       return {
// //         qrImage,
// //         address: data.address,
// //       };
// //     } catch (err) {
// //       console.log('QR ERROR:', err.message);
// //       return null;
// //     }
// //   };

// //   const handleCopy = () => {
// //     const walletAddress = wallet?.id;

// //     if (!walletAddress) return;

// //     Clipboard.setString(walletAddress);

// //     if (Platform.OS === 'android') {
// //       ToastAndroid.show('Address copied', ToastAndroid.SHORT);
// //     }
// //   };

// //   const handleShare = async () => {
// //     try {
// //       const result = await fetchQr();

// //       if (!result) return;

// //       const { qrImage, address } = result;

// //       const base64Data = qrImage.replace(
// //         /^data:image\/png;base64,/,
// //         '',
// //       );

// //       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

// //       await RNFS.writeFile(filePath, base64Data, 'base64');

// //       await Share.open({
// //         url: 'file://' + filePath,
// //         message: `Send PAYO to this address:\n${address}`,
// //       });
// //     } catch (error) {
// //       console.log('Share error:', error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <LinearGradient
// //         colors={['#ffffff', '#1C0033']}
// //         style={styles.loader}>
// //         <ActivityIndicator size="large" color="#fff" />
// //       </LinearGradient>
// //     );
// //   }

// //   return (
// //     <LinearGradient
// //       colors={['#7B2CFF', '#1C0033']}
// //       style={{ flex: 1 }}>
// //       <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// //         <ScrollView
// //           showsVerticalScrollIndicator={false}
// //           keyboardShouldPersistTaps="handled"
// //           contentContainerStyle={styles.scrollContent}>
// //           <View style={styles.walletHeader}>
// //             <View style={styles.headerLeft}>
// //               <TouchableOpacity
// //                 style={styles.cancelContainer}
// //                 activeOpacity={0.8}
// //                 onPress={() => navigation.goBack()}>
// //                 <Icon name="chevron-left" size={28} color="#ffffff" />
// //               </TouchableOpacity>

// //               <View>
// //                 <Text style={styles.walletTitle}>My Wallet</Text>
// //                 <Text style={styles.walletId} numberOfLines={1}>
// //                   {wallet?.id}
// //                 </Text>
// //               </View>
// //             </View>

// //             <Header type="" />
// //           </View>

// //           <View style={styles.card}>
// //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
// //               <Text style={[styles.active, { marginBottom: 0 }]}>
// //                 • Active Wallet
// //               </Text>
              
// //               <TouchableOpacity
// //                 activeOpacity={0.8}
// //                 style={{
// //                   backgroundColor: 'rgba(116, 255, 163, 0.15)',
// //                   paddingHorizontal: 12,
// //                   paddingVertical: 6,
// //                   borderRadius: 20,
// //                 }}
// //                 onPress={() => {
// //                   // 3. Open the modal when pressed
// //                   setModalVisible(true);
// //                 }}>
// //                 <Text style={{ color: '#74FFA3', fontSize: 13, fontWeight: '600' }}>
// //                   + Add Money
// //                 </Text>
// //               </TouchableOpacity>
// //             </View>

// //             <Text style={styles.label}>Total Balance</Text>

// //             <Text style={styles.balance}>
// //               {wallet?.balance?.toLocaleString()}
// //               <Text style={{ fontSize: 16, color: '#74FFA3' }}>
// //                 {' '}
// //                 PAYO
// //               </Text>
// //             </Text>

// //             <View style={styles.actions}>
// //               <TouchableOpacity
// //                 style={styles.btnWhite}
// //                 activeOpacity={0.8}
// //                 onPress={handleCopy}>
// //                 <Text>Copy Address</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity
// //                 style={styles.btnOutline}
// //                 activeOpacity={0.8}
// //                 onPress={handleShare}>
// //                 <Text style={{ color: '#fff' }}>Share QR</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>

// //           <View style={styles.rowBetween}>
// //             <Text style={styles.sectionTitle}>Token Holdings</Text>
// //           </View>

// //           <View style={styles.box}>
// //             <View style={styles.rowBetween}>
// //               <Text style={styles.boxTitle}>Referral Rewards</Text>

// //               <View style={{ alignItems: 'flex-end' }}>
// //                 <Text style={styles.amount}>
// //                   {wallet?.referralRewards || 0} PAYO
// //                 </Text>

// //                 <Text
// //                   style={[
// //                     styles.pending,
// //                     {
// //                       color:
// //                         wallet?.referralStatus === 'Unlocked'
// //                           ? '#22c55e'
// //                           : '#facc15',
// //                     },
// //                   ]}>
// //                   {wallet?.referralStatus}
// //                 </Text>
// //               </View>
// //             </View>

// //             {wallet?.referralStatus === 'Locked' ? (
// //               <Text style={styles.locked}>
// //                 • Unlocks in {wallet?.unlockInDays} days
// //               </Text>
// //             ) : (
// //               <Text style={[styles.locked, { color: '#22c55e' }]}>
// //                 • Rewards Available
// //               </Text>
// //             )}
// //           </View>

// //           <View style={styles.box}>
// //             <Text style={styles.boxTitle}>Daily Transaction Limit</Text>

// //             <View style={styles.rowBetween}>
// //               <Text style={styles.subText}>
// //                 Used {wallet?.dailyUsed || 0}
// //               </Text>

// //               <Text style={styles.subText}>
// //                 Limit: {wallet?.dailyLimit || 0}
// //               </Text>
// //             </View>

// //             <View style={styles.progressBg}>
// //               <View
// //                 style={[
// //                   styles.progressFill,
// //                   {
// //                     width: `${Math.min(progress, 100)}%`,
// //                   },
// //                 ]}
// //               />
// //             </View>
// //           </View>

// //           <View style={styles.bottomButtons}>
// //             <TouchableOpacity style={styles.freezeBtn} />

// //             <TouchableOpacity
// //               style={styles.sendBtn}
// //               activeOpacity={0.8}
// //               onPress={() => navigation.navigate('SendScreen')}>
// //               <Text style={styles.sendText}>Send PAYO</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </ScrollView>
// //       </SafeAreaView>

// //       {/* 4. Mount the Modal component at the root of the screen */}
// //       <AddMoneyModal 
// //         visible={isModalVisible}
// //         onClose={() => setModalVisible(false)}
// //         onPaymentSuccess={() => {
// //           // Re-fetch the wallet dashboard to update the balance automatically
// //           fetchWallet();
// //         }}
// //       />
// //     </LinearGradient>
// //   );
// // }











// /////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Image,
//   Modal,
//   Platform,
//   ToastAndroid,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import api from '../../api/axios';

// // ─── Responsive utilities ────────────────────────────────────────────
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';

// // ─── Asset imports (unchanged) ──────────────────────────────────────
// import upiImg from '../../../assets/images/wallet/Payment Icon.png';
// import bankImg from '../../../assets/images/wallet/Payment Icon (1).png';
// import cardImg from '../../../assets/images/wallet/Payment Icon (2).png';
// import netBankingImg from '../../../assets/images/wallet/wallet.png';
// import wallet from '../../../assets/images/wallet/Wallet image 1.png';
// import cryptoImg from '../../../assets/images/wallet/cryptocurrency 1.png';

// export default function WalletScreen({ visible, onClose, onPaymentSuccess, navigation }) {
//   const [amount, setAmount] = useState('1,000');
//   const [walletData, setWalletData] = useState(null);

//   useEffect(() => {
//     if (visible) {
//       fetchWalletBalance();
//     }
//   }, [visible]);

//   const fetchWalletBalance = async () => {
//     try {
//       const res = await api.get('/api/wallet/getwalletdashboard');
//       setWalletData(res?.data);
//     } catch (error) {
//       console.log('Error fetching wallet balance:', error?.response || error.message);
//     }
//   };

//   const presets = [
//     { label: '+ ₹ 500', value: '500' },
//     { label: '+ ₹ 1,000', value: '1,000' },
//     { label: '+ ₹ 2,500', value: '2,500' },
//     { label: '+ ₹ 5,500', value: '5,500' },
//   ];

//   const paymentMethods = [
//     {
//       id: 'upi',
//       title: 'UPI',
//       subtitle: 'Pay using any UPI app',
//       tag: 'INSTANT',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: upiImg,
//       enabled: true,
//     },
//     {
//       id: 'bank_transfer',
//       title: 'Bank Transfer',
//       subtitle: 'IMPS, NEFT, RTGS',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: bankImg,
//       enabled: true,
//     },
//     {
//       id: 'card',
//       title: 'Debit/Credit Card',
//       subtitle: 'Visa, Mastercard, RuPay',
//       tag: 'INSTANT',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: cardImg,
//       enabled: true,
//     },
//     {
//       id: 'net_banking',
//       title: 'Net Banking',
//       subtitle: 'All major Indian banks',
//       tag: 'INSTANT',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: netBankingImg,
//       enabled: true,
//     },
//     {
//       id: 'crypto',
//       title: 'Crypto Transfer',
//       subtitle: 'BTC, ETH, USDT',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: cryptoImg,
//       enabled: true,
//     },
//   ];

//   const parseValueToString = (val) => {
//     const clean = val.replace(/[^0-9]/g, '');
//     return clean ? parseInt(clean, 10).toLocaleString('en-IN') : '';
//   };

//   const handlePaymentSelect = async (method) => {
//     const numericalAmount = parseFloat(amount.replace(/[^0-9]/g, ''));

//     if (!numericalAmount || numericalAmount <= 0) {
//       if (Platform.OS === 'android') {
//         ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
//       }
//       return;
//     }

//     try {
//       console.log(`Initiating Deposit API Sequence: ₹${numericalAmount} via ${method.id}`);
//       const res = await api.post('/api/wallet/deposit', {
//         amount: numericalAmount,
//         paymentMethod: method.id,
//       });

//       if (onPaymentSuccess) {
//         onPaymentSuccess(res?.data);
//       }
//       onClose();
//     } catch (error) {
//       console.log('Payment backend handling error:', error?.response || error.message);
//       if (Platform.OS === 'android') {
//         ToastAndroid.show('Failed to initiate transaction instance', ToastAndroid.SHORT);
//       }
//     }
//   };

//   return (
//     <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
//       <SafeAreaView style={styles.container}>
//         {/* Header Bar */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <FeatherIcon name="chevron-left" size={moderateScale(26)} color="#4A5568" />
//           </TouchableOpacity>
//           <View style={styles.headerTitleContainer}>
//             <Text style={styles.headerTitle}>Add Money to Wallet</Text>
//             <Text style={styles.headerSubtitle}>Choose a payment method to add funds</Text>
//           </View>
//           <TouchableOpacity style={styles.helpButton}>
//             <FeatherIcon name="help-circle" size={moderateScale(22)} color="#3B82F6" />
//           </TouchableOpacity>
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
//           {/* Balance Gradient Card */}
//           <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.balanceCard}>
//             <View style={styles.balanceCardLeft}>
//               <View style={styles.balanceRow}>
//                 <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
//                 <FeatherIcon name="eye" size={moderateScale(16)} color="#E0E7FF" style={{ marginLeft: moderateScale(6) }} />
//               </View>
//               <Text style={styles.cryptoBalance}>
//                 {walletData?.balance?.toLocaleString() || '0'}{' '}
//                 <Text style={styles.tokenTicker}>PAYO</Text>
//               </Text>
//               <Text style={styles.fiatBalance}>
//                 ≈ ₹{(walletData?.balance * 0).toLocaleString() || '0'}
//               </Text>
//             </View>
//             <View style={styles.walletIconContainer}>
//               <Image source={wallet} style={styles.walletHeaderImage} resizeMode="contain" />
//             </View>
//           </LinearGradient>

//           {/* Amount Entry */}
//           <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
//           <View style={styles.amountInputContainer}>
//             <Text style={styles.currencySymbol}>₹</Text>
//             <TextInput
//               style={styles.amountInput}
//               value={amount}
//               onChangeText={(text) => setAmount(parseValueToString(text))}
//               keyboardType="number-pad"
//             />
//             <View style={styles.currencySelector}>
//               <Text style={styles.currencySelectorText}>INR</Text>
//               <Icon name="keyboard-arrow-down" size={moderateScale(18)} color="#4A5568" />
//             </View>
//           </View>

//           {/* Presets */}
//           <View style={styles.presetsRow}>
//             {presets.map((item, index) => {
//               const formattedPresetValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10).toLocaleString('en-IN');
//               const isSelected = amount === formattedPresetValue;
//               return (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => setAmount(formattedPresetValue)}
//                   style={[styles.presetChip, isSelected && styles.presetChipActive]}
//                 >
//                   <Text style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}>
//                     {item.label}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>

//           {/* Payment Methods */}
//           <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
//           <View style={styles.methodsWrapperCard}>
//             {paymentMethods.map((method, idx) => (
//               <TouchableOpacity
//                 key={method.id}
//                 onPress={() => handlePaymentSelect(method)}
//                 activeOpacity={0.7}
//                 style={[
//                   styles.methodRow,
//                   idx !== paymentMethods.length - 1 && styles.methodBorder
//                 ]}
//               >
//                 <View style={styles.methodIconWrapper}>
//                   <Image source={method.imageSource} style={styles.methodImage} resizeMode="contain" />
//                 </View>

//                 <View style={styles.methodMeta}>
//                   <Text style={styles.methodTitle}>{method.title}</Text>
//                   <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
//                 </View>

//                 {/* Right side: tag + chevron */}
//                 <View style={styles.methodRight}>
//                   <View style={[styles.tagBadge, { backgroundColor: method.tagBg }]}>
//                     <Text style={[styles.tagBadgeText, { color: method.tagColor }]}>{method.tag}</Text>
//                   </View>
//                   <FeatherIcon name="chevron-right" size={moderateScale(20)} color="#9CA3AF" />
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Security Banner */}
//           <View style={styles.securityBanner}>
//             <View style={styles.shieldIconContainer}>
//               <Image source={require('../../../assets/images/wallet/Security Icon.png')} />
//             </View>
//             <View style={styles.securityMeta}>
//               <Text style={styles.securityTitle}>100% Secure & Encrypted</Text>
//               <Text style={styles.securitySubtitle}>Your money is safe with bank-grade security and encryption.</Text>
//             </View>
//             <View style={styles.checkIconContainer}>
//               <Image source={require('../../../assets/images/wallet/Shield Security Icon.png')} />
//             </View>
//           </View>

//           {/* Promo Card */}
//           <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.promoCard}>
//             <View style={styles.promoLeft}>
//               <View style={styles.coinStackGraphic}>
//                 <Image source={require('../../../assets/images/wallet/Promo Icon.png')} />
//               </View>
//               <View style={styles.promoTexts}>
//                 <Text style={styles.promoTitle}>Have a promo code?</Text>
//                 <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
//               </View>
//             </View>
//             <TouchableOpacity style={styles.applyActionBtn}>
//               <Text style={styles.applyActionText}>Apply Now</Text>
//               <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#FFF" style={{ marginLeft: moderateScale(2) }} />
//             </TouchableOpacity>
//           </LinearGradient>
//         </ScrollView>
//       </SafeAreaView>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(16),
//     paddingVertical: moderateScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//     backgroundColor: '#FFF',
//   },
//   backButton: {
//     padding: moderateScale(4),
//     position: 'absolute',
//     left: moderateScale(25),
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: moderateScale(5),
//     marginLeft: moderateScale(20),
//   },
//   headerTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#1F2937',
//   },
//   headerSubtitle: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//     marginTop: moderateScale(2),
//   },
//   helpButton: {
//     padding: moderateScale(4),
//   },
//   scrollBody: {
//     padding: moderateScale(16),
//     paddingBottom: moderateScale(40),
//   },
//   balanceCard: {
//     borderRadius: moderateScale(16),
//     padding: moderateScale(20),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: moderateScale(24),
//     elevation: 5,
//   },
//   balanceCardLeft: {
//     flex: 1,
//   },
//   balanceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   balanceLabel: {
//     color: '#E0E7FF',
//     fontSize: moderateScale(13),
//     fontWeight: '500',
//   },
//   cryptoBalance: {
//     fontSize: moderateScale(28),
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginTop: moderateScale(6),
//   },
//   tokenTicker: {
//     fontSize: moderateScale(18),
//     fontWeight: '500',
//     color: '#E0E7FF',
//   },
//   fiatBalance: {
//     fontSize: moderateScale(13),
//     color: '#C7D2FE',
//     marginTop: moderateScale(4),
//   },
//   walletIconContainer: {
//     width: moderateScale(100),
//     height: moderateScale(100),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   walletHeaderImage: {
//     width: '100%',
//     height: '100%',
//   },
//   sectionLabel: {
//     fontSize: moderateScale(11),
//     fontWeight: '700',
//     color: '#374151',
//     letterSpacing: 0.5,
//     marginBottom: moderateScale(10),
//   },
//   amountInputContainer: {
//     backgroundColor: '#F3F4F6',
//     borderRadius: moderateScale(12),
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(16),
//     height: moderateScale(56),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     marginBottom: moderateScale(14),
//   },
//   currencySymbol: {
//     fontSize: moderateScale(18),
//     fontWeight: '600',
//     color: '#1F2937',
//     marginRight: moderateScale(6),
//   },
//   amountInput: {
//     flex: 1,
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#1F2937',
//     padding: 0,
//   },
//   currencySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   currencySelectorText: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#4B5563',
//     marginRight: moderateScale(2),
//   },
//   presetsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: moderateScale(24),
//   },
//   presetChip: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: moderateScale(8),
//     paddingVertical: moderateScale(10),
//     alignItems: 'center',
//     marginHorizontal: moderateScale(3),
//   },
//   presetChipActive: {
//     backgroundColor: '#2563EB',
//     borderColor: '#2563EB',
//   },
//   presetChipText: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#2563EB',
//   },
//   presetChipTextActive: {
//     color: '#FFF',
//   },
//   methodsWrapperCard: {
//     backgroundColor: '#FFF',
//     borderRadius: moderateScale(16),
//     borderWidth: 1,
//     borderColor: '#F3F4F6',
//     paddingHorizontal: moderateScale(16),
//     marginBottom: moderateScale(20),
//   },
//   methodRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: moderateScale(16),
//   },
//   methodBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   methodIconWrapper: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(8),
//     backgroundColor: '#F9FAFB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(12),
//   },
//   methodImage: {
//     width: moderateScale(28),
//     height: moderateScale(28),
//   },
//   methodMeta: {
//     flex: 1,
//   },
//   methodTitle: {
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   methodSubtitle: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//     marginTop: moderateScale(2),
//   },
//   // Right side container for tag and chevron
//   methodRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   tagBadge: {
//     paddingHorizontal: moderateScale(6),
//     paddingVertical: moderateScale(2),
//     borderRadius: moderateScale(4),
//     marginRight: moderateScale(8), // spacing between tag and chevron
//   },
//   tagBadgeText: {
//     fontSize: moderateScale(9),
//     fontWeight: '700',
//   },
//   securityBanner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F3FF',
//     borderRadius: moderateScale(12),
//     padding: moderateScale(14),
//     marginBottom: moderateScale(16),
//   },
//   shieldIconContainer: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     borderRadius: moderateScale(18),
//     backgroundColor: '#DDD6FE',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(12),
//   },
//   securityMeta: {
//     flex: 1,
//   },
//   securityTitle: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#5B21B6',
//   },
//   securitySubtitle: {
//     fontSize: moderateScale(11),
//     color: '#7C3AED',
//     marginTop: moderateScale(1),
//   },
//   checkIconContainer: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//     borderRadius: moderateScale(12),
//     backgroundColor: '#EDE9FE',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   promoCard: {
//     borderRadius: moderateScale(12),
//     padding: moderateScale(14),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   promoLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   coinStackGraphic: {
//     width: moderateScale(32),
//     height: moderateScale(32),
//     borderRadius: moderateScale(6),
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(12),
//   },
//   promoTexts: {
//     flex: 1,
//   },
//   promoTitle: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#FFF',
//   },
//   promoSubtitle: {
//     fontSize: moderateScale(11),
//     color: '#BFDBFE',
//     marginTop: moderateScale(1),
//   },
//   applyActionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   applyActionText: {
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     color: '#FFF',
//   },
// });


//////////////////////////////////////////////////////////////
// screens/WalletScreen.js

import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Image, Platform, ToastAndroid,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';


import {
  setAmount,
  setPaymentMethod,
  fetchConversionRates,
} from '../../redux/features/depositSlice';

import api from '../../api/axios';
import { moderateScale } from '../../utils/responsive';

import upiImg from '../../../assets/images/wallet/Payment Icon.png';
import bankImg from '../../../assets/images/wallet/Payment Icon (1).png';
import cardImg from '../../../assets/images/wallet/Payment Icon (2).png';
import netBankingImg from '../../../assets/images/wallet/wallet.png';
import wallet from '../../../assets/images/wallet/Wallet image 1.png';
import cryptoImg from '../../../assets/images/wallet/cryptocurrency 1.png';


export default function WalletScreen({ visible, onClose, navigation }) {
  console.log("9876567")
  const dispatch = useDispatch();
  const [localAmount, setLocalAmount] = useState('1,000');
  const [walletData, setWalletData] = useState(null);
  const loading = useSelector((state) => state.deposit.loading);

  useEffect(() => {
    if (visible) fetchWalletBalance();
  }, [visible]);

  const fetchWalletBalance = async () => {
    try {
      const res = await api.get('/api/wallet/getwalletdashboard');
      setWalletData(res?.data);
    } catch (error) {
      console.log('Error fetching wallet balance:', error?.response || error.message);
    }


    /////////////////////////////////



  };


  //   const fetchCountries = async () => {
  //   try {
  //     const response = await api.get('https://purr-expediter-doorway.ngrok-free.dev/api/countries'); // assuming baseURL is already set
  //     console.log('Countries response:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching countries:', error.response?.data || error.message);
  //   }
  // };

  // fetchCountries()
  

  const presets = [
    { label: '+ ₹ 500', value: '500' },
    { label: '+ ₹ 1,000', value: '1,000' },
    { label: '+ ₹ 2,500', value: '2,500' },
    { label: '+ ₹ 5,500', value: '5,500' },
  ];

  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'Pay using any UPI app',
      tag: 'INSTANT',
      tagBg: '#E8F5E9',
      tagColor: '#2E7D32',
      imageSource: upiImg,
    },
    {
      id: 'bank_transfer',
      title: 'Bank Transfer',
      subtitle: 'IMPS, NEFT, RTGS',
      tag: '1-2 HOURS',
      tagBg: '#E8EAF6',
      tagColor: '#283593',
      imageSource: bankImg,
    },
    {
      id: 'card',
      title: 'Debit/Credit Card',
      subtitle: 'Visa, Mastercard, RuPay',
      tag: 'INSTANT',
      tagBg: '#E8F5E9',
      tagColor: '#2E7D32',
      imageSource: cardImg,
    },
    {
      id: 'net_banking',
      title: 'Net Banking',
      subtitle: 'All major Indian banks',
      tag: 'INSTANT',
      tagBg: '#E8F5E9',
      tagColor: '#2E7D32',
      imageSource: netBankingImg,
    },
    {
      id: 'crypto',
      title: 'Crypto Transfer',
      subtitle: 'BTC, ETH, USDT',
      tag: '1-2 HOURS',
      tagBg: '#E8EAF6',
      tagColor: '#283593',
      imageSource: cryptoImg,
    },
  ];

  const parseValueToString = (val) => {
    const clean = val.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10).toLocaleString('en-IN') : '';
  };

  // const handlePaymentSelect = async (method) => {
  //   const numericalAmount = parseFloat(localAmount.replace(/[^0-9]/g, ''));

  //   if (!numericalAmount || numericalAmount <= 0) {
  //     if (Platform.OS === 'android') {
  //       ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
  //     }
  //     return;
  //   }

  //   // Save amount & method
  //   dispatch(setAmount(numericalAmount));
  //   dispatch(setPaymentMethod({
  //     id: method.id,
  //     title: method.title,
  //     imageSource: method.imageSource,
  //     tag: method.tag,
  //   }));

  //   // Fetch rates & navigate
  //   try {
  //     console.log('🔵 Dispatching fetchConversionRates...');
  //     const resultAction = await dispatch(fetchConversionRates({
  //       amount: numericalAmount,
  //       paymentMethod: method.id,
  //     }));
  //     console.log('🔵 Result action:', resultAction);

  //     // Safely unwrap if available
  //     if (resultAction && typeof resultAction.unwrap === 'function') {
  //       await resultAction.unwrap();
  //       console.log('✅ Unwrap succeeded');
  //     } else {
  //       console.warn('⚠️ unwrap not available, assuming success');
  //     }

  //     // Validate navigation before using it
  //     if (!navigation || typeof navigation.navigate !== 'function') {
  //       console.error('❌ Navigation prop is missing or invalid', navigation);
  //       if (Platform.OS === 'android') {
  //         ToastAndroid.show('Navigation error – please try again', ToastAndroid.SHORT);
  //       }
  //       return;
  //     }

  //     console.log('✅ Navigating to ConfirmDeposite');
  //     navigation.navigate('ConfirmDeposite');
  //   } catch (error) {
  //     console.log('❌ Error in handlePaymentSelect:', error);
  //     const message = typeof error === 'string' ? error : error.message;
  //     if (Platform.OS === 'android') {
  //       ToastAndroid.show(message || 'Failed to get rates', ToastAndroid.SHORT);
  //     }
  //   }
  // };
const handlePaymentSelect = (method) => {
  const numericalAmount = parseFloat(localAmount.replace(/[^0-9]/g, ''));

  if (!numericalAmount || numericalAmount <= 0) {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
    }
    return;
  }

  // 1. Save to Redux (sync – instant)
  dispatch(setAmount(numericalAmount));
  dispatch(setPaymentMethod({
    id: method.id,
    title: method.title,
    imageSource: method.imageSource,
    tag: method.tag,
  }));

  // 2. Start the fetch – but DON'T await it
  dispatch(fetchConversionRates({
    amount: numericalAmount,
    paymentMethod: method.id,
  }));

  // 3. ✅ NAVIGATE IMMEDIATELY – no delay!
  navigation.navigate('ConfirmDeposite');
};

console.log("98")
  return (
    // <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header – back button now calls onClose */}
        <View style={styles.header}>
          <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.backButton}>
            <FeatherIcon name="chevron-left" size={moderateScale(26)} color="#4a8cff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Add Money to Wallet</Text>
            <Text style={styles.headerSubtitle}>Choose a payment method to add funds</Text>
          </View>
          <TouchableOpacity style={styles.helpButton}>
            <FeatherIcon name="help-circle" size={moderateScale(22)} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
          {/* Balance Card */}
          <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.balanceCard}>
            <View style={styles.balanceCardLeft}>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
                <FeatherIcon name="eye" size={moderateScale(16)} color="#E0E7FF" style={{ marginLeft: moderateScale(6) }} />
              </View>
              <Text style={styles.cryptoBalance}>
                {walletData?.balance?.toLocaleString() || '0'}{' '}
                <Text style={styles.tokenTicker}>PAYO</Text>
              </Text>
              <Text style={styles.fiatBalance}>
                ≈ ₹{(walletData?.balance * 0).toLocaleString() || '0'}
              </Text>
            </View>
            <View style={styles.walletIconContainer}>
              <Image source={wallet} style={styles.walletHeaderImage} resizeMode="contain" />
            </View>
          </LinearGradient>

          {/* Amount Input */}
          <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              value={localAmount}
              onChangeText={(text) => setLocalAmount(parseValueToString(text))}
              keyboardType="number-pad"
            />
            <View style={styles.currencySelector}>
              <Text style={styles.currencySelectorText}>INR</Text>
              <Icon name="keyboard-arrow-down" size={moderateScale(18)} color="#4A5568" />
            </View>
          </View>

          {/* Presets */}
          <View style={styles.presetsRow}>
            {presets.map((item, index) => {
              const formattedPresetValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10).toLocaleString('en-IN');
              const isSelected = localAmount === formattedPresetValue;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setLocalAmount(formattedPresetValue)}
                  style={[styles.presetChip, isSelected && styles.presetChipActive]}
                >
                  <Text style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Payment Methods */}
          <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
          <View style={styles.methodsWrapperCard}>
            {paymentMethods.map((method, idx) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => handlePaymentSelect(method)}
                
                activeOpacity={0.7}
                style={[styles.methodRow, idx !== paymentMethods.length - 1 && styles.methodBorder]}
                disabled={loading}
              >
                <View style={styles.methodIconWrapper}>
                  <Image source={method.imageSource} style={styles.methodImage} resizeMode="contain" />
                </View>
                <View style={styles.methodMeta}>
                  <Text style={styles.methodTitle}>{method.title}</Text>
                  <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                </View>
                <View style={styles.methodRight}>
                  <View style={[styles.tagBadge, { backgroundColor: method.tagBg }]}>
                    <Text style={[styles.tagBadgeText, { color: method.tagColor }]}>{method.tag}</Text>
                  </View>
                  <FeatherIcon name="chevron-right" size={moderateScale(20)} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Security Banner & Promo Card – unchanged */}
          <View style={styles.securityBanner}>
            <View style={styles.shieldIconContainer}>
              <Image source={require('../../../assets/images/wallet/Security Icon.png')} />
            </View>
            <View style={styles.securityMeta}>
              <Text style={styles.securityTitle}>100% Secure & Encrypted</Text>
              <Text style={styles.securitySubtitle}>Your money is safe with bank-grade security and encryption.</Text>
            </View>
            <View style={styles.checkIconContainer}>
              <Image source={require('../../../assets/images/wallet/Shield Security Icon.png')} />
            </View>
          </View>

          <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.promoCard}>
            <View style={styles.promoLeft}>
              <View style={styles.coinStackGraphic}>
                <Image source={require('../../../assets/images/wallet/Promo Icon.png')} />
              </View>
              <View style={styles.promoTexts}>
                <Text style={styles.promoTitle}>Have a promo code?</Text>
                <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.applyActionBtn}>
              <Text style={styles.applyActionText}>Apply Now</Text>
              <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#FFF" style={{ marginLeft: moderateScale(2) }} />
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    // </Modal>
  );
}


// ... your styles (unchanged) ...
// ─── Styles ──────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffff'
   },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(14),
    backgroundColor: 'transparent',
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: moderateScale(11),
    color: '#6B7280',
    marginTop: moderateScale(2),
    textAlign: 'center',
  },
  helpButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBody: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(30),
  },
  balanceCard: {
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  balanceCardLeft: { flex: 1 },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(4),
  },
  balanceLabel: {
    color: '#E0E7FF',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  cryptoBalance: {
    color: '#FFF',
    fontSize: moderateScale(26),
    fontWeight: '700',
  },
  tokenTicker: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#C7D2FE',
  },
  fiatBalance: {
    color: '#C7D2FE',
    fontSize: moderateScale(13),
    marginTop: moderateScale(2),
  },
  walletIconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletHeaderImage: {
    width: '100%',
    height: '100%',
  },
  sectionLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginTop: moderateScale(12),
    marginBottom: moderateScale(6),
    paddingHorizontal: moderateScale(4),
  },
  amountInputContainer: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  currencySymbol: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#1F2937',
    marginRight: moderateScale(8),
  },
  amountInput: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#1F2937',
    paddingVertical: moderateScale(4),
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(6),
  },
  currencySelectorText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#4A5568',
    marginRight: moderateScale(4),
  },
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(8),
  },
  presetChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
    marginBottom: moderateScale(8),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  presetChipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#4F46E5',
  },
  presetChipText: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: '#4B5563',
  },
  presetChipTextActive: {
    color: '#FFF',
  },
  methodsWrapperCard: {
    backgroundColor: '#F2F4F4',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(6),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: moderateScale(16),
   
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(10),
  },
  methodBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  methodIconWrapper: {
    width: moderateScale(44),
    height: moderateScale(44),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  methodImage: {
    width: moderateScale(32),
    height: moderateScale(32),
  },
  methodMeta: { flex: 1 },
  methodTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1F2937',
  },
  methodSubtitle: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginTop: moderateScale(2),
  },
  methodRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagBadge: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(12),
    marginRight: moderateScale(8),
  },
  tagBadgeText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  shieldIconContainer: {
    marginRight: moderateScale(12),
  },
  securityMeta: { flex: 1 },
  securityTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#1E3A8A',
  },
  securitySubtitle: {
    fontSize: moderateScale(11),
    color: '#3B82F6',
    marginTop: moderateScale(1),
  },
  checkIconContainer: {
    marginLeft: moderateScale(8),
  },
  promoCard: {
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinStackGraphic: {
    marginRight: moderateScale(12),
  },
  promoTexts: {
    flex: 1,
  },
  promoTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#FFF',
  },
  promoSubtitle: {
    fontSize: moderateScale(11),
    color: '#BFDBFE',
    marginTop: moderateScale(2),
  },
  applyActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF33',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
  },
  applyActionText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#FFF',
  },
});