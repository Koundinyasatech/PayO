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
import Icon from 'react-native-vector-icons/Feather';
 
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

  if (pin.length !== 4) {
    setError('Enter 4 digit PIN');
    return;
  }

  try {
    console.log("SENDING PIN:", pin);

    const response = await api.post('/api/auth/set-pin', {
      pin: pin
    });

    console.log("RESPONSE:", response.data);

    if (response.data.message) {
      Alert.alert(
        'Success',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Main') // navigate after OK
          }
        ]
      );
    }

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);

    Alert.alert(
      'Error',
      error.response?.data?.message || 'Something went wrong'
    );
  }
};
 
  const Key = ({ num, letters, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.key}
        onPress={() => onPress(num)}
      >
        <Text style={styles.keyText}>{num}</Text>
 
        {letters ? (
          <Text style={styles.keyLetters}>{letters}</Text>
        ) : null}
      </TouchableOpacity>
    );
  };
 
  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>
<Icon name="chevron-left" size={28} color="#000000" />          </Text>
          {/* <Text style={styles.back}>{'<'}</Text> */}
        </TouchableOpacity>
 
        <Text style={styles.titleCentered}>
          Set your Transaction Pin            </Text>
      </View>
 
 
      <Text style={styles.desc}>
        This 4-digit pin secures every payment. Keep it private and memorable.
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
 
      <View style={styles.keypad}>
 
        {/* ROW 1 */}
        <View style={styles.row}>
          <Key num="1" onPress={handlePress} />
          <Key num="2" letters="ABC" onPress={handlePress} />
          <Key num="3" letters="DEF" onPress={handlePress} />
        </View>
 
        {/* ROW 2 */}
        <View style={styles.row}>
          <Key num="4" letters="GHI" onPress={handlePress} />
          <Key num="5" letters="JKL" onPress={handlePress} />
          <Key num="6" letters="MNO" onPress={handlePress} />
        </View>
 
        {/* ROW 3 */}
        <View style={styles.row}>
          <Key num="7" letters="PQRS" onPress={handlePress} />
          <Key num="8" letters="TUV" onPress={handlePress} />
          <Key num="9" letters="WXYZ" onPress={handlePress} />
        </View>
 
        {/* ROW 4 */}
        <View style={styles.row}>
          <View style={styles.emptyKey} />
          <Key num="0" letters="+" onPress={handlePress} />
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
 
 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
 
  back: {
    fontSize: 22,
  },
 
  titleCentered: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
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
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5F5F5',
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
    fontSize: 30,
    fontWeight: '500',
    color: '#000',
  },
 
  keyLetters: {
    fontSize: 10,
    color: '#555',
    marginTop: 2,
    fontWeight: '500',
  },
 
  button: {
    backgroundColor: '#5A00D1',
    padding: 14,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    marginBottom:20
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
 