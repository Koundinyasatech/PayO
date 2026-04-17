import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import AnimationScreen from '../screens/AnimationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Onboarding1 from '../screens/Onboarding1';
import Onboarding2 from '../screens/Onboarding2';
import Onboarding3 from '../screens/Onboarding3';

import LoginScreen from '../screens/LoginScreen';
import RegisterMobileScreen from '../screens/RegisterMobileScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionPinScreen from '../screens/TransactionPinScreen';

/* ✅ IMPORT TABS */
import BottomTabs from './BottomTabs';

/* ✅ SCREENS */
import ScanQRScreen from '../screens/ScanQRScreen';
import Receive from '../screens/Receive';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* AUTH FLOW */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Animation" component={AnimationScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} />
        <Stack.Screen name="OTP" component={OtpVerificationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TransactionPin" component={TransactionPinScreen} />

        {/* ✅ MAIN APP */}
        <Stack.Screen name="Main" component={BottomTabs} />

        {/* FEATURES */}
        <Stack.Screen name="Scanner" component={ScanQRScreen} />
        <Stack.Screen name="Receive" component={Receive} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}