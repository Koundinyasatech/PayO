import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>PAYO</Text>

      <View style={styles.content}>
        <Text style={styles.title}>Instant QR Payments</Text>
        <Text style={styles.desc}>
          Scan QR code to send tokens instantly. Fast wallet transfers.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Onboarding3')}
      >
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    fontSize: 22,
    color: '#5A00D1',
    fontWeight: '700',
    marginBottom: 80,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A00D1',
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  circle: {
    position: 'absolute',
    bottom: 60,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#5A00D1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#5A00D1',
  },
});