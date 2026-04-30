import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'; // ✅ ADD THIS
import styles from '../HomeScreen/homeStyling';

export default function Header({ type = "default", title, id }) {

  const navigation = useNavigation(); // ✅ ADD THIS

  return (
    <View style={styles.header}>

      {type === "wallet" ? (
        <View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            {title || "Wallet"}
          </Text>

          <Text style={styles.walletNumber}>{id}</Text>
        </View>
      ) : (
        <TouchableOpacity>
          <Icon name="menu" size={22} color="#fff" />
        </TouchableOpacity>
      )}

      {/* RIGHT SIDE */}
      <View style={styles.headerRight}>
        
        {/* ✅ NOTIFICATION CLICK */}
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Icon name="bell" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileIcon}>
          <Icon name="user" size={16} color="#000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}