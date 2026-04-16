// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity
// } from 'react-native';

// export default function HomeScreen() {

//   return (
//     <View style={styles.container}>

//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.menu}>☰</Text>
//         <Text style={styles.title}>PAYO</Text>
//         <Text style={styles.profile}>👤</Text>
//       </View>

//       {/* BALANCE CARD */}
//       <View style={styles.card}>
//         <Text style={styles.balanceLabel}>Total Balance</Text>
//         <Text style={styles.balance}>***** PAYO</Text>

//         <TouchableOpacity style={styles.walletBtn}>
//           <Text>My Wallet →</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ACTION BUTTONS */}
//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionBtn}>
//           <Text>Send</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionBtn}>
//           <Text>Receive</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionBtn}>
//           <Text>Refer</Text>
//         </TouchableOpacity>
//       </View>

//       {/* BOTTOM NAV */}
//       <View style={styles.bottomNav}>

//         <Text style={styles.navItem}>Home</Text>
//         <Text style={styles.navItem}>Wallets</Text>
//         <Text style={styles.navItem}>Transactions</Text>
//         <Text style={styles.navItem}>Profile</Text>

//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#5A00D1',
//     paddingTop: 50,
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     alignItems: 'center'
//   },

//   menu: { color: '#fff', fontSize: 20 },
//   title: { color: '#fff', fontSize: 18, fontWeight: '700' },
//   profile: { color: '#fff' },

//   card: {
//     backgroundColor: '#222',
//     margin: 20,
//     borderRadius: 15,
//     padding: 20
//   },

//   balanceLabel: {
//     color: '#aaa'
//   },

//   balance: {
//     color: '#fff',
//     fontSize: 22,
//     marginVertical: 10
//   },

//   walletBtn: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//     alignSelf: 'flex-start'
//   },

//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20
//   },

//   actionBtn: {
//     backgroundColor: '#FFD700',
//     padding: 12,
//     borderRadius: 20
//   },

//   bottomNav: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#3b0070',
//     padding: 15
//   },

//   navItem: {
//     color: '#fff'
//   }

// });

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './homeStlying';
import api from '../../api/axios';
 
export default function HomeScreen({ navigate }) {
  const [balance, setBalance] = useState(20000);
  const [income] = useState(20000);
  const [outcome] = useState(17000);
  const [balanceVisible, setBalanceVisible] = useState(false);
 
  const transactions = [
    { id: '1', name: 'Priya Mehta', time: 'Today 9:10 Pm', amount: 1000, type: 'received', color: '#10B981' },
    { id: '2', name: 'Priya Mehta', time: 'Yesterday - 9:10 Pm', amount: -250, type: 'sent', color: '#EF4444' },
    { id: '3', name: 'Priya Mehta', time: 'today 9/10 Pm', amount: -500, type: 'pending', color: '#F59E0B' },
    { id: '4', name: 'Priya Mehta', time: 'Today 9:10 Pm', amount: 1000, type: 'received', color: '#10B981' },
    { id: '5', name: 'Priya Mehta', time: 'Yesterday - 9:10 Pm', amount: -250, type: 'sent', color: '#EF4444' },
  ];

  // useEffect(()=>{
  //    try {
  //   const response = api.get('/api/wallet/transactions');

  //   console.log(response?.data,"997")
  // } catch (error) {
  //   setMessage(
  //     error?.response?.data?.message ||
  //     error?.message ||
  //     "Something went wrong"
  //   );
  // }

  // },[transactions])
  
 
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
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <View style={styles.headerRight}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.profileIcon}>
            <Text>👤</Text>
          </View>
        </View>
      </View>
 
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
       
        {/* BALANCE CARD */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>
                {balanceVisible ? `₹ ${balance}` : '* * * * * *'}
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
            <Text style={styles.walletLabel}>My Wallet</Text>
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
              onPress={() => navigate('EnterAddress')}
            >
              <View style={styles.actionButton}>
                <Text style={styles.actionIcon}>📤</Text>
              </View>
              <Text style={styles.actionLabel}>Send</Text>
            </TouchableOpacity>
 
        
            <TouchableOpacity
              style={styles.actionWrapper}
              onPress={() => navigate('scan')}
            >
              <View style={styles.actionButton}>
                <Text style={styles.actionIcon}>📥</Text>
              </View>
              <Text style={styles.actionLabel}>Receive</Text>
            </TouchableOpacity>
 
          
            <TouchableOpacity
              style={styles.actionWrapper}
              onPress={() => navigate('home')}
            >
              <View style={styles.actionButton}>
                <Text style={styles.actionIcon}>🔗</Text>
              </View>
              <Text style={styles.actionLabel}>Refer</Text>
            </TouchableOpacity>
 
          </View> */}

           <View style={styles.actions}>

      {/* SEND */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('EnterAddress')}
      >
        <View style={styles.iconCircle}>
          <Icon name="arrow-up-right" size={16} color="#fff" />
        </View>
        <Text style={styles.label}>Send</Text>
      </TouchableOpacity>

      {/* RECEIVE */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('scan')}
      >
        <View style={styles.iconCircle}>
          <Icon name="arrow-down-left" size={16} color="#fff" />
        </View>
        <Text style={styles.label}>Receive</Text>
      </TouchableOpacity>

      {/* REFER */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('home')}
      >
        <View style={styles.iconCircle}>
          <Icon name="arrow-up-right" size={16} color="#fff" />
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
      <View style={styles.bottomNav}>
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
          onPress={() => navigate('scan')}
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
      </View>
    </View>
  );
}