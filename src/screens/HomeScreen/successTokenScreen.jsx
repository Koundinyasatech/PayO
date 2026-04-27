import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import styles from './successScreenStyling';

export default function PaymentSuccess({ route, navigation }) {

  // ✅ get amount from previous screen
  const { amount } = route.params || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      // ✅ reset navigation (no back to payment screens)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [{ name: 'Home' }],
            },
          },
        ],
      });
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

      {/* ✅ dynamic amount */}
      <Text style={styles.subtitle}>
        {amount} PAYO sent successfully
      </Text>

      {/* ✅ real time */}
      <Text style={styles.subtitle}>
        {new Date().toLocaleString()}
      </Text>

    </SafeAreaView>
  );
}