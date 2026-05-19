import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function TransactionPinScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePress = (num) => {
    setError('');

    setPin((prev) => {
      if (prev.length < 4) {
        return prev + num;
      }
      return prev;
    });
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleContinue = async () => {
    if (pin.length !== 4) {
      setError('Enter 4 digit PIN');
      return;
    }

    try {
      console.log('SENDING PIN:', pin);

      const response = await api.post('/api/auth/set-pin', {
        pin: pin,
      });

      console.log('RESPONSE:', response.data);

      if (response.data.message) {
        Alert.alert('Success', response.data.message, [
          {
            text: 'OK',
            onPress: () => navigation.replace('Main'),
          },
        ]);
      }
    } catch (error) {
      console.log('ERROR:', error.response?.data || error.message);

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    }
  };

  const Key = ({ num, letters, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.key}
        onPress={() => onPress(num)}
        activeOpacity={0.8}>
        <Text style={styles.keyText}>{num}</Text>
        {letters ? <Text style={styles.keyLetters}>{letters}</Text> : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={moderateScale(28)}
              color="#000000"
            />
          </TouchableOpacity>

          <Text style={styles.titleCentered}>Set your Transaction Pin</Text>
        </View>

        <Text style={styles.desc}>
          This 4-digit pin secures every payment. Keep it private and memorable.
        </Text>

        <View style={styles.pinContainer}>
          {[0, 1, 2, 3].map((_, index) => (
            <View key={index} style={styles.box}>
              <Text style={styles.pinText}>{pin[index] || ''}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.helper}>Enter 4 digits</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.keypad}>
          <View style={styles.row}>
            <Key num="1" onPress={handlePress} />
            <Key num="2" letters="ABC" onPress={handlePress} />
            <Key num="3" letters="DEF" onPress={handlePress} />
          </View>

          <View style={styles.row}>
            <Key num="4" letters="GHI" onPress={handlePress} />
            <Key num="5" letters="JKL" onPress={handlePress} />
            <Key num="6" letters="MNO" onPress={handlePress} />
          </View>

          <View style={styles.row}>
            <Key num="7" letters="PQRS" onPress={handlePress} />
            <Key num="8" letters="TUV" onPress={handlePress} />
            <Key num="9" letters="WXYZ" onPress={handlePress} />
          </View>

          <View style={styles.row}>
            <View style={styles.emptyKey} />
            <Key num="0" letters="+" onPress={handlePress} />
            <Key num="×" onPress={handleDelete} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: hp('1%'),
  },

  titleCentered: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginLeft: wp('3%'),
    color: '#000',
    flex: 1,
    justifyContent: "center",
  },

  desc: {
    marginTop: hp('4%'),
    color: '#555',
    textAlign: 'center',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('4%'),
  },

  pinContainer: {
    flexDirection: 'row',
    marginTop: hp('4%'),
  },

  box: {
    width: wp('13%'),
    height: wp('13%'),
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: wp('1.2%'),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  pinText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#000',
  },

  helper: {
    marginTop: hp('1.5%'),
    color: '#555',
    fontSize: moderateScale(13),
  },

  errorText: {
    color: 'red',
    marginTop: hp('1%'),
    textAlign: 'center',
    fontSize: moderateScale(12),
  },

  keypad: {
    marginTop: hp('4%'),
    width: '100%',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('78%'),
    marginBottom: hp('2.2%'),
  },

  key: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },

  emptyKey: {
    width: wp('18%'),
    height: wp('18%'),
  },

  keyText: {
    fontSize: moderateScale(28),
    fontWeight: '500',
    color: '#000',
  },

  keyLetters: {
    fontSize: moderateScale(9),
    color: '#555',
    marginTop: hp('0.2%'),
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#5A00D1',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(10),
    width: wp('90%'),
    alignItems: 'center',
    position: 'absolute',
    bottom: hp('4%'),
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },
});