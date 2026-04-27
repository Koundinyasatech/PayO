import React, { useState } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

import ScanQRScreen from '../ScanQRScreen';
import EnterAddressScreen from '../HomeScreen/enterAddress';
import EnterAmountScreen from '../HomeScreen/EnterAmountScreen';
import Header from './header';
import SendTabs from './SendTabs';   // ✅ USING YOUR TABS

export default function SendScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('scan');
  const [selectedUser, setSelectedUser] = useState(null);

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
            navigation={navigation}
          />
        );

      case 'recents':
        return <Text style={{ color: 'white', textAlign: 'center' }}>Recents</Text>;

      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={["#6A00F4", "#1A0033"]} style={{ flex: 1 }}>

      {/* HEADER */}
      <Header />

      {/* TITLE */}
      {activeTab !== 'amount' && (
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>
            {getHeaderTitle()}
          </Text>
        </View>
      )}

      {/* ✅ TABS (FIXED) */}
      {activeTab !== 'amount' && (
        <SendTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* CONTENT */}
      <View style={{ flex: 1, marginTop: 30 }}>
        {renderContent()}
      </View>

    </LinearGradient>
  );
}