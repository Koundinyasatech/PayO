import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import styles from './UserProfileStyling';
 
export default function UserProfile({ navigation }) {
 
  // ✅ HANDLE BACK BUTTON (ANDROID + GESTURE)
  useEffect(() => {
    const backAction = () => {
      navigate('home');
      return true;
    };
 
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
 
    return () => backHandler.remove();
  }, []);
 
  return (
    <View style={styles.container}>
 
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
 
        <Text style={styles.title}>Profile</Text>
 
        <View style={{ width: 20 }} />
      </View>
 
      {/* PROFILE SECTION */}
      <View style={styles.profileSection}>
 
        {/* EMPTY PROFILE IMAGE */}
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>👤</Text>
        </View>
 
        <Text style={styles.phone}>+91 8332 285 718</Text>
        <Text style={styles.verified}>• KYC VERIFIED</Text>
 
      </View>
 
      {/* BALANCE CARD */}
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.balance}>
            8,420.50 <Text style={styles.token}>PAYO</Text>
          </Text>
        </View>
 
        <View style={styles.divider} />
 
        <View>
          <Text style={styles.label}>Transactions</Text>
          <Text style={styles.transactions}>20</Text>
        </View>
      </View>
 
      {/* REFERRAL BOX */}
      <View style={styles.referralBox}>
        <Text style={styles.refLabel}>Your Referral code</Text>
        <Text style={styles.refCode}>PAYO0872</Text>
      </View>
 
      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Copy address</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Share address</Text>
        </TouchableOpacity>
      </View>
 
      {/* ACCOUNT SECTION */}
      <Text style={styles.sectionTitle}>Account</Text>
 
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.item}>KYC Verification</Text>
          <Text style={styles.green}>Approved ›</Text>
        </View>
 
        <View style={styles.row}>
          <Text style={styles.item}>Personal Information</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
 
        <View style={styles.row}>
          <Text style={styles.item}>Linked Mobile</Text>
          <Text style={styles.value}>+91 8332 285 718</Text>
        </View>
      </View>
 
      {/* SECURITY SECTION */}
      <Text style={styles.sectionTitle}>Security</Text>
 
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.item}>KYC Verification</Text>
          <Text style={styles.green}>Approved ›</Text>
        </View>
 
        <View style={styles.row}>
          <Text style={styles.item}>Personal Information</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
 
        <View style={styles.row}>
          <Text style={styles.item}>Linked Mobile</Text>
          <Text style={styles.value}>+91 8332 285 718</Text>
        </View>
      </View>
 
    </View>
  );
}
 