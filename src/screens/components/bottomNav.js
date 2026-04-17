import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../screens/HomeScreen/homeStlying';

export default function BottomNav({ navigation }) {
  return (
    <View style={styles.bottomNav}>

      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, styles.navActive]}>🏠</Text>
        <Text style={[styles.navLabel, styles.navActive]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, styles.navInactive]}>💳</Text>
        <Text style={[styles.navLabel, styles.navInactive]}>Wallets</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerIcon}
        // onPress={() => navigation.navigate('scan')}
      >
        <Text style={{ fontSize: 28 }}>↔</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, styles.navInactive]}>📊</Text>
        <Text style={[styles.navLabel, styles.navInactive]}>Transactions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, styles.navInactive]}>⚙️</Text>
        <Text style={[styles.navLabel, styles.navInactive]}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
}