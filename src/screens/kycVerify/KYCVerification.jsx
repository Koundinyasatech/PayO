import React, { useState } from 'react';

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
import api from '../../api/axios';

// Import your API instance
// Update with your actual API import path

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

  const otherIdOptions = [
    { label: 'Driving License', value: 'Driving License' },
    { label: 'Voter ID', value: 'Voter ID' },
    { label: 'Passport', value: 'Passport' },
  ];

  // =========================
  // Upload Alert
  // =========================

  const handleDocumentUpload = () => {
    Alert.alert('Upload Document', 'Choose file type', [
      { text: 'Image', onPress: openImagePicker },
      { text: 'PDF', onPress: openPdfPicker },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // =========================
  // Save File
  // =========================

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

  // =========================
  // Image Picker
  // =========================

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

  // =========================
  // PDF Picker
  // =========================

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

  // =========================
  // Selfie Camera
  // =========================

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

  // =========================
  // API Integration Functions
  // =========================

  // const uploadAadhar = async () => {
  //   try {
  //     const formData = new FormData();
      
  //     // Add aadhar front file
  //     formData.append('aadharFront', {
  //       uri: aadhaarFile.uri,
  //       type: aadhaarFile.type,
  //       name: aadhaarFile.name,
  //     });
      
  //     // Add selfie file
  //     formData.append('selfie', {
  //       uri: faceFile.uri,
  //       type: faceFile.type,
  //       name: faceFile.fileName || 'selfie.jpg',
  //     });

  //     const response = await api.post('/api/kyc/upload-aadhar-documents', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     console.log('Aadhar Upload Response:', response.data);
  //     return response.data.success;
  //   } catch (error) {
  //     console.error('Aadhar Upload Error:', error);
  //     throw new Error('Failed to upload Aadhar');
  //   }
  // };

  const uploadAadhar = async () => {
  try {
    const formData = new FormData();
    
    // Log file details before upload
    // console.log('Aadhar File:', {
    //   uri: aadhaarFile.uri,
    //   type: aadhaarFile.type,
    //   name: aadhaarFile.name,
    //   size: aadhaarFile.size,
    // });
    
    // console.log('Selfie File:', {
    //   uri: faceFile.uri,
    //   type: faceFile.type,
    //   name: faceFile.fileName || faceFile.name,
    // });
    
    // // Append files (this will create the multipart format you showed)
    // formData.append('aadharFront', {
    //   uri: aadhaarFile.uri,
    //   type: aadhaarFile.type || 'application/pdf',
    //   name: aadhaarFile.name || 'document.pdf',
    // });
    
    // formData.append('selfie', {
    //   uri: faceFile.uri,
    //   type: faceFile.type || 'image/jpeg',
    //   name: faceFile.fileName || faceFile.name || 'selfie.jpg',
    // });
    
    const payload={
      aadharFront:aadhaarFile.uri,
      selfie:faceFile.uri,
    }

    console.log(payload,"00")
    
    const response = await api.post('/api/kyc/upload-aadhar-documents', payload);
    
    console.log('Upload response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Upload error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

  const uploadPan = async () => {
    try {
      const formData = new FormData();
      
      // // Add pan card file
      // formData.append('panCard', {
      //   uri: panFile.uri,
      //   type: panFile.type,
      //   name: panFile.name,
      // });
      
      // // Add selfie file
      // formData.append('selfie', {
      //   uri: faceFile.uri,
      //   type: faceFile.type,
      //   name: faceFile.fileName || 'selfie.jpg',
      // });

        const payload={
      panCard:panFile.uri,
      selfie:faceFile.uri,
    }


      const response = await api.post('/api/kyc/upload-pan-documents', payload);

      console.log('PAN Upload Response:', response.data);
      return response.data.success;
    } catch (error) {
      console.error('PAN Upload Error:', error);
      throw new Error('Failed to upload PAN');
    }
  };

  const uploadPassport = async () => {
    try {
      const formData = new FormData();
      
      // Add passport file (or other ID)
      // const fileKey = otherIdType === 'Passport' ? 'passport' : 'otherId';
      // formData.append(fileKey, {
      //   uri: otherIdFile.uri,
      //   type: otherIdFile.type,
      //   name: otherIdFile.name,
      // });
      
      // // Add selfie file
      // formData.append('selfie', {
      //   uri: faceFile.uri,
      //   type: faceFile.type,
      //   name: faceFile.fileName || 'selfie.jpg',
      // });

          const payload={
      passport:otherIdFile.uri,
      selfie:faceFile.uri,
    }

    

      const response = await api.post('/api/kyc/upload-passport-documents', formData,);

      console.log('Other ID Upload Response:', response.data);
      return response.data.success;
    } catch (error) {
      console.error('Other ID Upload Error:', error);
      throw new Error(`Failed to upload ${otherIdType}`);
    }
  };


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

    if (!faceFile) {
      Alert.alert('Selfie Required', 'Please capture your selfie');
      return;
    }

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

      // All uploads successful
      Alert.alert('Success', 'All documents uploaded successfully', [
        { text: 'OK', onPress: () => navigation.navigate('KycUnderReview') }
      ]);
      
    } catch (error) {
      console.error('Upload Error:', error);
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