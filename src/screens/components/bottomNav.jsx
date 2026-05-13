import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

export default function BottomNav({ navigation, currentRoute }) {
  const insets = useSafeAreaInsets();

  const goToTab = (screen) => {
    navigation.navigate('Main', { screen });
  };

  return (
    <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 10 }]}>
      
      {/* HOME */}
      <TouchableOpacity style={styles.navItem} onPress={() => goToTab('Home')}>
        <Text style={[
          styles.navIcon,
          currentRoute === 'Home' ? styles.navActive : styles.navInactive
        ]}>
                   <Icon
            name="home"
            size={22}
            color=
             '#FF7FD8' 
          />

        </Text>
        <Text style={[
          styles.navLabel,
          currentRoute === 'Home' ? styles.navActive : styles.navInactive
        ]}>Home</Text>
      </TouchableOpacity>

      {/* WALLETS */}
      <TouchableOpacity style={styles.navItem} onPress={() => goToTab(' +')}>
        <Text style={[
          styles.navIcon,
          currentRoute === 'Wallets' ? styles.navActive : styles.navInactive
        ]}>
                <Icon
            name="credit-card"
            size={22}
            color=
             '#ccc'
          />
        </Text>
        <Text style={[
          styles.navLabel,
          currentRoute === 'Wallets' ? styles.navActive : styles.navInactive
        ]}>Wallets</Text>
      </TouchableOpacity>

      {/* CENTER BUTTON */}
      <TouchableOpacity style={styles.centerIcon} onPress={() => goToTab('ScanButton')}>
        <Text style={{ fontSize: 28, color: '#fff' }}>
          <Icon name="maximize" size={26} color="#fff" />
        </Text>
      </TouchableOpacity>

      {/* TRANSACTIONS */}
      <TouchableOpacity style={styles.navItem} onPress={() => goToTab('Transactions')}>
        <Text style={[
          styles.navIcon,
          currentRoute === 'Transactions' ? styles.navActive : styles.navInactive
        ]}>
                <Icon
            name="bar-chart-2"
            size={22}
            color=
             '#ccc'
          />
        </Text>
        <Text style={[
          styles.navLabel,
          currentRoute === 'Transactions' ? styles.navActive : styles.navInactive
        ]}>Transactions</Text>
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity style={styles.navItem} onPress={() => goToTab('Profile')}>
        <Text style={[
          styles.navIcon,
          currentRoute === 'Profile' ? styles.navActive : styles.navInactive
        ]}>
                <Icon
            name="settings"
            size={22}
            color=
             '#ccc'
          />
        </Text>
        <Text style={[
          styles.navLabel,
          currentRoute === 'Profile' ? styles.navActive : styles.navInactive
        ]}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    height: 75,
    backgroundColor: '#2E1065',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    zIndex: 999,
    elevation: 15,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 20,
  },

  navLabel: {
    fontSize: 10,
    marginTop: 3,
  },

  navActive: {
    color: '#F472B6',
  },

  navInactive: {
    color: '#aaa',
  },

  centerIcon: {
    position: 'absolute',
    top: -30,

    width: 65,
    height: 65,
    borderRadius: 35,

    backgroundColor: '#7C3AED',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 20,
    zIndex: 1000,
  },
});
