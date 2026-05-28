

import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import styles from '../kycVerify/KYCVerificationStyles';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export default function KYCVerification({
  navigation,
}) {
  const [activeTab, setActiveTab] =
    useState('aadhaar');

  const [otherIdText,
    setOtherIdText] =
    useState('');

  const [aadhaarFile,
    setAadhaarFile] =
    useState(null);

  const [panFile,
    setPanFile] =
    useState(null);

  const [otherIdFile,
    setOtherIdFile] =
    useState(null);

  const [faceFile,
    setFaceFile] =
    useState(null);

  // Upload File
  const handleDocumentUpload =
    () => {
      launchImageLibrary(
        {
          mediaType: 'mixed',
          selectionLimit: 1,
        },
        response => {
          if (
            !response.didCancel &&
            response.assets
          ) {
            const file =
              response.assets[0];

            // Aadhaar
            if (
              activeTab ===
              'aadhaar'
            ) {
              setAadhaarFile(
                file,
              );

              Alert.alert(
                'Aadhaar Uploaded',
              );

              // Move PAN
              setTimeout(() => {
                setActiveTab(
                  'pan',
                );
              }, 700);
            }

            // PAN
            else if (
              activeTab ===
              'pan'
            ) {
              setPanFile(
                file,
              );

              Alert.alert(
                'PAN Uploaded',
              );

              // Move Other ID
              setTimeout(() => {
                setActiveTab(
                  'other',
                );
              }, 700);
            }

            // Other ID
            else {
              setOtherIdFile(
                file,
              );

              Alert.alert(
                'Other ID Uploaded',
              );
            }
          }
        },
      );
    };

  // Selfie
  const handleFaceUpload =
    () => {
      launchCamera(
        {
          mediaType:
            'photo',
          cameraType:
            'front',
        },
        response => {
          if (
            !response.didCancel &&
            response.assets
          ) {
            setFaceFile(
              response.assets[0],
            );

            Alert.alert(
              'Selfie Captured',
            );
          }
        },
      );
    };

  // Submit
  const handleSubmit =
    () => {
      if (!otherIdFile) {
        Alert.alert(
          'Upload Other ID File',
        );
        return;
      }

      navigation.navigate(
        'KycUnderReview',
      );
    };

  return (
    <SafeAreaView
      style={styles.safeArea}>
      <StatusBar
        backgroundColor="#120022"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }>
              <Icon
                name="chevron-left"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.heading}>
              Verify your identity
            </Text>

            <View
              style={{ width: 28 }}
            />
          </View>

          {/* Description */}
          <Text style={styles.subText}>
            Upload your documents
            to complete KYC
            verification.
          </Text>

          {/* Label */}
          <Text style={styles.label}>
            DOCUMENT TYPE
          </Text>

          {/* Tabs */}
          <View
            style={
              styles.tabContainer
            }>
            {/* Aadhaar */}
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab ===
                  'aadhaar' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setActiveTab(
                  'aadhaar',
                )
              }>
              <Text
                style={[
                  styles.tabText,
                  activeTab ===
                    'aadhaar' &&
                    styles.activeTabText,
                ]}>
                Aadhaar
              </Text>
            </TouchableOpacity>

            {/* PAN */}
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab ===
                  'pan' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setActiveTab(
                  'pan',
                )
              }>
              <Text
                style={[
                  styles.tabText,
                  activeTab ===
                    'pan' &&
                    styles.activeTabText,
                ]}>
                PAN Card
              </Text>
            </TouchableOpacity>

            {/* Other IDs */}
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab ===
                  'other' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setActiveTab(
                  'other',
                )
              }>
              <Text
                style={[
                  styles.tabText,
                  activeTab ===
                    'other' &&
                    styles.activeTabText,
                ]}>
                Other ID's
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input only Other IDs */}
          {activeTab ===
            'other' && (
            <TextInput
              placeholder="Voter ID / Passport / Driving License"
              placeholderTextColor="#B9A8D4"
              value={
                otherIdText
              }
              onChangeText={
                setOtherIdText
              }
              style={
                styles.inputBox
              }
            />
          )}

          {/* Upload Box */}
          <TouchableOpacity
            style={
              styles.uploadBox
            }
            activeOpacity={0.8}
            onPress={
              handleDocumentUpload
            }>
            <View
              style={
                styles.uploadIcon
              }>
              <Icon
                name="upload"
                size={22}
                color="#fff"
              />
            </View>

            <Text
              style={
                styles.uploadTitle
              }>
              {activeTab ===
              'aadhaar'
                ? 'Upload Aadhaar Card'
                : activeTab ===
                  'pan'
                ? 'Upload PAN Card'
                : 'Upload Other File'}
            </Text>

            <Text
              style={
                styles.uploadInfo
              }>
              JPG, PNG or PDF •
              Max 5MB
            </Text>

            {/* Aadhaar */}
            {activeTab ===
              'aadhaar' &&
              aadhaarFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓{' '}
                  {
                    aadhaarFile.fileName
                  }
                </Text>
              )}

            {/* PAN */}
            {activeTab ===
              'pan' &&
              panFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓{' '}
                  {
                    panFile.fileName
                  }
                </Text>
              )}

            {/* Other */}
            {activeTab ===
              'other' &&
              otherIdFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓{' '}
                  {
                    otherIdFile.fileName
                  }
                </Text>
              )}
          </TouchableOpacity>

          {/* Selfie only Aadhaar */}
          {activeTab ===
            'aadhaar' && (
            <View
              style={
                styles.faceBox
              }>
              <View
                style={
                  styles.faceIcon
                }>
                <Icon
                  name="camera"
                  size={20}
                  color="#fff"
                />
              </View>

              <Text
                style={
                  styles.faceTitle
                }>
                Capture Selfie
              </Text>

              <Text
                style={
                  styles.faceSub
                }>
                Clear selfie with
                good lighting
              </Text>

              <TouchableOpacity
                style={
                  styles.cameraBtn
                }
                onPress={
                  handleFaceUpload
                }>
                <Text
                  style={
                    styles.cameraBtnText
                  }>
                  Open Camera
                </Text>
              </TouchableOpacity>

              {faceFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓ Selfie Captured
                </Text>
              )}

              <View
                style={
                  styles.instructions
                }>
                <Text
                  style={
                    styles.instructionText
                  }>
                  ✓ Whole face
                  visible
                </Text>

                <Text
                  style={
                    styles.instructionText
                  }>
                  ✓ Neutral
                  expression
                </Text>

                <Text
                  style={
                    styles.instructionText
                  }>
                  ✕ No filters
                </Text>
              </View>
            </View>
          )}

          {/* Checkbox */}
          <View
            style={
              styles.checkboxRow
            }>
            <View
              style={
                styles.checkbox
              }
            />

            <Text
              style={
                styles.checkboxText
              }>
              This information is
              used for identity
              verification only.
            </Text>
          </View>

          {/* Submit only Other IDs */}
          {activeTab ===
            'other' && (
            <TouchableOpacity
              style={
                styles.submitBtn
              }
              onPress={
                handleSubmit
              }>
              <Text
                style={
                  styles.submitBtnText
                }>
                Submit for Review
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
