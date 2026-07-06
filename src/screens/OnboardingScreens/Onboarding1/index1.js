import React from 'react';
import { View, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Components
import Header from './components/Header1';
import Logo from './components/Logo1';
import HeroIllustration from './components/HeroIllustration1';
import Typography from './components/Typography1';
import FeatureGrid from './components/FeatureGrid1';
import Footer from './components/Footer1';

const { width, height } = Dimensions.get('window');

export default function Onboarding1({ navigation }) {
  
  const handleSkip = () => {
    navigation.navigate('Onboarding3'); 
  };

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* 🚨 FULL SCREEN CITY BACKGROUND */}
      <Image 
        source={require('../../../../assets/images/city.png')} 
        style={styles.backgroundImage} 
      />
      
      <View style={styles.content}>
        <Header onSkip={handleSkip} />
        <Logo />
        <HeroIllustration />
        <Typography />
        <FeatureGrid />
      </View>

      <Footer onSkip={handleSkip} onNext={handleNext} />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height,
    resizeMode: 'cover', // Ensures the image scales to fit the screen without distortion
    zIndex: 0, // Keeps it behind everything else
  },
  content: {
    flex: 1,
    zIndex: 1, 
  },
});