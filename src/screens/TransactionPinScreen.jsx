import React, { useState } from 'react';
 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
 
import { moderateScale } from 'react-native-size-matters';
 
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';
 
export default function TransactionPinScreen({ navigation }) {
 
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
 
  // ADD DIGIT
  const handlePress = (num) => {
    setError('');
 
    setPin((prev) => {
      if (prev.length < 4) {
        return prev + num;
      }
      return prev;
    });
  };
 
  // DELETE
  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };
 
  // API CALL
  const handleContinue = async () => {
 
    if (pin.length !== 4) {
      setError('Enter 4 digit PIN');
      return;
    }
 
    try {
 
      const response = await api.post('/api/auth/set-pin', {
        pin: pin,
      });
 
      if (response.data.message) {
 
        Alert.alert('Success', response.data.message);
 
        navigation.replace('Main');
      }
 
    } catch (error) {
 
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
 
      {/* HEADER */}
      <View style={styles.header}>
 
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>
            <Icon name="arrow-left" size={22} color="#080808" />
          </Text>
        </TouchableOpacity>
 
        <Text style={styles.titleCentered}>
          Set your Transaction Pin
        </Text>
 
      </View>
 
      {/* DESCRIPTION */}
      <Text style={styles.desc}>
        This 4-digit pin secures every payment.
        Keep it private.
      </Text>
 
      {/* PIN BOXES */}
      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.pinText}>
              {pin[index] || ''}
            </Text>
          </View>
        ))}
      </View>
 
      {/* HELPER */}
      <Text style={styles.helper}>
        Enter 4 digits
      </Text>
 
      {/* ERROR */}
      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
 
      {/* KEYPAD */}
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
 
          <TouchableOpacity
            style={styles.key}
            onPress={handleDelete}
          >
            <Text style={styles.keyText}>×</Text>
          </TouchableOpacity>
        </View>
 
      </View>
 
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
 
    </View>
  );
}
 
/* ================= STYLES ================= */
 
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
 
    backgroundColor: '#EAEAEA',
 
    alignItems: 'center',
 
    paddingHorizontal: wp('5%'),
 
    paddingBottom: hp('4%'),
 
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + hp('1%')
        : hp('2%'),
  },
 
  header: {
    flexDirection: 'row',
 
    alignItems: 'center',
 
    marginTop: hp('1%'),
 
    marginBottom: hp('3%'),
 
    width: '100%',
  },
 
  back: {
    fontSize: moderateScale(22),
 
    color: '#000',
  },
 
  titleCentered: {
    flex: 1,
 
    textAlign: 'center',
 
    fontSize: moderateScale(20),
 
    fontWeight: '700',
 
    marginRight: wp('6%'),
 
    color: '#000',
  },
 
  desc: {
    marginTop: hp('2%'),
 
    color: '#555',
 
    textAlign: 'center',
 
    fontSize: moderateScale(13),
 
    lineHeight: moderateScale(20),
 
    paddingHorizontal: wp('5%'),
  },
 
  pinContainer: {
    flexDirection: 'row',
 
    marginTop: hp('4%'),
  },
 
  box: {
    width: wp('14%'),
 
    height: hp('7%'),
 
    borderWidth: 1,
 
    borderColor: '#ccc',
 
    marginHorizontal: wp('1.5%'),
 
    borderRadius: moderateScale(10),
 
    justifyContent: 'center',
 
    alignItems: 'center',
 
    backgroundColor: '#fff',
  },
 
  pinText: {
    fontSize: moderateScale(20),
 
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
 
    width: '80%',
 
    marginBottom: hp('2%'),
  },
 
  key: {
    width: wp('16%'),
 
    height: wp('16%'),
 
    borderRadius: wp('8%'),
 
    backgroundColor: '#F2F2F2',
 
    justifyContent: 'center',
 
    alignItems: 'center',
 
    shadowColor: '#000',
 
    shadowOpacity: 0.1,
 
    shadowRadius: 4,
 
    elevation: 3,
  },
 
  emptyKey: {
    width: wp('16%'),
 
    height: wp('16%'),
  },
 
  keyText: {
    fontSize: moderateScale(22),
 
    fontWeight: '600',
 
    color: '#000',
  },
 
  button: {
    backgroundColor: '#5A00D1',
 
    paddingVertical: hp('2%'),
 
    borderRadius: moderateScale(12),
 
    width: '90%',
 
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