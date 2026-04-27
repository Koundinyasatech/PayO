import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../HomeScreen/homeStyling';

export default function BottomNav({ navigation }) {
  return (
    <View style={styles.bottomNav}>

      {/* HOME */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={22} color="#F472B6" />
        <Text style={[styles.navLabel, styles.navActive]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* WALLETS */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Wallets')}
      >
        <Icon name="credit-card" size={22} color="#aaa" />
        <Text style={[styles.navLabel, styles.navInactive]}>
          Wallets
        </Text>
      </TouchableOpacity>

      {/* CENTER SCAN BUTTON */}
      <TouchableOpacity
        style={styles.centerIcon}
        onPress={() => navigation.navigate('Scan')}
      >
        <Icon name="maximize" size={26} color="#fff" />
      </TouchableOpacity>

      {/* TRANSACTIONS */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Transactions')}
      >
        <Icon name="bar-chart-2" size={22} color="#aaa" />
        <Text style={[styles.navLabel, styles.navInactive]}>
          Transactions
        </Text>
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name="settings" size={22} color="#aaa" />
        <Text style={[styles.navLabel, styles.navInactive]}>
          Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
}