import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';


import ScanQRScreen from '../ScanQRScreen';
import EnterAddressScreen from '../HomeScreen/enterAddress';
import styles from '../HomeScreen/homeStyling';
import Header from './header';
import BottomNav from './bottomNav';
import LinearGradient from "react-native-linear-gradient";
import EnterAmountScreen from '../HomeScreen/EnterAmountScreen';



export default function SendScreen({ navigation, route }) {
  // const initialTab = route?.params?.tab || 'scan';
 const [activeTab, setActiveTab] = useState('scan');
  const [selectedUser, setSelectedUser] = useState(null);

  // const [activeTab, setActiveTab] = useState('scan');
  // const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
  if (route?.params?.tab) {
    setActiveTab(route.params.tab);
  }
}, [route?.params?.tab]);

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'scan':
        return 'Scan QR send tokens instantly';
      case 'address':
        return 'Enter address and send tokens';
      case 'recents':
        return 'Send tokens to recent contacts';
      case 'amount':
        return 'Enter Payo Tokens';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <ScanQRScreen
            setSelectedUser={setSelectedUser}
            setActiveTab={setActiveTab}
          />
        );

      case 'address':
        return <EnterAddressScreen navigation={navigation} />;

      case 'amount':
        return (
          <EnterAmountScreen
            name={selectedUser?.name}
            address={selectedUser?.address}
            setActiveTab={setActiveTab}
              navigation={navigation} 
          />
        );

      case 'recents':
        return <Text style={{ color: 'white' }}>Recents</Text>;

      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={["#6A00F4", "#1A0033"]} style={{ flex: 1 }}>
      <Header />

     {activeTab !== 'amount' && (
  <>
    <View style={styles.headerContent}>
      <Text style={styles.headerText}>{getHeaderTitle()}</Text>
    </View>

    <View style={styles.tabs}>
      <TouchableOpacity onPress={() => setActiveTab('scan')}>
        <Text style={activeTab === 'scan' ? styles.activeTab : styles.tab}>
          Scan QR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab('address')}>
        <Text style={activeTab === 'address' ? styles.activeTab : styles.tab}>
          Enter Address
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab('recents')}>
        <Text style={activeTab === 'recents' ? styles.activeTab : styles.tab}>
          Recents
        </Text>
      </TouchableOpacity>
    </View>
  </>
)}

      <View style={styles.content}>{renderContent()}</View>

      {/* <BottomNav /> */}
      {/* <BottomNav navigation={navigation} currentRoute="Scan" /> */}

      <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined} // 👈 KEY FIX
>
  <View style={{ flex: 1 }}>
    
    {/* Your Screen Content */}

    <BottomNav
      navigation={navigation}
      // currentRoute="Home"
      currentRoute="Scan"
    />
    
  </View>
</KeyboardAvoidingView>
    </LinearGradient>
  );
}