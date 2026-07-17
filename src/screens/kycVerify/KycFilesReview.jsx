import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import styles from './KycFilesReviewStyles';

// API imports
import api, { getToken } from '../../api/axios';
import RNFS from 'react-native-fs';

export default function KycFilesReview({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  
  // Get all files passed from the KYCVerification screen
  const { existingFiles } = route.params;

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  // API upload functions transferred from original file
  const uploadAadhar = async () => {
    try {
      const aadharBase64 = await RNFS.readFile(existingFiles.aadhaarFile?.uri, 'base64');
      const selfieBase64 = await RNFS.readFile(existingFiles.faceFile?.uri, 'base64');
      const payload = {
        aadharFront: `data:${existingFiles.aadhaarFile?.type};base64,${aadharBase64}`,
        selfie: `data:${existingFiles.faceFile.type};base64,${selfieBase64}`,
      };
      const response = await api.post('/api/kyc/upload-aadhar-documents', payload);
      return response.data;
    } catch (error) { throw error; }
  };

  const uploadPan = async () => {
    try {
      const panBase64 = await RNFS.readFile(existingFiles.panFile?.uri, 'base64');
      const payload = { panCard: `data:${existingFiles.panFile?.type};base64,${panBase64}` };
      const response = await api.post('/api/kyc/upload-pan-documents', payload);
      return response.data;
    } catch (error) { throw error; }
  };

  const uploadPassbook = async () => {
    try {
      const passbookBase64 = await RNFS.readFile(existingFiles.passbookFile?.uri, 'base64');
      const payload = { passbook: `data:${existingFiles.passbookFile?.type};base64,${passbookBase64}` };
      const response = await api.post('/api/kyc/upload-passbook-documents', payload);
      return response.data;
    } catch (error) { throw error; }
  };

  const submitForReview = async () => {
    const payload = { token: token };
    const response = await api.post('/api/kyc/submit-for-review', payload);
  };

  const handleSubmitKyc = async () => {
    setIsLoading(true);
    try {
      await uploadAadhar();
      await uploadPan();
      await uploadPassbook();
      await submitForReview();

      Alert.alert('Success', 'All documents uploaded successfully', [
        {
          text: 'OK',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'KycUnderReview' }],
          }),
        },
      ]);
    } catch (error) {
      Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplace = (tabName) => {
    // Navigate back and tell it which tab to open, passing existing files so they aren't lost
    navigation.navigate('KYCVerification', {
      replaceTab: tabName,
      existingFiles: existingFiles
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#285CE0" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.heading}>Review Your Information</Text>
            <Text style={styles.subText}>
              Please review all the information before submitting your KYC application.
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../../../assets/images/kycscreens/Help Icon.png')} style={styles.helpIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.sectionTitle}>• Aadhar Details</Text>
          <TouchableOpacity style={styles.reviewCard} onPress={() => handleReplace('aadhaar')}>
            <Icon name="camera" size={24} color="#03B244" style={styles.cardIcon} />
            <Text style={styles.fileName}>{existingFiles.aadhaarFile?.name || 'Aadhar.png'}</Text>
            <Text style={styles.clickToReplace}>Click to replace</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>• PAN Details</Text>
          <TouchableOpacity style={styles.reviewCard} onPress={() => handleReplace('pan')}>
            <Icon name="camera" size={24} color="#03B244" style={styles.cardIcon} />
            <Text style={styles.fileName}>{existingFiles.panFile?.name || 'PAN.png'}</Text>
            <Text style={styles.clickToReplace}>Click to replace</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>• Cancel Cheque or Passbook Details</Text>
          <TouchableOpacity style={styles.reviewCard} onPress={() => handleReplace('passbook')}>
            <Icon name="camera" size={24} color="#03B244" style={styles.cardIcon} />
            <Text style={styles.fileName}>{existingFiles.passbookFile?.name || 'Passbook.png'}</Text>
            <Text style={styles.clickToReplace}>Click to replace</Text>
          </TouchableOpacity>

        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.submitBtn, isLoading && { opacity: 0.7 }]} 
            onPress={handleSubmitKyc} 
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.submitBtnText}>Submit KYC</Text>
                <Icon name="arrow-right" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.secureBadge}>
            <Image source={require('../../../assets/images/kycscreens/shield-check.png')} style={styles.secureIcon} />
            <Text style={styles.secureText}>100% Secure & Encrypted</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}