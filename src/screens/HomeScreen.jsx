import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function HomeScreen() {

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.menu}>☰</Text>
        <Text style={styles.title}>PAYO</Text>
        <Text style={styles.profile}>👤</Text>
      </View>

      {/* BALANCE CARD */}
      <View style={styles.card}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>***** PAYO</Text>

        <TouchableOpacity style={styles.walletBtn}>
          <Text>My Wallet →</Text>
        </TouchableOpacity>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text>Receive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text>Refer</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>

        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Wallets</Text>
        <Text style={styles.navItem}>Transactions</Text>
        <Text style={styles.navItem}>Profile</Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#5A00D1',
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center'
  },

  menu: { color: '#fff', fontSize: 20 },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  profile: { color: '#fff' },

  card: {
    backgroundColor: '#222',
    margin: 20,
    borderRadius: 15,
    padding: 20
  },

  balanceLabel: {
    color: '#aaa'
  },

  balance: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10
  },

  walletBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },

  actionBtn: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 20
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3b0070',
    padding: 15
  },

  navItem: {
    color: '#fff'
  }

});