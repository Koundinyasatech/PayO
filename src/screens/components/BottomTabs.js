import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';

/* SCREENS */
import HomeScreen from '../HomeScreen/HomeScreen';
import TransactionHistory from '../HomeScreen/TransactionHistory';

const Tab = createBottomTabNavigator();

/* ---------- CUSTOM TAB BAR ---------- */
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.wrapper}>

      {/* CURVED BACKGROUND */}
      <Svg width="100%" height={90} viewBox="0 0 400 90" style={styles.svg}>
        <Path
          d="M0 20 Q200 -40 400 20 L400 90 L0 90 Z"
          fill="#1c0033"
        />
      </Svg>

      {/* TABS */}
      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          if (route.name === 'Scan') return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Wallets') iconName = 'credit-card';
          if (route.name === 'Transactions') iconName = 'bar-chart-2';
          if (route.name === 'Profile') iconName = 'settings';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <Icon
                name={iconName}
                size={22}
                color={isFocused ? '#FF7FD8' : '#aaa'}
              />

              <Text
                style={[
                  styles.label,
                  { color: isFocused ? '#FF7FD8' : '#aaa' },
                ]}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CENTER SCAN BUTTON */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('ScanQR')}
        activeOpacity={0.8}
      >
        <Icon name="maximize" size={26} color="white" />
      </TouchableOpacity>

    </View>
  );
}

/* ---------- NAV ---------- */
export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallets" component={HomeScreen} />
      <Tab.Screen name="Scan" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={TransactionHistory} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 90,
  },

  svg: {
    position: 'absolute',
    bottom: 0,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    paddingHorizontal: 10,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    fontSize: 12,
    marginTop: 4,
  },

  scanButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: -28,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#7B2CFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});