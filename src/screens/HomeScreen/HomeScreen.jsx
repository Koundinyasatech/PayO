import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from './homeStyling';
import api from '../../api/axios';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeScreen({ navigation }) {

  const [balance, setBalance] = useState(0);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);

  /* ===== FETCH BALANCE ===== */
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await api.get('/api/wallet/balance');
        setBalance(res.data.balance);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchBalance();
  }, []);

  /* ===== FETCH TRANSACTIONS ===== */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/api/wallet/transactions');
        const tx = res.data || [];

        setTransactions(tx);

        let inc = 0;
        let out = 0;

        tx.forEach(item => {
          if (item.amount > 0) inc += item.amount;
          else out += Math.abs(item.amount);
        });

        setIncome(inc);
        setOutcome(out);

      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTransactions();
  }, []);

  const getIcon = (type) => {
    if (type === 'received') return 'check';
    if (type === 'sent') return 'arrow-up';
    if (type === 'pending') return 'clock';
    return 'circle';
  };

  const getColor = (type) => {
    if (type === 'received') return '#22c55e';
    if (type === 'sent') return '#8b5cf6';
    if (type === 'pending') return '#9ca3af';
    return '#9ca3af';
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ===== BALANCE CARD ===== */}
        <View style={styles.cardContainer}>
          <View style={styles.cardWrapper}>

            {/* BACKGROUND SHAPES */}
            <View style={styles.topRightCurve} />
            <View style={styles.bottomLeftCurve} />

            {/* CONTENT */}
            <View style={styles.cardContent}>

              {/* LABEL */}
              <Text style={styles.balanceLabel}>Total Balance</Text>

              {/* BALANCE TOP RIGHT */}
              <View style={styles.balanceTopRight}>
                <Text style={styles.balanceAmount}>
                  {balanceVisible ? `₹ ${balance}` : '* * * * *'}
                </Text>
                <Text style={styles.payoLabel}>PAYO</Text>
              </View>

              {/* EYE ICON */}
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

              {/* WALLET */}
              <View style={styles.walletRow}>
                <Text style={styles.walletText}>My Wallet</Text>
                <View style={styles.arrowCircle}>
                  <Icon name="arrow-right" size={16} color="#000" />
                </View>
              </View>

            </View>
          </View>
        </View>

        {/* ===== ACTION BUTTONS ===== */}
        <View style={styles.actionsContainer}>
          <View style={styles.actions}>

            <View style={styles.actionBlock}>
              <TouchableOpacity style={styles.button}>
                <View style={styles.iconCircle}>
                  <Icon name="arrow-up-right" size={14} color="#fff" />
                </View>
                <Text style={styles.label}>Send</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.connector} />

            <View style={styles.actionBlock}>
              <TouchableOpacity style={styles.button}>
                <View style={styles.iconCircle}>
                  <Icon name="arrow-down" size={14} color="#fff" />
                </View>
                <Text style={styles.label}>Receive</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.connector} />

            <View style={styles.actionBlock}>
              <TouchableOpacity style={styles.button}>
                <View style={styles.iconCircle}>
                  <Icon name="arrow-up-right" size={14} color="#fff" />
                </View>
                <Text style={styles.label}>Refer</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* ===== STATS ===== */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>

            <View style={styles.statItem}>
              <Icon name="arrow-down" size={18} color="#22c55e" />
              <Text style={styles.statValue}>₹ {income}</Text>
              <Text style={styles.statLabel}>Income</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Icon name="arrow-up" size={18} color="#ef4444" />
              <Text style={styles.statValue}>₹ {outcome}</Text>
              <Text style={styles.statLabel}>Outcome</Text>
            </View>

          </View>
        </View>

        {/* ===== TRANSACTIONS ===== */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transaction</Text>
          <Text style={styles.viewAllText}>View All ›</Text>
        </View>

        <View style={styles.transactionsList}>
          {transactions.map((item, index) => (
            <View key={index} style={styles.transactionItem}>

              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionAvatar,
                  { backgroundColor: getColor(item.type) }
                ]}>
                  <Icon name={getIcon(item.type)} size={14} color="#fff" />
                </View>

                <View>
                  <Text style={styles.transactionName}>{item.name}</Text>
                  <Text style={styles.transactionTime}>{item.time}</Text>
                </View>
              </View>

              <Text style={[
                styles.transactionAmount,
                item.amount > 0
                  ? styles.amountPositive
                  : styles.amountNegative
              ]}>
                {item.amount > 0 ? '+' : ''}{item.amount}
              </Text>

            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}