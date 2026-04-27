// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';
// import Svg, { Path } from 'react-native-svg';


// import HomeScreen from '../HomeScreen/HomeScreen';
// import styles from '../HomeScreen/homeStyling';
// import ScanQRScreen from '../ScanQRScreen'

// const Tab = createBottomTabNavigator();


// function CustomTabBar({ state, descriptors, navigation }) {
//   return (
    
//     <View style={styles.bottomNav}>

//       <TouchableOpacity style={styles.navItem}>
//         <Text style={[styles.navIcon, styles.navActive]}>🏠</Text>
//         <Text style={[styles.navLabel, styles.navActive]}>Home</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.navItem}>
//         <Text style={[styles.navIcon, styles.navInactive]}>💳</Text>
//         <Text style={[styles.navLabel, styles.navInactive]}>Wallets</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.centerIcon}
//          onPress={() => navigation.navigate('ScanQR')}
//       >
//         <Text style={{ fontSize: 28 }}>↔</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.navItem}>
//         <Text style={[styles.navIcon, styles.navInactive]}>📊</Text>
//         <Text style={[styles.navLabel, styles.navInactive]}>Transactions</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.navItem}>
//         <Text style={[styles.navIcon, styles.navInactive]}>⚙️</Text>
//         <Text style={[styles.navLabel, styles.navInactive]}>Profile</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// export default function BottomTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false }}
//       tabBar={(props) => <CustomTabBar {...props} />}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Wallets" component={HomeScreen} />
//       <Tab.Screen name="Scan" component={ScanQRScreen} />
//       <Tab.Screen name="Transactions" component={HomeScreen} />
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

import HomeScreen from '../HomeScreen/HomeScreen';
import ScanQRScreen from '../ScanQRScreen';

// 👉 Create dummy screens for now (replace later)
const WalletScreen = () => <View><Text>Wallet Screen</Text></View>;
const TransactionScreen = () => <View><Text>Transaction Screen</Text></View>;
const ProfileScreen = () => <View><Text>Profile Screen</Text></View>;

import styles from '../HomeScreen/homeStyling';
import ScanButtonQRScreen from '../HomeScreen/scanButton';
import SendScreen from './sendScreen';

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

        let icon = "●";

        if (route.name === "Home") icon = "🏠";
        if (route.name === "Wallets") icon = "💳";
        if (route.name === "Transactions") icon = "📊";
        if (route.name === "Profile") icon = "⚙️";

        // ⭐ Center Button (Scan)
        if (route.name === "Scan") {
          return (
            <TouchableOpacity
              key={route.name}
              style={styles.centerIcon}
              onPress={onPress}
            >
              <Text style={{ fontSize: 28 }}>↔</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.navItem}
            onPress={onPress}
          >
            <Text
              style={[
                styles.navIcon,
                isFocused ? styles.navActive : styles.navInactive,
              ]}
            >
              {icon}
            </Text>

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
      <Tab.Screen name="Transactions" component={TransactionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}