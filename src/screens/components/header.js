import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../HomeScreen/homeStyling';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.menuIcon}>☰</Text>

      <View style={styles.headerRight}>
        <Text style={styles.notificationIcon}>🔔</Text>

        <TouchableOpacity style={styles.profileIcon}>
          <Text>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}