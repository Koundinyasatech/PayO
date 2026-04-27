import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../HomeScreen/homeStyling';

export default function Header() {
  return (
    <View style={styles.header}>

      {/* MENU */}
      <TouchableOpacity>
        <Icon name="menu" size={22} color="#fff" />
      </TouchableOpacity>

      {/* RIGHT SIDE */}
      <View style={styles.headerRight}>

        {/* NOTIFICATION */}
        <TouchableOpacity>
          <Icon name="bell" size={20} color="#fff" />
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity style={styles.profileIcon}>
          <Icon name="user" size={16} color="#000" />
        </TouchableOpacity>

      </View>

    </View>
  );
}