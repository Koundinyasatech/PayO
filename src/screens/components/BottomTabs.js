

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';

import HomeScreen from '../HomeScreen/HomeScreen';
import ScanQRScreen from '../ScanQRScreen';



import styles from '../HomeScreen/homeStyling';
import ScanButtonQRScreen from '../HomeScreen/scanButton';
import SendScreen from './sendScreen';
import TransactionHistory from '../HomeScreen/TransactionHistory';
import WalletScreen from '../HomeScreen/WalletScreen';
import UserProfile from '../UserProfile/UserProfile';


const Tab = createBottomTabNavigator();


// 🔥 Custom Bottom Tab Bar
function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name); // ✅ navigate to tab
        };

        let icon;

        if (route.name === "Home") icon = "home";
        if (route.name === "Wallets") icon = "credit-card";
        if (route.name === "Transactions") icon = "bar-chart-2";
        if (route.name === "Profile") icon = "settings";

        // ⭐ Center Button (Scan)
        if (route.name === "Send") {
          return (
            <TouchableOpacity
              key={route.name}
              style={styles.centerIcon}
              onPress={onPress}
            >
              {/* <Text style={{ fontSize: 28 }}>↔</Text> */}
              <Icon name="maximize" size={26} color="#fff" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.navItem}
            onPress={onPress}
          >
            <Icon
              name={icon}
              size={22}
              color={isFocused ? '#FF7FD8' : '#ccc'}
            />

            <Text
              style={[
                styles.navLabel,
                isFocused ? styles.navActive : styles.navInactive,
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


// 🔥 Main Bottom Tabs
export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallets" component={WalletScreen} />
      {/* <Tab.Screen name="Scan" component={ScanButtonQRScreen} /> */}
      {/* <Tab.Screen name="Scan" component={SendScreen} tab="scan" /> */}

      <Tab.Screen
        name="Send"
        component={SendScreen}
        
      />
      <Tab.Screen name="Transactions" component={TransactionHistory} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}