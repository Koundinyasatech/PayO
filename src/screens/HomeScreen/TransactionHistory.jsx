import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './TransactionHistoryStyles';
import api from '../../api/axios';

export default function TransactionHistory({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH */
  const fetchTransactions = async () => {
    try {
      const res = await api.get('/api/wallet/transactions');
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.log('Transaction error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(fetchTransactions, 5000); // realtime
    return () => clearInterval(interval);
  }, []);

  /* 🔥 FILTER */
  const filteredData = transactions.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'sent') return item.amount < 0;
    if (filter === 'received') return item.amount > 0;
    if (filter === 'processing') return item.status === 'processing';
    return true;
  });

  /* 🔥 FORMAT FULL DATE */
  const formatFullDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  /* 🔥 GROUP */
  const groupByDate = (data) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const groups = {
      today: [],
      yesterday: [],
      week: [],
    };

    data.forEach((item) => {
      const d = new Date(item.createdAt).toDateString();

      if (d === today) groups.today.push(item);
      else if (d === yesterday) groups.yesterday.push(item);
      else groups.week.push(item);
    });

    return groups;
  };

  const grouped = groupByDate(filteredData);

  /* 🔥 SECTION TITLE */
  const getSectionTitle = (type, data) => {
    if (!data.length) return '';

    const firstDate = data[0].createdAt;

    if (type === 'today') {
      return `Today, ${formatFullDate(firstDate)}`;
    }

    if (type === 'yesterday') {
      return `Yesterday, ${formatFullDate(firstDate)}`;
    }

    return `This week, ${formatFullDate(firstDate)}`;
  };

  /* 🔥 TIME */
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <LinearGradient colors={['#6A00F4', '#1A0033']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Transaction History</Text>
        </View>

        {/* FILTERS */}
        <View style={styles.filterRow}>
          {['all', 'sent', 'received', 'processing'].map((f) => (
            <TouchableOpacity key={f} onPress={() => setFilter(f)}>
              <Text style={filter === f ? styles.activeFilter : styles.filter}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTENT */}
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : transactions.length === 0 ? (
          <Text style={{ color: '#fff', marginTop: 20 }}>
            No transactions found
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* TODAY */}
            {grouped.today.length > 0 && (
              <>
                <Text style={styles.section}>
                  {getSectionTitle('today', grouped.today)}
                </Text>
                {grouped.today.map((item, index) => (
                  <TransactionItem key={index} item={item} formatTime={formatTime} />
                ))}
              </>
            )}

            {/* YESTERDAY */}
            {grouped.yesterday.length > 0 && (
              <>
                <Text style={styles.section}>
                  {getSectionTitle('yesterday', grouped.yesterday)}
                </Text>
                {grouped.yesterday.map((item, index) => (
                  <TransactionItem key={index} item={item} formatTime={formatTime} />
                ))}
              </>
            )}

            {/* WEEK */}
            {grouped.week.length > 0 && (
              <>
                <Text style={styles.section}>
                  {getSectionTitle('week', grouped.week)}
                </Text>
                {grouped.week.map((item, index) => (
                  <TransactionItem key={index} item={item} formatTime={formatTime} />
                ))}
              </>
            )}

          </ScrollView>
        )}

      </SafeAreaView>
    </LinearGradient>
  );
}

/* 🔥 ITEM */
const TransactionItem = ({ item, formatTime }) => (
  <View style={styles.item}>

    <View style={styles.left}>
      <View
        style={[
          styles.avatar,
          item.amount > 0 && { backgroundColor: '#5df2a5' }
        ]}
      >
        <Text>↗</Text>
      </View>

      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{formatTime(item.createdAt)}</Text>
      </View>
    </View>

    <View style={styles.right}>
      <Text
        style={[
          styles.amount,
          item.amount > 0 ? styles.positive : styles.negative,
        ]}
      >
        {item.amount > 0 ? `+${item.amount}` : item.amount}
      </Text>

      <Text style={styles.status}>{item.status}</Text>
    </View>

  </View>
);