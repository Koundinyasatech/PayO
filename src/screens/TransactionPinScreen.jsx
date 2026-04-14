import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import api from '../api/axios';

export default function TransactionPinScreen({ navigation }) {

  const [pin, setPin] = useState('');

  // ✅ ADD DIGIT (SAFE)
  const handlePress = (num) => {
    setPin((prev) => {
      if (prev.length < 4) {
        return prev + num;   // string concat
      }
      return prev;
    });
  };

  // ✅ DELETE
  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  // 🔥 API CALL
  const handleContinue = async () => {

    if (pin.length !== 4) {
      Alert.alert('Error', 'Enter 4 digit PIN');
      return;
    }

    try {
      console.log("SENDING PIN:", pin); // 🔍 debug

      const response = await api.post('/set-pin', {
        pin: pin   // ✅ MUST BE STRING
      });

      console.log("RESPONSE:", response.data);

      if (response.data.message) {
        Alert.alert('Success', response.data.message);

        // ✅ navigate next
        navigation.replace('Login'); // or Home
      }

    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <View style={styles.container}>

      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>←</Text>
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>Set your Transaction Pin</Text>

      <Text style={styles.desc}>
        This 4-digit pin secures every payment. Keep it private.
      </Text>

      {/* PIN BOXES */}
      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.pinText}>{pin[index] || ''}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.helper}>Enter 4 digits</Text>

      {/* KEYPAD */}
      <View style={styles.keypad}>

        {[1,2,3,4,5,6,7,8,9].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handlePress(num.toString())}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}

        {/* EMPTY SPACE */}
        <View style={styles.emptyKey} />

        {/* ZERO */}
        <TouchableOpacity
          style={styles.key}
          onPress={() => handlePress('0')}
        >
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>

        {/* DELETE */}
        <TouchableOpacity
          style={styles.key}
          onPress={handleDelete}
        >
          <Text style={styles.keyText}>×</Text>
        </TouchableOpacity>

      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    padding: 20,
    alignItems: 'center'
  },

  back: {
    alignSelf: 'flex-start',
    fontSize: 22,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
  },

  desc: {
    marginTop: 10,
    color: '#555',
    textAlign: 'center'
  },

  pinContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },

  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  pinText: {
    fontSize: 18,
    fontWeight: '600'
  },

  helper: {
    marginTop: 10,
    color: '#555'
  },

  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    justifyContent: 'center'
  },

  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 3,
  },

  emptyKey: {
    width: 70,
    height: 70,
    margin: 10,
  },

  keyText: {
    fontSize: 22,
    fontWeight: '600'
  },

  button: {
    backgroundColor: '#5A00D1',
    padding: 14,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});