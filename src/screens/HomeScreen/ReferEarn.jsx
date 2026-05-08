import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './ReferEarnStyles';
import api from '../../api/axios';
import Clipboard from '@react-native-clipboard/clipboard';
import BottomNav from '../components/bottomNav';
import Icon from "react-native-vector-icons/Feather";
import Share from "react-native-share";
import { ActivityIndicator } from "react-native";
 
export default function ReferEarn({ navigation }) {
  const [data, setData] = useState({
    referralCode: '',
    totalReferrals: 0,
    totalRewards: 0,
  });
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
  const fetchReferral = async () => {
    try {
      setLoading(true);

      const res = await api.get('/api/wallet/refer');
      setData(res.data);

    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchReferral();
}, []);
  // COPY FUNCTION
  const copyCode = () => {
    const code = data.referralCode;
 
    Clipboard.setString(code);
 
    if (Platform.OS === "android") {
      ToastAndroid.show("Referral code copied", ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Referral code copied');
    }
  };
 
  // SHARE FUNCTION
  const handleShare = async () => {
    try {
      const code = data?.referralCode || 'PAYO0872';
 
      await Share.open({
        message: `Join PAYO using my referral code: ${code}`,
      });
 
    } catch (error) {
      console.log("Share error:", error);
    }
  };
 
  if (loading) {
  return (
    <LinearGradient
      colors={['#1e0a3c', '#5b21b6']}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </LinearGradient>
  );
}

  return (
    <LinearGradient
      colors={['#1e0a3c', '#5b21b6']}
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android"
          ? StatusBar.currentHeight
          : 0,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
 
          {/* HEADER */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.back}>
<Icon name="chevron-left" size={28} color="#ffffff" />              </Text>
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
 
          {/* REFERRAL CODE */}
          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Your Referral code</Text>
            <Text style={styles.code}>
              {data.referralCode}
            </Text>
          </View>
 
          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.btn} onPress={copyCode}>
              <Text style={styles.btnText}>Copy Code</Text>
            </TouchableOpacity>
 
            <TouchableOpacity style={styles.btn} onPress={handleShare}>
              <Text style={styles.btnText}>Share Link</Text>
            </TouchableOpacity>
          </View>
 
          {/* STATS */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {data?.successfulReferrals}
              </Text>
              <Text style={styles.statLabel}>Total Referrals</Text>
            </View>
 
            <View style={styles.statBox}>
              <Text style={styles.statValueGreen}>
                {data.totalRewards}
              </Text>
              <Text style={styles.statLabel}>Total rewards</Text>
            </View>
          </View>
 
          {/* HOW IT WORKS */}
          <View style={styles.info}>
            <Text style={styles.infoTitle}>How it works :</Text>
 
            <Text style={styles.infoText}>
              1. Share your code - friend signs up with it.
            </Text>
 
            <Text style={styles.infoText}>
              2. Friend completes KYC verification.
            </Text>
 
            <Text style={styles.infoText}>
              3. Friend makes first transaction - you earn 50 PAYO instantly.
            </Text>
          </View>
 
        </ScrollView>
 
        <BottomNav
          navigation={navigation}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
 