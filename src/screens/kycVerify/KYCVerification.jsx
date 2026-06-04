// import React, { useState } from 'react';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Alert,
//   TextInput,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';

// import styles from '../kycVerify/KYCVerificationStyles';

// import {
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';

// import { pick } from '@react-native-documents/picker';
// import { Dropdown } from 'react-native-element-dropdown';
// import api, { getToken } from '../../api/axios';
// import axios from 'axios';
// import RNFS from 'react-native-fs';

// // Import your API instance
// // Update with your actual API import path

// export default function KYCVerification({
//   navigation,
// }) {
//   const [activeTab, setActiveTab] = useState('aadhaar');
//   const [otherIdType, setOtherIdType] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [aadhaarFile, setAadhaarFile] = useState(null);
//   const [panFile, setPanFile] = useState(null);
//   const [otherIdFile, setOtherIdFile] = useState(null);
//   const [faceFile, setFaceFile] = useState(null);

//   const otherIdOptions = [
//     { label: 'Driving License', value: 'Driving License' },
//     { label: 'Voter ID', value: 'Voter ID' },
//     { label: 'Passport', value: 'Passport' },
//   ];

//   // =========================
//   // Upload Alert
//   // =========================

//   const handleDocumentUpload = () => {
//     Alert.alert('Upload Document', 'Choose file type', [
//       { text: 'Image', onPress: openImagePicker },
//       { text: 'PDF', onPress: openPdfPicker },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   // =========================
//   // Save File
//   // =========================

//   const saveSelectedFile = file => {
//     if (activeTab === 'aadhaar') {
//       setAadhaarFile(file);
//       Alert.alert('Aadhaar Uploaded');
//       setTimeout(() => {
//         setActiveTab('pan');
//       }, 700);
//     } else if (activeTab === 'pan') {
//       setPanFile(file);
//       Alert.alert('PAN Uploaded');
//       setTimeout(() => {
//         setActiveTab('other');
//       }, 700);
//     } else {
//       setOtherIdFile(file);
//       Alert.alert('Other ID Uploaded');
//     }
//   };

//   // =========================
//   // Image Picker
//   // =========================

//   const openImagePicker = async () => {
//     const response = await launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//       selectionLimit: 1,
//     });

//     if (!response.didCancel && response.assets?.length > 0) {
//       const asset = response.assets[0];
//       const file = {
//         name: asset.fileName,
//         type: asset.type,
//         uri: asset.uri,
//         size: asset.fileSize,
//       };
//       console.log('IMAGE FILE:', file);
//       saveSelectedFile(file);
//     }
//   };

//   // =========================
//   // PDF Picker
//   // =========================

//   const openPdfPicker = async () => {
//     try {
//       const result = await pick({
//         type: ['application/pdf'],
//       });

//       if (result && result.length > 0) {
//         const asset = result[0];
//         const file = {
//           name: asset.name,
//           type: asset.type,
//           uri: asset.uri,
//           size: asset.size,
//         };
//         console.log('PDF FILE:', file);
//         saveSelectedFile(file);
//       }
//     } catch (err) {
//       console.log('PDF PICKER ERROR:', err);
//     }
//   };

//   // =========================
//   // Selfie Camera
//   // =========================

//   const handleFaceUpload = () => {
//     launchCamera(
//       {
//         mediaType: 'photo',
//         cameraType: 'front',
//       },
//       response => {
//         if (!response.didCancel && response.assets) {
//           setFaceFile(response.assets[0]);
//           Alert.alert('Selfie Captured');
//         }
//       },
//     );
//   };

//   // =========================
//   // API Integration Functions
//   // =========================

//   // const uploadAadhar = async () => {
//   //   try {
//   //     const formData = new FormData();
      
//   //     // Add aadhar front file
//   //     formData.append('aadharFront', {
//   //       uri: aadhaarFile.uri,
//   //       type: aadhaarFile.type,
//   //       name: aadhaarFile.name,
//   //     });
      
//   //     // Add selfie file
//   //     formData.append('selfie', {
//   //       uri: faceFile.uri,
//   //       type: faceFile.type,
//   //       name: faceFile.fileName || 'selfie.jpg',
//   //     });

//   //     const response = await api.post('/api/kyc/upload-aadhar-documents', formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });

//   //     console.log('Aadhar Upload Response:', response.data);
//   //     return response.data.success;
//   //   } catch (error) {
//   //     console.error('Aadhar Upload Error:', error);
//   //     throw new Error('Failed to upload Aadhar');
//   //   }
//   // };
// const testApi = async () => {
//   try {
//     const response = await api.get('/');
//     console.log(response.data,'0000');
//   } catch (err) {
//     console.log('API TEST ERROR:', err.message);
//   }
// };

// // const uploadAadhar = async () => {
// //   try {
// // //     const formData = new FormData();

// // // formData.append('aadharFront', {
// // //   uri: aadhaarFile.uri,
// // //   name: aadhaarFile.name,
// // //   type: aadhaarFile.type,
// // // });

// // // formData.append('selfie', {
// // //   uri: faceFile.uri,
// // //   name: faceFile.fileName || 'selfie.jpg',
// // //   type: faceFile.type,
// // // });
// // // console.log(JSON.stringify(formData._parts, null, 2));
// // // const check8=JSON.stringify(formData._parts, null, 2)

// // // const token = await getToken();

// // // const response = await axios.post(
// // //   'https://hedge-cadet-cognition.ngrok-free.dev/api/kyc/upload-aadhar-documents',
// // //   check8,
// // //   {
// // //     headers: {
// // //       Authorization: `Bearer ${token}`,
// // //       'Content-Type': 'multipart/form-data',
// // //     },
// // //     timeout: 60000,
// // //   }
// // // );

// // const formData = new FormData();

// // formData.append('aadharFront', {
// //   uri: aadhaarFile.uri,
// //   type: 'image/jpeg',
// //   name: aadhaarFile.name || 'aadhar.jpg',
// // });

// // formData.append('selfie', {
// //   uri: faceFile.uri,
// //   type: 'image/jpeg',
// //   name: faceFile.fileName || 'selfie.jpg',
// // });

// // const token = await getToken();

// // const response = await axios({
// //   method: 'post',
// //   url: 'https://hedge-cadet-cognition.ngrok-free.dev/api/kyc/upload-aadhar-documents',
// //   data: formData,
// //   headers: {
// //     Authorization: `Bearer ${token}`,
// //     'Content-Type': 'multipart/form-data',
// //     Accept: 'application/json',
// //   },
// //   timeout: 60000,
// // });

// //     console.log('Response:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.log('Upload Error:', error.response?.data || error.message);
// //   }
// // };




// // const uploadAadharDocuments = async (aadharFront, selfie) => {
// //   try {
// //     const formData = new FormData();

// //     formData.append('aadharFront', {
// //       uri:
// //         Platform.OS === 'ios'
// //           ? aadharFront.uri.replace('file://', '')
// //           : aadharFront.uri,
// //       name: aadharFront.fileName || 'aadhar.jpg',
// //       type: aadharFront.type || 'image/jpeg',
// //     });

// //     formData.append('selfie', {
// //       uri:
// //         Platform.OS === 'ios'
// //           ? selfie.uri.replace('file://', '')
// //           : selfie.uri,
// //       name: selfie.fileName || 'selfie.jpg',
// //       type: selfie.type || 'image/jpeg',
// //     });

// //     console.log('AADHAR FILE:', aadharFront);
// //     console.log('SELFIE FILE:', selfie);

// //     const response = await api.post(
// //       'api/kyc/upload-aadhar-documents',
// //       formData,
// //       {
// //         timeout: 60000,
// //       },
// //     );

// //     return response.data;
// //   } catch (error) {
// //     console.log('Upload Error:', error?.response?.data || error.message);
// //     throw error;
// //   }
// // };


// // const uploadPan = async () => {
// //   try {
// //     if (!panFile) {
// //       throw new Error('PAN file not selected');
// //     }

// //     console.log('PAN FILE:', panFile);

// //     const formData = new FormData();

// //     formData.append('panCard', {
// //       uri: panFile.uri,
// //       type: panFile.type || 'image/jpeg',
// //       name: panFile.name || panFile.fileName || 'pan.jpg',
// //     });

// //     // Debug FormData
// //     console.log('FormData Parts:', formData._parts);

// //     const response = await api.post(
// //       '/api/kyc/upload-pan-documents',
// //       formData._parts
// //     );

// //     console.log('PAN Upload Response:', response.data);

// //     return response.data;
// //   } catch (error) {
// //     console.log('PAN Upload Error:', {
// //       message: error.message,
// //       response: error.response?.data,
// //       status: error.response?.status,
// //     });

// //     throw error;
// //   }
// // };

// //   const uploadPassport = async () => {
// //     try {
// //       const formData = new FormData();
      
// //       // Add passport file (or other ID)
// //       // const fileKey = otherIdType === 'Passport' ? 'passport' : 'otherId';
// //       // formData.append(fileKey, {
// //       //   uri: otherIdFile.uri,
// //       //   type: otherIdFile.type,
// //       //   name: otherIdFile.name,
// //       // });
      
// //       // // Add selfie file
// //       // formData.append('selfie', {
// //       //   uri: faceFile.uri,
// //       //   type: faceFile.type,
// //       //   name: faceFile.fileName || 'selfie.jpg',
// //       // });

// //           const payload={
// //       passport:otherIdFile.uri,
// //       selfie:faceFile.uri,
// //     }

    

// //       const response = await api.post('/api/kyc/upload-passport-documents', formData,);

// //       console.log('Other ID Upload Response:', response.data);
// //       return response.data.success;
// //     } catch (error) {
// //       console.error('Other ID Upload Error:', error);
// //       throw new Error(`Failed to upload ${otherIdType}`);
// //     }
// //   };


// //   const handleSubmit = async () => {
// //     console.log("sowmya790")
// //     testApi();
// //     // Validation checks
// //     // if (!otherIdType) {
// //     //   Alert.alert('Select ID Type', 'Please select an ID type');
// //     //   return;
// //     // }

// //     // if (!otherIdFile) {
// //     //   Alert.alert(`Upload ${otherIdType}`, `Please upload your ${otherIdType}`);
// //     //   return;
// //     // }

// //     // if (!faceFile) {
// //     //   Alert.alert('Selfie Required', 'Please capture your selfie');
// //     //   return;
// //     // }

// //     // if (!aadhaarFile) {
// //     //   Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
// //     //   return;
// //     // }

// //     // if (!panFile) {
// //     //   Alert.alert('PAN Card Required', 'Please upload your PAN card');
// //     //   return;
// //     // }

// //     // setIsLoading(true);

// //     try {
// //       // Upload all documents sequentially
// //       console.log('Starting Aadhar upload...');
// //       await uploadAadharDocuments(aadhaarFile,faceFile);
      
// //       console.log('Starting PAN upload...');
// //       await uploadPan();
      
// //       console.log('Starting Other ID upload...');
// //       await uploadPassport();

// //       // All uploads successful
// //       Alert.alert('Success', 'All documents uploaded successfully', [
// //         { text: 'OK', onPress: () => navigation.navigate('KycUnderReview') }
// //       ]);
      
// //     } catch (error) {
// //       console.error('Upload Error:', error);
// //       Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };



// //   const uploadAadharDocuments = async () => {
// //     try {
// //       if (!aadhaarFile || !faceFile) {
// //         Alert.alert('Error', 'Please upload Aadhar front and selfie');
// //         return false;
// //       }

// //       // const formData = new FormData();
      
// //       // formData.append('aadharFront', {
// //       //   uri: Platform.OS === 'ios' ? aadhaarFile.uri.replace('file://', '') : aadhaarFile.uri,
// //       //   name: aadhaarFile.name,
// //       //   type: aadhaarFile.type,
// //       // });
      
// //       // formData.append('selfie', {
// //       //   uri: Platform.OS === 'ios' ? faceFile.uri.replace('file://', '') : faceFile.uri,
// //       //   name: faceFile.name,
// //       //   type: faceFile.type,
// //       // });

// //       // console.log('Uploading Aadhar documents...',formData);
// //       // const response = await api.post('/api/kyc/upload-aadhar-documents', formData, {
// //       //   headers: { 'Content-Type': 'multipart/form-data' }
// //       // });

// //       // if (response.data.success) {
// //       //   Alert.alert('Success', 'Aadhar documents uploaded successfully');
// //       //   return true;
// //       // }
// //       // return false;

// //       const formData = new FormData();

// // formData?.append('aadharFront', {
// //   uri: aadhaarFile?.uri,
// //   type: aadhaarFile.type || 'image/jpeg',
// //   name: aadhaarFile.name || 'aadhar.jpg',
// // });

// // formData?.append('selfie', {
// //   uri: faceFile?.uri,
// //   type: faceFile?.type || 'image/jpeg',
// //   name: faceFile?.name || 'selfie.jpg',
// // });

// // console.log(formData,"formData")

// // const response = await api.post(
// //   '/api/kyc/upload-aadhar-documents',
// //   formData,
// //   {
// //     headers: {
// //       Accept: 'application/json',
// //       'Content-Type': 'multipart/form-data',
// //     },
// //   },
// // );

// // if (response.data.success) {
// //         Alert.alert('Success', 'Aadhar documents uploaded successfully');
// //         return true;
// //       }
// //       return false;

// //     } catch (error) {
// //       console.error('Aadhar upload error:', error.response?.data || error.message);
// //       Alert.alert('Error', error.response?.data?.message || 'Failed to upload Aadhar');
// //       return false;
// //     }
// //   };



// const uploadAadharDocuments = async () => {
//   try {
//     if (!aadhaarFile || !faceFile) {
//       Alert.alert('Error', 'Please upload Aadhar front and selfie');
//       return false;
//     }

//     console.log('========== FILE DETAILS ==========');
//     console.log('AADHAR FILE =>', aadhaarFile);
//     console.log('SELFIE FILE =>', faceFile);

//     // Verify files exist
//     const aadharExists = await RNFS.exists(
//       aadhaarFile.uri.replace('file://', ''),
//     );

//     const selfieExists = await RNFS.exists(
//       faceFile.uri.replace('file://', ''),
//     );

//     console.log('AADHAR EXISTS =>', aadharExists);
//     console.log('SELFIE EXISTS =>', selfieExists);

//     if (!aadharExists || !selfieExists) {
//       Alert.alert('Error', 'Selected file not found on device');
//       return false;
//     }

//     // Verify API reachable
//     try {
//       const token = await getToken();

//       const testResponse = await fetch(
//         'https://hedge-cadet-cognition.ngrok-free.dev/api/kyc/verification-status',
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );

//       console.log(
//         'CONNECTIVITY TEST STATUS =>',
//         testResponse.status,
//       );
//     } catch (err) {
//       console.log('CONNECTIVITY TEST FAILED =>', err);
//       Alert.alert('Error', 'API server not reachable');
//       return false;
//     }

//     const formData = new FormData();

//     formData.append('aadharFront', {
//       uri:
//         Platform.OS === 'android'
//           ? aadhaarFile.uri
//           : aadhaarFile.uri.replace('file://', ''),
//       type: aadhaarFile.type || 'image/jpeg',
//       name: aadhaarFile.name || 'aadhar.jpg',
//     });

//     formData.append('selfie', {
//       uri:
//         Platform.OS === 'android'
//           ? faceFile.uri
//           : faceFile.uri.replace('file://', ''),
//       type: faceFile.type || 'image/jpeg',
//       name:
//         faceFile.fileName ||
//         faceFile.name ||
//         'selfie.jpg',
//     });

//     console.log('========== FORMDATA ==========');
//     console.log(formData._parts);

//     const token = await getToken();

//     console.log('========== STARTING UPLOAD ==========');

//     const response = await fetch(
//       'https://hedge-cadet-cognition.ngrok-free.dev/api/kyc/upload-aadhar-documents',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json',
//           // DO NOT SET CONTENT-TYPE MANUALLY
//         },
//         body: formData,
//       },
//     );

//     console.log('UPLOAD STATUS =>', response.status);
//     console.log('UPLOAD OK =>', response.ok);

//     const responseText = await response.text();

//     console.log('UPLOAD RESPONSE =>', responseText);

//     let responseData = {};

//     try {
//       responseData = JSON.parse(responseText);
//     } catch (e) {
//       console.log('Response is not JSON');
//     }

//     if (response.ok) {
//       Alert.alert(
//         'Success',
//         responseData.message ||
//           'Aadhar documents uploaded successfully',
//       );
//       return true;
//     }

//     Alert.alert(
//       'Upload Failed',
//       responseData.message || 'Server rejected request',
//     );

//     return false;
//   } catch (error) {
//     console.log('========== UPLOAD ERROR ==========');
//     console.log('MESSAGE =>', error?.message);
//     console.log('STACK =>', error?.stack);
//     console.log('ERROR =>', error);
//     console.log('=================================');

//     Alert.alert(
//       'Upload Failed',
//       error?.message || 'Unknown error',
//     );

//     return false;
//   }
// };

//   // Upload PAN Documents
//   const uploadPanDocuments = async () => {
//     try {
//       if (!panCard) {
//         Alert.alert('Error', 'Please upload PAN card');
//         return false;
//       }

//       const formData = new FormData();
      
//       formData.append('panCard', {
//         uri: Platform.OS === 'ios' ? panCard.uri.replace('file://', '') : panCard.uri,
//         name: panCard.name,
//         type: panCard.type,
//       });

//       console.log('Uploading PAN documents...');
//       const response = await api.post('/api/kyc/upload-pan-documents', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'PAN card uploaded successfully');
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('PAN upload error:', error.response?.data || error.message);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to upload PAN card');
//       return false;
//     }
//   };

//   // Upload Passport Documents
//   const uploadPassportDocuments = async () => {
//     try {
//       if (!passport) {
//         Alert.alert('Error', 'Please upload passport');
//         return false;
//       }

//       const formData = new FormData();
      
//       formData.append('passport', {
//         uri: Platform.OS === 'ios' ? passport.uri.replace('file://', '') : passport.uri,
//         name: passport.name,
//         type: passport.type,
//       });

//       console.log('Uploading Passport documents...');
//       const response = await api.post('/api/kyc/upload-passport-documents', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Passport uploaded successfully');
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Passport upload error:', error.response?.data || error.message);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to upload passport');
//       return false;
//     }
//   };

//   // Submit all documents for review
//   const submitForReview = async () => {
//     try {
//       const response = await api.post('/api/kyc/submit-for-review');
//       if (response.data.success) {
//         Alert.alert('Success', 'KYC submitted for review', [
//           { text: 'OK', onPress: () => navigation.replace('KycUnderReview') }
//         ]);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to submit for review');
//       return false;
//     }
//   };

//   // Handle complete submission
//   const handleSubmitAll = async () => {
//     setIsLoading(true);
    
//     try {
//       // Upload Aadhar
//       const aadharSuccess = await uploadAadharDocuments();
//       if (!aadharSuccess) return;

//       // Upload PAN or Passport based on active step
//       if (activeStep === 'pan') {
//         const panSuccess = await uploadPanDocuments();
//         if (!panSuccess) return;
//       } else if (activeStep === 'passport') {
//         const passportSuccess = await uploadPassportDocuments();
//         if (!passportSuccess) return;
//       }

//       // Submit for review
//       await submitForReview();
      
//     } catch (error) {
//       console.error('Submission error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#120022" barStyle="light-content" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Icon name="chevron-left" size={28} color="#fff" />
//             </TouchableOpacity>

//             <Text style={styles.heading}>Verify your identity</Text>

//             <View style={{ width: 28 }} />
//           </View>

//           {/* Description */}
//           <Text style={styles.subText}>
//             Upload your documents to complete KYC verification.
//           </Text>

//           {/* Label */}
//           <Text style={styles.label}>DOCUMENT TYPE</Text>

//           {/* Tabs */}
//           <View style={styles.tabContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab === 'aadhaar' && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab('aadhaar')}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'aadhaar' && styles.activeTabText,
//                 ]}>
//                 Aadhaar
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab === 'pan' && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab('pan')}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'pan' && styles.activeTabText,
//                 ]}>
//                 PAN Card
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab === 'other' && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab('other')}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'other' && styles.activeTabText,
//                 ]}>
//                 Other ID's
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Other ID Dropdown */}
//           {activeTab === 'other' && (
//             <Dropdown
//               style={styles.dropdown}
//               placeholderStyle={styles.dropdownPlaceholder}
//               selectedTextStyle={styles.dropdownSelectedText}
//               data={otherIdOptions}
//               labelField="label"
//               valueField="value"
//               placeholder="Select ID Type"
//               value={otherIdType}
//               onChange={item => {
//                 setOtherIdFile(null);
//                 setOtherIdType(item.value);
//               }}
//             />
//           )}

//           {/* Upload Box */}
//           <TouchableOpacity
//             style={styles.uploadBox}
//             activeOpacity={0.8}
//             onPress={handleDocumentUpload}>
//             <View style={styles.uploadIcon}>
//               <Icon name="upload" size={22} color="#fff" />
//             </View>

//             <Text style={styles.uploadTitle}>
//               {activeTab === 'aadhaar'
//                 ? 'Upload Aadhaar Card'
//                 : activeTab === 'pan'
//                 ? 'Upload PAN Card'
//                 : `Upload ${otherIdType || 'Other ID'}`}
//             </Text>

//             <Text style={styles.uploadInfo}>JPG, PNG or PDF • Max 5MB</Text>

//             {/* File display */}
//             {activeTab === 'aadhaar' && aadhaarFile && (
//               <Text style={styles.fileName}>✓ {aadhaarFile.name}</Text>
//             )}

//             {activeTab === 'pan' && panFile && (
//               <Text style={styles.fileName}>✓ {panFile.name}</Text>
//             )}

//             {activeTab === 'other' && otherIdFile && (
//               <Text style={styles.fileName}>✓ {otherIdFile.name}</Text>
//             )}
//           </TouchableOpacity>

//           {/* Selfie Section */}
//           {activeTab === 'aadhaar' && (
//             <View style={styles.faceBox}>
//               <View style={styles.faceIcon}>
//                 <Icon name="camera" size={20} color="#fff" />
//               </View>

//               <Text style={styles.faceTitle}>Capture Selfie</Text>

//               <Text style={styles.faceSub}>Clear selfie with good lighting</Text>

//               <TouchableOpacity style={styles.cameraBtn} onPress={handleFaceUpload}>
//                 <Text style={styles.cameraBtnText}>Open Camera</Text>
//               </TouchableOpacity>

//               {faceFile && <Text style={styles.fileName}>✓ Selfie Captured</Text>}

//               <View style={styles.instructions}>
//                 <Text style={styles.instructionText}>
//                   ✓ Take a selfie of yourself with a neutral expression
//                 </Text>

//                 <Text style={styles.instructionText}>
//                   ✓ Make sure your whole face is visible, centred, and your eyes are open
//                 </Text>

//                 <Text style={styles.instructionText}>
//                   ✕ Do not crop your ID or screenshots of your ID
//                 </Text>

//                 <Text style={styles.instructionText}>
//                   ✕ Do not hide or alter parts of your face (No hats/ beauty images/ filters/ headgear)
//                 </Text>
//               </View>
//             </View>
//           )}

//           {/* Info */}
//           <View style={styles.checkboxRow}>
//             <View style={styles.checkbox} />
//             <Text style={styles.checkboxText}>
//               This information is used for identity verification only.
//             </Text>
//           </View>

//           {/* Submit Button */}
//           {activeTab === 'other' && (
//             <TouchableOpacity
//               style={[styles.submitBtn, isLoading && { opacity: 0.7 }]}
//               onPress={handleSubmitAll}
//               disabled={isLoading}>
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.submitBtnText}>Submit for Review</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }





import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import styles from '../kycVerify/KYCVerificationStyles';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { pick } from '@react-native-documents/picker';
import { Dropdown } from 'react-native-element-dropdown';
import api, { getToken } from '../../api/axios';
import RNFS from 'react-native-fs';


export default function KYCVerification({
  navigation,
}) {
  const [activeTab, setActiveTab] = useState('aadhaar');
  const [otherIdType, setOtherIdType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [otherIdFile, setOtherIdFile] = useState(null);
  const [faceFile, setFaceFile] = useState(null);
  const [token,setToken]=useState("")

  const otherIdOptions = [
    { label: 'Driving License', value: 'Driving License' },
    { label: 'Voter ID', value: 'Voter ID' },
    { label: 'Passport', value: 'Passport' },
  ];



  const handleDocumentUpload = () => {
    Alert.alert('Upload Document', 'Choose file type', [
      { text: 'Image', onPress: openImagePicker },
      { text: 'PDF', onPress: openPdfPicker },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

     useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    };

    fetchToken();
  }, []);




  const saveSelectedFile = file => {
    if (activeTab === 'aadhaar') {
      setAadhaarFile(file);
      Alert.alert('Aadhaar Uploaded');
      setTimeout(() => {
        setActiveTab('pan');
      }, 700);
    } else if (activeTab === 'pan') {
      setPanFile(file);
      Alert.alert('PAN Uploaded');
      setTimeout(() => {
        setActiveTab('other');
      }, 700);
    } else {
      setOtherIdFile(file);
      Alert.alert('Other ID Uploaded');
    }
  };

 

  const openImagePicker = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (!response.didCancel && response.assets?.length > 0) {
      const asset = response.assets[0];
      const file = {
        name: asset.fileName,
        type: asset.type,
        uri: asset.uri,
        size: asset.fileSize,
      };
      console.log('IMAGE FILE:', file);
      saveSelectedFile(file);
    }
  };


  const openPdfPicker = async () => {
    try {
      const result = await pick({
        type: ['application/pdf'],
      });

      if (result && result.length > 0) {
        const asset = result[0];
        const file = {
          name: asset.name,
          type: asset.type,
          uri: asset.uri,
          size: asset.size,
        };
        console.log('PDF FILE:', file);
        saveSelectedFile(file);
      }
    } catch (err) {
      console.log('PDF PICKER ERROR:', err);
    }
  };


  const handleFaceUpload = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
      },
      response => {
        if (!response.didCancel && response.assets) {
          setFaceFile(response.assets[0]);
          Alert.alert('Selfie Captured');
        }
      },
    );
  };


const uploadAadhar = async () => {
  try {
    // Read Aadhaar file as Base64
    const aadharBase64 = await RNFS.readFile(
      aadhaarFile?.uri,
      'base64'
    );

    // const selfieBase64 = await RNFS.readFile(
    //   faceFile?.uri,
    //   'base64'
    // );
console.log(aadhaarFile?.uri,"5656");

    const payload = {
      aadharFront: `data:${aadhaarFile?.type};base64,${aadharBase64}`,
      // selfie: `data:${faceFile.type};base64,${selfieBase64}`,
      selfie: `data:${aadhaarFile.type};base64,${aadharBase64}`,

    };

    console.log('Payload:', payload);

    const response = await api?.post(
      '/api/kyc/upload-aadhar-documents',
      payload
    );

    console.log('Upload Response:', response.data);

    return response?.data;
  } catch (error) {
    console.log('Upload Error:', error);
    throw error;
  }
};

  const uploadPan = async () => {
  try {
    const panBase64 = await RNFS.readFile(
      panFile?.uri,
      'base64'
    );


    console.log(panFile?.uri, 'PAN URI');

    const payload = {
      panCard: `data:${panFile?.type};base64,${panBase64}`,
    };

    console.log('PAN Payload:', payload);

    const response = await api.post(
      '/api/kyc/upload-pan-documents',
      payload
    );

    console.log('PAN Upload Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('PAN Upload Error:', error);
    throw error;
  }
};

const uploadPassport = async () => {
  try {
    const passportBase64 = await RNFS.readFile(
      otherIdFile?.uri,
      'base64'
    );


    console.log(otherIdFile?.uri, 'PASSPORT URI');

    const payload = {
      passport: `data:${otherIdFile?.type};base64,${passportBase64}`,
    };

    console.log('Passport Payload:', payload);

    const response = await api.post(
      '/api/kyc/upload-passport-documents',
      payload
    );

    console.log('Passport Upload Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Passport Upload Error:', error);
    throw error;
  }
};

const submitForReview= async()=>{

  const payload={
    token:token
  }
     const response = await api.post(
      '/api/kyc/submit-for-review',
      payload
    );
}

  const handleSubmit = async () => {
    console.log("sowmya790")
    // Validation checks
    if (!otherIdType) {
      Alert.alert('Select ID Type', 'Please select an ID type');
      return;
    }

    if (!otherIdFile) {
      Alert.alert(`Upload ${otherIdType}`, `Please upload your ${otherIdType}`);
      return;
    }

    // if (!faceFile) {
    //   Alert.alert('Selfie Required', 'Please capture your selfie');
    //   return;
    // }

    if (!aadhaarFile) {
      Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
      return;
    }

    if (!panFile) {
      Alert.alert('PAN Card Required', 'Please upload your PAN card');
      return;
    }

    setIsLoading(true);

    try {
      // Upload all documents sequentially
      console.log('Starting Aadhar upload...');
      await uploadAadhar();
      
      console.log('Starting PAN upload...');
      await uploadPan();
      
      console.log('Starting Other ID upload...');
      await uploadPassport();
      await submitForReview();

      // All uploads successful
      Alert.alert('Success', 'All documents uploaded successfully', [
        { text: 'OK', onPress: () => navigation.navigate('KycUnderReview') }
      ]);
      
    } catch (error) {
      console.log('Upload Error:', error);
      Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#120022" barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={28} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.heading}>Verify your identity</Text>

            <View style={{ width: 28 }} />
          </View>

          {/* Description */}
          <Text style={styles.subText}>
            Upload your documents to complete KYC verification.
          </Text>

          {/* Label */}
          <Text style={styles.label}>DOCUMENT TYPE</Text>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'aadhaar' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('aadhaar')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'aadhaar' && styles.activeTabText,
                ]}>
                Aadhaar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'pan' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('pan')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'pan' && styles.activeTabText,
                ]}>
                PAN Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'other' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('other')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'other' && styles.activeTabText,
                ]}>
                Other ID's
              </Text>
            </TouchableOpacity>
          </View>

          {/* Other ID Dropdown */}
          {activeTab === 'other' && (
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              data={otherIdOptions}
              labelField="label"
              valueField="value"
              placeholder="Select ID Type"
              value={otherIdType}
              onChange={item => {
                setOtherIdFile(null);
                setOtherIdType(item.value);
              }}
            />
          )}

          {/* Upload Box */}
          <TouchableOpacity
            style={styles.uploadBox}
            activeOpacity={0.8}
            onPress={handleDocumentUpload}>
            <View style={styles.uploadIcon}>
              <Icon name="upload" size={22} color="#fff" />
            </View>

            <Text style={styles.uploadTitle}>
              {activeTab === 'aadhaar'
                ? 'Upload Aadhaar Card'
                : activeTab === 'pan'
                ? 'Upload PAN Card'
                : `Upload ${otherIdType || 'Other ID'}`}
            </Text>

            <Text style={styles.uploadInfo}>JPG, PNG or PDF • Max 5MB</Text>

            {/* File display */}
            {activeTab === 'aadhaar' && aadhaarFile && (
              <Text style={styles.fileName}>✓ {aadhaarFile.name}</Text>
            )}

            {activeTab === 'pan' && panFile && (
              <Text style={styles.fileName}>✓ {panFile.name}</Text>
            )}

            {activeTab === 'other' && otherIdFile && (
              <Text style={styles.fileName}>✓ {otherIdFile.name}</Text>
            )}
          </TouchableOpacity>

          {/* Selfie Section */}
          {activeTab === 'aadhaar' && (
            <View style={styles.faceBox}>
              <View style={styles.faceIcon}>
                <Icon name="camera" size={20} color="#fff" />
              </View>

              <Text style={styles.faceTitle}>Capture Selfie</Text>

              <Text style={styles.faceSub}>Clear selfie with good lighting</Text>

              <TouchableOpacity style={styles.cameraBtn} onPress={handleFaceUpload}>
                <Text style={styles.cameraBtnText}>Open Camera</Text>
              </TouchableOpacity>

              {faceFile && <Text style={styles.fileName}>✓ Selfie Captured</Text>}

              <View style={styles.instructions}>
                <Text style={styles.instructionText}>
                  ✓ Take a selfie of yourself with a neutral expression
                </Text>

                <Text style={styles.instructionText}>
                  ✓ Make sure your whole face is visible, centred, and your eyes are open
                </Text>

                <Text style={styles.instructionText}>
                  ✕ Do not crop your ID or screenshots of your ID
                </Text>

                <Text style={styles.instructionText}>
                  ✕ Do not hide or alter parts of your face (No hats/ beauty images/ filters/ headgear)
                </Text>
              </View>
            </View>
          )}

          {/* Info */}
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text style={styles.checkboxText}>
              This information is used for identity verification only.
            </Text>
          </View>

          {/* Submit Button */}
          {activeTab === 'other' && (
            <TouchableOpacity
              style={[styles.submitBtn, isLoading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitBtnText}>Submit for Review</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}