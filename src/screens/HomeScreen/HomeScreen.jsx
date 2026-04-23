// import React from 'react';


// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';

// const transactions = [
//   { id: '1', name: 'Priya Mehta', amount: '+1000.0' },
//   { id: '2', name: 'Priya Mehta', amount: '-250.0' },
//   { id: '3', name: 'Priya Mehta', amount: '-500.0' },
//   { id: '4', name: 'Priya Mehta', amount: '+1000.0' },
// ];

// export default function HomeScreen({ navigation }) {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar barStyle="light-content" backgroundColor="#6a11cb" />

//       <LinearGradient colors={['#6a11cb', '#3a0ca3']} style={styles.container}>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <Icon name="menu" size={24} color="white" />
//           <View style={styles.profile}>
//             <Icon name="user" size={18} color="white" />
//           </View>
//         </View>

//         {/* BALANCE CARD */}
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceTitle}>Total Balance</Text>

//           <View style={styles.balanceRow}>
//             <Text style={styles.balanceAmount}>*****</Text>
//             <Text style={styles.payo}> PAYO</Text>
//             <Icon name="eye-off" size={20} color="#ccc" style={styles.eyeIcon} />
//           </View>

//           <TouchableOpacity style={styles.walletRow}>
//             <Text style={styles.walletText}>My Wallet</Text>
//             <Icon name="arrow-right" size={18} color="black" />
//           </TouchableOpacity>
//         </View>

//         {/* ACTION BUTTONS */}
//         <View style={styles.actionsWrapper}>
//           <ActionPill
//             icon="arrow-up-right"
//             text="Send"
//             onPress={() => navigation.navigate('ScanQR')}   // ✅ FIXED
//           />

//           <View style={styles.connector} />

//           <ActionPill
//             icon="arrow-down-left"
//             text="Receive"
//             onPress={() => navigation.navigate('Receive')}  // ✅ FIXED
//           />

//           <View style={styles.connector} />

//           <ActionPill icon="user-plus" text="Refer" />
//         </View>

//         {/* TRANSACTIONS */}
//         <View style={styles.transHeader}>
//           <Text style={styles.transTitle}>Recent Transaction</Text>
//           <Text style={styles.viewAll}>View All &gt;</Text>
//         </View>

//         <FlatList
//           data={transactions}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 120 }}
//           renderItem={({ item }) => (
//             <View style={styles.transItem}>
//               <View style={styles.avatar} />
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.time}>Today 9:10 PM</Text>
//               </View>
//               <Text
//                 style={[
//                   styles.amountText,
//                   { color: item.amount.includes('+') ? '#00ff9f' : '#ff4d4d' },
//                 ]}
//               >
//                 {item.amount}
//               </Text>
//             </View>
//           )}
//         />

//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// /* ACTION BUTTON */
// const ActionPill = ({ icon, text, onPress }) => (
//   <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
//     <LinearGradient
//       colors={['#f6d365', '#fda085']}
//       style={styles.actionPill}
//     >
//       <View style={styles.iconCircle}>
//         <Icon name={icon} size={14} color="white" />
//       </View>
//       <Text style={styles.actionText}>{text}</Text>
//     </LinearGradient>
//   </TouchableOpacity>
// );

// /* STYLES */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },

//   profile: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#ffffff30',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   balanceCard: {
//     backgroundColor: '#1f1f1f',
//     padding: 20,
//     borderRadius: 25,
//   },

//   balanceTitle: { color: '#ccc' },

//   balanceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },

//   balanceAmount: {
//     color: 'white',
//     fontSize: 28,
//   },

//   payo: {
//     color: '#7CFCB2',
//     marginLeft: 5,
//   },

//   eyeIcon: {
//     position: 'absolute',
//     right: 0,
//   },

//   walletRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//   },

//   walletText: {
//     color: 'black',
//   },

//   actionsWrapper: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     alignItems: 'center',
//   },

//   connector: {
//     width: 10,
//     height: 2,
//     backgroundColor: '#f6d365',
//   },

//   actionPill: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 12,
//     borderRadius: 40,
//   },

//   iconCircle: {
//     backgroundColor: 'black',
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 6,
//   },

//   actionText: {
//     color: 'black',
//     fontWeight: '600',
//   },

//   transHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   transTitle: {
//     color: 'white',
//   },

//   viewAll: {
//     color: '#ccc',
//   },

//   transItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 15,
//   },

//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#ccc',
//     marginRight: 10,
//   },

//   name: {
//     color: 'white',
//   },

//   time: {
//     color: '#aaa',
//     fontSize: 12,
//   },

//   amountText: {
//     fontWeight: 'bold',
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './homeStyling';
import api, { getToken } from '../../api/axios';
import Header from '../components/header';
// import Header from '../components/header';
// import BottomNav from '../components/bottomNav';
 
export default function HomeScreen({ navigation }) {
  const [balance, setBalance] = useState(20000);
  const [income] = useState(20000);
  const [outcome] = useState(17000);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactionsList,setTransactions]=useState(null);
  let navigations;

 
  const transactions = [
    { id: '1', name: 'Priya Mehta', time: 'Today 9:10 Pm', amount: 1000, type: 'received', color: '#10B981' },
    { id: '2', name: 'Priya Mehta', time: 'Yesterday - 9:10 Pm', amount: -250, type: 'sent', color: '#EF4444' },
    { id: '3', name: 'Priya Mehta', time: 'today 9/10 Pm', amount: -500, type: 'pending', color: '#F59E0B' },
    { id: '4', name: 'Priya Mehta', time: 'Today 9:10 Pm', amount: 1000, type: 'received', color: '#10B981' },
    { id: '5', name: 'Priya Mehta', time: 'Yesterday - 9:10 Pm', amount: -250, type: 'sent', color: '#EF4444' },
        { id: '6', name: 'Priya Mehta', time: 'Today 9:10 Pm', amount: 1000, type: 'received', color: '#10B981' },
    { id: '7', name: 'Priya Mehta', time: 'Yesterday - 9:10 Pm', amount: -250, type: 'sent', color: '#EF4444' },
    { id: '8', name: 'Priya Mehta', time: 'today 9/10 Pm', amount: -500, type: 'pending', color: '#F59E0B' },
    { id: '9', name: 'Priya Mehta', time: 'Today 9:10 Pm', amount: 1000, type: 'received', color: '#10B981' },
    { id: '10', name: 'Priya Mehta', time: 'Yesterday - 9:10 Pm', amount: -250, type: 'sent', color: '#EF4444' },
  ];
 const[avaliable,setAvaliable] =useState("");

  useEffect(()=>{
     try {
    const response = api.get('/transactions');

    console.log(response?.data,"997")
  } catch (error) {
    setMessage(
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong"
    );
  }

  },[transactionsList])

  useEffect(() => {
  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/wallet/balance'); // ✅ await هنا

      console.log(response.data, "997"); // now you'll see real data

      // adjust based on API
      setAvaliable(response?.data?.balance || "0");

    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  fetchBalance();
}, []);
  
 
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'received': return '✓';
      case 'sent': return '↑';
      case 'pending': return '⏱';
      default: return '●';
    }
  };
 
  const getAvatarBackgroundColor = (type) => {
    switch (type) {
      case 'received': return '#10B98180';
      case 'sent': return '#8B5CF680';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };
 
  return (
    <View style={styles.container}>
     
      {/* HEADER */}
      {/* <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <View style={styles.headerRight}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.profileIcon}>
            <Text>👤</Text>
          </View>
        </View>
      </View> */}
      <Header/>
 
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
       
        {/* BALANCE CARD */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>
                {balanceVisible ? `₹ ${avaliable}` : '* * * * * *'}
              </Text>
              <Text style={styles.payoLabel}>PAYO</Text>
            </View>
           
            <View style={styles.cardRight}>
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                <Text style={{ fontSize: 16, color: '#FFD700' }}>👁</Text>
              </TouchableOpacity>
              <View style={styles.walletDecoration} />
            </View>
          </View>
 
          {/* WALLET BUTTON */}
          <View style={styles.cardFooter}>
            <Text style={styles.walletLabel}>My Wallets</Text>
            <TouchableOpacity style={styles.walletButton}>
              <Text style={styles.walletButtonText}>View All</Text>
              <Text style={styles.walletArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
 
        {/* ACTION BUTTONS */}
        <View style={styles.actionsContainer}>
          
          {/* <View style={styles.actions}>
           
          
            <TouchableOpacity
              style={styles.actionWrapper}
              // onPress={() => navigate('EnterAddress')}
            >
              <View style={styles.actionButton}>
                <Text style={styles.actionIcon}>📤</Text>
              </View>
              <Text style={styles.actionLabel}>Send</Text>
            </TouchableOpacity>
 
        
            <TouchableOpacity
              style={styles.actionWrapper}
              // onPress={() => navigate('scan')}
            >
              <View style={styles.actionButton}>
                <Text style={styles.actionIcon}>📥</Text>
              </View>
              <Text style={styles.actionLabel}>Receive</Text>
            </TouchableOpacity>
 
          
            <TouchableOpacity
              style={styles.actionWrapper}
              // onPress={() => navigate('home')}
            >
              <View style={styles.actionButton}>
                <Text style={styles.actionIcon}>🔗</Text>
              </View>
              <Text style={styles.actionLabel}>Refer</Text>
            </TouchableOpacity>
 
          </View> */}

<View style={styles.actions}>

  {/* SEND */}
  <TouchableOpacity style={styles.button}
 onPress={() => navigation.navigate('SendScreen')}
  //  onPress={() => navigation.navigate('ScanQR')}
  >
    <View style={styles.iconCircle}>
      <Text style={{ color: '#fff' }}>
        {/* ↗ */}
        </Text>
    </View>
    <Text style={styles.label}>Send</Text>
  </TouchableOpacity>

  {/* LINE */}
  <View style={styles.connector} />

  {/* RECEIVE */}
  <TouchableOpacity style={styles.button}
   onPress={() => navigation.navigate('Receive')} 
   >
    <View style={styles.iconCircle}>
      <Text style={{ color: '#fff' }}>
        {/* ↙ */}
        </Text>
    </View>
    <Text style={styles.label}>Receive</Text>
  </TouchableOpacity>

  {/* LINE */}
  <View style={styles.connector} />

  {/* REFER */}
  <TouchableOpacity style={styles.button}>
    <View style={styles.iconCircle}>
      <Text style={{ color: '#fff' }}>
        {/* ↗ */}
        </Text>
    </View>
    <Text style={styles.label}>Refer</Text>
  </TouchableOpacity>

</View>
        
        </View>
 
        {/* INCOME/OUTCOME */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📈</Text>
              <Text style={styles.statValue}>₹ {income}</Text>
              <Text style={styles.statLabel}>Income</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📉</Text>
              <Text style={styles.statValue}>₹ {outcome}</Text>
              <Text style={styles.statLabel}>Outcome</Text>
            </View>
          </View>
        </View>
 
        {/* TRANSACTIONS HEADER */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transaction</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All ›</Text>
          </TouchableOpacity>
        </View>
 
        {/* TRANSACTIONS LIST */}
        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionAvatar,
                  { backgroundColor: getAvatarBackgroundColor(transaction.type) }
                ]}>
                  <Text>{getTransactionIcon(transaction.type)}</Text>
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionTime}>{transaction.time}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.amount > 0 ? styles.amountPositive : styles.amountNegative
              ]}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount}
              </Text>
            </View>
          ))}
        </View>
 
      </ScrollView>
 
      {/* BOTTOM NAV */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.navActive]}>🏠</Text>
          <Text style={[styles.navLabel, styles.navActive]}>Home</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.navInactive]}>💳</Text>
          <Text style={[styles.navLabel, styles.navInactive]}>Wallets</Text>
        </TouchableOpacity>
 
        <TouchableOpacity
          style={styles.centerIcon}
          // onPress={() => navigate('scan')}
        >
          <Text style={{ fontSize: 28 }}>↔</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.navInactive]}>📊</Text>
          <Text style={[styles.navLabel, styles.navInactive]}>Transactions</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.navInactive]}>⚙️</Text>
          <Text style={[styles.navLabel, styles.navInactive]}>Profile</Text>
        </TouchableOpacity>
      </View> */}
      {/* <BottomNav navigation={navigations} /> */}
    </View>
  );
}
