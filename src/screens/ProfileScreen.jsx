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

  // ✅ IMPROVED VALIDATION (REAL APP LEVEL)

  const validate = () => {

    let err = {};

    // NAME

    if (!name?.trim()) err.name = 'Full name is required';

    else if (name.trim().length < 3) err.name = 'Minimum 3 characters required';

    // EMAIL

    if (!email?.trim()) err.email = 'Email is required';

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      err.email = 'Invalid email format should contain @';

    // PASSWORD

    if (!password) err.password = 'Password is required';

    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password))
      err.password = 'Use 8+ chars with uppercase, lowercase, number & special character';

    // CONFIRM PASSWORD

    if (!confirmPassword) err.confirmPassword = 'Confirm your password';

    else if (password !== confirmPassword)

      err.confirmPassword = 'Passwords do not match';

    setErrors(err);

    return Object.keys(err).length === 0;

  };

  // ✅ REAL-TIME ERROR CLEARING

  const handleChange = (field, value) => {

    if (field === "name") setName(value);

    if (field === "email") setEmail(value);

    if (field === "password") setPassword(value);

    if (field === "confirmPassword") setConfirmPassword(value);

    if (field === "referral") setReferral(value);

    if (errors[field]) {

      setErrors(prev => ({ ...prev, [field]: "" }));

    }

  };

  const handleContinue = async () => {

    setMessage("");

    if (!validate()) return;

    try {

      await api.post('/api/auth/register', {

        name: name.trim(),

        email: email.trim(),

        password,

        confirmpassword: confirmPassword,

        referralCode: referral,

      });

      navigation.navigate('TransactionPin');

    } catch (error) {

      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again";

      let fieldErrors = {};

      if (msg.toLowerCase().includes("email")) {
        fieldErrors.email = msg;
      } else if (msg.toLowerCase().includes("password")) {
        fieldErrors.password = msg;
      } else {
        setMessage(msg);
      }

      setErrors(prev => ({ ...prev, ...fieldErrors }));
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

        style={[

          styles.input,

          errors.name && styles.errorInput

        ]}

        value={name}

        onChangeText={(text) => handleChange("name", text)}

        placeholder="Enter Name"

        placeholderTextColor="#A0A0A0"

      />

      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <TextInput

        style={[

          styles.input,

          errors.email && styles.errorInput

        ]}

        value={email}

        onChangeText={(text) => handleChange("email", text)}

        placeholder="Enter Email"

        placeholderTextColor="#A0A0A0"

        autoCapitalize="none"

      />

      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* PASSWORD */}
      <Text style={styles.label}>Create Password</Text>
      <View style={[

        styles.inputWrapper,

        errors.password && styles.errorInput

      ]}>
        <TextInput

          style={styles.inputWithIcon}

          secureTextEntry={!showPassword}

          value={password}

          onChangeText={(text) => handleChange("password", text)}

          placeholder="************"

          placeholderTextColor="#A0A0A0"

        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* CONFIRM PASSWORD */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={[

        styles.inputWrapper,

        errors.confirmPassword && styles.errorInput

      ]}>
        <TextInput

          style={styles.inputWithIcon}

          secureTextEntry={!showConfirm}

          value={confirmPassword}

          onChangeText={(text) => {

            handleChange("confirmPassword", text);

            if (confirmPasswordTimer.current) {

              clearTimeout(confirmPasswordTimer.current);

            }

            confirmPasswordTimer.current = setTimeout(() => {

              setErrors(prev => ({

                ...prev,

                confirmPassword:

                  password !== text ? 'Passwords do not match' : ''

              }));

            }, 500);

          }}

          placeholder="************"

          placeholderTextColor="#A0A0A0"

        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Icon name={showConfirm ? 'eye-off' : 'eye'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>

      )}

      {/* REFERRAL */}
      <Text style={styles.label}>

        Referral Code <Text style={styles.optional}>(Optional)</Text>
      </Text>
      <TextInput

        style={styles.input}

        value={referral}

        onChangeText={(text) => handleChange("referral", text)}

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
  errorCenter: {
    color: "red",
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

