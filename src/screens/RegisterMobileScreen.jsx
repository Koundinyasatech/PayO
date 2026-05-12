import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';
 
export default function RegisterMobileScreen({ navigation, route }) {
 
  const { mode = 'register' } = route.params || {};
 
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const isValidMobile = mobile?.length === 10;
 
const handleSendOTP = async () => {

  if (!mobile || mobile.length !== 10) {
    setError('Enter valid mobile number');
    return;
  }

  try {
    setLoading(true);
    setError('');

    let response;

    if (mode === 'login') {
      response = await api.post('/api/auth/send-login-otp', { mobile });
    } else {
      response = await api.post('/api/auth/send-otp', { mobile });
    }

    console.log("OTP RESPONSE:", response.data);

    if (response.data?.message === "OTP sent") {
      navigation.navigate('OTP', { mobile, mode });
    } else {
      setError(response.data?.message || 'Something went wrong');
    }

  } catch (error) {
    console.log("ERROR:", error?.response?.data || error.message);

    setError(
      error.response?.data?.message || 'Something went wrong'
    );

  } finally {
    setLoading(false);
  }
};
 
  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>
<Icon name="chevron-left" size={28} color="#000000" />          </Text>
        </TouchableOpacity>

        <Text style={styles.titleCentered}>
          {mode === 'login' ? 'Login with Mobile' : 'Enter Your Mobile Number'}
        </Text>
      </View>
 
      <Text style={styles.desc}>
        We will send a one time code to verify your number.Standard rates may apply
      </Text>
 
  {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={styles.label}>Mobile Number</Text>
 
      <View style={styles.inputRow}>
        <View style={styles.codeBox}>
          <Text>+91</Text>
        </View>
 
        <TextInput
          style={styles.input}
          placeholder="9876543210"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={(text) => {
            const numeric = text.replace(/[^0-9]/g, '');
            setMobile(numeric);
            setError("")
          }}
          maxLength={10}
        />
      </View>
 
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isValidMobile ? '#4E00C2' : '#ccc' }
        ]}
        onPress={handleSendOTP}
        disabled={!isValidMobile || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>

              {  mode === 'login'? <Text style={styles.registerText}>
                    Don’t have an account?{' '}
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate('RegisterMobile', { mode: 'register' })}
                    >
                      Register
                    </Text>
                  </Text>:<Text style={styles.loginText}>
                 Already have an account?{' '}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Login')}
                >
                    Login
                </Text>
            </Text> }

            <Text style={styles.footer}>
                By Continuing, you agree to our{' '}
                <Text style={styles.link}>Privacy Policy</Text>
            </Text>
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  
   
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  back: {
    fontSize: 20,
    marginRight: 10,
  },
  titleCentered: {
    flex: 1,
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
   
   
  },
  errorText: {
  color: 'red',
  fontSize: 14,
  marginBottom: 10,
  textAlign: 'center'
},
  desc: {
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    marginTop: 3,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  codeBox: {
    padding: 12,
    backgroundColor: '#cfcdcd',
  },
  input: {
    flex: 1,
    padding: 12,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
   link: {
        color: '#5A00D1',
        textDecorationLine: 'underline', // ✅ underline like UI
    },
      loginText: {
        marginTop: 20,
        textAlign: 'center', // ✅ center
        color: '#555',
    },

    footer: {
        marginTop: 10,
        textAlign: 'center',
        color: '#555',
        fontSize: 12,
    },

     registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },

  link: {
    color: '#5A00D1',
    fontWeight: '600',
  },
});
 