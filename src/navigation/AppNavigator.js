import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* AUTH */
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
import EnterAmountScreen from '../screens/HomeScreen/EnterAmountScreen';
import SendPinScreen from '../screens/HomeScreen/SendPinScreen';
import ReviewTransferScreen from '../screens/HomeScreen/ReviewTransferScreen';
import ReferEarn from '../screens/HomeScreen/ReferEarn';
import TransactionDetailScreen from '../screens/HomeScreen/TransactionDetailScreen'

/* ✅ IMPORT BOTTOM TABS */
/* ✅ IMPORT BOTTOM TABS */
import BottomTabs from '../screens/components/BottomTabs';

/* SCAN + RECEIVE */
import ScanQRScreen from '../screens/ScanQRScreen';
import Receive from '../screens/Receive';

/* PAYMENT FLOW */
import EnterAddressScreen from '../screens/HomeScreen/enterAddress';


import PaymentLoading from '../screens/HomeScreen/loadingScreen';
import PaymentSuccess from '../screens/HomeScreen/successTokenScreen';
import SendScreen from '../screens/components/sendScreen';
import BottomNav from '../screens/components/bottomNav';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ScanButtonQRScreen from '../screens/HomeScreen/scanButton';

import AddBankHome from "../screens/Bank/AddBankHome";
import AccountDetails from "../screens/Bank/AccountDetails";
import AccountNumber from "../screens/Bank/AccountNumber";
import UpiPin from "../screens/Bank/UpiPin";
import SuccessScreen from "../screens/Bank/SuccessScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* AUTH */}
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
        <Stack.Screen name="EnterAmount" component={EnterAmountScreen} />
        <Stack.Screen name="SendPin" component={SendPinScreen} />
        <Stack.Screen name="review" component={ReviewTransferScreen} />
        <Stack.Screen name="ReferEarn" component={ReferEarn} />

        {/* ✅ MAIN APP WITH BOTTOM TABS */}
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Buttom" component={BottomNav} />
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* SEND FLOW */}
        <Stack.Screen name="SendScreen" component={SendScreen} />
        <Stack.Screen name="ScanQR" component={ScanQRScreen} />
        <Stack.Screen name="enterAddress" component={EnterAddressScreen} />


        <Stack.Screen name="loading" component={PaymentLoading} />
        <Stack.Screen name="successfullPayment" component={PaymentSuccess} />

        {/* RECEIVE */}
        <Stack.Screen name="Receive" component={Receive} />
        <Stack.Screen name="ScanButton" component={ScanButtonQRScreen} />
        <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
        
        
        {/* BANK DETAILS */}
        <Stack.Screen name="AddBankHome" component={AddBankHome} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="AccountNumber" component={AccountNumber} />
        <Stack.Screen name="UpiPin" component={UpiPin} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}