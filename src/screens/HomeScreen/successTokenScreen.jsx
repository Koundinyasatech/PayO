import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import styles from './successScreenStyling';
 
export default function PaymentSuccess({ navigation }) {
 
  // ⏳ auto redirect to home after few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
 
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <SafeAreaView style={styles.container}>
 
      {/* SUCCESS ICON */}
      <View style={styles.iconContainer}>
        <Text style={styles.check}>✓</Text>
      </View>
 
      {/* TEXT */}
      <Text style={styles.title}>Payment Successful</Text>
 
      <Text style={styles.subtitle}>
        1st April 2026 at 6:34 PM
      </Text>
 
    </SafeAreaView>
  );
}
 