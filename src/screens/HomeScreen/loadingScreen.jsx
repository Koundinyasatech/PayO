import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import styles from './loadingScreenStyling';
 
export default function PaymentLoading({ navigation }) {
  const [dots, setDots] = useState('');
 
  // 🔄 simple dot animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
 
    // ⏳ simulate processing → go to success
    const timer = setTimeout(() => {
     navigation.navigate('successfullPayment');
    }, 3000);
 
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);
 
  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.card}>
       
        {/* LOADING DOTS */}
        <Text style={styles.loader}>● ●{dots}</Text>
 
        {/* TEXT */}
        <Text style={styles.title}>
          Proceeding payment of 300 PAYO
        </Text>
 
        <Text style={styles.subtitle}>
          1st April 2026 at 6:34 PM
        </Text>
 
      </View>
 
    </SafeAreaView>
  );
}
 