import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Onboarding2({ navigation }) {
  const title = "Instant QR Payments";
  const letters = title.split('');

  const logoY = useRef(new Animated.Value(-80)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const skipX = useRef(new Animated.Value(-80)).current;
  const skipOpacity = useRef(new Animated.Value(0)).current;

  const imageScale = useRef(new Animated.Value(0.3)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageFloat = useRef(new Animated.Value(0)).current;
  const imageRotate = useRef(new Animated.Value(-15)).current;
  const imagePulse = useRef(new Animated.Value(1)).current;

  const descX = useRef(new Animated.Value(80)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;

  const nextScale = useRef(new Animated.Value(0)).current;
  const nextOpacity = useRef(new Animated.Value(0)).current;

  const letterAnimations = useRef(
    letters.map(() => ({
      translateY: new Animated.Value(-60),
      opacity: new Animated.Value(0),
    }))
  ).current;

  const rainCoins = useRef(
    Array.from({ length: 10 }).map(() => ({
      translateY: new Animated.Value(-height),
      translateX: new Animated.Value(Math.random() * width),
      opacity: Math.random() * 0.25 + 0.08,
      size: Math.random() * 50 + 60,
      duration: Math.random() * 5000 + 6000,
    }))
  ).current;

  useEffect(() => {
    // START COINS IMMEDIATELY
    startCoinRain();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(skipX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(skipOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(imageRotate, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.stagger(
        18,
        letterAnimations.map(anim =>
          Animated.parallel([
            Animated.spring(anim.translateY, {
              toValue: 0,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 120,
              useNativeDriver: true,
            }),
          ])
        )
      ),

      Animated.parallel([
        Animated.timing(descX, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.spring(nextScale, {
          toValue: 1,
          friction: 4,
          tension: 120,
          useNativeDriver: true,
        }),
        Animated.timing(nextOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      startImageLoop();
    });
  }, []);

  const startImageLoop = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(imageFloat, {
            toValue: -10,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(imageFloat, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(imagePulse, {
            toValue: 1.04,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(imagePulse, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  const startCoinRain = () => {
    rainCoins.forEach((coin) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(coin.translateY, {
            toValue: height + 100,
            duration: coin.duration,
            useNativeDriver: true,
          }),
          Animated.timing(coin.translateY, {
            toValue: -100,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {rainCoins.map((coin, index) => (
        <Animated.Image
          key={index}
          source={require('../../assets/images/coin.png')}
          style={{
            position: 'absolute',
            width: coin.size,
            height: coin.size,
            opacity: coin.opacity,
            transform: [
              { translateX: coin.translateX },
              { translateY: coin.translateY },
            ],
          }}
        />
      ))}

      <View style={styles.content}>
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ translateY: logoY }],
          }}
        >
          <Image
            source={require('../../assets/images/LogoContainer.png')}
            style={styles.logo}
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: imageOpacity,
            transform: [
              { scale: imageScale },
              { scale: imagePulse },
              { translateY: imageFloat },
              {
                rotate: imageRotate.interpolate({
                  inputRange: [-15, 0],
                  outputRange: ['-15deg', '0deg'],
                }),
              },
            ],
          }}
        >
          <Image
            source={require('../../assets/images/onboardingScreen1.png')}
            style={styles.mainImage}
          />
        </Animated.View>

        <View style={styles.titleContainer}>
          {letters.map((letter, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.title,
                {
                  opacity: letterAnimations[index].opacity,
                  transform: [{ translateY: letterAnimations[index].translateY }],
                },
              ]}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </Animated.Text>
          ))}
        </View>

        <Animated.Text
          style={[
            styles.description,
            {
              opacity: descOpacity,
              transform: [{ translateX: descX }],
            },
          ]}
        >
          Scan a QR code to send tokens in seconds.
          {'\n'}
          Safe, secure, and lightning-fast
          {'\n'}
          wallet-to-wallet transfers.
        </Animated.Text>
      </View>

      <View style={styles.footer}>
        <Animated.View
          style={{
            opacity: skipOpacity,
            transform: [{ translateX: skipX }],
          }}
        >
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.navigate('Onboarding4')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            opacity: nextOpacity,
            transform: [{ scale: nextScale }],
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
            <Image
              source={require('../../assets/images/full_load.png')}
              style={styles.nextImage}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.06,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  logo: {
    width: width * 0.28,
    height: height * 0.05,
    resizeMode: 'contain',
    marginBottom: height * 0.04,
  },

  mainImage: {
    width: width * 0.72,
    height: width * 0.72,
    resizeMode: 'contain',
    marginBottom: height * 0.03,
  },

  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },

  title: {
    fontSize: width < 360 ? 24 : 30,
    fontWeight: '700',
    color: '#7B4DFF',
    lineHeight: width < 360 ? 30 : 36,
  },

  description: {
    fontSize: width < 360 ? 14 : 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: height * 0.04,
    zIndex: 2,
  },

  skipBtn: {
    backgroundColor: '#C9F0FF',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.012,
    borderRadius: 14,
  },

  skipText: {
    fontSize: width < 360 ? 16 : 18,
    fontWeight: '600',
    color: '#000',
  },

  nextImage: {
    width: width < 360 ? 70 : 80,
    height: width < 360 ? 70 : 80,
    resizeMode: 'contain',
  },
});