import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './pinScreenStyling';
 
export default function TransactionPinVerify({ navigation }) {
  const [pin, setPin] = useState('');
 
  const handlePress = (num) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };
 
  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };
 
  const handleSubmit = () => {
    if (pin.length === 4) {
      navigation.navigate('loading'); // next screen
    }
  };
 
  return (
    <SafeAreaView style={styles.container}>
 
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('review')}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>PAYO</Text>
      </View>
 
      {/* DETAILS */}
      <View style={styles.details}>
        <Text style={styles.label}>From wallet</Text>
        <Text style={styles.value}>PAYO XXX A3</Text>
 
        <View style={styles.divider} />
 
        <Text style={styles.label}>To wallet</Text>
        <View style={styles.row}>
          <Text style={styles.value}>PAYO XXX R2</Text>
          <Text style={styles.amount}>300 PAYO</Text>
        </View>
      </View>
 
      {/* PIN TEXT */}
      <Text style={styles.pinTitle}>ENTER 4-DIGIT TRANSACTION PIN</Text>
 
      {/* PIN BOXES */}
      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((_, i) => (
          <View key={i} style={styles.pinBox}>
            <Text style={styles.pinText}>{pin[i] ? '●' : ''}</Text>
          </View>
        ))}
      </View>
 
      {/* WARNING */}
      <View style={styles.warning}>
        <Text style={styles.warningText}>
          ⚠ You are sending 300 PAYO from your account
        </Text>
      </View>
 
      {/* KEYPAD */}
      <View style={styles.keypad}>
        {[1,2,3,4,5,6,7,8,9].map((num) => (
          <TouchableOpacity key={num} style={styles.key} onPress={() => handlePress(num)}>
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
 
        <TouchableOpacity style={styles.key}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.key} onPress={handleDelete}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
 
    </SafeAreaView>
  );
}
 