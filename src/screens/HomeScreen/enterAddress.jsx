import React, { useState } from 'react';
import styles from './enterAddressStyling';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
 
export default function EnterAddressScreen({ navigation, setReceiver }) {
  const [activeTab, setActiveTab] = useState('address');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
 
//   const handleNext = () => {
//   if (!address) return;
 
//   setReceiver(address);
 
//   navigation('review', {
//     receiver: address,
//     amount: amount || 300,
//   });
// };

const handleNext = () => {
    if (!address) return;
    //  setReceiver(address);

    navigation.navigate('review', {
      receiver: address,
      amount: amount || 300,
    });
  };
 
 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter address and send tokens</Text>
 
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['scan', 'address', 'recent'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === 'scan'
                ? 'Scan QR'
                : tab === 'address'
                ? 'Enter Address'
                : 'Recents'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
 
      {/* Content based on tab */}
      {activeTab === 'scan' && (
        <Text style={styles.placeholder}>QR Scanner UI here</Text>
      )}
 
      {activeTab === 'recent' && (
        <Text style={styles.placeholder}>Recent addresses list</Text>
      )}
 
      {activeTab === 'address' && (
        <>
          {/* Address */}
          <Text style={styles.label}>Recipient Wallet Address</Text>
          <TextInput
            placeholder="PXY21209E..."
            placeholderTextColor="#aaa"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
 
          {/* Amount */}
          <Text style={styles.label}>Tokens</Text>
          <View style={styles.amountRow}>
            <TextInput
              placeholder="0.00"
              placeholderTextColor="#aaa"
              value={amount}
              onChangeText={setAmount}
              style={styles.amountInput}
              keyboardType="numeric"
            />
            <Text style={styles.token}>PAYO</Text>
          </View>
 
          {/* Quick buttons */}
          <View style={styles.quickRow}>
            {[100, 300, 500, 700].map((val) => (
              <TouchableOpacity
                key={val}
                style={styles.quickBtn}
                onPress={() => setAmount(val.toString())}
              >
                <Text>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
 
          {/* Balance */}
          <View style={styles.balanceBox}>
            <Text style={styles.balanceText}>Available balance</Text>
            <Text style={styles.balanceAmount}>8,420.50 PAYO</Text>
          </View>
 
          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Review and send</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}