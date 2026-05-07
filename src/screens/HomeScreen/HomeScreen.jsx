

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
   const [totalBalance, setTotalBalance] = useState("");
  const displayedTransactions = showAll
    ? transactionsList
    : transactionsList.slice(0, 6);


     useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const res = await api.get('/api/wallet/income-outcome'); // ✅ await

        console.log(res.data, "000"); // ✅ actual data

        setTotalBalance(res?.data || []);

      } catch (err) {
        console.log('Transaction error:', err.message);
      }
    };

    fetchTotalBalance();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/api/wallet/transaction-list'); 

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
        const response = await api.get('/api/wallet/balance');
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
                  {balanceVisible ? ` ${avaliable}` : '* * * * *'}
                </Text>
                <Text style={styles.payoLabel}>  PAYO</Text>
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
              <TouchableOpacity style={styles.walletRow} onPress={() => navigation.navigate('Wallets')} >
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

        {/* <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>
                 <Icon name="arrow-up" size={18} color="#53D258" />
              </Text>
              <Text style={styles.statValue}>₹ {income}</Text>
              <Text style={styles.statLabel}>Income</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>
                     <Icon name="arrow-down" size={18} color="#E25C5C" />
              </Text>
              <Text style={styles.statValue}>₹ {outcome}</Text>
              <Text style={styles.statLabel}>Outcome</Text>
            </View>
          </View>
        </View> */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>

            {/* Income */}
            <View style={styles.statItem}>
              <Icon name="arrow-down" size={28} color="#53D258" />

              <View style={styles.textBlock}>
                <Text style={styles.statLabel}>Income</Text>

                <View style={styles.amountRow}>
                  <Text style={styles.statValue}>{totalBalance?.income}</Text>
                  <Text style={styles.unit}> PAYO</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Outcome */}
            <View style={styles.statItem}>
              <Icon name="arrow-up" size={28} color="#FF6B6B" />

              <View style={styles.textBlock}>
                <Text style={styles.statLabel}>Outcome</Text>

                <View style={styles.amountRow}>
                  <Text style={styles.statValue}>{totalBalance?.outcome}</Text>
                  <Text style={styles.unit}> PAYO</Text>
                </View>
              </View>
            </View>

          </View>

          {/* white corners */}
          {/* <View style={styles.cornerLeft} />
          <View style={styles.cornerRight} /> */}
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

          <TouchableOpacity
  key={index}
  style={styles.transactionItem}
  activeOpacity={0.7}
  onPress={() =>
    navigation.navigate("TransactionDetailScreen", {
      transaction_id: transaction?.id,
    })
  }
>
  {/* LEFT SIDE */}
  <View style={styles.transactionLeft}>
    <View
      style={[
        styles.transactionAvatar,
        {
          backgroundColor:
            transaction.status === "failed"
              ? "#FEE2E2"
              : transaction.amount > 0
              ? "#56F27B"
              : "#E5E7EB",
        },
      ]}
    >
      {transaction.status === "failed" ? (
        <Icon name="alert-circle" size={18} color="red" />
      ) : transaction.amount > 0 ? (
        <Icon name="arrow-down" size={18} color="black" />
      ) : (
        <Icon name="arrow-up-right" size={18} color="black" />
      )}
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

  {/* RIGHT SIDE */}
  <View style={styles.amountBlock}>
    <View style={styles.amountRow}>
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

    <Text
      style={[
        styles.statusText,
        transaction.status === "failed" && { color: "red" },
      ]}
    >
      {transaction.status === "failed"
        ? "Failed"
        : transaction.amount > 0
        ? "Received"
        : "Sent"}
    </Text>
  </View>
</TouchableOpacity>

            ))}
          </View>
        ) : (
          <View style={styles.noTransactionContainer}>
  <Text style={styles.noTransactionText}>
    No transactions found
  </Text>
</View>
        )}


      </ScrollView>


    </View>

    //  </SafeAreaView>
  );
}
