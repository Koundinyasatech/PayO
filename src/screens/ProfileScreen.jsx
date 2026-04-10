import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView
} from 'react-native';

import api from '../api/axios';

export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [faceId, setFaceId] = useState(true);

  // 🔥 SUBMIT PROFILE
  const handleContinue = async () => {

    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        // referral
      });

      console.log('PROFILE RESPONSE:', response.data);

      Alert.alert('Success', 'Profile created');

      navigation.navigate('Login'); // ✅ go to login

    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', 'Failed to create profile');
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>←</Text>
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>Create your Profile</Text>
      <Text style={styles.sub}>
        Tell us a little bit about yourself to get started
      </Text>

      {/* NAME */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />

      {/* PASSWORD */}
      <Text style={styles.label}>Create Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* CONFIRM PASSWORD */}
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={[
          styles.input,
          password !== confirmPassword && confirmPassword
            ? styles.errorInput
            : null
        ]}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* ERROR TEXT */}
      {password !== confirmPassword && confirmPassword ? (
        <Text style={styles.errorText}>Invalid Password</Text>
      ) : null}

      {/* REFERRAL
      <Text style={styles.label}>Referral Code (Optional)</Text>
      <TextInput
        style={styles.input}
        value={referral}
        onChangeText={setReferral} */}
      {/* /> */}

      {/* FACE ID */}
      <View style={styles.switchRow}>
        <Switch value={faceId} onValueChange={setFaceId} />
        <Text style={styles.switchText}>
          Enable Face ID login for faster, secure access
        </Text>
      </View>

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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },

  back: {
    fontSize: 22,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  sub: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },

  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },

  errorInput: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  switchText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 12,
  },

  button: {
    backgroundColor: '#5A00D1',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});