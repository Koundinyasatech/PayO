import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

import api from '../api/axios';
import * as Keychain from 'react-native-keychain';

export default function OtpVerificationScreen({ route, navigation }) {

    const { mobile } = route.params;

    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const inputs = useRef([]);

    useEffect(() => {
        startTimer();
    }, []);

    const startTimer = () => {
        setTimer(30);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // const handleChange = (text, index) => {
    //     const newOtp = [...otp];
    //     newOtp[index] = text;
    //     setOtp(newOtp);

    //     if (text && index < 3) {
    //         inputs.current[index + 1].focus();
    //     }
    // };

    const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (error) setError(''); // 🔥 clear error when user edits

    if (text && index < 3) {
        inputs.current[index + 1].focus();
    }
};

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
            inputs.current[index - 1].focus();
        }
    };

    const saveToken = async (token) => {
        try {
            await Keychain.setGenericPassword('user', token);
            console.log("TOKEN SAVED:", token);
        } catch (error) {
            console.log('Keychain error:', error);
        }
    };

//     const handleVerifyOTP = async () => {
// // navigation.replace('Profile');
//         const finalOtp = otp.join('');

//         if (finalOtp.length < 4) {
//             Alert.alert('Error', 'Enter valid OTP');
//             return;
//         }

//         try {
//             setLoading(true);

//             const response = await api.post('/verify-otp', {
//                 mobile: mobile,
//                 otp: finalOtp
//             });

//             console.log('VERIFY RESPONSE:', response.data);

//             if (response.data.token) {

//                 const token = response.data.token;

//                 if (token) {
//                     await saveToken(token);
//                 }

//                 // ✅ ONLY THIS — NO setTimeout
//                 Alert.alert(
//                     'Success',
//                     'OTP Verified Successfully',
//                     [
//                         {
//                             text: 'OK',
//                             onPress: () => {
//                                 console.log("NAVIGATING...");
//                                 navigation.replace('Profile');
//                             }
//                         }
//                     ]
//                 );

//             } else {
//                 Alert.alert('Error', response.data.message || 'Invalid OTP');
//             }

//         } catch (error) {
//             console.log('VERIFY ERROR:', error.response?.data || error.message);
//             Alert.alert('Error', 'Verification failed');
//         } finally {
//             setLoading(false);
//         }
//     };

const handleVerifyOTP = async () => {

    const finalOtp = otp.join('');

    if (finalOtp.length < 4) {
        setError('Enter valid OTP');
        return;
    }

    try {
        setLoading(true);
        setError(''); // clear old error

        const response = await api.post('/api/auth/verify-otp', {
            mobile: mobile,
            otp: finalOtp
        });

        if (response.data.token) {

            const token = response.data.token;

            if (token) {
                await saveToken(token);
            }
navigation.replace('Profile')
            // Alert.alert(
            //     'Success',
            //     'OTP Verified Successfully',
            //     [
            //         {
            //             text: 'OK',
            //             onPress: () => navigation.replace('Profile')
            //         }
            //     ]
            // );

        } else {
            setError('Invalid OTP'); // ✅ instead of alert
        }

    } catch (error) {
        console.log('VERIFY ERROR:', error.response?.data || error.message);
        setError('Enter the Valid OTP'); // ✅ instead of alert
    } finally {
        setLoading(false);
    }
};
   const handleResendOTP = async () => {
    setError('');
    setOtp(['', '', '', '']);

    // 👉 Move focus to first input
    if (inputs.current[0]) {
        inputs.current[0].focus();
    }

    try {
        await api.post('/api/auth/send-otp', { mobile });

        Alert.alert('Success', 'OTP Resend Successfully');

        startTimer();

    } catch (error) {
        console.log('RESEND ERROR:', error);
        Alert.alert('Error', 'Failed to resend OTP, Please try after some time');
    }
};
    return (
        <View style={styles.container}>
               <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
               <Text style={styles.back}>←</Text>
            {/* <Text style={styles.back}>{'<'}</Text> */}
              </TouchableOpacity>
            
              <Text style={styles.titleCentered}>
Verify Your Number              </Text>
            </View>

            {/* <Text style={styles.title}>Verify Your Number</Text> */}



            <Text style={styles.sub}>
                Enter the 4 digit code sent to +91 {mobile.slice(-10,-9)}*******{mobile.slice(-2)}
            </Text>

            {/* <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref)}
                        style={styles.box}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                ))}
            </View> */}

            <View style={styles.otpContainer}>
  {otp.map((digit, index) => (
    <TextInput
      key={index}
      ref={(ref) => (inputs.current[index] = ref)}
      style={styles.box}
      keyboardType="number-pad"
      maxLength={1}
      value={digit}
      onChangeText={(text) => handleChange(text, index)}
      onKeyPress={(e) => handleKeyPress(e, index)}
    />
  ))}
</View>

{/* ✅ Error Text */}
{error ? (
  <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>
    {error}
  </Text>
) : null}

            <Text style={styles.timer}>
                Code expires in : 00:{timer < 10 ? `0${timer}` : timer}
            </Text>

            <Text style={styles.resend}>
                Didn’t receive code?{' '}
                <Text style={styles.link} onPress={handleResendOTP}>
                    Resend Code
                </Text>
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOTP}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Verify OTP</Text>
                )}
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

        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
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

  sub: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // ✅ center boxes
    marginTop: 30,
  },

  box: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 6,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  timer: {
    marginTop: 20,
    textAlign: 'center', // ✅ center
    color: '#666',
  },

  resend: {
    marginTop: 8,
    textAlign: 'center', // ✅ center
    color: '#666',
  },

  link: {
    color: '#5A00D1',
    textDecorationLine: 'underline', // ✅ underline like UI
  },

  button: {
    backgroundColor: '#5A00D1',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    width: '100%', // ✅ full width
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
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