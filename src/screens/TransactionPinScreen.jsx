import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar
} from 'react-native';

import api from '../api/axios';

export default function TransactionPinScreen({ navigation }) {

  const [pin, setPin] = useState('');
   const [error, setError] = useState('');

  // ✅ ADD DIGIT (SAFE)
  const handlePress = (num) => {
    setError("");
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

    //  navigation.replace('Login');

    if (pin.length !== 4) {
      // Alert.alert('Error', 'Enter 4 digit PIN');
         setError('Enter 4 digit PIN');
      
      return;
    }

    try {
      console.log("SENDING PIN:", pin); // 🔍 debug

      const response = await api.post('/api/auth/set-pin', {
        pin: pin   // ✅ MUST BE STRING
      });

      console.log("RESPONSE:", response.data);

      if (response.data.message) {
        Alert.alert('Success', response.data.message);

        // ✅ navigate next
        navigation.replace('Main'); // or Home
      }

    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

  const Key = ({ num, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.key}
        onPress={() => onPress(num)}
      >
        <Text style={styles.keyText}>{num}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
          {/* <Text style={styles.back}>{'<'}</Text> */}
        </TouchableOpacity>

        <Text style={styles.titleCentered}>
          Set your Transaction Pin            </Text>
      </View>


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
      {error ? (
        <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}

      {/* KEYPAD */}
      {/* <View style={styles.keypad}>

        {[1,2,3,4,5,6,7,8,9].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handlePress(num.toString())}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.emptyKey} />

       
        <TouchableOpacity
          style={styles.key}
          onPress={() => handlePress('0')}
        >
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>

       
        <TouchableOpacity
          style={styles.key}
          onPress={handleDelete}
        >
          <Text style={styles.keyText}>×</Text>
        </TouchableOpacity>

      </View> */}

      <View style={styles.keypad}>

        {/* ROW 1 */}
        <View style={styles.row}>
          <Key num="1" onPress={handlePress} />
          <Key num="2" onPress={handlePress} />
          <Key num="3" onPress={handlePress} />
        </View>

        {/* ROW 2 */}
        <View style={styles.row}>
          <Key num="4" onPress={handlePress} />
          <Key num="5" onPress={handlePress} />
          <Key num="6" onPress={handlePress} />
        </View>

        {/* ROW 3 */}
        <View style={styles.row}>
          <Key num="7" onPress={handlePress} />
          <Key num="8" onPress={handlePress} />
          <Key num="9" onPress={handlePress} />
        </View>

        {/* ROW 4 */}
        <View style={styles.row}>
          <View style={styles.emptyKey} />
          <Key num="0" onPress={handlePress} />
          <Key num="×" onPress={handleDelete} />
        </View>

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
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  // back: {
  //   alignSelf: 'flex-start',
  //   fontSize: 22,
  // },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  back: {
    fontSize: 22,
  },

  titleCentered: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: "10%", // balance arrow
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
  },

  desc: {
    marginTop: 30,
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
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',   // controls spacing like screenshot
    marginBottom: 20,
  },

  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F2F2F2', // light gray like UI
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
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