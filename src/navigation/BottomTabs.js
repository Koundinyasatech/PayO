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

import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.wrapper}>

      <Svg width="100%" height={90} viewBox="0 0 400 90" style={styles.svg}>
        <Path
          d="M0 20 Q200 -40 400 20 L400 90 L0 90 Z"
          fill="#1c0033"
        />
      </Svg>

      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          let iconName = 'home';
          if (route.name === 'Wallets') iconName = 'credit-card';
          if (route.name === 'Transactions') iconName = 'bar-chart-2';
          if (route.name === 'Profile') iconName = 'settings';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabItem}
            >
              <Icon
                name={iconName}
                size={22}
                color={isFocused ? '#FF7FD8' : '#aaa'}
              />
              <Text style={{ color: isFocused ? '#FF7FD8' : '#aaa' }}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Icon name="maximize" size={26} color="white" />
      </TouchableOpacity>

    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallets" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}

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
  },

  tabItem: {
    alignItems: 'center',
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