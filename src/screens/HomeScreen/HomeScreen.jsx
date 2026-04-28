

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import styles from './homeStyling';
import api, { getToken } from '../../api/axios';
import Header from '../components/header';
import { SafeAreaView } from 'react-native';
// import Header from '../components/header';
// import BottomNav from '../components/bottomNav';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeScreen({ navigation }) {
  const [balance, setBalance] = useState(0);
  const [income] = useState(20000);
  const [outcome] = useState(17000);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);
  const [showAll, setShowAll] = useState(false);
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
  const [avaliable, setAvaliable] = useState("");
  const displayedTransactions = showAll
  ? transactionsList
  : transactionsList.slice(0, 6);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/api/wallet/transaction-list'); // ✅ await

        console.log(res.data?.transactions, "000"); // ✅ actual data

        setTransactionsList(res?.data?.transactions || []);

      } catch (err) {
        console.log('Transaction error:', err.message);
      }
    };

    fetchTransactions();
  }, []);

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
  //  <SafeAreaView>
     <View style={styles.container}>

      <Header />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* <View style={styles.cardContainer}>
          <View style={styles.cardWrapper}>

            <View style={styles.topRightCurve} />
            <View style={styles.bottomLeftCurve} />

            <View style={styles.cardContent}>

              <Text style={styles.balanceLabel}>Total Balance</Text>

              <View style={styles.balanceTopRight}>
                <Text style={styles.balanceAmount}>
                  {balanceVisible ? `₹ ${balance}` : '* * * * *'}
                </Text>
                <Text style={styles.payoLabel}>PAYO</Text>
              </View>

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setBalanceVisible(!balanceVisible)}
              >
                <Icon
                  name={balanceVisible ? 'eye-off' : 'eye'}
                  size={18}
                  color="#fff"
                />
              </TouchableOpacity>

              <View style={styles.walletRow}>
                <Text style={styles.walletText}>My Wallet</Text>
                <View style={styles.arrowCircle}>
                  <Icon name="arrow-right" size={16} color="#000" />
                </View>
              </View>

            </View>

            <View style={styles.cardRight}>
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                <Text style={{ fontSize: 16, color: '#FFD700' }}>👁</Text>
              </TouchableOpacity>
              <View style={styles.walletDecoration} />
            </View>
          </View>

       
          <View style={styles.cardFooter}>
            <Text style={styles.walletLabel}>My Wallets</Text>
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>

</TouchableOpacity>
          </View>
        </View> */}

<View style={styles.cardContainer}>
  <View style={styles.card}>

    {/* Decorative Shapes */}
    <View style={styles.topRightCurve} />
    <View style={styles.bottomLeftCurve} />

    {/* LEFT CONTENT */}
    <View>
      <Text style={styles.balanceLabel}>Total Balance</Text>

      <View style={styles.balanceRow}>
        <Text style={styles.balanceAmount}>
          {/* {balanceVisible ? `₹ ${balance}` : '* * * * *'} */}
          {balanceVisible ? `P ${avaliable}` : '* * * * *'}
        </Text>
        <Text style={styles.payoLabel}> PAYO</Text>
      </View>
    </View>

    {/* RIGHT CONTENT */}
    <View style={styles.cardRight}>

      {/* Eye Icon */}
      <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
        <Icon
          name={balanceVisible ? "eye-off" : "eye"}
          size={18}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Wallet Row */}
      <TouchableOpacity style={styles.walletRow}>
        <Text style={styles.walletText}>My Wallet</Text>

        <View style={styles.arrowCircle}>
          <Icon name="arrow-right" size={14} color="#000" />
        </View>
      </TouchableOpacity>

    </View>
  </View>

  {/* Footer */}
  {/* <View style={styles.cardFooter}>
    <Text style={styles.walletLabel}>My Wallets</Text>
  </View> */}
</View>
     
        <View style={styles.actionsContainer}>



          <View style={styles.actions}>

           
            <TouchableOpacity style={styles.button}
            
              onPress={() => navigation.navigate('SendScreen', { tab: 'address' })}
            >
              <View style={styles.iconCircle}>
                <Text style={{ color: '#fff' }}>
                  {/* ↗ */}
                   <Icon name="arrow-up-right" size={14} color="#fff" />
                  
                </Text>
              </View>
              <Text style={styles.label}>Send</Text>
            </TouchableOpacity>

          
            <View style={styles.connector} />

           
            <TouchableOpacity style={styles.button}
              onPress={() => navigation.navigate('Receive')}
            >
              <View style={styles.iconCircle}>
                <Text style={{ color: '#fff' }}>
                  {/* ↙ */}
                   <Icon name="arrow-down" size={14} color="#fff" />
                </Text>
              </View>
              <Text style={styles.label}>Receive</Text>
            </TouchableOpacity>

         
            <View style={styles.connector} />

            {/* REFER */}
            <View style={styles.actionBlock}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ReferEarn")}
              >
                <View style={styles.iconCircle}>
                  <Icon name="arrow-up-right" size={14} color="#fff" />
                </View>
                <Text style={styles.label}>Refer</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>

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

        

<View style={styles.transactionsHeader}>
  <Text style={styles.transactionsTitle}>Recent Transaction</Text>

  <TouchableOpacity onPress={() => setShowAll(!showAll)}>
    <Text style={styles.viewAllText}>
      {showAll ? "Show Less ›" : "View All ›"}
    </Text>
  </TouchableOpacity>
</View>

{transactionsList?.length > 0 ? (
  <View style={styles.transactionsList}>
    {displayedTransactions.map((transaction, index) => (
      <View key={index} style={styles.transactionItem}>
        
        <View style={styles.transactionLeft}>
          <View
            style={[
              styles.transactionAvatar,
              {
                backgroundColor:
                  transaction.amount > 0 ? "#4CAF50" : "#F44336",
              },
            ]}
          >
            <Text>
              {transaction.amount > 0 ? "↓" : "↑"}
            </Text>
          </View>

          <View style={styles.transactionInfo}>
            <Text style={styles.transactionName}>
              {transaction.name}
            </Text>

            <Text style={styles.transactionTime}>
              {new Date(transaction.createdAt).toLocaleString()}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.transactionAmount,
            transaction.amount > 0
              ? styles.amountPositive
              : styles.amountNegative,
          ]}
        >
          {transaction.amount > 0 ? "+" : ""}
          {transaction.amount}
        </Text>
      </View>
    ))}
  </View>
) : (
  <Text style={{ textAlign: 'center', marginTop: 20 }}>
    No transactions found
  </Text>
)}
       

      </ScrollView>
      

         </View>
         
  //  </SafeAreaView>
  );
}
