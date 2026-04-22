import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

import api from '../api/axios';

/* ✅ IMPORT SEND TABS */
import SendTabs from './components/SendTabs';

/* ✅ IMPORT OTHER TAB SCREENS */
import EnterAddressScreen from './HomeScreen/enterAddress';
import Recents from './HomeScreen/Recents';

const { width } = Dimensions.get('window');

export default function ScanQRScreen({ navigation }) {
  const route = useRoute();
  const device = useCameraDevice('back');

  const [hasPermission, setHasPermission] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [torch, setTorch] = useState('off');
  const [activeTab, setActiveTab] = useState('scan');

  const scanLine = useRef(new Animated.Value(0)).current;

  // 🔥 Animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(scanLine, {
        toValue: 230,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // 🔐 Camera Permission
  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };
    getPermission();
  }, []);

  // 🔄 Tab Handling
  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params]);

  // 📷 Handle QR
  const handleQR = async (value) => {
    if (scannedData) return;

    try {
      const res = await api.post('api/wallet/scan-qr', { qrData: value });

      setScannedData({
        name: res.data.name,
        address: res.data.walletAddress,
      });
    } catch {
      alert('Invalid QR');
    }
  };

  // 🔍 Scanner
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !scannedData) {
        handleQR(codes[0].value);
      }
    },
  });

  // ❌ No Permission
  if (!device || !hasPermission) {
    return (
      <View style={styles.center}>
        <Text>No Camera Permission</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#6A00F4', '#1A0033']} style={styles.container}>

      <Text style={styles.title}>Scan QR send tokens instantly</Text>

      {/* ✅ NEW SEND TABS */}
      <SendTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ✅ TAB SWITCHING */}
      {activeTab === 'address' && (
        <EnterAddressScreen navigation={navigation} />
      )}

      {activeTab === 'recents' && (
        <Recents navigation={navigation} />
      )}

      {activeTab === 'scan' && (
        <>
          {/* 📷 CAMERA */}
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
              <View style={styles.preview}>
                <Text style={{ fontWeight: '600' }}>
                  {scannedData.name}
                </Text>
              </View>
            )}
          </View>

          {!scannedData ? (
            <Text style={styles.scanText}>Scanning QR code...</Text>
          ) : (
            <>
              <Text style={styles.success}>
                QR detected. Enter amount to proceed
              </Text>

              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() =>
                  navigation.navigate('enterAmount', {
                    name: scannedData.name,
                    address: scannedData.address,
                  })
                }
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}

          {!scannedData && (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.smallBtn}
                onPress={async () => {
                  const res = await launchImageLibrary({ mediaType: 'photo' });
                  if (res.assets?.length) {
                    handleQR('uploaded-image');
                  }
                }}
              >
                <Text style={styles.smallText}>Upload QR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() =>
                  setTorch(torch === 'off' ? 'on' : 'off')
                }
              >
                <Text style={styles.smallText}>
                  {torch === 'off' ? 'Torch' : 'Torch Off'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!scannedData && (
            <TouchableOpacity
              style={styles.simulate}
              onPress={() => handleQR('test-wallet-address')}
            >
              <Text style={{ color: '#fff' }}>Simulate Scan</Text>
            </TouchableOpacity>
          )}
        </>
      )}

    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50, // slightly reduced for better alignment with tabs
  },

  title: {
    color: '#fff',
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '500',
  },

  /* ❌ removed old tabs styles (SendTabs handles it now) */

  scanWrapper: {
    width: 260,
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  camera: {
    width: '100%',
    height: '100%',
  },

  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'lime',
  },

  preview: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },

  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },

  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },

  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },

  scanText: {
    color: '#ccc',
    marginTop: 12,
    fontSize: 13,
  },

  success: {
    color: '#00FFAA',
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },

  continueBtn: {
    backgroundColor: '#0AA84F',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    width: '70%',
    alignItems: 'center',
  },

  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  row: {
    flexDirection: 'row',
    marginTop: 20,
  },

  smallBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 8,
  },

  smallText: {
    color: '#fff',
    fontSize: 13,
  },

  simulate: {
    backgroundColor: '#8A2BE2',
    padding: 12,
    borderRadius: 10,
    width: width * 0.7,
    alignItems: 'center',
    marginTop: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});