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

export default function WalletScreen({ navigation }) {
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
      console.log(
        'Wallet API error:',
        error?.response || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // DAILY LIMIT PROGRESS
  const progress =
    wallet?.dailyLimit > 0
      ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
      : 0;

  if (loading) {
    return (
      <LinearGradient
        colors={['#7B2CFF', '#1C0033']}
        style={styles.loader}
      >
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
          Platform.OS === "android"
            ? StatusBar.currentHeight
            : 0,
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

            <Text style={styles.active}>
              • Active Wallet
            </Text>

            <Text style={styles.label}>
              Total Balance
            </Text>

            <Text style={styles.balance}>
              {wallet?.balance?.toLocaleString()} PAYO
            </Text>

            <View style={styles.actions}>

              <TouchableOpacity style={styles.btnWhite}>
                <Text>WalletAddres</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnOutline}>
                <Text style={{ color: '#fff' }}>
                  Share QR
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* TOKEN HOLDINGS HEADER */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>
              Token Holdings
            </Text>
          </View>

          {/* REFERRAL REWARDS */}
          <View style={styles.box}>

            <View style={styles.rowBetween}>

              <Text style={styles.boxTitle}>
                Referral Rewards
              </Text>

              <View style={{ alignItems: 'flex-end' }}>

                <Text style={styles.amount}>
                  {wallet?.referralRewards || 0} PAYO
                </Text>

                <Text
                  style={[
                    styles.pending,
                    {
                      color:
                        wallet?.referralStatus === "Unlocked"
                          ? "#22c55e"
                          : "#facc15",
                    },
                  ]}
                >
                  {wallet?.referralStatus}
                </Text>

              </View>

            </View>

            {wallet?.referralStatus === "Locked" ? (
              <Text style={styles.locked}>
                • Unlocks in {wallet?.unlockInDays} days
              </Text>
            ) : (
              <Text
                style={[
                  styles.locked,
                  { color: "#22c55e" },
                ]}
              >
                • Rewards Available
              </Text>
            )}

          </View>

          {/* DAILY LIMIT */}
          <View style={styles.box}>

            <Text style={styles.boxTitle}>
              Daily Transaction Limit
            </Text>

            {/* USED / LIMIT */}
            <View style={styles.rowBetween}>

              <Text style={styles.subText}>
                Used {wallet?.dailyUsed || 0}
              </Text>

              <Text style={styles.subText}>
                Limit: {wallet?.dailyLimit || 0}
              </Text>

            </View>

            {/* PROGRESS BAR */}
            <View style={styles.progressBg}>

              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(progress, 100)}%`,
                  },
                ]}
              />

            </View>

          </View>

          {/* BUTTONS */}
          <View style={styles.bottomButtons}>

            <TouchableOpacity style={styles.freezeBtn}>
              {/* <Text style={styles.freezeText}>
                Freeze Wallet
              </Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() =>
                navigation.navigate('SendScreen')
              }
            >
              <Text style={styles.sendText}>
                Send PAYO
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}