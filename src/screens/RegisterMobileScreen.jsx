// import React, { useState } from 'react';

// import {

//   View,

//   Text,

//   TextInput,

//   StyleSheet,

//   TouchableOpacity,

//   ActivityIndicator,

//   Alert

// } from 'react-native';

// import api from '../api/axios';

// export default function RegisterMobileScreen({ navigation }) {

//   const [mobile, setMobile] = useState('');

//   const [loading, setLoading] = useState(false);

//   const isValidMobile = mobile?.length === 10;

//   const handleSendOTP = async () => {

//     if (!mobile || mobile.length !== 10) {

//       Alert.alert('Error', 'Enter valid mobile number');

//       return;

//     }

//     try {

//       setLoading(true);

//       const payload = {

//         mobile: mobile

//       };

//       console.log("REQUEST:", payload);

//       const response = await api.post('/api/auth/send-otp', payload);

//       console.log("RESPONSE:", response.data);

//       if (response.data?.message === "OTP sent") {

//         navigation.navigate('OTP', { mobile });

//       } else {

//         Alert.alert(

//           'Error',

//           response.data?.message || 'Failed to send OTP'

//         );

//       }

//     } catch (error) {

//       console.log("FULL ERROR:", error);

//       console.log("ERROR RESPONSE:", error.response?.data);

//       Alert.alert(

//         'Error',

//         error.response?.data?.message || error.message

//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (
// <View style={styles.container}>
// <View style={styles.header}>
// <TouchableOpacity onPress={() => navigation.goBack()}>
// <Text style={styles.back}>←</Text>
// </TouchableOpacity>
// <Text style={styles.titleCentered}>

//           Enter Your Mobile Number
// </Text>
// </View>
// <Text style={styles.desc}>

//         We will send a one time code to verify your number.
// </Text>
// <Text style={styles.label}>Mobile Number</Text>
// <View style={styles.inputRow}>
// <View style={styles.codeBox}>
// <Text>+91</Text>
// </View>
// <TextInput

//           style={styles.input}

//           placeholder="9876543210"

//           keyboardType="phone-pad"

//           value={mobile}

//           onChangeText={(text) => {

//             const numeric = text.replace(/[^0-9]/g, '');

//             setMobile(numeric);

//           }}

//           maxLength={10}

//         />
// </View>
// <TouchableOpacity

//         style={[

//           styles.button,

//           { backgroundColor: isValidMobile ? '#4E00C2' : '#ccc' }

//         ]}

//         onPress={handleSendOTP}

//         disabled={!isValidMobile || loading}
// >

//         {loading ? (
// <ActivityIndicator color="#fff" />

//         ) : (
// <Text style={styles.buttonText}>Send OTP</Text>

//         )}
// </TouchableOpacity>
// </View>

//   );

// }

// const styles = StyleSheet.create({

//   container: {

//     flex: 1,

//     backgroundColor: '#F2F2F2',

//     padding: 20,

//   },

//   header: {

//     flexDirection: 'row',

//     alignItems: 'center',

//     marginTop: 20,

//   },

//   back: {

//     fontSize: 20,

//     marginRight: 10,

//   },

//   titleCentered: {

//     flex: 1,

//     textAlign: 'center',

//     fontSize: 22,

//     fontWeight: '700',

//   },

//   desc: {

//     textAlign: 'center',

//     color: '#555',

//     marginTop: 10,

//     marginBottom: 30,

//   },

//   label: {

//     fontSize: 12,

//     marginBottom: 6,

//     fontWeight: '700',

//   },

//   inputRow: {

//     flexDirection: 'row',

//     borderWidth: 1,

//     borderColor: '#ccc',

//     borderRadius: 10,

//   },

//   codeBox: {

//     padding: 12,

//     backgroundColor: '#cfcdcd',

//   },

//   input: {

//     flex: 1,

//     padding: 12,

//   },

//   button: {

//     padding: 14,

//     borderRadius: 8,

//     alignItems: 'center',

//     marginTop: 30,

//   },

//   buttonText: {

//     color: '#fff',

//     fontWeight: '600',

//   },

// });
 


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import api from '../api/axios';
 
export default function RegisterMobileScreen({ navigation, route }) {
 
  const { mode = 'register' } = route.params || {};
 
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
 
  const isValidMobile = mobile?.length === 10;
 
  const handleSendOTP = async () => {
 
    if (!mobile || mobile.length !== 10) {
      Alert.alert('Error', 'Enter valid mobile number');
      return;
    }
 
    try {
      setLoading(true);
 
      let response;
 
      // 🔥 DIFFERENT API BASED ON MODE
      if (mode === 'login') {
        response = await api.post('/api/auth/send-login-otp', { mobile });
      } else {
        response = await api.post('/api/auth/send-otp', { mobile });
      }
 
      console.log("OTP RESPONSE:", response.data);
 
      // 🔥 HANDLE RESPONSE
      if (response.data?.message === "OTP sent") {
        navigation.navigate('OTP', { mobile, mode });
      } else {
        Alert.alert('Error', response.data?.message || 'Something went wrong');
      }
 
    } catch (error) {
      console.log("ERROR:", error?.response?.data || error.message);
 
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
 
        <Text style={styles.titleCentered}>
          {mode === 'login' ? 'Login with Mobile' : 'Enter Your Mobile Number'}
        </Text>
      </View>
 
      <Text style={styles.desc}>
        We will send a one time code to verify your number.Standard rates may apply
      </Text>
 
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
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
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
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
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
});
 