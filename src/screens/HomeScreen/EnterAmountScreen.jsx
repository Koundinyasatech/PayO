import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
 
export default function EnterAmountScreen({ route, navigation }) {
  const { name, address } = route.params;
 
  const [amount, setAmount] = useState('300');
 
  return (
    <LinearGradient colors={['#6A00F4', '#1A0033']} style={styles.container}>
 
      <Text style={styles.cancel}>Cancel</Text>
 
      <Text style={styles.title}>Total Tokens Transfer Details</Text>
 
      <View style={styles.amountCard}>
        <Text style={styles.amountText}>{amount}.00</Text>
        <Text style={styles.currency}>PAYO</Text>
      </View>
 
      <Text style={styles.toText}>To - {name}</Text>
      <Text style={styles.address}>{address}</Text>
 
      <View style={styles.row}>
        {['100', '300', '500', '700'].map((val) => (
          <TouchableOpacity
            key={val}
            style={styles.quickBtn}
            onPress={() => setAmount(val)}
          >
            <Text>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
 
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() =>
          navigation.navigate('SendPin', {
            amount,
            name,
            address,
          })
        }
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
 
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
    </LinearGradient>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center' },
 
  cancel: { color: 'white', marginBottom: 30 },
 
  title: { color: 'white', textAlign: 'center', marginBottom: 30 },
 
  amountCard: {
    backgroundColor: '#9B6DFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
 
  amountText: { color: 'white', fontSize: 32, fontWeight: '700' },
 
  currency: { color: '#00FFD1', marginTop: 5 },
 
  toText: { color: 'white', textAlign: 'center' },
 
  address: { color: '#ccc', textAlign: 'center', marginBottom: 30 },
 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
 
  quickBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
  },
 
  continueBtn: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
 
  continueText: { color: 'white', fontWeight: '600' },
 
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
});