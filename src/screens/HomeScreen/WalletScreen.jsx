
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../api/axios';
import styles from './WalletScreenStyles';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get('/api/wallet/getwalletdashboard');
      console.log(res?.data, "API DATA");

      setWallet(res?.data);
    } catch (error) {
      console.log('Wallet API error:', error?.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  // progress calculation
  const progress =
    wallet?.dailyLimit > 0
      ? ((wallet?.dailyUsed?.amount || 0) / wallet?.dailyLimit) * 100
      : 0;

  if (loading) {
    return (
      <LinearGradient colors={['#7B2CFF', '#1C0033']} style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#7B2CFF', '#1C0033']}
      style={{
        flex: 1,
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <Header
            type="wallet"
            title="My Wallet"
            id={wallet?.id}
          />

          {/* WALLET CARD */}
          <View style={styles.card}>
            <Text style={styles.active}>• Active Wallet</Text>

            <Text style={styles.label}>Total Balance</Text>

            <Text style={styles.balance}>
              ₹ {wallet?.balance?.toLocaleString()} PAYO
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnWhite}>
                <Text>Copy Address</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnOutline}>
                <Text style={{ color: '#fff' }}>Share QR</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* TOKEN HOLDINGS HEADER */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Token Holdings</Text>
            <Text style={styles.history}>History</Text>
          </View>

          {/* REFERRAL BOX */}
          <View style={styles.box}>
            <View style={styles.rowBetween}>
              <Text style={styles.boxTitle}>Referral rewards</Text>

              <View>
                <Text style={styles.amount}>
                  {wallet?.referralRewards}
                </Text>

                <Text style={styles.pending}>
                  {wallet?.referralStatus}
                </Text>
              </View>
            </View>

            <Text style={styles.locked}>
              • Locked Unlocks in {wallet?.unlockInDays} days
            </Text>
          </View>

          {/* DAILY LIMIT */}
          <View style={styles.box}>

            <Text style={styles.boxTitle}>
              Daily Transaction Limit
            </Text>

            {/* USED / LIMIT */}
            <View style={styles.rowBetween}>
              <Text style={styles.subText}>
                Used {wallet?.dailyUsed?.amount || 0}
              </Text>

              <Text style={styles.subText}>
                Limit: {wallet?.dailyLimit}
              </Text>
            </View>

            {/* PROGRESS BAR */}
            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>

          </View>

          {/* BUTTONS */}
          <View style={styles.bottomButtons}>

            <TouchableOpacity style={styles.freezeBtn}>
              <Text style={styles.freezeText}>Freeze Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendBtn}>
              <Text style={styles.sendText}>Send PAYO</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

