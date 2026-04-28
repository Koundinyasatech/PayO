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

/* MAIN */
import BottomTabs from '../screens/components/BottomTabs';

/* OTHER */
import EnterAmountScreen from '../screens/HomeScreen/EnterAmountScreen';
import SendPinScreen from '../screens/HomeScreen/SendPinScreen';
import ReviewTransferScreen from '../screens/HomeScreen/ReviewTransferScreen';

import EnterAddressScreen from '../screens/HomeScreen/enterAddress';
import PaymentLoading from '../screens/HomeScreen/loadingScreen';
import PaymentSuccess from '../screens/HomeScreen/successTokenScreen';



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

        {/* MAIN APP */}
        <Stack.Screen name="Main" component={BottomTabs} />

        {/* OTHER FLOW */}
        <Stack.Screen name="EnterAmount" component={EnterAmountScreen} />
        <Stack.Screen name="SendPin" component={SendPinScreen} />
        <Stack.Screen name="review" component={ReviewTransferScreen} />
        
        <Stack.Screen name="enterAddress" component={EnterAddressScreen} />
        <Stack.Screen name="loading" component={PaymentLoading} />
        <Stack.Screen name="successfullPayment" component={PaymentSuccess} />
        
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}