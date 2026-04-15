// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Switch,
//   Alert,
//   ScrollView
// } from 'react-native';

// import api from '../api/axios';

// export default function ProfileScreen({ navigation }) {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [referral, setReferral] = useState('');
//   const [faceId, setFaceId] = useState(true);

//   const handleContinue = async () => {

//     if (!name || !email || !password) {
//       Alert.alert('Error', 'All fields required');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     try {
//       const response = await api.post('/register', {
//         name,
//         email,
//         password,
//         confirmpassword: confirmPassword,
//         referralCode: referral,
//       });

//       Alert.alert('Success', 'Profile created');
//       navigation.navigate('TransactionPin');

//     } catch (error) {
//       console.log('FULL ERROR:', error);
//       console.log('ERROR DATA:', error.response?.data);
//       console.log('STATUS:', error.response?.status);

//       Alert.alert(
//         'Error',
//         JSON.stringify(error.response?.data) || 'Something went wrong'
//       );
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>

//       {/* BACK */}
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={styles.back}>←</Text>
//       </TouchableOpacity>

//       {/* TITLE */}
//       <Text style={styles.title}>Create your Profile</Text>
//       <Text style={styles.sub}>
//         Tell us a little bit about yourself to get started
//       </Text>

//       {/* NAME */}
//       <Text style={styles.label}>Full Name</Text>
//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//         placeholder="Enter name"
//       />

//       {/* EMAIL */}
//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Enter email"
//       />

//       {/* PASSWORD */}
//       <Text style={styles.label}>Create Password</Text>
//       <TextInput
//         style={styles.input}
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       {/* CONFIRM PASSWORD */}
//       <Text style={styles.label}>Confirm Password</Text>
//       <TextInput
//         style={[
//           styles.input,
//           password !== confirmPassword && confirmPassword
//             ? styles.errorInput
//             : null
//         ]}
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />

//       {password !== confirmPassword && confirmPassword ? (
//         <Text style={styles.errorText}>Invalid Password</Text>
//       ) : null}

//       {/* 🔥 REFERRAL FIELD */}
//       <Text style={styles.label}>
//         Referral Code <Text style={styles.optional}>(Optional)</Text>
//       </Text>
//       <TextInput
//         style={styles.input}
//         value={referral}
//         onChangeText={setReferral}
//         placeholder="Enter referral code"
//       />

//       {/* SWITCHES */}
//       <View style={styles.switchRow}>
//         <Switch value={faceId} onValueChange={setFaceId} />
//         <Text style={styles.switchText}>
//           Enable Face ID login for faster, secure access
//         </Text>
//       </View>

//       <View style={styles.switchRow}>
//         <Switch value={faceId} onValueChange={setFaceId} />
//         <Text style={styles.switchText}>
//           Enable Face ID login for faster, secure access
//         </Text>
//       </View>

//       {/* BUTTON */}
//       <TouchableOpacity style={styles.button} onPress={handleContinue}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EAEAEA',
//     padding: 20,
//   },

//   back: {
//     fontSize: 22,
//     marginBottom: 10,
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     textAlign: 'center',
//   },

//   sub: {
//     textAlign: 'center',
//     color: '#777',
//     marginBottom: 20,
//   },

//   label: {
//     marginTop: 15,
//     marginBottom: 5,
//     fontSize: 13,
//     color: '#333',
//   },

//   optional: {
//     color: '#999',
//     fontSize: 12,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: '#fff',
//   },

//   errorInput: {
//     borderColor: 'red',
//   },

//   errorText: {
//     color: 'red',
//     fontSize: 12,
//   },

//   switchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 15,
//   },

//   switchText: {
//     marginLeft: 10,
//     flex: 1,
//     fontSize: 12,
//   },

//   button: {
//     backgroundColor: '#5A00D1',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 30,
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });



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

import api from '../api/axios';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [faceId, setFaceId] = useState(true);
  const[message,setMessage]=useState("")

  const [errors, setErrors] = useState({});
  const confirmPasswordTimer = useRef(null);

  const validate = () => {
    let err = {};

    if (!name.trim()) err.name = 'Full name is required';

    if (!email.trim()) {
      err.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = 'Invalid email';
    }

    if (!password) {
      err.password = 'Password is required';
    } else if (password.length < 6) {
      err.password = 'Minimum 6 characters required';
    }

    if (!confirmPassword) {
      err.confirmPassword = 'Confirm your password';
    } else if (password !== confirmPassword) {
      err.confirmPassword = 'Invalid Password';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

const handleContinue = async () => {
  if (!validate()) return;

  try {
    await api.post('/register', {
      name,
      email,
      password,
      confirmpassword: confirmPassword,
      referralCode: referral,
    });

    navigation.navigate('TransactionPin');

  } catch (error) {
    console.log(error.response?.data?.message, "000");

    setMessage(
      error?.response?.data?.message || 
      "Something went wrong. Please try again"
    );
  }
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>

        </TouchableOpacity>

        <Text style={styles.titleCentered}>
          Create your Profile             </Text>
      </View>


      <Text style={styles.sub}>
        Tell us a little bit about yourself to get started
      </Text>
{message ? (
        <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>
          {message}
        </Text>
      ) : null}
      {/* NAME */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        value={name}
        onChangeText={(text) => {
          setMessage("")
          setName(text);
          setErrors(prev => ({ ...prev, name: '' }));
        }}
        placeholder="Raghav Mangu"
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        value={email}
        onChangeText={(text) => {
           setMessage("")
          setEmail(text);
          setErrors(prev => ({ ...prev, email: '' }));
        }}
        placeholder="Raghavmangu0223@gmail.com"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* PASSWORD */}
      <Text style={styles.label}>Create Password</Text>
      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
           setMessage("")

          setErrors(prev => ({
            ...prev,
            password: '',
            confirmPassword:
              confirmPassword && text !== confirmPassword
                ? 'Invalid Password'
                : ''
          }));
        }}
        placeholder="************"
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* CONFIRM PASSWORD */}
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={[
          styles.input,
          errors.confirmPassword && styles.errorInput,
        ]}
        secureTextEntry
        value={confirmPassword}
        // onChangeText={(text) => {
        //   setConfirmPassword(text);

        //   setErrors(prev => ({
        //     ...prev,
        //     confirmPassword:
        //       password !== text ? 'Invalid Password' : ''
        //   }));
        // }}

        onChangeText={(text) => {
  setConfirmPassword(text);
   setMessage("")

  // Clear previous timer
  if (confirmPasswordTimer.current) {
    clearTimeout(confirmPasswordTimer.current);
  }

  // Set new timer (delay validation)
  confirmPasswordTimer.current = setTimeout(() => {
    setErrors(prev => ({
      ...prev,
      confirmPassword:
        password !== text ? 'Invalid Password' : ''
    }));
  }, 1000); // ⏱ 1.5 seconds delay
}}
        placeholder="************"
      />
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
        onChangeText={setReferral}
        placeholder="PAYOOTHU234"
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
                      <Text
                          style={styles.link}
                          onPress={() => navigation.navigate('Login')}
                      >
                          Login
                      </Text>
                  </Text>
      
                  <Text style={styles.footer}>
                      By Continuing, you agree to our{' '}
                      <Text style={styles.link}>Privacy Policy</Text>
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
});