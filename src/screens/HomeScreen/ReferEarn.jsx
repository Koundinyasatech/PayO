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
  Share,
} from 'react-native';
 
import LinearGradient from 'react-native-linear-gradient';
import styles from './ReferEarnStyles';
import api from '../../api/axios';
import Clipboard from '@react-native-clipboard/clipboard';
import BottomNav from '../components/bottomNav';
import Icon from "react-native-vector-icons/Feather";
export default function ReferEarn({ navigation }) {
 
  const [data, setData] = useState({
    referralCode: '',
    totalUsers: 0,
    successfulReferrals: 0,
    totalRewards: 0,
    rewardPerUser: 50,
  });
 
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchReferral();
  }, []);
 
  const fetchReferral = async () => {
    try {
 
      const res = await api.get('/api/wallet/refer');
 
      console.log(res.data, "REFERRAL DATA");
 
      setData(res.data);
 
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  // COPY CODE
  const copyCode = () => {
    Clipboard.setString(data.referralCode || 'PAYO0872');
 
    Alert.alert(
      'Copied',
      'Referral code copied successfully'
    );
  };
 
  // SHARE CODE
  const shareReferral = async () => {
    try {
 
      await Share.share({
        message:
          `Join PayO using my referral code: ${data.referralCode}`,
      });
 
    } catch (error) {
      console.log(error);
    }
  };
 
  if (loading) {
    return (
      <LinearGradient
        colors={['#1e0a3c', '#5b21b6']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>
          Loading...
        </Text>
      </LinearGradient>
    );
  }
 
  return (
    <LinearGradient
      colors={['#1e0a3c', '#5b21b6']}
      style={{
        flex: 1,
        paddingTop:
          Platform.OS === "android"
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
                <Icon
                  name="arrow-left"
                  size={22}
                  color="#fff"
                />
              </Text>
            </TouchableOpacity>
 
            <Text style={styles.header}>
              Refer & Earn
            </Text>
 
          </View>
 
          {/* CARD */}
          <View style={styles.card}>
 
            <Text style={styles.icon}>
              👥
            </Text>
 
            <Text style={styles.earn}>
              Earn {data.rewardPerUser || 50} PAYO
            </Text>
 
            <Text style={styles.desc}>
              Invite your friends to PayO and earn rewards
              when they complete their first transaction.
            </Text>
 
          </View>

          {/* REFERRAL CODE */}
          <View style={styles.codeBox}>
 
            <Text style={styles.codeLabel}>
              Your Referral Code
            </Text>
 
            <Text style={styles.code}>
              {data.referralCode}
            </Text>
 
          </View>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
 
            <TouchableOpacity
              style={styles.btn}
              onPress={copyCode}
            >
              <Text style={styles.btnText}>
                Copy Code
              </Text>
            </TouchableOpacity>
 
            <TouchableOpacity
              style={styles.btn}
              onPress={shareReferral}
            >
              <Text style={styles.btnText}>
                Share Link
              </Text>
            </TouchableOpacity>
 
          </View>

          {/* STATS */}
          <View style={styles.statsRow}>
 
            {/* TOTAL USERS */}
            <View style={styles.statBox}>
 
              <Text style={styles.statValue}>
                {data.totalUsers || 0}
              </Text>
 
              <Text style={styles.statLabel}>
                Total Users
              </Text>
 
            </View>
 
            {/* TOTAL REWARDS */}
            <View style={styles.statBox}>
 
              <Text style={styles.statValueGreen}>
                {data.totalRewards || 0}
              </Text>
 
              <Text style={styles.statLabel}>
                Total Rewards
              </Text>
 
            </View>
 
          </View>
 
          {/* REFERRAL PROGRESS */}
          <View style={styles.info}>
 
            <Text style={styles.infoTitle}>
              Referral Progress
            </Text>
 
            <Text style={styles.infoText}>
              Successful Referrals: {data.successfulReferrals || 0}
            </Text>
 
            <Text style={styles.infoText}>
              Reward Per User: {data.rewardPerUser || 50} PAYO
            </Text>
 
          </View>

          {/* HOW IT WORKS */}
          <View style={styles.info}>
 
            <Text style={styles.infoTitle}>
              How it works :
            </Text>
 
            <Text style={styles.infoText}>
              1. Share your referral code with friends.
            </Text>
            <Text style={styles.infoText}>
              2. Friend signs up using your code.
            </Text>
 
            <Text style={styles.infoText}>
              3. Friend completes their first successful transaction.
            </Text>
 
            <Text style={styles.infoText}>
              4. You earn {data.rewardPerUser || 50} PAYO instantly.
            </Text>
 
          </View>

        </ScrollView>
 
        {/* BOTTOM NAV */}
        <BottomNav navigation={navigation} />
 
      </SafeAreaView>
 
    </LinearGradient>
  );
}
 
 