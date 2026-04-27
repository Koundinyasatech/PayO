import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import styles from './loadingScreenStyling';
import api from '../../api/axios';

export default function PaymentLoading({ route, navigation }) {
  const [dots, setDots] = useState('');

  // ✅ FIXED PARAMS
  const { amount, name, toAddress, pin } = route.params;

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    processPayment();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const processPayment = async () => {
    try {
      await api.post('/api/wallet/transfer', {
        amount,
        toAddress,
        pin,
      });

      navigation.replace('successfullPayment', {
        amount,
        name,
      });

    } catch (err) {
      alert('Payment Failed');
      
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.loader}>● ●{dots}</Text>

        <Text style={styles.title}>
          Proceeding payment of {amount} PAYO
        </Text>

        <Text style={styles.subtitle}>
          {new Date().toLocaleString()}
        </Text>

      </View>
    </SafeAreaView>
  );
}