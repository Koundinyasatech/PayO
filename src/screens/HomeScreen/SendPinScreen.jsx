import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function SendPinScreen({ route, navigation }) {
  const { amount, name, address } = route.params;

  const [pin, setPin] = useState('');

  const handlePress = (val) => {
    if (val === 'back') {
      setPin(pin.slice(0, -1));
    } else if (val === 'submit') {
      handleSubmit();
    } else {
      if (pin.length < 4) {
        setPin(pin + val);
      }
    }
  };

  const handleSubmit = () => {
    if (pin.length !== 4) {
      alert('Enter 4 digit PIN');
      return;
    }

    // ✅ FIXED HERE
    navigation.navigate('loading', {
      amount,
      name,
      toAddress: address,
      pin,
    });
  };

  const renderBoxes = () => {
    return [...Array(4)].map((_, i) => (
      <View key={i} style={styles.box}>
        <Text style={styles.dot}>{pin[i] ? '•' : ''}</Text>
      </View>
    ));
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', 'back', 'submit'],
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.cancel}>Cancel</Text>

      <View style={styles.card}>
        <Text style={styles.small}>from wallet</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.small}>To wallet</Text>
          <Text style={styles.amount}>{amount} PAYO</Text>
        </View>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>

      <Text style={styles.title}>ENTER 4-DIGIT TRANSACTION PIN</Text>

      <View style={styles.pinRow}>{renderBoxes()}</View>

      <View style={styles.warning}>
        <Text style={styles.warningText}>
          ⚠ You are sending {amount} payo from your account
        </Text>
      </View>

      <View style={styles.keypad}>
        {keys.map((row, i) => (
          <View key={i} style={styles.keyRow}>
            {row.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.key,
                  item === 'submit' && styles.submit,
                ]}
                onPress={() => handlePress(item)}
              >
                <Text
                  style={[
                    styles.keyText,
                    item === 'submit' && { color: 'white' },
                  ]}
                >
                  {item === 'back' ? '⌫' :
                   item === 'submit' ? 'Submit' :
                   item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee', padding: 20 },
  cancel: { marginBottom: 10, color: '#444' },

  card: {
    backgroundColor: '#dcd6f7',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  small: { color: '#555' },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  amount: { fontWeight: '700' },

  name: { fontWeight: '600', marginTop: 5 },

  address: { color: '#777', fontSize: 12 },

  title: { textAlign: 'center', marginBottom: 15 },

  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  box: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: { fontSize: 24 },

  warning: {
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  warningText: { textAlign: 'center' },

  keypad: { alignItems: 'center' },

  keyRow: { flexDirection: 'row', marginVertical: 8 },

  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  keyText: { fontSize: 20 },

  submit: { backgroundColor: 'green' },
});