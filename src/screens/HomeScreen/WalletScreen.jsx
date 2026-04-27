import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../api/axios';
import styles from './WalletScreenStyles';

export default function WalletScreen() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      // ✅ CHANGE API IF YOUR ROUTE IS DIFFERENT
      const res = await api.get('/api/wallet/dashboard');

      /*
        Expected response example:
        {
          id: "PYXZ673849A",
          balance: 8420.50,
          referralRewards: 200,
          referralStatus: "Locked",
          unlockInDays: 3,
          dailyUsed: 6200,
          dailyLimit: 10000
        }
      */

      setWallet(res.data);
    } catch (error) {
      console.log('Wallet API error:', error?.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Progress calculation
  const progress =
    wallet?.dailyLimit > 0
      ? (wallet.dailyUsed / wallet.dailyLimit) * 100
      : 0;

  if (loading) {
    return (
      <LinearGradient colors={['#7B2CFF', '#1C0033']} style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#7B2CFF', '#1C0033']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.walletId}>Wallet ID</Text>
              <Text style={styles.walletNumber}>{wallet?.id}</Text>
            </View>

            <View style={styles.headerRight}>
              <Icon name="bell" size={20} color="#fff" />
              <View style={styles.avatar} />
            </View>
          </View>

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

          {/* HEADER ROW */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Token Holdings</Text>
            <Text style={styles.history}>History</Text>
          </View>

          {/* REFERRAL */}
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
            <View style={styles.rowBetween}>
              <Text style={styles.boxTitle}>
                Daily Transaction Limit
              </Text>

              <Text style={styles.limit}>
                {wallet?.dailyUsed} / {wallet?.dailyLimit}
              </Text>
            </View>

            {/* PROGRESS */}
            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.subText}>
                Used {wallet?.dailyUsed}
              </Text>
              <Text style={styles.subText}>
                Limit: {wallet?.dailyLimit}
              </Text>
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