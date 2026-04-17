import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import api from '../api/axios';

const { width } = Dimensions.get('window');

export default function QRScannerScreen({ navigation }) {
  const route = useRoute();
  const currentRoute = route.name;

  const device = useCameraDevice('back');

  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [torch, setTorch] = useState('off');

  const scanLine = useRef(new Animated.Value(0)).current;

  /* ---------- ANIMATION ---------- */
  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(scanLine, {
        toValue: 230,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, []);

  /* ---------- CAMERA PERMISSION ---------- */
  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  /* ---------- GALLERY PERMISSION (FIXED) ---------- */
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  /* ---------- PICK IMAGE (FIXED) ---------- */
  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) {
      Alert.alert('Permission denied');
      return;
    }

    try {
      console.log('Opening gallery...');

      const res = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      console.log('PICKER RESULT:', res);

      if (res.didCancel) {
        console.log('User cancelled');
        return;
      }

      if (res.errorCode) {
        console.log('Image Picker Error:', res.errorMessage);
        Alert.alert('Error opening gallery');
        return;
      }

      if (res.assets && res.assets.length > 0) {
        const imageUri = res.assets[0].uri;

        console.log('Selected Image URI:', imageUri);

        // TEMP CONFIRMATION
        Alert.alert('Image selected successfully');

        // 👉 FUTURE: you can send this to backend or decode QR
      }
    } catch (err) {
      console.log('Picker crash:', err);
    }
  };

  /* ---------- HANDLE QR ---------- */
  const handleQR = async (value) => {
    console.log('SCANNED VALUE:', value);

    try {
      if (scannedData) return;

      const res = await api.post('/scan', { qrData: value });

      setScannedData({
        name: res.data.name,
        walletAddress: res.data.walletAddress,
      });
    } catch (err) {
      console.log('SCAN ERROR:', err?.response?.data || err);
      Alert.alert(err?.response?.data?.message || 'Invalid QR Code');
    }
  };

  /* ---------- QR SCANNER ---------- */
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !scannedData) {
        handleQR(codes[0].value.trim());
      }
    },
  });

  /* ---------- TABS ---------- */
  const tabs = [
    { name: 'Scanner', label: 'Scan QR' },
    { name: 'EnterAddress', label: 'Enter Address' },
    { name: 'Recents', label: 'Recents' },
  ];

  if (!device || hasPermission === null) return null;
  if (!hasPermission) return <Text>No Camera Permission</Text>;

  return (
    <LinearGradient colors={['#6A00F4', '#1A0033']} style={styles.container}>
      <Text style={styles.title}>Scan QR send tokens instantly</Text>

      {/* ---------- TABS ---------- */}
      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const isActive = currentRoute === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabBtn, isActive && styles.activeTabBtn]}
              onPress={() => {
                if (tab.name !== currentRoute) {
                  navigation.navigate(tab.name);
                }
              }}
            >
              <Text
                style={[styles.tabText, isActive && styles.activeTabText]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ---------- CAMERA ---------- */}
      <View style={styles.scanWrapper}>
        {!scannedData && (
          <Camera
            style={styles.camera}
            device={device}
            isActive={!scannedData}
            torch={torch}
            codeScanner={codeScanner}
          />
        )}

        {!scannedData && (
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY: scanLine }] },
            ]}
          />
        )}

        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />

        {scannedData && (
          <View style={styles.qrPreview}>
            <Text style={{ color: 'black', fontWeight: '600' }}>
              {scannedData.name}
            </Text>
          </View>
        )}
      </View>

      {/* ---------- TEXT ---------- */}
      {!scannedData ? (
        <Text style={styles.scanText}>Scanning QR code...</Text>
      ) : (
        <>
          <Text style={styles.successText}>
            QR detected. Enter amount to proceed
          </Text>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() =>
              navigation.navigate('EnterAddress', {
                address: scannedData.walletAddress,
                name: scannedData.name,
              })
            }
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {/* ---------- BUTTONS ---------- */}
      {!scannedData && (
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.smallButton} onPress={pickImage}>
            <Text style={styles.smallButtonText}>Upload QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => {
              if (device?.hasTorch) {
                setTorch(torch === 'off' ? 'on' : 'off');
              } else {
                Alert.alert('Torch not available');
              }
            }}
          >
            <Text style={styles.smallButtonText}>
              {torch === 'off' ? 'Torch ON' : 'Torch OFF'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.simulateBtn}
        onPress={() => handleQR('test-wallet-address')}
      >
        <Text style={styles.simulateText}>Simulate Scan</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },

  title: { color: 'white', marginBottom: 20 },

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#6A00F4',
    borderRadius: 12,
    padding: 5,
    marginBottom: 30,
    width: '90%',
  },

  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },

  activeTabBtn: {
    backgroundColor: 'white',
  },

  tabText: { color: 'white' },

  activeTabText: {
    color: '#6A00F4',
    fontWeight: '600',
  },

  scanWrapper: {
    width: 260,
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: { width: '100%', height: '100%' },

  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'lime',
  },

  qrPreview: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cornerTL: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTopWidth: 3, borderLeftWidth: 3, borderColor: 'white' },
  cornerTR: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderTopWidth: 3, borderRightWidth: 3, borderColor: 'white' },
  cornerBL: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: 'white' },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottomWidth: 3, borderRightWidth: 3, borderColor: 'white' },

  scanText: { color: '#ccc', marginTop: 10 },

  successText: { color: '#00FFAA', marginTop: 15 },

  continueBtn: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '70%',
    alignItems: 'center',
  },

  continueText: { color: '#fff', fontWeight: '600' },

  buttonsRow: { flexDirection: 'row', marginVertical: 15 },

  smallButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },

  smallButtonText: { color: 'white' },

  simulateBtn: {
    backgroundColor: '#8A2BE2',
    padding: 12,
    borderRadius: 10,
    width: width * 0.7,
    alignItems: 'center',
    marginTop: 20,
  },

  simulateText: { color: 'white' },
});