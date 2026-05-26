
import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import DocumentPicker from 'react-native-document-picker';

export default function KYCVerification({
  navigation,
}) {
  const [activeTab, setActiveTab] =
    useState('aadhaar');

  const [selectedDoc, setSelectedDoc] =
    useState('');

  const [aadhaarFile, setAadhaarFile] =
    useState(null);

  const [panFile, setPanFile] =
    useState(null);

  const [faceFile, setFaceFile] =
    useState(null);

  // Upload Aadhaar / PAN PDF
//   const handleDocumentUpload =
//     async () => {
//       try {
//         // const result =
//         //   await DocumentPickeR.pick(
//         //     {
//         //       type: [
//         //         DocumentPicker
//         //           .types.pdf,
//         //       ],
//         //     },
//         //   );

//         // if (
//         //   activeTab ===
//         //   'aadhaar'
//         // ) {
//         //   setAadhaarFile(
//         //     result[0],
//         //   );

//         //   // Auto move to PAN
//         //   setTimeout(() => {
//         //     setActiveTab(
//         //       'pan',
//         //     );
//         //   }, 800);
//         // } else {
//         //   setPanFile(
//         //     result[0],
//         //   );
//         // }
//       } catch (err) {
//         if (
//           !DocumentPicker.isCancel(
//             err,
//           )
//         ) {
//           console.log(err);
//         }
//       }
//     };



// const handleDocumentUpload = async () => {
//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//     });

//     if (!result.didCancel && result.assets?.length > 0) {
//       setForm({
//         ...form,
//         bankProof: result.assets[0],
//       });
//     }
//   };

const handleDocumentUpload = async () => {
  try {
    // Open picker for PDF
    const pdfResult = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });

    // If PDF selected
    if (pdfResult && pdfResult.length > 0) {
      const file = pdfResult[0];

      if (activeTab === 'aadhaar') {
        setAadhaarFile(file);
      } else {
        setPanFile(file);
      }

      return;
    }
  } catch (err) {
    // If user cancels PDF picker
    if (!DocumentPicker.isCancel(err)) {
      console.log(err);
    }
  }

  // Open image picker
  const imageResult = await launchImageLibrary({
    mediaType: 'photo',
    quality: 0.8,
  });

  if (
    !imageResult.didCancel &&
    imageResult.assets?.length > 0
  ) {
    const file = imageResult.assets[0];

    if (activeTab === 'aadhaar') {
      setAadhaarFile(file);
    } else {
      setPanFile(file);
    }
  }
};

  // Selfie Camera
  const handleFaceUpload = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
      },
      response => {
        if (
          !response.didCancel &&
          response.assets
        ) {
          setFaceFile(
            response.assets[0],
          );
        }
      },
    );
  };

  // Final Submit
  const handleSubmit = () => {
    if (!panFile) {
      Alert.alert(
        'Upload PAN PDF',
      );
      return;
    }

    navigation.navigate('Main');
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
            Upload your Aadhaar
            and PAN card PDFs to
            complete KYC
            verification.
          </Text>

          {/* Tabs */}
          <Text style={styles.label}>
            DOCUMENT TYPE
          </Text>

          <View
            style={
              styles.tabContainer
            }>
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
          </View>

          {/* Dropdown */}
          <TextInput
            placeholder="Voter ID / Passport / Driving License"
            placeholderTextColor="#ccc"
            value={selectedDoc}
            onChangeText={
              setSelectedDoc
            }
            style={styles.dropdown}
          />

          {/* Upload PDF */}
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
                name="file-text"
                size={22}
                color="#fff"
              />
            </View>

            <Text
              style={
                styles.uploadTitle
              }>
              Upload{' '}
              {activeTab ===
              'aadhaar'
                ? 'Aadhaar PDF'
                : 'PAN PDF'}
            </Text>

            <Text
              style={
                styles.uploadInfo
              }>
              Only PDF format
              accepted
            </Text>

            {/* Aadhaar PDF */}
            {activeTab ===
              'aadhaar' &&
              aadhaarFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓{' '}
                  {
                    aadhaarFile.name
                  }
                </Text>
              )}

            {/* PAN PDF */}
            {activeTab ===
              'pan' &&
              panFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓ {panFile.name}
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
              used only for KYC
              verification.
            </Text>
          </View>

          {/* Submit only PAN */}
          {activeTab ===
            'pan' && (
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#120022',
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    padding: 22,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginTop: 10,
  },

  heading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  subText: {
    color: '#ddd',
    marginTop: 20,
    lineHeight: 22,
    fontSize: 14,
  },

  label: {
    color: '#ccc',
    marginTop: 25,
    marginBottom: 12,
    fontSize: 12,
    letterSpacing: 1,
  },

  tabContainer: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.3)',
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#fff',
  },

  tabText: {
    color: '#fff',
    fontWeight: '600',
  },

  activeTabText: {
    color: '#6A00FF',
  },

  dropdown: {
    height: 52,
    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 22,
    backgroundColor:
      'rgba(255,255,255,0.06)',
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#8B5CFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#6F2BFF',
    marginBottom: 24,
  },

  uploadIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1BCBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  uploadTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  uploadInfo: {
    color: '#ddd',
    marginTop: 8,
    fontSize: 13,
  },

  fileName: {
    color: '#fff',
    marginTop: 16,
    fontSize: 13,
    fontWeight: '600',
  },

  faceBox: {
    borderWidth: 3,
    borderColor: '#11CFFF',
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#5B1DD6',
  },

  faceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  faceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  faceSub: {
    color: '#ddd',
    marginTop: 8,
    fontSize: 13,
  },

  cameraBtn: {
    backgroundColor: '#11CFFF',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 18,
    alignItems: 'center',
  },

  cameraBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  instructions: {
    marginTop: 20,
  },

  instructionText: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 13,
  },

  checkboxRow: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },

  checkbox: {
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginRight: 10,
  },

  checkboxText: {
    color: '#ddd',
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },

  submitBtn: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },

  submitBtnText: {
    color: '#5A00D1',
    fontWeight: '700',
    fontSize: 16,
  },
});
 