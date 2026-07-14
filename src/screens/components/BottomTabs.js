// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';
// import { moderateScale } from 'react-native-size-matters';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import HomeScreen from '../HomeScreen/HomeScreen';
// import styles from '../HomeScreen/homeStyling';
// import SendScreen from './sendScreen';
// import TransactionHistory from '../HomeScreen/TransactionHistory';
// import WalletScreen from '../HomeScreen/WalletScreen';
// import MarketScreen from '../Market/market';

// const Tab = createBottomTabNavigator();

// function CustomTabBar({ state, navigation }) {
//   const insets = useSafeAreaInsets();

//   const labels = {
//     Home: 'Home',
//     Wallets: 'Wallets',
//     Transactions: 'Transactions',
//     MarketScreen: 'Market',
//   };

//   return (
//     <View
//       style={[
//         styles.bottomNav,
//         {
//           paddingBottom:
//             insets.bottom > 0
//               ? insets.bottom + moderateScale(8)
//               : moderateScale(12),

//           minHeight:
//             insets.bottom > 0
//               ? moderateScale(72) + insets.bottom
//               : moderateScale(78),
//         },
//       ]}>
//       {state.routes.map((route, index) => {
//         const isFocused = state.index === index;

//         let icon = '';

//         if (route.name === 'Home') icon = 'home';
//         if (route.name === 'Wallets') icon = 'credit-card';
//         if (route.name === 'Transactions') icon = 'repeat';
//         if (route.name === 'MarketScreen') icon = 'trending-up';

//         if (route.name === 'Send') {
//           return (
//             <TouchableOpacity
//               key={route.name}
//               style={[
//                 styles.centerIcon,
//                 {
//                   bottom:
//                     insets.bottom > 0
//                       ? moderateScale(22)
//                       : moderateScale(18),
//                 },
//               ]}
//               activeOpacity={0.85}
//               onPress={() =>
//                 navigation.navigate('Send', {
//                   tab: 'scan',
//                 })
//               }>
//               <Icon
//                 name="maximize"
//                 size={moderateScale(24)}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//           );
//         }

//         return (
//           <TouchableOpacity
//             key={route.name}
//             style={styles.navItem}
//             activeOpacity={0.8}
//             onPress={() =>
//               navigation.navigate(route.name)
//             }>
//             <Icon
//               name={icon}
//               size={moderateScale(20)}
//               color={isFocused ? '#F472B6' : '#aaa'}
//             />

//             <Text
//               style={[
//                 styles.navLabel,
//                 isFocused
//                   ? styles.navActive
//                   : styles.navInactive,
//               ]}>
//               {labels[route.name]}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// export default function BottomTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={(props) => (
//         <CustomTabBar {...props} />
//       )}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//       />

//       <Tab.Screen
//         name="Wallets"
//         component={WalletScreen}
//       />

//       <Tab.Screen
//         name="Send"
//         component={SendScreen}
//       />

//       <Tab.Screen
//         name="Transactions"
//         component={TransactionHistory}
//       />

//       <Tab.Screen
//         name="MarketScreen"
//         component={MarketScreen}
//       />
//     </Tab.Navigator>
//   );
// }

//////////////////////////////////////////////////////////////////////

// import React, { useMemo } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   useColorScheme,
//   StatusBar,
// } from 'react-native';
// import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
// import Icon from 'react-native-vector-icons/Feather';
// import { moderateScale } from 'react-native-size-matters';

// import HomeScreen from '../HomeScreen/HomeScreen';
// import SendScreen from './sendScreen';
// import TransactionHistory from '../HomeScreen/TransactionHistory';
// import WalletScreen from '../HomeScreen/WalletScreen';
// import ProfileScreen from '../UserProfile/UserProfile';

// import { getThemeColors, styles } from './BottomTabStyling';

// export default function CurvedTabs() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const colors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

//   // Unified icon selector helper
//   const getIconName = (routeName) => {
//     switch (routeName) {
//       case 'Home': return 'home';
//       case 'Wallets': return 'credit-card';
//       case 'Transactions': return 'repeat';
//       case 'Profile': return 'user';
//       default: return 'help-circle';
//     }
//   };

//   // Unified label selector helper
//   const getLabelText = (routeName) => {
//     const labels = {
//       Home: 'Home',
//       Wallets: 'Wallets',
//       Transactions: 'Transactions',
//       Profile: 'Profile',
//     };
//     return labels[routeName] || routeName;
//   };

//   // Customs individual tab items
//   const renderCustomTabBarButton = ({ routeName, selectedTab, navigate }) => {
//     const isFocused = routeName === selectedTab;
//     const iconName = getIconName(routeName);
//     const label = getLabelText(routeName);

//     return (
//       <TouchableOpacity
//         onPress={() => navigate(routeName)}
//         style={styles.tabBarButton}
//         activeOpacity={0.7}
//       >
//         <View
//           style={[
//             isFocused ? styles.navActiveBg : styles.navInactiveIconContainer,
//             isFocused && { backgroundColor: colors.activeTabBg }
//           ]}
//         >
//           <Icon
//             name={iconName}
//             size={moderateScale(20)}
//             color={isFocused ? '#FFFFFF' : colors.inactiveText}
//           />
//         </View>

//         <Text
//           style={[
//             styles.navLabel,
//             { 
//               color: isFocused ? colors.activeText : colors.inactiveText,
//               fontWeight: isFocused ? '700' : '500'
//             },
//           ]}
//         >
//           {label}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.screenBackground }]}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={colors.navBackground}
//       />

//       <CurvedBottomBar.Navigator
//         style={styles.bottomBar}
//         strokeColor={colors.navBackground}
//         circleBackgroundColor={colors.screenBackground}
//         height={moderateScale(75)} 
//         circleWidth={moderateScale(60)}
//         maxWidth={moderateScale(360)}
//         borderTopLeftRadius={moderateScale(32)}
//         borderTopRightRadius={moderateScale(32)}
//         type="DOWN"
//         bgColor={colors.navBackground}
//         initialRouteName="Home"
        
//         // REMOVES THE TOP HEADER BAR NATIVELY
//         screenOptions={{ headerShown: false }}
        
//         tabBar={renderCustomTabBarButton}
        
//         renderCircle={({ navigate }) => (
//           <TouchableOpacity
//             style={[
//               styles.btnCircle, 
//               { 
//                 borderColor: isDarkMode ? '#10B981' : '#00A859',
//                 backgroundColor: colors.screenBackground 
//               }
//             ]}
//             activeOpacity={0.85}
//             onPress={() => navigate('Send', { tab: 'scan' })}
//           >
//             <Icon 
//               name="maximize" 
//               size={moderateScale(24)} 
//               color={isDarkMode ? '#10B981' : '#00A859'} 
//             />
//           </TouchableOpacity>
//         )}
//       >
//         <CurvedBottomBar.Screen name="Home" position="LEFT" component={HomeScreen} />
//         <CurvedBottomBar.Screen name="Wallets" position="LEFT" component={WalletScreen} />
//         <CurvedBottomBar.Screen name="Send" position="CENTER" component={SendScreen} />
//         <CurvedBottomBar.Screen name="Transactions" position="RIGHT" component={TransactionHistory} />
//         <CurvedBottomBar.Screen name="Profile" position="RIGHT" component={ProfileScreen} />
//       </CurvedBottomBar.Navigator>
//     </View>
//   );
// }


/////////////////////////////////////////////////////////////////////////////////////////////

import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Icon from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';

import HomeScreen from '../HomeScreen/HomeScreen';
import SendScreen from './sendScreen';
import TransactionHistory from '../HomeScreen/TransactionHistory';
import WalletScreen from '../HomeScreen/WalletScreen';
import ProfileScreen from '../UserProfile/UserProfile';

import { getThemeColors, styles } from './BottomTabStyling';

export default function CurvedTabs() {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

  const getIconName = (routeName) => {
    switch (routeName) {
      case 'Home': return 'home';
      case 'Wallets': return 'credit-card';
      case 'Transactions': return 'repeat';
      case 'Profile': return 'user';
      default: return 'help-circle';
    }
  };

  const getLabelText = (routeName) => {
    const labels = {
      Home: 'Home',
      Wallets: 'Wallets',
      Transactions: 'Transactions',
      Profile: 'Profile',
    };
    return labels[routeName] || routeName;
  };

  const renderCustomTabBarButton = ({ routeName, selectedTab, navigate }) => {
    const isFocused = routeName === selectedTab;
    const iconName = getIconName(routeName);
    const label = getLabelText(routeName);

    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabBarButton}
        activeOpacity={0.7}
      >
        <View
          style={[
            isFocused ? styles.navActiveBg : styles.navInactiveIconContainer,
            isFocused && { backgroundColor: colors.activeTabBg }
          ]}
        >
          <Icon
            name={iconName}
            size={moderateScale(20)}
            color={isFocused ? '#FFFFFF' : colors.inactiveText}
          />
        </View>

        <Text
          style={[
            styles.navLabel,
            { 
              color: isFocused ? colors.activeText : colors.inactiveText,
              fontWeight: isFocused ? '700' : '500'
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.screenBackground }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.navBackground}
      />

      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        strokeColor={colors.navBackground}
        circleBackgroundColor={colors.navBackground}
        height={moderateScale(80)} 
        circleWidth={moderateScale(60)}
        maxWidth={moderateScale(360)}
        borderTopLeftRadius={moderateScale(32)}
        borderTopRightRadius={moderateScale(32)}
        type="DOWN"
        bgColor={colors.navBackground}
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        tabBar={renderCustomTabBarButton}
        
        renderCircle={({ navigate }) => (
          <View style={styles.circleContainer}>
            {/* SOLID BACKGROUND SHIELD: Blocks any background content from showing through the curve space */}
            <View style={[styles.circleBackgroundPatch, { backgroundColor: colors.navBackground }]} />
            
            <TouchableOpacity
              style={[
                styles.btnCircle, 
                { 
                  borderColor: isDarkMode ? '#10B981' : '#00A859',
                  backgroundColor: colors.screenBackground 
                }
              ]}
              activeOpacity={0.85}
              onPress={() => navigate('Send', { tab: 'scan' })}
            >
              <Icon 
                name="maximize" 
                size={moderateScale(24)} 
                color={isDarkMode ? '#10B981' : '#00A859'} 
              />
            </TouchableOpacity>
          </View>
        )}
      >
        <CurvedBottomBar.Screen name="Home" position="LEFT" component={HomeScreen} />
        <CurvedBottomBar.Screen name="Wallets" position="LEFT" component={WalletScreen} />
        <CurvedBottomBar.Screen name="Send" position="CENTER" component={SendScreen} />
        <CurvedBottomBar.Screen name="Transactions" position="RIGHT" component={TransactionHistory} />
        <CurvedBottomBar.Screen name="Profile" position="RIGHT" component={ProfileScreen} />
      </CurvedBottomBar.Navigator>
    </View>
  );
}