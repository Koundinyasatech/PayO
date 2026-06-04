import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import styles from './KycNotStartedStyles';

export default function KycNotStarted({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      navigation.replace('Onboarding3');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={styles.safeArea}
    >
      <StatusBar
        translucent={false}
        backgroundColor="#120022"
        barStyle="light-content"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.replace('Onboarding3')}
            >
              <Icon
                name="chevron-left"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.loaderWrapper}>
            <View style={styles.loaderOuter}>
              <View style={styles.loaderInner}>
                <Icon
                  name="file-text"
                  size={30}
                  color="#fff"
                />
              </View>
            </View>

            <Text style={styles.kycText}>
              • KYC Not Started
            </Text>
          </View>

          <Text style={styles.title}>
            Complete Your KYC
          </Text>

          <Text style={styles.subTitle}>
            KYC verification has not been started yet.
            {'\n'}
            Please complete the process and upload
            {'\n'}
            the required documents.
          </Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.leftText}>
                • Account Created
              </Text>

              <Text style={styles.completedText}>
                Completed
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.leftText}>
                • Documents Uploaded
              </Text>

              <Text style={styles.pendingText}>
                Not Started
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.leftText}>
                • KYC Verification
              </Text>

              <Text style={styles.pendingText}>
                Not Started
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.leftText}>
                • Wallet Activated
              </Text>

              <Text style={styles.pendingText}>
                Pending
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('KYCVerification')}
          >
            <Text style={styles.buttonText}>
              Complete KYC
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}