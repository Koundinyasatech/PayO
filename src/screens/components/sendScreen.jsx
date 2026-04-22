import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import ScanQRScreen from '../ScanQRScreen';
import EnterAddressScreen from '../HomeScreen/enterAddress';
import styles from '../HomeScreen/homeStyling';
import Header from './header';
import BottomNav from './bottomNav';
import LinearGradient from "react-native-linear-gradient";

export default function SendScreen({navigation}) {
  const [activeTab, setActiveTab] = useState('scan');

  const getHeaderTitle = () => {
  switch (activeTab) {
    case 'scan':
      return 'Scan QR send tokens instantly';

    case 'address':
      return 'Enter address and send tokens';

    case 'recents':
      return 'Send tokens to recent contacts';

    default:
      return '';
  }
};

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return <ScanQRScreen navigation={navigation} />;

      case 'address':
        return <EnterAddressScreen navigation={navigation}/>;

      case 'recents':
        return <Text>recent</Text>

      default:
        return null;
    }
  };

  return (
      <LinearGradient
      colors={["#6A00F4", "#1A0033"]}
      style={{ flex: 1 }}
    >
    {/* <View style={styles.container}> */}

      {/* HEADER */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>
          Send tokens instantly
        </Text>
      </View> */}
      <Header/>

     <View style={styles.headerContent}>
  <Text style={styles.headerText}>
    {getHeaderTitle()}
  </Text>
</View>

      {/* TAB BUTTONS */}
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

      {/* DYNAMIC CONTENT */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* BOTTOM NAV (your existing one) */}
      {/* <View style={styles.bottom}>
        <Text style={{ color: '#fff' }}>Bottom Navigation</Text>
      </View> */}
      <BottomNav/>

   
    </LinearGradient>
  );
}