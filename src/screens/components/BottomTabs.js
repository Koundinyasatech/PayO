import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';

/* SCREENS */
import HomeScreen from '../HomeScreen/HomeScreen';
import TransactionHistory from "../HomeScreen/TransactionHistory";
import WalletScreen from '../HomeScreen/WalletScreen';
import SendScreen from './sendScreen';
import TransactionDetailScreen from '../HomeScreen/TransactionDetailScreen';
import Receive from '../Receive';
import ReferEarn from '../HomeScreen/ReferEarn';

import styles from '../HomeScreen/homeStyling';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.bottomWrapper}>

      {/* CURVED BACKGROUND */}
      <Svg width="100%" height={110} viewBox="0 0 400 110" style={styles.bottomSvg}>
        <Path
          d="M0 40 Q200 -30 400 40 L400 110 L0 110 Z"
          fill="#2D1B69"
        />
      </Svg>

      {/* TAB ITEMS */}
      <View style={styles.bottomTabs}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.tabItem}>
          <Icon name="home" size={22} color={state.index === 0 ? '#FF7FD8' : '#ccc'} />
          <Text style={[styles.tabLabel, state.index === 0 && styles.activeTab]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Wallets')} style={styles.tabItem}>
          <Icon name="credit-card" size={22} color={state.index === 1 ? '#FF7FD8' : '#ccc'} />
          <Text style={[styles.tabLabel, state.index === 1 && styles.activeTab]}>
            Wallets
          </Text>
        </TouchableOpacity>

        {/* SPACE FOR CENTER BUTTON */}
        <View style={{ width: 70 }} />

        <TouchableOpacity onPress={() => navigation.navigate('Transactions')} style={styles.tabItem}>
          <Icon name="bar-chart-2" size={22} color={state.index === 3 ? '#FF7FD8' : '#ccc'} />
          <Text style={[styles.tabLabel, state.index === 3 && styles.activeTab]}>
            Transactions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.tabItem}>
          <Icon name="settings" size={22} color={state.index === 4 ? '#FF7FD8' : '#ccc'} />
          <Text style={[styles.tabLabel, state.index === 4 && styles.activeTab]}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>

      {/* FLOATING BUTTON */}
      <View style={styles.scanButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
          <Icon name="maximize" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallets" component={WalletScreen} />
      <Tab.Screen name="Scan" component={SendScreen} />
      <Tab.Screen name="Transactions" component={TransactionHistory} />
      <Tab.Screen name="Profile" component={HomeScreen} />

      {/* ✅ IMPORTANT: Add Detail Screen INSIDE Tabs */}
      <Tab.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          tabBarButton: () => null, // hide from tab bar
        }}
      />
      <Tab.Screen
        name="ReceiveScreen"
        component={Receive}
        options={{ tabBarButton: () => null }}
      />

      <Tab.Screen
        name="ReferEarn"
        component={ReferEarn}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}