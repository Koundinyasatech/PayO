// import React, { useEffect, useRef } from 'react';
// import { View, StyleSheet, StatusBar, Image, Dimensions, Animated } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Import Components
// import Logo from './components/Logo3';
// import HeroIllustration from './components/HeroIllustration3';
// import Typography from './components/Typography3';
// import ActionButtons from './components/ActionButtons3';

// const { width, height } = Dimensions.get('window');

// export default function Onboarding3({ navigation }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);
  
//   const handleCreateAccount = () => {
//     navigation.navigate('RegisterMobile'); // Update to your actual route
//   };

//   const handleLogin = () => {
//     navigation.navigate('Login'); // Update to your actual route
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
//       {/* FULL SCREEN WAVES BACKGROUND */}
//       <Image 
//         source={require('../../../../assets/images/waves.png')} 
//         style={styles.backgroundImage} 
//       />
      
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Logo />
//         <HeroIllustration />
//         <Typography />
//         <ActionButtons 
//           onCreateAccount={handleCreateAccount} 
//           onLogin={handleLogin} 
//         />
//       </Animated.View>
      
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   backgroundImage: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     height: height,
//     resizeMode: 'cover',
//     zIndex: 0,
//   },
//   content: {
//     flex: 1,
//     zIndex: 1, 
//   },
// });



import React, { useEffect, useRef, useState } from 'react'; // 🚨 Added useState
import { View, StyleSheet, StatusBar, Image, Dimensions, Animated, ScrollView } from 'react-native'; // 🚨 Added ScrollView
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale } from '../../../utils/responsive'; // 🚨 Import verticalScale

// Import Components
import Logo from './components/Logo3';
import HeroIllustration from './components/HeroIllustration3';
import Typography from './components/Typography3';
import ActionButtons from './components/ActionButtons3';

const { width, height } = Dimensions.get('window');

export default function Onboarding3({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // 🚨 State to track current slide
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  
  // 🚨 Detects swipe position and updates the dot index
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleCreateAccount = () => {
    navigation.navigate('RegisterMobile'); 
  };

  const handleLogin = () => {
    navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <Image 
        source={require('../../../../assets/images/waves.png')} 
        style={styles.backgroundImage} 
      />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Logo />
        <HeroIllustration />
        
        {/* 🚨 ScrollView Wrapper for the Typography */}
        <View style={{ height: verticalScale(130) }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16} 
          >
            {/* Slide 1 */}
            <View style={{ width: width }}>
              <Typography 
                title="Welcome!"
                subtitlePurple="Scan. "
                subtitleBlue="Pay. Earn Payo."
                description={"Join millions who trust PAYO for fast,\nsecure, and rewarding digital payments."}
              />
            </View>

            {/* Slide 2 */}
            <View style={{ width: width }}>
              <Typography 
                title="Pay Instantly"
                subtitlePurple="Scan. "
                subtitleBlue="Send. Done."
                description={"Scan any QR code or send money instantly with\nsecure, lightning-fast wallet-to-wallet transfers."}
              />
            </View>
          </ScrollView>
        </View>

        {/* 🚨 Pass the state to the ActionButtons component */}
        <ActionButtons 
          onCreateAccount={handleCreateAccount} 
          onLogin={handleLogin} 
          activeIndex={activeIndex}
        />
      </Animated.View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height,
    resizeMode: 'cover',
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1, 
  },
});