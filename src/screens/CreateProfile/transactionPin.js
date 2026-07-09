// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   StatusBar,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   TextInput,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';
// import { useRoute } from "@react-navigation/native";

// export default function TransactionPinScreen({ navigation }) {
//   const route = useRoute();
//   const { amount, name, address, sender, senderData } = route.params || {};

//   const [pin, setPin] = useState('');
//   const [confirmPin, setConfirmPin] = useState('');
//   const [showPin, setShowPin] = useState(false);
//   const [showConfirmPin, setShowConfirmPin] = useState(false);
//   const [error, setError] = useState('');

//   // Fixed Validation Checkers to strictly check 4-digit rules instead of 6
//   const is4Digits = pin?.length === 4;
//   const isNotSequential = pin.length > 0 && !/^(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/.test(pin);
//   const isNotRepeated = pin.length > 0 && !/^(.)\1{3}$/.test(pin) && !/(.)\1{1}(.)\2{1}/.test(pin); 
//   const isNotEasyToGuess = pin.length > 0 && !/^(1212|2525|1020|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/.test(pin);

//   const handleContinue = async () => {
//     setError('');
    
//     if (pin.length !== 4 || confirmPin.length !== 4) {
//       setError('Both PIN fields must be 4 digits');
//       return;
//     }
//     if (pin !== confirmPin) {
//       setError('PINs do not match');
//       return;
//     }
//     if (!isNotSequential || !isNotRepeated || !isNotEasyToGuess) {
//       setError('PIN does not follow security rules');
//       return;
//     }

//     try {
//       const response = await api.post('/api/auth/set-pin', { pin });

//       if (response?.data?.message) {
//         Alert.alert(
//           'Success',
//           'Your Transaction PIN has been created successfully.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 if (sender) {
//                   navigation.navigate('SendPin', { amount, name, address, sender });
//                 } else {
//                   navigation.navigate('SendPin', { amount, name, address, senderData });
//                 }
//               },
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (err) {
//       Alert.alert(
//         'Error',
//         err?.response?.data?.message || 'Something went wrong'
//       );
//     }
//   };

//   const renderPinBoxes = (value, isMasked) => {
//     return Array(4).fill(0).map((_, index) => {
//       const char = value[index];
//       return (
//         <View key={index} style={[styles.pinBox, char ? styles.pinBoxFilled : null]}>
//           {char ? (
//             isMasked ? (
//               <View style={styles.filledBlueDot} />
//             ) : (
//               <Text style={styles.pinText}>{char}</Text>
//             )
//           ) : null}
//         </View>
//       );
//     });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

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
//             {/* Top Navigation Bar */}
//             <View style={styles.header}>
//               <TouchableOpacity 
//                 style={styles.backButtonCircle} 
//                 onPress={() => navigation.goBack()}
//               >
//                 <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//               </TouchableOpacity>

//               <View style={styles.logoContainer}>
//                 <Image 
//                   source={require('../../../assets/images/LogoContainer.png')} 
//                   style={styles.logoImage}
//                   resizeMode="contain"
//                 />
//               </View>
//               <View style={{ width: moderateScale(36) }} />
//             </View>

//             {/* Top Security Banner Illustration */}
//             <View style={styles.illustrationContainer}>
//               <Image 
//                 source={require('../../../assets/images/Header Image (1).png')} 
//                 style={styles.heroImage}
//                 resizeMode="contain"
//               />
//             </View>

//             {/* Step Status Chip */}
//             <View style={styles.stepBadgeContainer}>
//               <View style={styles.stepBadge}>
//                 <Text style={styles.stepBadgeText}>Step 2 of 3</Text>
//               </View>
//             </View>

//             {/* Heading Context */}
//             <Text style={styles.mainTitle}>
//               Create a <Text style={styles.titleAccent}>4-digit Pin</Text>
//             </Text>
//             <Text style={styles.subTitle}>
//               This pin protects your wallet and authorizes transactions
//             </Text>

//             {error ? <Text style={styles.errorCenter}>{error}</Text> : null}

//             <View style={styles.outerCenterContainer}>
              
//               {/* Create Pin Row */}
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.fieldLabel}>Create Pin</Text>
//                 <View style={styles.inputRowContainer}>
//                   <View style={styles.pinBoxesWrapper}>
//                     {renderPinBoxes(pin, !showPin)}
//                   </View>
                  
//                   <TouchableOpacity 
//                     style={styles.showButton} 
//                     onPress={() => setShowPin(!showPin)}
//                   >
//                     <Icon name={showPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
//                     <Text style={styles.showText}>{showPin ? 'Hide' : 'Show'}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.hiddenInput}
//                   value={pin}
//                   onChangeText={(text) => setPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
//                   keyboardType="number-pad"
//                   maxLength={4}
//                   autoFocus={true}
//                 />
//               </View>

//               {/* Confirm Pin Row */}
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.fieldLabel}>Confirm Pin</Text>
//                 <View style={styles.inputRowContainer}>
//                   <View style={styles.pinBoxesWrapper}>
//                     {renderPinBoxes(confirmPin, !showConfirmPin)}
//                   </View>

//                   <TouchableOpacity 
//                     style={styles.showButton} 
//                     onPress={() => setShowConfirmPin(!showConfirmPin)}
//                   >
//                     <Icon name={showConfirmPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
//                     <Text style={styles.showText}>{showConfirmPin ? 'Hide' : 'Show'}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.hiddenInput}
//                   value={confirmPin}
//                   onChangeText={(text) => setConfirmPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
//                   keyboardType="number-pad"
//                   maxLength={4}
//                 />
//               </View>

//             </View>

//             {/* Rules Card */}
//             <View style={styles.rulesCard}>
//               <Image 
//                 source={require('../../../assets/images/shield-check.png')} 
//                 style={styles.shieldIcon}
//                 resizeMode="contain" 
//               />
              
//               <View style={styles.contentContainer}>
//                 <Text style={styles.rulesCardTitle}>PIN must have</Text>
                
//                 <View style={styles.gridContainer}>
//                   <View style={styles.leftColumn}>
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, is4Digits && styles.ruleTextActive]}>4 digits</Text>
//                     </View>
                    
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotEasyToGuess && styles.ruleTextActive]}>Not easy to guess</Text>
//                     </View>
//                   </View>
                  
//                   <View style={styles.rightColumn}>
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotSequential && styles.ruleTextActive]}>Not sequential (e.g. 1234)</Text>
//                     </View>
                    
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotRepeated && styles.ruleTextActive]}>Not repeated (e.g. 1122)</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Continue CTA Button */}
//             <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//               <Text style={styles.continueButtonText}>Continue</Text>
//               <Icon name="arrow-right" size={moderateScale(16)} color="#FFF" style={styles.btnArrow} />
//             </TouchableOpacity>

//             {/* Secure Note Footer */}
//             <View style={styles.secureFooterContainer}>
//               <Icon name="lock" size={moderateScale(13)} color="#8B5CF6" />
//               <Text style={styles.secureFooterText}>Your PIN is Encrypted and stored securely.</Text>
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
//     paddingHorizontal: wp('5%'),
//     paddingBottom: hp('3%'),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: hp('4%'),
//     marginBottom: hp('1.5%'),
//   },
//   backButtonCircle: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     borderRadius: moderateScale(18),
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoImage: {
//     width: wp('28%'),
//     height: hp('5%'),
//   },
//   illustrationContainer: {
//     width: wp('90%'),
//     height: hp('24%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: hp('1%'),
//     alignSelf: 'center',
//   },
//   heroImage: {
//     width: '85%',
//     height: '100%',
//   },
//   stepBadgeContainer: {
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   stepBadge: {
//     backgroundColor: '#EEF2FF',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('0.5%'),
//     borderRadius: moderateScale(16),
//   },
//   stepBadgeText: {
//     color: '#3B82F6',
//     fontWeight: '700',
//     fontSize: moderateScale(11),
//   },
//   mainTitle: {
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: '500',
//     color: '#111827',
//   },
//   titleAccent: {
//     color: '#285CE0',
//   },
//   subTitle: {
//     textAlign: 'center',
//     color: '#6B7280',
//     fontSize: moderateScale(12.5),
//     marginTop: hp('0.8%'),
//     marginBottom: hp('2.5%'),
//     paddingHorizontal: wp('6%'),
//     lineHeight: moderateScale(18),
//   },
//   outerCenterContainer: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   sectionContainer: {
//     marginBottom: hp('3.5%'),
//     width: wp('70%'),
//   },
//   fieldLabel: {
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: hp('1.2%'),
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   inputRowContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   pinBoxesWrapper: {
//     flexDirection: 'row',
//     gap: wp('3%'),
//   },
//   pinBox: {
//     width: wp('11.5%'),
//     height: wp('11.5%'),
//     borderWidth: 1.5,
//     borderColor: '#3B82F6',
//     borderRadius: moderateScale(8),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   pinBoxFilled: {
//     borderColor: '#2563EB',
//   },
//   filledBlueDot: {
//     width: moderateScale(9),
//     height: moderateScale(9),
//     borderRadius: moderateScale(4.5),
//     backgroundColor: '#2563EB',
//   },
//   pinText: {
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#2563EB',
//   },
//   showButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: wp('12%'),
//   },
//   showText: {
//     fontSize: moderateScale(9),
//     color: '#2563EB',
//     marginTop: hp('0.3%'),
//     fontWeight: '500',
//   },
//   hiddenInput: {
//     position: 'absolute',
//     opacity: 0,
//   },
//   rulesCard: {
//     backgroundColor: '#F4F3FF',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     marginTop: hp('2.5%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   shieldIcon: {
//     width: moderateScale(42),
//     height: moderateScale(42),
//     marginRight: wp('2%'),
//     marginLeft: wp('-1%'),
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   rulesCardTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: hp('0.8%'),
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   leftColumn: {
//     width: '38%',
//   },
//   rightColumn: {
//     width: '60%',
//   },
//   gridItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('0.8%'),
//   },
//   checkIcon: {
//     width: moderateScale(16),  
//     height: moderateScale(16),
//   },
//   ruleText: {
//     fontSize: moderateScale(10),
//     color: '#9CA3AF',
//     marginLeft: wp('1.5%'),      
//     fontWeight: '500',
//     flex: 1,
//   },
//   ruleTextActive: {
//     color: '#374151',
//   },
//   continueButton: {
//     flexDirection: 'row',
//     backgroundColor: '#5145E5',
//     height: hp('6.2%'),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp('3%'),
//     position: 'relative',
//     marginHorizontal: wp('2%'),
//   },
//   continueButtonText: {
//     color: '#FFF',
//     fontWeight: '700',
//     fontSize: moderateScale(15),
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: wp('5%'),
//   },
//   errorCenter: {
//     color: '#EF4444',
//     textAlign: 'center',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(12),
//   },
//   secureFooterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp('2%'),
//   },
//   secureFooterText: {
//     fontSize: moderateScale(10.5),
//     color: '#6B7280',
//     marginLeft: wp('1.5%'),
//     fontWeight: '500',
//   },
// });


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   StatusBar,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   TextInput,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';
// import { useRoute } from "@react-navigation/native";

// export default function TransactionPinScreen({ navigation }) {
//   const route = useRoute();
//   const { amount, name, address, sender, senderData } = route.params || {};

//   const [pin, setPin] = useState('');
//   const [confirmPin, setConfirmPin] = useState('');
//   const [showPin, setShowPin] = useState(false);
//   const [showConfirmPin, setShowConfirmPin] = useState(false);
//   const [error, setError] = useState('');

//   // Fixed Validation Checkers to strictly check 4-digit rules instead of 6
//   const is4Digits = pin?.length === 4;
//   const isNotSequential = pin.length > 0 && !/^(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/.test(pin);
//   const isNotRepeated = pin.length > 0 && !/^(.)\1{3}$/.test(pin) && !/(.)\1{1}(.)\2{1}/.test(pin); 
//   const isNotEasyToGuess = pin.length > 0 && !/^(1212|2525|1020|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/.test(pin);

//   const handleContinue = async () => {
//     setError('');
    
//     if (pin.length !== 4 || confirmPin.length !== 4) {
//       setError('Both PIN fields must be 4 digits');
//       return;
//     }
//     if (pin !== confirmPin) {
//       setError('PINs do not match');
//       return;
//     }
//     if (!isNotSequential || !isNotRepeated || !isNotEasyToGuess) {
//       setError('PIN does not follow security rules');
//       return;
//     }

//     try {
//       const response = await api.post('/api/auth/set-pin', { pin });

//       if (response?.data?.message) {
//         Alert.alert(
//           'Success',
//           'Your Transaction PIN has been created successfully.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 if (sender) {
//                   navigation.navigate('SendPin', { amount, name, address, sender });
//                 } else {
//                   navigation.navigate('SendPin', { amount, name, address, senderData });
//                 }
//               },
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (err) {
//       Alert.alert(
//         'Error',
//         err?.response?.data?.message || 'Something went wrong'
//       );
//     }
//   };

//   const renderPinBoxes = (value, isMasked) => {
//     return Array(4).fill(0).map((_, index) => {
//       const char = value[index];
//       return (
//         <View key={index} style={[styles.pinBox, char ? styles.pinBoxFilled : null]}>
//           {char ? (
//             isMasked ? (
//               <View style={styles.filledBlueDot} />
//             ) : (
//               <Text style={styles.pinText}>{char}</Text>
//             )
//           ) : null}
//         </View>
//       );
//     });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

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
//             {/* Top Navigation Bar */}
//             <View style={styles.header}>
//               <TouchableOpacity 
//                 style={styles.backButtonCircle} 
//                 onPress={() => navigation.goBack()}
//               >
//                 <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//               </TouchableOpacity>

//               <View style={styles.logoContainer}>
//                 <Image 
//                   source={require('../../../assets/images/LogoContainer.png')} 
//                   style={styles.logoImage}
//                   resizeMode="contain"
//                 />
//               </View>
//               <View style={{ width: moderateScale(36) }} />
//             </View>

//             {/* Top Security Banner Illustration */}
//             <View style={styles.illustrationContainer}>
//               <Image 
//                 source={require('../../../assets/images/Header Image (1).png')} 
//                 style={styles.heroImage}
//                 resizeMode="contain"
//               />
//             </View>

//             {/* Step Status Chip */}
//             <View style={styles.stepBadgeContainer}>
//               <View style={styles.stepBadge}>
//                 <Text style={styles.stepBadgeText}>Step 2 of 3</Text>
//               </View>
//             </View>

//             {/* Heading Context */}
//             <Text style={styles.mainTitle}>
//               Create a <Text style={styles.titleAccent}>4-digit Pin</Text>
//             </Text>
//             <Text style={styles.subTitle}>
//               This pin protects your wallet and authorizes transactions
//             </Text>

//             {error ? <Text style={styles.errorCenter}>{error}</Text> : null}

//             <View style={styles.outerCenterContainer}>
              
//               {/* Create Pin Row */}
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.fieldLabel}>Create Pin</Text>
//                 <View style={styles.inputRowContainer}>
//                   <View style={styles.pinBoxesWrapper}>
//                     {renderPinBoxes(pin, !showPin)}
//                   </View>
                  
//                   <TouchableOpacity 
//                     style={styles.showButton} 
//                     onPress={() => setShowPin(!showPin)}
//                   >
//                     <Icon name={showPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
//                     <Text style={styles.showText}>{showPin ? 'Hide' : 'Show'}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.hiddenInput}
//                   value={pin}
//                   onChangeText={(text) => setPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
//                   keyboardType="number-pad"
//                   maxLength={4}
//                   autoFocus={true}
//                 />
//               </View>

//               {/* Confirm Pin Row */}
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.fieldLabel}>Confirm Pin</Text>
//                 <View style={styles.inputRowContainer}>
//                   <View style={styles.pinBoxesWrapper}>
//                     {renderPinBoxes(confirmPin, !showConfirmPin)}
//                   </View>

//                   <TouchableOpacity 
//                     style={styles.showButton} 
//                     onPress={() => setShowConfirmPin(!showConfirmPin)}
//                   >
//                     <Icon name={showConfirmPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
//                     <Text style={styles.showText}>{showConfirmPin ? 'Hide' : 'Show'}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.hiddenInput}
//                   value={confirmPin}
//                   onChangeText={(text) => setConfirmPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
//                   keyboardType="number-pad"
//                   maxLength={4}
//                 />
//               </View>

//             </View>

//             {/* Rules Card */}
//             <View style={styles.rulesCard}>
//               <Image 
//                 source={require('../../../assets/images/shield-check.png')} 
//                 style={styles.shieldIcon}
//                 resizeMode="contain" 
//               />
              
//               <View style={styles.contentContainer}>
//                 <Text style={styles.rulesCardTitle}>PIN must have</Text>
                
//                 <View style={styles.gridContainer}>
//                   <View style={styles.leftColumn}>
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, is4Digits && styles.ruleTextActive]}>4 digits</Text>
//                     </View>
                    
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotEasyToGuess && styles.ruleTextActive]}>Not easy to guess</Text>
//                     </View>
//                   </View>
                  
//                   <View style={styles.rightColumn}>
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotSequential && styles.ruleTextActive]}>Not sequential (e.g. 1234)</Text>
//                     </View>
                    
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotRepeated && styles.ruleTextActive]}>Not repeated (e.g. 1122)</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Continue CTA Button */}
//             <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//               <Text style={styles.continueButtonText}>Continue</Text>
//               <Icon name="arrow-right" size={moderateScale(16)} color="#FFF" style={styles.btnArrow} />
//             </TouchableOpacity>

//             {/* Secure Note Footer */}
//             <View style={styles.secureFooterContainer}>
//               <Icon name="lock" size={moderateScale(13)} color="#8B5CF6" />
//               <Text style={styles.secureFooterText}>Your PIN is Encrypted and stored securely.</Text>
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
//     paddingHorizontal: wp('5%'),
//     paddingBottom: hp('3%'),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: hp('4%'),
//     marginBottom: hp('1.5%'),
//   },
//   backButtonCircle: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     borderRadius: moderateScale(18),
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoImage: {
//     width: wp('28%'),
//     height: hp('5%'),
//   },
//   illustrationContainer: {
//     width: wp('90%'),
//     height: hp('24%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: hp('1%'),
//     alignSelf: 'center',
//   },
//   heroImage: {
//     width: '85%',
//     height: '100%',
//   },
//   stepBadgeContainer: {
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   stepBadge: {
//     backgroundColor: '#EEF2FF',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('0.5%'),
//     borderRadius: moderateScale(16),
//   },
//   stepBadgeText: {
//     color: '#3B82F6',
//     fontWeight: '700',
//     fontSize: moderateScale(11),
//   },
//   mainTitle: {
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: '500',
//     color: '#111827',
//   },
//   titleAccent: {
//     color: '#285CE0',
//   },
//   subTitle: {
//     textAlign: 'center',
//     color: '#6B7280',
//     fontSize: moderateScale(12.5),
//     marginTop: hp('0.8%'),
//     marginBottom: hp('2.5%'),
//     paddingHorizontal: wp('6%'),
//     lineHeight: moderateScale(18),
//   },
//   outerCenterContainer: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   sectionContainer: {
//     marginBottom: hp('3.5%'),
//     width: wp('70%'),
//   },
//   fieldLabel: {
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: hp('1.2%'),
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   inputRowContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   pinBoxesWrapper: {
//     flexDirection: 'row',
//     gap: wp('3%'),
//   },
//   pinBox: {
//     width: wp('11.5%'),
//     height: wp('11.5%'),
//     borderWidth: 1.5,
//     borderColor: '#3B82F6',
//     borderRadius: moderateScale(8),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   pinBoxFilled: {
//     borderColor: '#2563EB',
//   },
//   filledBlueDot: {
//     width: moderateScale(9),
//     height: moderateScale(9),
//     borderRadius: moderateScale(4.5),
//     backgroundColor: '#2563EB',
//   },
//   pinText: {
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#2563EB',
//   },
//   showButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: wp('12%'),
//   },
//   showText: {
//     fontSize: moderateScale(9),
//     color: '#2563EB',
//     marginTop: hp('0.3%'),
//     fontWeight: '500',
//   },
//   hiddenInput: {
//     position: 'absolute',
//     opacity: 0,
//   },
//   rulesCard: {
//     backgroundColor: '#F4F3FF',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     marginTop: hp('2.5%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   shieldIcon: {
//     width: moderateScale(42),
//     height: moderateScale(42),
//     marginRight: wp('2%'),
//     marginLeft: wp('-1%'),
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   rulesCardTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: hp('0.8%'),
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   leftColumn: {
//     width: '38%',
//   },
//   rightColumn: {
//     width: '60%',
//   },
//   gridItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('0.8%'),
//   },
//   checkIcon: {
//     width: moderateScale(16),  
//     height: moderateScale(16),
//   },
//   ruleText: {
//     fontSize: moderateScale(10),
//     color: '#9CA3AF',
//     marginLeft: wp('1.5%'),      
//     fontWeight: '500',
//     flex: 1,
//   },
//   ruleTextActive: {
//     color: '#374151',
//   },
//   continueButton: {
//     flexDirection: 'row',
//     backgroundColor: '#5145E5',
//     height: hp('6.2%'),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp('3%'),
//     position: 'relative',
//     marginHorizontal: wp('2%'),
//   },
//   continueButtonText: {
//     color: '#FFF',
//     fontWeight: '700',
//     fontSize: moderateScale(15),
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: wp('5%'),
//   },
//   errorCenter: {
//     color: '#EF4444',
//     textAlign: 'center',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(12),
//   },
//   secureFooterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp('2%'),
//   },
//   secureFooterText: {
//     fontSize: moderateScale(10.5),
//     color: '#6B7280',
//     marginLeft: wp('1.5%'),
//     fontWeight: '500',
//   },
// });


import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
import { useRoute } from "@react-navigation/native";
import { verticalScale } from '../../utils/responsive'; 

export default function TransactionPinScreen({ navigation }) {
  const route = useRoute();
  const { amount, name, address, sender, senderData } = route.params || {};

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [error, setError] = useState('');

  const pinInputRef = useRef(null);
  const confirmPinInputRef = useRef(null);

  // --- VALIDATION LOGIC ---
  const is4Digits = pin?.length === 4;
  
  // Success States
  const isNotSequential = pin.length > 0 && !/^(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/.test(pin);
  const isNotRepeated = pin.length > 0 && !/^(.)\1{3}$/.test(pin) && !/(.)\1{1}(.)\2{1}/.test(pin); 
  const isNotEasyToGuess = pin.length > 0 && !/^(1212|2525|1020|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/.test(pin);

  // Error States
  const isSequentialError = pin.length === 4 && /^(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/.test(pin);
  const isRepeatedError = pin.length === 4 && (/^(.)\1{3}$/.test(pin) || /(.)\1{1}(.)\2{1}/.test(pin)); 
  const isEasyToGuessError = pin.length === 4 && /^(1212|2525|1020|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/.test(pin);

  // 🚨 ADDED: Overall Form Validity Check
  const isFormValid = 
    pin.length === 4 && 
    confirmPin.length === 4 && 
    pin === confirmPin && 
    isNotSequential && 
    isNotRepeated && 
    isNotEasyToGuess;


  const handleContinue = async () => {
    navigation.navigate('WelcomeProfile');
    // ... API Logic ...
  };

  const renderPinBoxes = (value, isMasked) => {
    return Array(4).fill(0).map((_, index) => {
      const char = value[index];
      return (
        <View key={index} style={[styles.pinBox, char ? styles.pinBoxFilled : null]}>
          {char ? (
            isMasked ? (
              <View style={styles.filledBlueDot} />
            ) : (
              <Text style={styles.pinText}>{char}</Text>
            )
          ) : null}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButtonCircle} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
        </TouchableOpacity>

        <Image 
          source={require('../../../assets/images/LogoContainer.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

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
            <View style={styles.illustrationContainer}>
              <Image 
                source={require('../../../assets/images/Header Image (1).png')} 
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.stepBadgeContainer}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>Step 2 of 3</Text>
              </View>
            </View>

            <Text style={styles.mainTitle}>
              Create a <Text style={styles.titleAccent}>4-digit Pin</Text>
            </Text>
            <Text style={styles.subTitle}>
              This pin protects your wallet and authorizes transactions
            </Text>

            {/* Error Message for Mismatched PINs */}
            {pin.length === 4 && confirmPin.length === 4 && pin !== confirmPin ? (
              <Text style={styles.errorCenter}>PINs do not match</Text>
            ) : null}

            {error ? <Text style={styles.errorCenter}>{error}</Text> : null}

            <View style={styles.outerCenterContainer}>
              
              {/* Create Pin Row */}
              <View style={styles.sectionContainer}>
                <Text style={styles.fieldLabel}>Create Pin</Text>
                <View style={styles.inputRowContainer}>
                  
                  <TouchableOpacity 
                    style={styles.pinBoxesWrapper}
                    activeOpacity={1}
                    onPress={() => pinInputRef.current?.focus()}
                  >
                    {renderPinBoxes(pin, !showPin)}
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.showButton} 
                    onPress={() => setShowPin(!showPin)}
                  >
                    <Icon name={showPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
                    <Text style={styles.showText}>{showPin ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  ref={pinInputRef} 
                  style={styles.hiddenInput}
                  value={pin}
                  onChangeText={(text) => setPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
                  keyboardType="number-pad"
                  maxLength={4}
                  autoFocus={true}
                  caretHidden={true}
                />
              </View>

              {/* Confirm Pin Row */}
              <View style={styles.sectionContainer}>
                <Text style={styles.fieldLabel}>Confirm Pin</Text>
                <View style={styles.inputRowContainer}>
                  
                  <TouchableOpacity 
                    style={styles.pinBoxesWrapper}
                    activeOpacity={1}
                    onPress={() => confirmPinInputRef.current?.focus()}
                  >
                    {renderPinBoxes(confirmPin, !showConfirmPin)}
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.showButton} 
                    onPress={() => setShowConfirmPin(!showConfirmPin)}
                  >
                    <Icon name={showConfirmPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
                    <Text style={styles.showText}>{showConfirmPin ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  ref={confirmPinInputRef}
                  style={styles.hiddenInput}
                  value={confirmPin}
                  onChangeText={(text) => setConfirmPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
                  keyboardType="number-pad"
                  maxLength={4}
                  caretHidden={true}
                />
              </View>

            </View>

            {/* Rules Card */}
            <View style={styles.rulesCard}>
              <Image 
                source={require('../../../assets/images/shield-check.png')} 
                style={styles.shieldIcon}
                resizeMode="contain" 
              />
              
              <View style={styles.contentContainer}>
                <Text style={styles.rulesCardTitle}>PIN must have</Text>
                
                <View style={styles.gridContainer}>
                  <View style={styles.leftColumn}>
                    {/* Rule 1 */}
                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={styles.checkIcon} 
                        resizeMode="contain"
                      />
                      <Text style={[styles.ruleText, is4Digits && styles.ruleTextActive]}>4 digits</Text>
                    </View>
                    
                    {/* Rule 2 */}
                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={[styles.checkIcon, isEasyToGuessError && { tintColor: '#EF4444' }]} 
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.ruleText, 
                        isNotEasyToGuess && styles.ruleTextActive,
                        isEasyToGuessError && styles.ruleTextError
                      ]}>Not easy to guess</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rightColumn}>
                    {/* Rule 3 */}
                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={[styles.checkIcon, isSequentialError && { tintColor: '#EF4444' }]} 
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.ruleText, 
                        isNotSequential && styles.ruleTextActive,
                        isSequentialError && styles.ruleTextError
                      ]}>Not sequential (e.g. 1234)</Text>
                    </View>
                    
                    {/* Rule 4 */}
                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={[styles.checkIcon, isRepeatedError && { tintColor: '#EF4444' }]} 
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.ruleText, 
                        isNotRepeated && styles.ruleTextActive,
                        isRepeatedError && styles.ruleTextError
                      ]}>Not repeated (e.g. 1122)</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* 🚨 ADDED: Disabled condition and style */}
            <TouchableOpacity 
              style={[
                styles.continueButton, 
                !isFormValid && styles.continueButtonDisabled 
              ]} 
              onPress={handleContinue}
              disabled={!isFormValid}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
              <Icon name="arrow-right" size={moderateScale(16)} color="#FFF" style={styles.btnArrow} />
            </TouchableOpacity>

            <View style={styles.secureFooterContainer}>
               <Image 
                  source={require('../../../assets/images/secure.png')} 
                  style={styles.checkIcon} 
                  resizeMode="contain"
                />
              <Text style={styles.secureFooterText}>Your PIN is Encrypted and stored securely.</Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { paddingHorizontal: wp('5%'), paddingBottom: hp('3%') },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(100),
    width: '100%',
    position: 'relative',
  },
  backButtonCircle: {
    position: 'absolute',
    left: moderateScale(24),
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
  logoImage: { width: moderateScale(116), height: moderateScale(39), resizeMode: 'contain' },
  illustrationContainer: {
    width: wp('90%'),
    height: hp('24%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
    alignSelf: 'center',
  },
  heroImage: { width: '85%', height: '100%' },
  stepBadgeContainer: { alignItems: 'center', marginBottom: hp('2%') },
  stepBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.5%'),
    borderRadius: moderateScale(16),
  },
  stepBadgeText: { color: '#3B82F6', fontWeight: '700', fontSize: moderateScale(11) },
  mainTitle: { textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: '#111827' },
  titleAccent: { color: '#285CE0' },
  subTitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: moderateScale(12.5),
    marginTop: hp('0.8%'),
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('6%'),
    lineHeight: moderateScale(18),
  },
  outerCenterContainer: { alignItems: 'center', width: '100%' },
  sectionContainer: { marginBottom: hp('3.5%'), width: wp('70%') },
  fieldLabel: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#000000',
    marginBottom: hp('1.2%'),
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  inputRowContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pinBoxesWrapper: { flexDirection: 'row', gap: wp('3%') },
  pinBox: {
    width: wp('11.5%'),
    height: wp('11.5%'),
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  pinBoxFilled: { borderColor: '#2563EB' },
  filledBlueDot: {
    width: moderateScale(9),
    height: moderateScale(9),
    borderRadius: moderateScale(4.5),
    backgroundColor: '#2563EB',
  },
  pinText: { fontSize: moderateScale(15), fontWeight: '600', color: '#2563EB' },
  showButton: { alignItems: 'center', justifyContent: 'center', width: wp('12%') },
  showText: { fontSize: moderateScale(9), color: '#2563EB', marginTop: hp('0.3%'), fontWeight: '500' },
  hiddenInput: { position: 'absolute', opacity: 0, width: 0, height: 0 },
  rulesCard: {
    backgroundColor: '#F4F3FF',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: hp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: { width: moderateScale(42), height: moderateScale(42), marginRight: wp('2%'), marginLeft: wp('-1%') },
  contentContainer: { flex: 1 },
  rulesCardTitle: { fontSize: moderateScale(14), fontWeight: '700', color: '#374151', marginBottom: hp('0.8%') },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  leftColumn: { width: '38%' },
  rightColumn: { width: '60%' },
  gridItem: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('0.8%') },
  checkIcon: { width: moderateScale(16), height: moderateScale(16) },
  ruleText: {
    fontSize: moderateScale(10),
    color: '#9CA3AF',
    marginLeft: wp('1.5%'),      
    fontWeight: '500',
    flex: 1,
  },
  ruleTextActive: { color: '#374151' },
  ruleTextError: { color: '#EF4444' }, 
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#5145E5',
    height: hp('6.2%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    position: 'relative',
    marginHorizontal: wp('2%'),
  },
  // 🚨 ADDED: Disabled Button Style
  continueButtonDisabled: {
    backgroundColor: '#A5B4FC',
    opacity: 0.6,
  },
  continueButtonText: { color: '#FFF', fontWeight: '700', fontSize: moderateScale(15) },
  btnArrow: { position: 'absolute', right: wp('5%') },
  errorCenter: { color: '#EF4444', textAlign: 'center', marginBottom: hp('1%'), fontSize: moderateScale(12) },
  secureFooterContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp('2%') },
  secureFooterText: { fontSize: moderateScale(10.5), color: '#6B7280', marginLeft: wp('1.5%'), fontWeight: '500' },
});
// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   StatusBar,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   TextInput,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';
// import { useRoute } from "@react-navigation/native";
// import { verticalScale } from '../../utils/responsive'; // Added for exact height matching

// export default function TransactionPinScreen({ navigation }) {
//   const route = useRoute();
//   const { amount, name, address, sender, senderData } = route.params || {};

//   const [pin, setPin] = useState('');
//   const [confirmPin, setConfirmPin] = useState('');
//   const [showPin, setShowPin] = useState(false);
//   const [showConfirmPin, setShowConfirmPin] = useState(false);
//   const [error, setError] = useState('');

//   // 🚨 ADDED REFS: These allow us to programmatically open the keyboard when the user taps the boxes
//   const pinInputRef = useRef(null);
//   const confirmPinInputRef = useRef(null);

//   const is4Digits = pin?.length === 4;
//   const isNotSequential = pin.length > 0 && !/^(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/.test(pin);
//   const isNotRepeated = pin.length > 0 && !/^(.)\1{3}$/.test(pin) && !/(.)\1{1}(.)\2{1}/.test(pin); 
//   const isNotEasyToGuess = pin.length > 0 && !/^(1212|2525|1020|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/.test(pin);

//   const handleContinue = async () => {
//     navigation.navigate('WelcomeProfile');
//     // ... API Logic (Restored later) ...

//     //////////////////////////////////////////////////////
//     //  navigation.navigate('WelcomeProfile')
//     // setError('');
    
//     // if (pin.length !== 4 || confirmPin.length !== 4) {
//     //   setError('Both PIN fields must be 4 digits');
//     //   return;
//     // }
//     // if (pin !== confirmPin) {
//     //   setError('PINs do not match');
//     //   return;
//     // }
//     // if (!isNotSequential || !isNotRepeated || !isNotEasyToGuess) {
//     //   setError('PIN does not follow security rules');
//     //   return;
//     // }

//     // try {
//     //   const response = await api.post('/api/auth/set-pin', { pin });

//     //   if (response?.data?.message) {
//     //     Alert.alert(
//     //       'Success',
//     //       'Your Transaction PIN has been created successfully.',
//     //       [
//     //         {
//     //           text: 'OK',
//     //           onPress: () => {
//     //             if (sender) {
//     //               navigation.navigate('SendPin', { amount, name, address, sender });
//     //             } else {
//     //               navigation.navigate('SendPin', { amount, name, address, senderData });
//     //             }
//     //           },
//     //         },
//     //       ],
//     //       { cancelable: false }
//     //     );
//     //   }
//     // } catch (err) {
//     //   Alert.alert(
//     //     'Error',
//     //     err?.response?.data?.message || 'Something went wrong'
//     //   );
//   };

//   const renderPinBoxes = (value, isMasked) => {
//     return Array(4).fill(0).map((_, index) => {
//       const char = value[index];
//       return (
//         <View key={index} style={[styles.pinBox, char ? styles.pinBoxFilled : null]}>
//           {char ? (
//             isMasked ? (
//               <View style={styles.filledBlueDot} />
//             ) : (
//               <Text style={styles.pinText}>{char}</Text>
//             )
//           ) : null}
//         </View>
//       );
//     });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

//       {/* Top Navigation Bar: Updated to match RegisterMobileScreen alignments */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButtonCircle} 
//           onPress={() => navigation.goBack()}
//         >
//           <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//         </TouchableOpacity>

//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logoImage}
//           resizeMode="contain"
//         />
//       </View>

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
//             {/* Top Security Banner Illustration */}
//             <View style={styles.illustrationContainer}>
//               <Image 
//                 source={require('../../../assets/images/Header Image (1).png')} 
//                 style={styles.heroImage}
//                 resizeMode="contain"
//               />
//             </View>

//             {/* Step Status Chip */}
//             <View style={styles.stepBadgeContainer}>
//               <View style={styles.stepBadge}>
//                 <Text style={styles.stepBadgeText}>Step 2 of 3</Text>
//               </View>
//             </View>

//             {/* Heading Context */}
//             <Text style={styles.mainTitle}>
//               Create a <Text style={styles.titleAccent}>4-digit Pin</Text>
//             </Text>
//             <Text style={styles.subTitle}>
//               This pin protects your wallet and authorizes transactions
//             </Text>

//             {error ? <Text style={styles.errorCenter}>{error}</Text> : null}

//             <View style={styles.outerCenterContainer}>
              
//               {/* Create Pin Row */}
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.fieldLabel}>Create Pin</Text>
//                 <View style={styles.inputRowContainer}>
                  
//                   {/* 🚨 FIX: Wrapped the visual boxes in a TouchableOpacity to reopen the keyboard */}
//                   <TouchableOpacity 
//                     style={styles.pinBoxesWrapper}
//                     activeOpacity={1}
//                     onPress={() => pinInputRef.current?.focus()}
//                   >
//                     {renderPinBoxes(pin, !showPin)}
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity 
//                     style={styles.showButton} 
//                     onPress={() => setShowPin(!showPin)}
//                   >
//                     <Icon name={showPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
//                     <Text style={styles.showText}>{showPin ? 'Hide' : 'Show'}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   ref={pinInputRef} // 🚨 ADDED REF
//                   style={styles.hiddenInput}
//                   value={pin}
//                   onChangeText={(text) => setPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
//                   keyboardType="number-pad"
//                   maxLength={4}
//                   autoFocus={true}
//                   caretHidden={true}
//                 />
//               </View>

//               {/* Confirm Pin Row */}
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.fieldLabel}>Confirm Pin</Text>
//                 <View style={styles.inputRowContainer}>
                  
//                   {/* 🚨 FIX: Wrapped the visual boxes in a TouchableOpacity to reopen the keyboard */}
//                   <TouchableOpacity 
//                     style={styles.pinBoxesWrapper}
//                     activeOpacity={1}
//                     onPress={() => confirmPinInputRef.current?.focus()}
//                   >
//                     {renderPinBoxes(confirmPin, !showConfirmPin)}
//                   </TouchableOpacity>

//                   <TouchableOpacity 
//                     style={styles.showButton} 
//                     onPress={() => setShowConfirmPin(!showConfirmPin)}
//                   >
//                     <Icon name={showConfirmPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
//                     <Text style={styles.showText}>{showConfirmPin ? 'Hide' : 'Show'}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   ref={confirmPinInputRef} // 🚨 ADDED REF
//                   style={styles.hiddenInput}
//                   value={confirmPin}
//                   onChangeText={(text) => setConfirmPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
//                   keyboardType="number-pad"
//                   maxLength={4}
//                   caretHidden={true}
//                 />
//               </View>

//             </View>

//             {/* Rules Card */}
//             <View style={styles.rulesCard}>
//               <Image 
//                 source={require('../../../assets/images/shield-check.png')} 
//                 style={styles.shieldIcon}
//                 resizeMode="contain" 
//               />
              
//               <View style={styles.contentContainer}>
//                 <Text style={styles.rulesCardTitle}>PIN must have</Text>
                
//                 <View style={styles.gridContainer}>
//                   <View style={styles.leftColumn}>
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, is4Digits && styles.ruleTextActive]}>4 digits</Text>
//                     </View>
                    
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotEasyToGuess && styles.ruleTextActive]}>Not easy to guess</Text>
//                     </View>
//                   </View>
                  
//                   <View style={styles.rightColumn}>
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotSequential && styles.ruleTextActive]}>Not sequential (e.g. 1234)</Text>
//                     </View>
                    
//                     <View style={styles.gridItem}>
//                       <Image 
//                         source={require('../../../assets/images/Status Icon Container.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//                       <Text style={[styles.ruleText, isNotRepeated && styles.ruleTextActive]}>Not repeated (e.g. 1122)</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Continue CTA Button */}
//             <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//               <Text style={styles.continueButtonText}>Continue</Text>
//               <Icon name="arrow-right" size={moderateScale(16)} color="#FFF" style={styles.btnArrow} />
//             </TouchableOpacity>

//             {/* Secure Note Footer */}
//             <View style={styles.secureFooterContainer}>
//                <Image 
//                         source={require('../../../assets/images/secure.png')} 
//                         style={styles.checkIcon} 
//                         resizeMode="contain"
//                       />
//               <Text style={styles.secureFooterText}>Your PIN is Encrypted and stored securely.</Text>
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
//     paddingHorizontal: wp('5%'),
//     paddingBottom: hp('3%'),
//   },
//   // --- Updated Header Styles ---
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: verticalScale(100),
//     width: '100%',
//     position: 'relative',
//   },
//   backButtonCircle: {
//     position: 'absolute',
//     left: moderateScale(24),
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
//   logoImage: {
//     width: moderateScale(116),
//     height: moderateScale(39),
//     resizeMode: 'contain',
//   },
//   // -----------------------------
//   illustrationContainer: {
//     width: wp('90%'),
//     height: hp('24%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: hp('1%'),
//     alignSelf: 'center',
//   },
//   heroImage: {
//     width: '85%',
//     height: '100%',
//   },
//   stepBadgeContainer: {
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   stepBadge: {
//     backgroundColor: '#EEF2FF',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('0.5%'),
//     borderRadius: moderateScale(16),
//   },
//   stepBadgeText: {
//     color: '#3B82F6',
//     fontWeight: '700',
//     fontSize: moderateScale(11),
//   },
//   mainTitle: {
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: '500',
//     color: '#111827',
//   },
//   titleAccent: {
//     color: '#285CE0',
//   },
//   subTitle: {
//     textAlign: 'center',
//     color: '#6B7280',
//     fontSize: moderateScale(12.5),
//     marginTop: hp('0.8%'),
//     marginBottom: hp('2.5%'),
//     paddingHorizontal: wp('6%'),
//     lineHeight: moderateScale(18),
//   },
//   outerCenterContainer: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   sectionContainer: {
//     marginBottom: hp('3.5%'),
//     width: wp('70%'),
//   },
//   fieldLabel: {
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: hp('1.2%'),
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   inputRowContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   pinBoxesWrapper: {
//     flexDirection: 'row',
//     gap: wp('3%'),
//   },
//   pinBox: {
//     width: wp('11.5%'),
//     height: wp('11.5%'),
//     borderWidth: 1.5,
//     borderColor: '#3B82F6',
//     borderRadius: moderateScale(8),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   pinBoxFilled: {
//     borderColor: '#2563EB',
//   },
//   filledBlueDot: {
//     width: moderateScale(9),
//     height: moderateScale(9),
//     borderRadius: moderateScale(4.5),
//     backgroundColor: '#2563EB',
//   },
//   pinText: {
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#2563EB',
//   },
//   showButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: wp('12%'),
//   },
//   showText: {
//     fontSize: moderateScale(9),
//     color: '#2563EB',
//     marginTop: hp('0.3%'),
//     fontWeight: '500',
//   },
//   hiddenInput: {
//     position: 'absolute',
//     opacity: 0,
//     width: 0,
//     height: 0,
//   },
//   rulesCard: {
//     backgroundColor: '#F4F3FF',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     marginTop: hp('2.5%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   shieldIcon: {
//     width: moderateScale(42),
//     height: moderateScale(42),
//     marginRight: wp('2%'),
//     marginLeft: wp('-1%'),
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   rulesCardTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: hp('0.8%'),
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   leftColumn: {
//     width: '38%',
//   },
//   rightColumn: {
//     width: '60%',
//   },
//   gridItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('0.8%'),
//   },
//   checkIcon: {
//     width: moderateScale(16),  
//     height: moderateScale(16),
//   },
//   ruleText: {
//     fontSize: moderateScale(10),
//     color: '#9CA3AF',
//     marginLeft: wp('1.5%'),      
//     fontWeight: '500',
//     flex: 1,
//   },
//   ruleTextActive: {
//     color: '#374151',
//   },
//   continueButton: {
//     flexDirection: 'row',
//     backgroundColor: '#5145E5',
//     height: hp('6.2%'),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp('3%'),
//     position: 'relative',
//     marginHorizontal: wp('2%'),
//   },
//   continueButtonText: {
//     color: '#FFF',
//     fontWeight: '700',
//     fontSize: moderateScale(15),
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: wp('5%'),
//   },
//   errorCenter: {
//     color: '#EF4444',
//     textAlign: 'center',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(12),
//   },
//   secureFooterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp('2%'),
//   },
//   secureFooterText: {
//     fontSize: moderateScale(10.5),
//     color: '#6B7280',
//     marginLeft: wp('1.5%'),
//     fontWeight: '500',
//   },
// });

