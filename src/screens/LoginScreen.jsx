import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function LoginScreen({ navigation }) {

  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Hello,</Text>

      {/* FACE ID CIRCLE */}
      <View style={styles.circle}>
        <Text style={{ color: '#fff' }}>🔒</Text>
      </View>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>Or use password instead</Text>

      {/* PASSWORD INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          onChangeText={setPassword}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.arrowBtn}>
          <Text style={{ color: '#fff', fontSize: 18 }}>→</Text>
        </TouchableOpacity>
      </View>

      {/* FORGOT PASSWORD */}
      <Text style={styles.forgot}>Forgot Password</Text>

      {/* REGISTER NAVIGATION */}
      <Text style={styles.registerText}>
        Don’t have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('RegisterMobile')}
        >
          Register
        </Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 40,
  },

  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#5A00D1',
    alignSelf: 'center',
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },

  arrowBtn: {
    backgroundColor: '#5A00D1',
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  forgot: {
    marginTop: 10,
    color: '#5A00D1',
    fontSize: 12,
  },

  registerText: {
    textAlign: 'center',
    marginTop: 30,
  },

  link: {
    color: '#5A00D1',
    fontWeight: '600',
  },
});