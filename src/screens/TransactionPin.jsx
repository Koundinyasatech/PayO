import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 32,
    lineHeight: 19,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
    height: 60,
  },
  pinDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  pinDotFilled: {
    backgroundColor: '#6C2BD9',
    borderColor: '#6C2BD9',
  },
  pinText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  keypadContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  keypadButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  keypadText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  continueBtn: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  continueBtnActive: {
    backgroundColor: '#6C2BD9',
    shadowColor: '#6C2BD9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptySpace: {
    width: 60,
  },
});

export default function TransactionPin({ navigate }) {
  const [pin, setPin] = useState('');

  const handleKeyPress = (key) => {
    if (key === 'delete') {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(pin + key);
    }
  };

  const handleContinue = () => {
    if (pin.length === 4) {
      navigate('login');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigate('profile')}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Set your Transaction Pin</Text>
      <Text style={styles.subtitle}>
        This 4 digit pin secures every payment. Keep it private and memorable.
      </Text>

      <View style={styles.pinInputContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              index < pin.length && styles.pinDotFilled,
            ]}
          >
            {index < pin.length && <Text style={styles.pinText}>●</Text>}
          </View>
        ))}
      </View>
      <Text style={styles.label}>Enter 4 digits</Text>

      <View style={styles.keypadContainer}>
        <View style={styles.row}>
          {[1, 2, 3].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keypadButton}
              onPress={() => handleKeyPress(num.toString())}
            >
              <Text style={styles.keypadText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keypadButton}
              onPress={() => handleKeyPress(num.toString())}
            >
              <Text style={styles.keypadText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keypadButton}
              onPress={() => handleKeyPress(num.toString())}
            >
              <Text style={styles.keypadText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <View style={styles.emptySpace} />
          <TouchableOpacity
            style={styles.keypadButton}
            onPress={() => handleKeyPress('0')}
          >
            <Text style={styles.keypadText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keypadButton}
            onPress={() => handleKeyPress('delete')}
          >
            <Text style={styles.keypadText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.continueBtn, pin.length === 4 && styles.continueBtnActive]}
        onPress={handleContinue}
        disabled={pin.length !== 4}
      >
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
