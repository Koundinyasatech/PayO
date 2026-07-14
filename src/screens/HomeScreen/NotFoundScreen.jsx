import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const NotFoundScreen = () => {
  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>404 ERROR</Text>
          <Icon name="code-outline" size={20} color="#00C853" />
        </View>

        {/* Illustration */}
   

        {/* Text Content */}
        <Text style={styles.oopsText}>Oops....</Text>
        <Text style={styles.titleText}>Page not found</Text>
        <Text style={styles.messageText}>
          The page you were looking for does not exist!{'\n'}
          We suggest you go back to home.
        </Text>

             <Image
          source={require('../../../assets/images/biomatric/Ilustration.png')}
          style={styles.errorImage}
          resizeMode="contain"
        />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={goBackToHome}>
          <Text style={styles.buttonText}>← Back To Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  errorImage: {
    width: width * 0.65,
    height: width * 0.65,
    marginBottom: 20,
  },
  oopsText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7B2FF7',
    marginBottom: 8,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#7B2FF7',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotFoundScreen;
