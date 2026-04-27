import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../api/axios';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [faceId, setFaceId] = useState(true);
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const confirmPasswordTimer = useRef(null);

  const validate = () => {
    let err = {};

    if (!name.trim()) err.name = 'Full name is required';

    if (!email.trim()) err.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) err.email = 'Invalid email';

    if (!password) err.password = 'Password is required';
    else if (password.length < 6) err.password = 'Minimum 6 characters required';

    if (!confirmPassword) err.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) err.confirmPassword = 'Invalid Password';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleContinue = async () => {
    if (!validate()) return;

    try {
      await api.post('/api/auth/register', {
        name,
        email,
        password,
        confirmpassword: confirmPassword,
        referralCode: referral,
      });

      navigation.navigate('TransactionPin');
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
        "Something went wrong. Please try again"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.titleCentered}>Create your Profile</Text>
      </View>

      <Text style={styles.sub}>
        Tell us a little bit about yourself to get started
      </Text>

      {message ? (
        <Text style={styles.errorCenter}>{message}</Text>
      ) : null}

      {/* NAME */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
        placeholderTextColor="#A0A0A0"
      />

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        placeholderTextColor="#A0A0A0"
      />

      {/* PASSWORD */}
      <Text style={styles.label}>Create Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputWithIcon}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholder="************"
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* CONFIRM PASSWORD */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputWithIcon}
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);

            if (confirmPasswordTimer.current) {
              clearTimeout(confirmPasswordTimer.current);
            }

            confirmPasswordTimer.current = setTimeout(() => {
              setErrors(prev => ({
                ...prev,
                confirmPassword:
                  password !== text ? 'Invalid Password' : ''
              }));
            }, 1000);
          }}
          placeholder="************"
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Icon name={showConfirm ? 'eye-off' : 'eye'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* REFERRAL */}
      <Text style={styles.label}>
        Referral Code <Text style={styles.optional}>(Optional)</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={referral}
        onChangeText={setReferral}
        placeholder="PAYOOTHU234"
        placeholderTextColor="#A0A0A0"
      />

      {/* FACE ID */}
      <View style={styles.switchRow}>
        <Switch value={faceId} onValueChange={setFaceId} />
        <Text style={styles.switchText}>
          Enable Face ID login for faster, secure access
        </Text>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
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
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },

  sub: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 25,
    marginTop: 5,
  },

  label: {
    marginTop: 15,
    marginBottom: 6,
    fontSize: 13,
    color: '#333',
  },

  optional: {
    color: '#999',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  errorInput: {
    borderColor: '#E53935',
  },

  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  switchText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 12,
    color: '#444',
  },

  button: {
    backgroundColor: '#5A00D1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 35,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
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
    color: '#777',
    fontSize: 12,
  },
  inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#E0E0E0',
  paddingHorizontal: 10,
},

inputWithIcon: {
  flex: 1,
  paddingVertical: 14,
},
});