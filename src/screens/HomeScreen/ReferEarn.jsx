import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from './ReferEarnStyles';
import api from '../../api/axios';
import Clipboard from '@react-native-clipboard/clipboard';

export default function ReferEarn({ navigation }) {
  const [data, setData] = useState({
    referralCode: '',
    totalReferrals: 0,
    totalRewards: 0,
  });

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const res = await api.get('/api/wallet/refer');
        setData(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchReferral();
  }, []);

  const copyCode = async () => {
    await Clipboard.setStringAsync(data.referralCode);
    Alert.alert('Copied', 'Referral code copied');
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Refer & earn</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.icon}>👥</Text>
        <Text style={styles.earn}>Earn 50 PAYO</Text>
        <Text style={styles.desc}>
          For every friend who joins payo and completes their first transaction
        </Text>
      </View>

      {/* CODE */}
      <View style={styles.codeBox}>
        <Text style={styles.codeLabel}>Your Referral code</Text>
        <Text style={styles.code}>{data.referralCode}</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btn} onPress={copyCode}>
          <Text style={styles.btnText}>Copy Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Share Link</Text>
        </TouchableOpacity>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{data.totalReferrals}</Text>
          <Text style={styles.statLabel}>Total Referrals</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValueGreen}>
            {data.totalRewards}
          </Text>
          <Text style={styles.statLabel}>Total rewards</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}