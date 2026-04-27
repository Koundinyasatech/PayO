// import React from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';
// import Svg, { Path } from 'react-native-svg';

// import HomeScreen from '../HomeScreen/HomeScreen';
// import TransactionHistory from "../HomeScreen/TransactionHistory";
// import WalletScreen from '../HomeScreen/WalletScreen';
// import SendScreen from './sendScreen';

// import styles from '../HomeScreen/homeStyling';

// const Tab = createBottomTabNavigator();

// function CustomTabBar({ state, navigation }) {
//   return (
//     <View style={styles.bottomWrapper}>

//       {/* CURVE */}
//       <Svg width="100%" height={110} viewBox="0 0 400 110" style={styles.bottomSvg}>
//         <Path
//           d="M0 40 Q200 -30 400 40 L400 110 L0 110 Z"
//           fill="#2D1B69"
//         />
//       </Svg>

//       {/* TABS */}
//       <View style={styles.bottomTabs}>

//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
//           <Icon name="home" size={22} color={state.index === 0 ? '#FF7FD8' : '#ccc'} />
//           <Text style={[styles.tabLabel, state.index === 0 && styles.activeTab]}>
//             Home
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Wallets')}>
//           <Icon name="credit-card" size={22} color={state.index === 1 ? '#FF7FD8' : '#ccc'} />
//           <Text style={[styles.tabLabel, state.index === 1 && styles.activeTab]}>
//             Wallets
//           </Text>
//         </TouchableOpacity>

//         <View style={{ width: 70 }} />

//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Transactions')}>
//           <Icon name="bar-chart-2" size={22} color={state.index === 3 ? '#FF7FD8' : '#ccc'} />
//           <Text style={[styles.tabLabel, state.index === 3 && styles.activeTab]}>
//             Transactions
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
//           <Icon name="settings" size={22} color={state.index === 4 ? '#FF7FD8' : '#ccc'} />
//           <Text style={[styles.tabLabel, state.index === 4 && styles.activeTab]}>
//             Profile
//           </Text>
//         </TouchableOpacity>

//       </View>

//       {/* FLOAT BUTTON */}
//       <View style={styles.scanButton}>
//         <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
//           <Icon name="maximize" size={26} color="#fff" />
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// }

// export default function BottomTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{ headerShown: false }}
//       tabBar={(props) => <CustomTabBar {...props} />}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Wallets" component={WalletScreen} />
//       <Tab.Screen name="Scan" component={SendScreen} />
//       <Tab.Screen name="Transactions" component={TransactionHistory} />
//       <Tab.Screen name="Profile" component={HomeScreen} />
//     </Tab.Navigator>
//   );
// }

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

// 👉 Create dummy screens for now (replace later)
// const WalletScreen = () => <View><Text>Wallet Screen</Text></View>;
// const TransactionScreen = () => <View><Text>Transaction Screen</Text></View>;
// const ProfileScreen = () => <View><Text>Profile Screen</Text></View>;

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
        if (route.name === "Scan") {
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
  name="Scan"
  component={SendScreen}
  initialParams={{ tab: 'scan' }}
/>
      <Tab.Screen name="Transactions" component={TransactionHistory} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}