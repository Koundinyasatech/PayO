// // TransactionDetailScreen.jsx

// import React, { useEffect, useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ActivityIndicator,
//     Alert,
//     ToastAndroid,
//     Share,
//     Platform,
//     ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// import api from '../../api/axios';
// import styles from './TransactionDetailStyles';

// export default function TransactionDetailScreen({
//     navigation,
// }) {
//     const route = useRoute();
//     const { transaction_id } = route.params || {};

//     const [transaction, setTransaction] =
//         useState(null);

//     const [loading, setLoading] =
//         useState(true);

//     const viewShotRef = useRef();

//     useEffect(() => {
//         const fetchTransaction = async () => {
//             try {
//                 const res = await api.get(
//                     `/api/wallet/transactionById/${transaction_id}`,
//                 );

//                 setTransaction(res.data);
//             } catch (err) {
//                 console.log(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (transaction_id) {
//             fetchTransaction();
//         }
//     }, [transaction_id]);

//     const formatISTTime = (utcTime) => {
//         const date = new Date(utcTime);

//         const time =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true,
//             }).format(date);

//         const day =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 day: '2-digit',
//             }).format(date);

//         const month =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 month: 'short',
//             }).format(date);

//         const year =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 year: 'numeric',
//             }).format(date);

//         return `${time} on ${day} ${month} ${year}`;
//     };

//     const handleCopyWallet = (walletId) => {
//         Clipboard.setString(walletId);

//         if (Platform.OS === 'android') {
//             ToastAndroid.show(
//                 'Wallet copied',
//                 ToastAndroid.SHORT,
//             );
//         }
//     };

//     const handleCopyTransactionID = (id) => {
//         Clipboard.setString(id);

//         if (Platform.OS === 'android') {
//             ToastAndroid.show(
//                 'Transaction ID copied',
//                 ToastAndroid.SHORT,
//             );
//         }
//     };

//     const handleSendAgain = () => {
//         navigation.navigate('EnterAmount', {
//             name: transaction.name,
//             address: transaction.wallet,
//             amount: transaction.amount,
//             show: true,
//         });
//     };

//     const handleHistory = (id, name) => {
//         navigation.navigate(
//             'TnsHistorySingleUser',
//             {
//                 id,
//                 name,
//             },
//         );
//     };

//     const handleShare = async () => {
//         try {
//             await Share.share({
//                 message: `Transaction Receipt

// To: ${transaction?.name}
// Amount: ${transaction?.amount} PAYO
// Date: ${formatISTTime(
//                     transaction?.timestamp,
//                 )}
// Transaction ID: ${transaction?._id ||
//                     transaction?.id
//                     }`,
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleDownload = async () => {
//         try {
//             if (!viewShotRef.current) {
//                 Alert.alert('Error', 'Receipt not ready');
//                 return;
//             }

//             const uri = await viewShotRef.current.capture();

//             const fileName = `transaction_${Date.now()}.png`;

//             const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//             await RNFS.copyFile(uri, path);

//             Alert.alert(
//                 'Success',
//                 `Receipt saved successfully!\n${path}`
//             );

//             console.log('Saved at:', path);

//         } catch (error) {
//             console.log(error);
//             Alert.alert('Error', error.message);
//         }
//     };

//     if (loading) {
//         return (
//             <LinearGradient
//                 colors={['#5B0FD1', '#14002B']}
//                 style={styles.loader}>
//                 <ActivityIndicator
//                     size="large"
//                     color="#fff"
//                 />
//             </LinearGradient>
//         );
//     }

//     return (
//         <LinearGradient
//             colors={['#5B0FD1', '#14002B']}
//             style={styles.gradient}>
//             <SafeAreaView
//                 style={styles.container}
//                 edges={['top', 'bottom']}>
//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     keyboardShouldPersistTaps="handled"
//                     contentContainerStyle={styles.scrollContent}>
//                     <View style={styles.headerRow}>
//                         <TouchableOpacity
//                             activeOpacity={0.8}
//                             onPress={() =>
//                                 navigation.goBack()
//                             }>
//                             <Icon
//                                 name="chevron-left"
//                                 size={28}
//                                 color="#fff"
//                             />
//                         </TouchableOpacity>

//                         <Text style={styles.header}>
//                             Transaction Details
//                         </Text>
//                     </View>          <ViewShot
//                         ref={viewShotRef}
//                         options={{
//                             format: 'png',
//                             quality: 1,
//                         }}>
//                         <View style={styles.receiptCard}>
//                             <View style={styles.section}>
//                                 <Text style={styles.smallLabel}>
//                                     {transaction?.status === 'failed'
//                                         ? 'Payment Failed'
//                                         : transaction?.type === 'sent'
//                                             ? 'Paid to'
//                                             : 'Received from'}
//                                 </Text>

//                                 <View style={styles.row}>
//                                     <View style={styles.userRow}>
//                                         <View style={styles.iconBox}>
//                                             {transaction?.status ===
//                                                 'failed' ? (
//                                                 <Icon
//                                                     name="x"
//                                                     size={16}
//                                                     color="red"
//                                                 />
//                                             ) : transaction?.type ===
//                                                 'sent' ? (
//                                                 <Icon
//                                                     name="arrow-up-right"
//                                                     size={14}
//                                                     color="#000"
//                                                 />
//                                             ) : (
//                                                 <Icon
//                                                     name="arrow-down-left"
//                                                     size={14}
//                                                     color="#000"
//                                                 />
//                                             )}
//                                         </View>

//                                         <View>
//                                             <Text style={styles.name}>
//                                                 {transaction?.name ||
//                                                     'User'}
//                                             </Text>

//                                             <Text
//                                                 style={
//                                                     styles.timeText
//                                                 }>
//                                                 {formatISTTime(
//                                                     transaction?.timestamp,
//                                                 )}
//                                             </Text>
//                                         </View>
//                                     </View>

//                                     <Text
//                                         style={styles.amount}>
//                                         {transaction?.amount}{' '}
//                                         <Text
//                                             style={
//                                                 styles.payo
//                                             }>
//                                             PAYO
//                                         </Text>
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View
//                                 style={styles.divider}
//                             />

//                             <View style={styles.section}>
//                                 <View
//                                     style={
//                                         styles.paymentHeader
//                                     }>
//                                     <Icon
//                                         name="file-text"
//                                         size={16}
//                                         color="#ddd"
//                                     />

//                                     <Text
//                                         style={
//                                             styles.paymentTitle
//                                         }>
//                                         Payment Details
//                                     </Text>
//                                 </View>

//                                 <Text
//                                     style={styles.label}>
//                                     Paid Via
//                                 </Text>

//                                 <View
//                                     style={
//                                         styles.valueRow
//                                     }>
//                                     <Text
//                                         style={
//                                             styles.value
//                                         }
//                                         numberOfLines={2}>
//                                         Wallet:{' '}
//                                         {transaction?.wallet}
//                                     </Text>

//                                     <TouchableOpacity
//                                         onPress={() =>
//                                             handleCopyWallet(
//                                                 transaction?.wallet,
//                                             )
//                                         }>
//                                         <Icon
//                                             name="copy"
//                                             size={16}
//                                             color="#ccc"
//                                         />
//                                     </TouchableOpacity>
//                                 </View>

//                                 <Text
//                                     style={styles.label}>
//                                     Transaction ID
//                                 </Text>

//                                 <View
//                                     style={
//                                         styles.valueRow
//                                     }>
//                                     <Text
//                                         style={
//                                             styles.value
//                                         }
//                                         numberOfLines={2}>
//                                         {transaction?._id ||
//                                             transaction?.id}
//                                     </Text>

//                                     <TouchableOpacity
//                                         onPress={() =>
//                                             handleCopyTransactionID(
//                                                 transaction?._id ||
//                                                 transaction?.id,
//                                             )
//                                         }>
//                                         <Icon
//                                             name="copy"
//                                             size={16}
//                                             color="#ccc"
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </ViewShot>

//                     <View
//                         style={styles.actionsRow}>
//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={
//                                 handleSendAgain
//                             }>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="arrow-up-right"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 Send again
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={handleShare}>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="share-2"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 Share
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={() =>
//                                 handleHistory(
//                                     transaction?.wallet,
//                                     transaction?.name,
//                                 )
//                             }>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="clock"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 History
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={
//                                 handleDownload
//                             }>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="download"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 Download
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </LinearGradient>
//     );
// }



import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Share,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

import api from '../../api/axios';
import styles from './TransactionDetailStyles';
import { theme } from '../../MainTheme/theme';

export default function TransactionDetailScreen({ navigation }) {
  const route = useRoute();
  const { transaction_id } = route.params || {};

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const viewShotRef = useRef();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(
          `/api/wallet/transactionById/${transaction_id}`,
        );

        setTransaction(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (transaction_id) {
      fetchTransaction();
    }
  }, [transaction_id]);

  const formatISTTime = (utcTime) => {
    const date = new Date(utcTime);

    const time = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);

    const day = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
    }).format(date);

    const month = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      month: 'short',
    }).format(date);

    const year = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
    }).format(date);

    return `${time} on ${day} ${month} ${year}`;
  };

  const handleCopyWallet = (walletId) => {
    Clipboard.setString(walletId);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Wallet copied', ToastAndroid.SHORT);
    }
  };

  const handleCopyTransactionID = (id) => {
    Clipboard.setString(id);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Transaction ID copied', ToastAndroid.SHORT);
    }
  };

  const handleSendAgain = () => {
    navigation.navigate('EnterAmount', {
      name: transaction.name,
      address: transaction.wallet,
      amount: transaction.amount,
      show: true,
    });
  };

  const handleHistory = (id, name) => {
    navigation.navigate('TnsHistorySingleUser', {
      id,
      name,
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Transaction Receipt\n\nTo: ${transaction?.name}\nAmount: ${transaction?.amount} PAYO\nDate: ${formatISTTime(
          transaction?.timestamp,
        )}\nTransaction ID: ${transaction?._id || transaction?.id}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async () => {
    try {
      if (!viewShotRef.current) {
        Alert.alert('Error', 'Receipt not ready');
        return;
      }

      const uri = await viewShotRef.current.capture();
      const fileName = `transaction_${Date.now()}.png`;
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, path);

      Alert.alert('Success', `Receipt saved successfully!\n${path}`);
      console.log('Saved at:', path);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={28} color={theme.colors.textMain} />
            </TouchableOpacity>

            <Text style={styles.header}>Transaction Details</Text>
          </View>

          <ViewShot
            ref={viewShotRef}
            options={{
              format: 'png',
              quality: 1,
            }}
          >
            <View style={styles.receiptCard}>
              <View style={styles.section}>
                <Text style={styles.smallLabel}>
                  {transaction?.status === 'failed'
                    ? 'Payment Failed'
                    : transaction?.type === 'sent'
                    ? 'Paid to'
                    : 'Received from'}
                </Text>

                <View style={styles.row}>
                  <View style={styles.userRow}>
                    <View style={styles.iconBox}>
                      {transaction?.status === 'failed' ? (
                        <Icon name="x" size={18} color={theme.colors.statusDanger} />
                      ) : transaction?.type === 'sent' ? (
                        <Icon name="arrow-up-right" size={18} color={theme.colors.textMain} />
                      ) : (
                        <Icon name="arrow-down-left" size={18} color={theme.colors.statusSuccess} />
                      )}
                    </View>

                    <View>
                      <Text style={styles.name} numberOfLines={1}>
                        {transaction?.name || 'User'}
                      </Text>

                      <Text style={styles.timeText}>
                        {formatISTTime(transaction?.timestamp)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.amountContainer}>
                    <Text style={styles.amount}>
                      {transaction?.amount} <Text style={styles.payo}>PAYO</Text>
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.section}>
                <View style={styles.paymentHeader}>
                  <Icon name="file-text" size={16} color={theme.colors.textMuted} />
                  <Text style={styles.paymentTitle}>Payment Details</Text>
                </View>

                <Text style={styles.label}>Paid Via</Text>

                <View style={styles.valueRow}>
                  <Text style={styles.value} numberOfLines={2}>
                    Wallet: {transaction?.wallet}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handleCopyWallet(transaction?.wallet)}
                  >
                    <Icon name="copy" size={18} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Transaction ID</Text>

                <View style={styles.valueRow}>
                  <Text style={styles.value} numberOfLines={2}>
                    {transaction?._id || transaction?.id}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleCopyTransactionID(
                        transaction?._id || transaction?.id,
                      )
                    }
                  >
                    <Icon name="copy" size={18} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ViewShot>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleSendAgain}
              activeOpacity={0.7}
            >
              <View style={styles.circle}>
                <Icon name="arrow-up-right" size={20} color={theme.colors.textMain} />
              </View>
              <Text style={styles.actionText}>Send again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <View style={styles.circle}>
                <Icon name="share-2" size={20} color={theme.colors.textMain} />
              </View>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() =>
                handleHistory(transaction?.wallet, transaction?.name)
              }
              activeOpacity={0.7}
            >
              <View style={styles.circle}>
                <Icon name="clock" size={20} color={theme.colors.textMain} />
              </View>
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleDownload}
              activeOpacity={0.7}
            >
              <View style={styles.circle}>
                <Icon name="download" size={20} color={theme.colors.textMain} />
              </View>
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}