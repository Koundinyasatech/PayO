import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Animated,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

// Using your custom responsive utility
import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';

export default function OtpVerified({ navigation }) {
  // Animation for the success image
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // 🚨 PREVENT GOING BACK TO PREVIOUS SCREEN
  useEffect(() => {
    // 1. Disable the iOS swipe-to-go-back gesture
    navigation.setOptions({
      gestureEnabled: false,
    });

    // 2. Block the Android hardware back button and standard back actions
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault(); // Stops the screen from going back
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const handleContinue = () => {
    // Navigate to the main app flow
    navigation.replace('Profile'); // Change 'Main' to your actual home route
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header Logo */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/LogoContainer.png')}
            style={styles.logo}
          />
        </View>

        {/* Animated Hero Image */}
        <Animated.Image
          source={require('../../assets/images/HeaderOTP.png')}
          style={[
            styles.heroImage,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        />

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.titleBlack}>
            OTP Successfully <Text style={styles.titleBlue}>Verified!</Text>
          </Text>
          <Text style={styles.subtitle}>
            Your mobile number has been verified{'\n'}successfully.
          </Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoIconContainer}>
            <Image
              source={require('../../assets/images/Security-Icon.png')} // The solid purple shield with lock
              style={styles.infoIcon}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Your Account is Secure</Text>
            <Text style={styles.infoSubtitle}>
              You can now access all PAYO features{'\n'}and manage your wallet securely
            </Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <View style={styles.btnContent}>
            <Text style={styles.buttonText}>Continue to PAYO</Text>
            {/* <Image
              source={require('../../assets/images/whitearrow.png')}
              style={styles.btnArrowIcon}
            /> */}
            <Icon name="arrow-right" size={moderateScale(18)} color="#FFF" style={styles.btnArrow} />
          </View>
        </TouchableOpacity>

        {/* Flexible Spacer to push the footer to the bottom */}
        <View style={styles.spacer} />

        {/* Security Footer Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.lockIconCircle}>
            <Image
              source={require('../../assets/images/securelock.png')}
              style={styles.lockIcon}
            />
          </View>
          <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // Light clean background matching Figma
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(25),
    paddingBottom: verticalScale(20),
    alignItems: 'center', // Centers everything horizontally
  },

  // Header Logo
  header: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(40),
    resizeMode: 'contain',
  },

  // Hero Image
  heroImage: {
    width: windowWidth * 0.8,
    height: verticalScale(250),
    resizeMode: 'contain',
    marginTop: verticalScale(40),
  },

  // Typography
  textContainer: {
    alignItems: 'center',
    marginTop: verticalScale(40),
    width: '100%',
  },
  titleBlack: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
  },
  titleBlue: {
    color: '#2962FF', // Matches PAYO primary blue
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: '#555555',
    textAlign: 'center',
    marginTop: verticalScale(10),
    lineHeight: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },

  // 🚨 INFO BOX - UPDATED TO MATCH FIGMA 🚨
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the entire icon + text group
    backgroundColor: '#F8F6FF', // Slightly softer purple
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(16), // Softer corners
    marginTop: verticalScale(30),
    width: '100%',
  },
  infoIconContainer: {
    marginRight: moderateScale(12), // Reduced gap slightly to tighten the group
  },
  infoIcon: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
  },
  infoTextContainer: {
    // Removed 'flex: 1' so it doesn't stretch to the right edge
    width: '72%', // Gives text just enough room to wrap exactly like the design
  },
  infoTitle: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#333333',
    marginBottom: verticalScale(4),
  },
  infoSubtitle: {
    fontSize: moderateScale(11),
    color: '#666666',
    lineHeight: moderateScale(16),
  },

  // Button
  primaryBtn: {
    backgroundColor: '#5655FF', // Purple-blue brand color
    borderRadius: moderateScale(12),
    height: verticalScale(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    width: '100%',
    elevation: 3,
    shadowColor: '#5655FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  btnArrow: {
    position: 'absolute',
    right: moderateScale(20),
  },
//   btnArrowIcon: {
//     position: 'absolute',
//     right: moderateScale(20),
//     width: moderateScale(20),
//     height: moderateScale(20),
//     resizeMode: 'contain',
//   },

  // Flex Spacer
  spacer: {
    flex: 1,
    minHeight: verticalScale(40),
  },

  // Security Badge Footer
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  lockIconCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
    elevation: 2, // Subtle shadow for the floating circle effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  lockIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
  },
  badgeText: {
    fontSize: moderateScale(11),
    color: '#666666',
    fontWeight: '500',
  },
});