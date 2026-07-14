import React from 'react';
import { View, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Components
import Header from './components/Header2';
import Logo from './components/Logo2';
import HeroIllustration from './components/HeroIllustration2';
import Typography from './components/Typography2';
import FeatureGrid from './components/FeatureGrid2';
import Footer from './components/Footer2';

const { width, height } = Dimensions.get('window');

// 👇 Updated function name to Onboarding2
export default function Onboarding2({ navigation }) {
  
  const handleSkip = () => {
    navigation.navigate('Onboarding3'); 
  };

  const handleNext = () => {
    navigation.navigate('Onboarding3'); 
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* 🚨 FULL SCREEN WAVE BACKGROUND */}
      <Image 
        source={require('../../../../assets/images/waves.png')} 
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
    resizeMode: 'cover',
    zIndex: 0, // Keeps it behind everything else
  },
  content: {
    flex: 1,
    zIndex: 1, 
  },
});