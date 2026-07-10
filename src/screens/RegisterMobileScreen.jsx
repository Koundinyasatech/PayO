// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// export default function RegisterMobileScreen({ navigation, route }) {
//   const { mode = 'register' } = route.params || {};

//   const [mobile, setMobile] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const isValidMobile = mobile?.length === 10;

//   const handleSendOTP = async () => {
//     if (!mobile || mobile.length !== 10) {
//       setError('Enter valid mobile number');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       let response;

//       if (mode === 'login') {
//         response = await api.post('/api/auth/send-login-otp', { mobile });
//       } else {
//         response = await api.post('/api/auth/send-otp', { mobile });
//       }

//       console.log('OTP RESPONSE:', response.data);

//       if (response.data?.message === 'OTP sent') {
//         navigation.navigate('OTP', { mobile, mode });
//       } else {
//         setError(response.data?.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.log('ERROR:', error?.response?.data || error.message);

//       setError(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.container}>
//             <View style={styles.header}>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Icon
//                   name="chevron-left"
//                   size={moderateScale(28)}
//                   color="#000000"
//                 />
//               </TouchableOpacity>

//               <Text style={styles.titleCentered}>
//                 {mode === 'login'
//                   ? 'Login with Mobile'
//                   : 'Enter Your Mobile Number'}
//               </Text>
//             </View>

//             <Text style={styles.desc}>
//               We will send a one time code to verify your number. Standard rates
//               may apply
//             </Text>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             <Text style={styles.label}>Mobile Number</Text>

//             <View style={styles.inputRow}>
//               <View style={styles.codeBox}>
//                 <Text style={styles.codeText}>+91</Text>
//               </View>

//               <TextInput
//                 style={styles.input}
//                 placeholder="9876543210"
//                 placeholderTextColor="#999"
//                 keyboardType="phone-pad"
//                 value={mobile}
//                 onChangeText={(text) => {
//                   const numeric = text.replace(/[^0-9]/g, '');
//                   setMobile(numeric);
//                   setError('');
//                 }}
//                 maxLength={10}
//               />
//             </View>

//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 {
//                   backgroundColor: isValidMobile ? '#4E00C2' : '#ccc',
//                 },
//               ]}
//               onPress={handleSendOTP}
//               disabled={!isValidMobile || loading}>
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Send OTP</Text>
//               )}
//             </TouchableOpacity>

//             {mode === 'login' ? (
//               <Text style={styles.registerText}>
//                 Don’t have an account?{' '}
//                 <Text
//                   style={styles.link}
//                   onPress={() =>
//                     navigation.navigate('RegisterMobile', {
//                       mode: 'register',
//                     })
//                   }>
//                   Register
//                 </Text>
//               </Text>
//             ) : (
//               <Text style={styles.loginText}>
//                 Already have an account?{' '}
//                 <Text
//                   style={styles.link}
//                   onPress={() => navigation.navigate('Login')}>
//                   Login
//                 </Text>
//               </Text>
//             )}

//             <Text style={styles.footer}>
//               By Continuing, you agree to our{' '}
//               <Text style={styles.link}>Privacy Policy</Text>
//             </Text>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },

//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//   },

//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     paddingHorizontal: wp('6%'),
//     paddingTop: hp('2%'),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp('1%'),
//   },

//   titleCentered: {
//     flex: 1,
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     marginLeft: wp('3%'),
//     color: '#000',
//   },

//   errorText: {
//     color: 'red',
//     fontSize: moderateScale(13),
//     marginBottom: hp('1.2%'),
//     textAlign: 'center',
//   },

//   desc: {
//     textAlign: 'center',
//     color: '#555',
//     marginTop: hp('2%'),
//     marginBottom: hp('4%'),
//     fontSize: moderateScale(14),
//     lineHeight: moderateScale(20),
//     paddingHorizontal: wp('3%'),
//   },

//   label: {
//     fontSize: moderateScale(12),
//     marginBottom: hp('0.8%'),
//     marginTop: hp('0.5%'),
//     fontWeight: '700',
//     color: '#000',
//   },

//   inputRow: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: moderateScale(10),
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//   },

//   codeBox: {
//     paddingHorizontal: wp('4%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#cfcdcd',
//   },

//   codeText: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#000',
//   },

//   input: {
//     flex: 1,
//     paddingVertical: hp('1.8%'),
//     paddingHorizontal: wp('4%'),
//     fontSize: moderateScale(15),
//     color: '#000',
//   },

//   button: {
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(8),
//     alignItems: 'center',
//     marginTop: hp('4%'),
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//   },

//   link: {
//     color: '#5A00D1',
//     textDecorationLine: 'underline',
//     fontWeight: '600',
//   },

//   loginText: {
//     marginTop: hp('3%'),
//     textAlign: 'center',
//     color: '#555',
//     fontSize: moderateScale(14),
//   },

//   registerText: {
//     textAlign: 'center',
//     marginTop: hp('3%'),
//     color: '#555',
//     fontSize: moderateScale(14),
//   },

//   footer: {
//     marginTop: hp('1.5%'),
//     textAlign: 'center',
//     color: '#555',
//     fontSize: moderateScale(12),
//     lineHeight: moderateScale(18),
//     paddingHorizontal: wp('5%'),
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
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';

// Using your custom responsive utility
import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
import { useAuth } from '../context/AuthContext';


export default function RegisterMobileScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUserId } = useAuth();

  const isValidMobile = mobile?.length === 10;

   // Exact API implementation untouched
//  const handleSendOTP = async () => {
//   if (!mobile || mobile.length !== 10) {
//     setError('Enter valid mobile number');
//     return;
//   }

//   try {
//     setLoading(true);
//     setError('');

//     const response = await api.post('/api/auth/send-otp', {
//       mobile,
//       countryCode: '+91',
//     });

//     console.log('OTP RESPONSE:', response.data);

//     if (
//       response.data?.status === '200' ||
//       response.data?.message === 'OTP Sent Successfully'
//     ) {
//       navigation.navigate('OTP', {
//         mobile,
//         countryCode: '+91',
//         userId: response.data?.userId,
//         // otp: response.data?.otp, // Remove this in production if backend doesn't return OTP
//       });
//     } else {
//       setError(response.data?.message || 'Something went wrong');
//     }
//   } catch (error) {
//     console.log('ERROR:', error?.response?.data || error.message);
//     setError(error.response?.data?.message || 'Something went wrong');
//   } finally {
//     setLoading(false);
//   }
// };

const handleSendOTP = async () => {
  if (!mobile || mobile.length !== 10) {
    setError('Enter valid mobile number');
    return;
  }

  try {
    setLoading(true);
    setError('');

    const response = await api.post('/api/auth/send-otp', {
      mobile,
      countryCode: '+91',
    });

    if (
      response.data?.status === '200' ||
      response.data?.message === 'OTP Sent Successfully'
    ) {
      navigation.navigate('OTP', {
        mobile,
        countryCode: '+91',
        userId: response.data?.userId,
        type: 'register', // <-- identifies the flow
      });

      setUserId(response.data.userId);
    } else {
      setError(response.data?.message || 'Something went wrong');
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* Header Section */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
              </TouchableOpacity>
              
              <Image 
                source={require('../../assets/images/LogoContainer.png')} // Update path to your PayO logo
                style={styles.logo}
              />
            </View>

            {/* Hero Illustration */}
            <Image 
              source={require('../../assets/images/registerscreen.png')} // Update path to your 3D Hero image
              style={styles.heroImage}
            />

            {/* Title & Subtitle */}
            <View style={styles.titleContainer}>
               <Text style={styles.titleBlack}>
                 Enter Your <Text style={styles.titleBlue}>Mobile Number</Text>
               </Text>
             
              <Text style={styles.desc}>
                We will send a one time code to verify your number. Standard rates may apply.
              </Text>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Input Section */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Mobile Number</Text>

              <View style={styles.inputContainerRow}>
                {/* Country Code Box */}
                <View style={styles.countryCodeBox}>
                  <Text style={styles.flagEmoji}>🇮🇳</Text> 
                  <Text style={styles.countryCodeText}>+91</Text>
                  <Icon name="chevron-down" size={moderateScale(16)} color="#333" />
                </View>

                {/* Mobile Input Box */}
                <View style={[styles.mobileInputBox, isValidMobile && styles.mobileInputBoxValid]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Mobile Number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={mobile}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9]/g, '');
                      setMobile(numeric);
                      setError('');
                    }}
                    maxLength={10}
                  />
                  {/* Green checkmark appears when valid */}
                  {isValidMobile && (
                    <Icon name="check-circle" size={moderateScale(20)} color="#28A745" />
                  )}
                </View>
              </View>
            </View>

            {/* Terms & Conditions Check */}
            <View style={styles.termsRow}>
              <Image 
                source={require('../../assets/images/shield-check1.png')} 
                style={styles.termsShieldIcon} 
              />
              <Text style={styles.termsText}>
                By continuing you agree to PAYO's <Text style={styles.link}>Terms of Service</Text> & <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Primary Button */}
            <TouchableOpacity
              style={[styles.primaryBtn, { opacity: isValidMobile ? 1 : 0.6 }]}
              onPress={handleSendOTP}
              disabled={!isValidMobile || loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.btnContent}>
                  <Text style={styles.buttonText}>Send OTP</Text>
                  <Icon name="arrow-right" size={moderateScale(18)} color="#FFF" style={styles.btnArrow} />
                </View>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* Bottom Links */}
            <View style={styles.bottomLinksContainer}>
              <Text style={styles.accountText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </Text>

              <Text style={styles.privacyText}>
                By Continuing, you agree to our <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Security Badge */}
            <View style={styles.badgeContainer}>
              <Image 
                source={require('../../assets/images/vector.png')} 
                style={styles.badgeShieldIcon} 
              />
              <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(100),
    width: '100%',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: moderateScale(25),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(40),
    resizeMode: 'contain',
  },

  // Hero Image
  heroImage: {
    width: windowWidth * 0.85,
    height: verticalScale(175),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },

  // Typography
  titleContainer: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  titleBlack: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#000',
  },
  titleBlue: {
    color: '#2962FF',
  },
  desc: {
    textAlign: 'center',
    color: '#666',
    fontSize: moderateScale(13),
    lineHeight: moderateScale(20),
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(40),
  },
  errorText: {
    color: '#FF3B30',
    fontSize: moderateScale(13),
    textAlign: 'center',
    marginTop: verticalScale(10),
  },

  // Inputs
  inputSection: {
    paddingHorizontal: moderateScale(25),
    marginTop: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(10),
  },
  inputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: moderateScale(10),
    height: verticalScale(50),
    width: '28%',
    backgroundColor: '#FFF',
  },
  flagEmoji: {
    fontSize: moderateScale(16),
  },
  countryCodeText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
  },
  mobileInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(15),
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: moderateScale(10),
    height: verticalScale(50),
    paddingHorizontal: moderateScale(15),
    backgroundColor: '#FFF',
  },
  mobileInputBoxValid: {
    borderColor: '#2962FF',
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#000',
    letterSpacing: 1,
  },

  // Terms Check
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(40),
    marginTop: verticalScale(20),
  },
  termsShieldIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(10),
  },
  termsText: {
    flex: 1,
    fontSize: moderateScale(11),
    color: '#666',
    lineHeight: moderateScale(16),
  },
  link: {
    color: '#2962FF',
    fontWeight: '700',
  },

  // Button
  primaryBtn: {
    backgroundColor: '#5655FF',
    borderRadius: moderateScale(12),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(25),
    marginTop: verticalScale(25),
    elevation: 3,
    shadowColor: '#5655FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  btnArrow: {
    position: 'absolute',
    right: moderateScale(20),
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(25),
    paddingHorizontal: moderateScale(40),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: moderateScale(15),
    color: '#888',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },

  // Bottom Area
  bottomLinksContainer: {
    alignItems: 'center',
  },
  accountText: {
    fontSize: moderateScale(13),
    color: '#555',
    marginBottom: verticalScale(10),
  },
  privacyText: {
    fontSize: moderateScale(12),
    color: '#777',
  },
  
  // Security Badge
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(20),
    alignSelf: 'center',
    marginTop: verticalScale(25),
  },
  badgeShieldIcon: {
    width: moderateScale(14),
    height: moderateScale(14),
    resizeMode: 'contain',
  },
  badgeText: {
    fontSize: moderateScale(11),
    color: '#666',
    marginLeft: moderateScale(8),
    fontWeight: '600',
  },
});


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   ScrollView,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// // Using your custom responsive utility
// import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';

// export default function RegisterMobileScreen({ navigation, route }) {
//   const { mode = 'register' } = route.params || {};

//   const [mobile, setMobile] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const isValidMobile = mobile?.length === 10;

//    // Exact API implementation untouched
//   const handleSendOTP = async () => {
//     if (!mobile || mobile.length !== 10) {
//       setError('Enter valid mobile number');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       let response;

//       if (mode === 'login') {
//         response = await api.post('/api/auth/send-login-otp', { mobile });
//       } else {
//         response = await api.post('/api/auth/send-otp', { mobile });
//       }

//       console.log('OTP RESPONSE:', response.data);

//       if (response.data?.message === 'OTP sent') {
//         navigation.navigate('OTP', { mobile, mode });
//       } else {
//         setError(response.data?.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.log('ERROR:', error?.response?.data || error.message);
//       setError(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView 
//             contentContainerStyle={styles.scrollContent} 
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//           >
            
//             {/* Header Section */}
//             <View style={styles.header}>
//               <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//               </TouchableOpacity>
              
//               <Image 
//                 source={require('../../assets/images/LogoContainer.png')} // Update path to your PayO logo
//                 style={styles.logo}
//               />
//             </View>

//             {/* Hero Illustration */}
//             <Image 
//               source={require('../../assets/images/registerscreen.png')} // Update path to your 3D Hero image
//               style={styles.heroImage}
//             />

//             {/* Title & Subtitle */}
//             <View style={styles.titleContainer}>
//               {mode === 'login' ? (
//                  <Text style={styles.titleBlack}>
//                    Login with <Text style={styles.titleBlue}>Mobile</Text>
//                  </Text>
//               ) : (
//                  <Text style={styles.titleBlack}>
//                    Enter Your <Text style={styles.titleBlue}>Mobile Number</Text>
//                  </Text>
//               )}
             
//               <Text style={styles.desc}>
//                 We will send a one time code to verify your number. Standard rates may apply.
//               </Text>
//             </View>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             {/* Input Section */}
//             <View style={styles.inputSection}>
//               <Text style={styles.label}>Mobile Number</Text>

//               <View style={styles.inputContainerRow}>
//                 {/* Country Code Box */}
//                 <View style={styles.countryCodeBox}>
//                   {/* Assuming you have a small flag icon, or you can use text/emoji */}
//                   <Text style={styles.flagEmoji}>🇮🇳</Text> 
//                   <Text style={styles.countryCodeText}>+91</Text>
//                   <Icon name="chevron-down" size={moderateScale(16)} color="#333" />
//                 </View>

//                 {/* Mobile Input Box */}
//                 <View style={[styles.mobileInputBox, isValidMobile && styles.mobileInputBoxValid]}>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter Mobile Number"
//                     placeholderTextColor="#999"
//                     keyboardType="phone-pad"
//                     value={mobile}
//                     onChangeText={(text) => {
//                       const numeric = text.replace(/[^0-9]/g, '');
//                       setMobile(numeric);
//                       setError('');
//                     }}
//                     maxLength={10}
//                   />
//                   {/* Green checkmark appears when valid */}
//                   {isValidMobile && (
//                     <Icon name="check-circle" size={moderateScale(20)} color="#28A745" />
//                   )}
//                 </View>
//               </View>
//             </View>

//             {/* Terms & Conditions Check */}
//             <View style={styles.termsRow}>
//               <Image 
//                 source={require('../../assets/images/shield-check1.png')} 
//                 style={styles.termsShieldIcon} 
//               />
//               <Text style={styles.termsText}>
//                 By continuing you agree to PAYO's <Text style={styles.link}>Terms of Service</Text> & <Text style={styles.link}>Privacy Policy</Text>
//               </Text>
//             </View>

//             {/* Primary Button */}
//             <TouchableOpacity
//               style={[styles.primaryBtn, { opacity: isValidMobile ? 1 : 0.6 }]}
//               onPress={handleSendOTP}
//               disabled={!isValidMobile || loading}
//               activeOpacity={0.8}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <View style={styles.btnContent}>
//                   <Text style={styles.buttonText}>Send OTP</Text>
//                   <Icon name="arrow-right" size={moderateScale(18)} color="#FFF" style={styles.btnArrow} />
//                 </View>
//               )}
//             </TouchableOpacity>

//             {/* Divider */}
//             <View style={styles.dividerRow}>
//               <View style={styles.line} />
//               <Text style={styles.orText}>OR</Text>
//               <View style={styles.line} />
//             </View>

//             {/* Bottom Links */}
//             <View style={styles.bottomLinksContainer}>
//               {mode === 'login' ? (
//                 <Text style={styles.accountText}>
//                   Don't have an account?{' '}
//                   <Text style={styles.link} onPress={() => navigation.navigate('RegisterMobile', { mode: 'register' })}>
//                     Register
//                   </Text>
//                 </Text>
//               ) : (
//                 <Text style={styles.accountText}>
//                   Already have an account?{' '}
//                   <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
//                     Login
//                   </Text>
//                 </Text>
//               )}

//               <Text style={styles.privacyText}>
//                 By Continuing, you agree to our <Text style={styles.link}>Privacy Policy</Text>
//               </Text>
//             </View>

//             {/* Security Badge */}
//             <View style={styles.badgeContainer}>
//               <Image 
//                 source={require('../../assets/images/vector.png')} 
//                 style={styles.badgeShieldIcon} 
//               />
//               <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
//             </View>

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#ffffff', 
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: verticalScale(30),
//   },
  
//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: verticalScale(100),
//     width: '100%',
//     position: 'relative',
//   },
//   backBtn: {
//     position: 'absolute',
//     left: moderateScale(25),
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   logo: {
//     width: moderateScale(120),
//     height: moderateScale(40),
//     resizeMode: 'contain',
//   },

//   // Hero Image
//   heroImage: {
//     width: windowWidth * 0.85,
//     height: verticalScale(175),
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Typography
//   titleContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//   },
//   titleBlack: {
//     fontSize: moderateScale(22),
//     fontWeight: '800',
//     color: '#000',
//   },
//   titleBlue: {
//     color: '#2962FF',
//   },
//   desc: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: moderateScale(13),
//     lineHeight: moderateScale(20),
//     marginTop: verticalScale(10),
//     paddingHorizontal: moderateScale(40),
//   },
//   errorText: {
//     color: '#FF3B30',
//     fontSize: moderateScale(13),
//     textAlign: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Inputs
//   inputSection: {
//     paddingHorizontal: moderateScale(25),
//     marginTop: verticalScale(20),
//   },
//   label: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: verticalScale(10),
//   },
//   inputContainerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   countryCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     width: '28%',
//     backgroundColor: '#FFF',
//   },
//   flagEmoji: {
//     fontSize: moderateScale(16),
//   },
//   countryCodeText: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     color: '#333',
//   },
//   mobileInputBox: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: moderateScale(15),
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     paddingHorizontal: moderateScale(15),
//     backgroundColor: '#FFF',
//   },
//   mobileInputBoxValid: {
//     borderColor: '#2962FF',
//   },
//   input: {
//     flex: 1,
//     fontSize: moderateScale(14),
//     color: '#000',
//     letterSpacing: 1,
//   },

//   // Terms Check
//   termsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(40),
//     marginTop: verticalScale(20),
//   },
//   termsShieldIcon: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     resizeMode: 'contain',
//     marginRight: moderateScale(10),
//   },
//   termsText: {
//     flex: 1,
//     fontSize: moderateScale(11),
//     color: '#666',
//     lineHeight: moderateScale(16),
//   },
//   link: {
//     color: '#2962FF',
//     fontWeight: '700',
//   },

//   // Button
//   primaryBtn: {
//     backgroundColor: '#5655FF',
//     borderRadius: moderateScale(12),
//     height: verticalScale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: moderateScale(25),
//     marginTop: verticalScale(25),
//     elevation: 3,
//     shadowColor: '#5655FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   btnContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: moderateScale(20),
//   },

//   // Divider
//   dividerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: verticalScale(25),
//     paddingHorizontal: moderateScale(40),
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   orText: {
//     marginHorizontal: moderateScale(15),
//     color: '#888',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },

//   // Bottom Area
//   bottomLinksContainer: {
//     alignItems: 'center',
//   },
//   accountText: {
//     fontSize: moderateScale(13),
//     color: '#555',
//     marginBottom: verticalScale(10),
//   },
//   privacyText: {
//     fontSize: moderateScale(12),
//     color: '#777',
//   },
  
//   // Security Badge
//   badgeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(20),
//     alignSelf: 'center',
//     marginTop: verticalScale(25),
//   },
//   badgeShieldIcon: {
//     width: moderateScale(14),
//     height: moderateScale(14),
//     resizeMode: 'contain',
//   },
//   badgeText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     marginLeft: moderateScale(8),
//     fontWeight: '600',
//   },
// });