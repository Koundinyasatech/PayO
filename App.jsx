// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';

// import SplashScreen from './src/screens/SplashScreen';
// import WelcomeScreen from './src/screens/WelcomeScreen';
// import Onboarding1 from './src/screens/Onboarding1';
// import Onboarding2 from './src/screens/Onboarding2';
// import Onboarding3 from './src/screens/Onboarding3';
// import RegisterScreen from './src/screens/RegisterScreen';
// import OtpScreen from './src/screens/OtpScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import RegistrationSuccess from './src/screens/RegistrationSuccess';
// import TransactionPin from './src/screens/TransactionPin';
// import LoginScreen from './src/screens/LoginScreen';
// import LoginOtpScreen from './src/screens/LoginOtpScreen';
// import LoginVerifyScreen from './src/screens/LoginVerifyScreen';
// import LoginSuccess from './src/screens/LoginSuccess';

// export default function App() {
//   const [screen, setScreen] = useState('splash');
//   const [splashTimeout, setSplashTimeout] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSplashTimeout(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const renderScreen = () => {
//     switch (screen) {      case 'welcome': return <WelcomeScreen navigate={setScreen} />;      case 'on1': return <Onboarding1 navigate={setScreen} />;
//       case 'on2': return <Onboarding2 navigate={setScreen} />;
//       case 'on3': return <Onboarding3 navigate={setScreen} />;
//       case 'register': return <RegisterScreen navigate={setScreen} />;
//       case 'otp': return <OtpScreen navigate={setScreen} />;
//       case 'profile': return <ProfileScreen navigate={setScreen} />;
//       case 'success': return <RegistrationSuccess navigate={setScreen} />;
//       case 'pin': return <TransactionPin navigate={setScreen} />;
//       case 'login': return <LoginScreen navigate={setScreen} />;
//       case 'loginotp': return <LoginOtpScreen navigate={setScreen} />;
//       case 'loginverify': return <LoginVerifyScreen navigate={setScreen} />;
//       case 'loginsuccess': return <LoginSuccess navigate={setScreen} />;
//       default: return <SplashScreen navigate={setScreen} timeout={splashTimeout} />;
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       {renderScreen()}
//     </SafeAreaView>
//   );
// }


import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, BackHandler } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Onboarding1 from './src/screens/Onboarding1';
import Onboarding2 from './src/screens/Onboarding2';
import Onboarding3 from './src/screens/Onboarding3';
import RegisterScreen from './src/screens/RegisterScreen';
import OtpScreen from './src/screens/OtpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegistrationSuccess from './src/screens/RegistrationSuccess';
import TransactionPin from './src/screens/TransactionPin';
import LoginScreen from './src/screens/LoginScreen';
import LoginOtpScreen from './src/screens/LoginOtpScreen';
import LoginVerifyScreen from './src/screens/LoginVerifyScreen';
import LoginSuccess from './src/screens/LoginSuccess';

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState([]);
  const [splashTimeout, setSplashTimeout] = useState(true);

  // Splash timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashTimeout(false);
      setScreen('welcome'); // move to welcome after splash
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Custom navigate function
  const navigate = (nextScreen) => {
    setHistory((prev) => [...prev, screen]);
    setScreen(nextScreen);
  };

  // Handle Android Back Button
  useEffect(() => {
    const backAction = () => {
      if (history.length > 0) {
        const prevScreen = history[history.length - 1];
        setHistory((prev) => prev.slice(0, -1));
        setScreen(prevScreen);
        return true; // prevent app exit
      }
      return false; // allow exit if no history
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [history]);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome': return <WelcomeScreen navigate={navigate} />;
      case 'on1': return <Onboarding1 navigate={navigate} />;
      case 'on2': return <Onboarding2 navigate={navigate} />;
      case 'on3': return <Onboarding3 navigate={navigate} />;
      case 'register': return <RegisterScreen navigate={navigate} />;
      case 'otp': return <OtpScreen navigate={navigate} />;
      case 'profile': return <ProfileScreen navigate={navigate} />;
      case 'success': return <RegistrationSuccess navigate={navigate} />;
      case 'pin': return <TransactionPin navigate={navigate} />;
      case 'login': return <LoginScreen navigate={navigate} />;
      case 'loginotp': return <LoginOtpScreen navigate={navigate} />;
      case 'loginverify': return <LoginVerifyScreen navigate={navigate} />;
      case 'loginsuccess': return <LoginSuccess navigate={navigate} />;
      default:
        return <SplashScreen navigate={navigate} timeout={splashTimeout} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {renderScreen()}
    </SafeAreaView>
  );
}