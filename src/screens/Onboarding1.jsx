import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Onboarding1({ navigation }) {
  const title = "Your Digital Wallet, Simplified";
  const letters = title.split('');

  const logoY = useRef(new Animated.Value(-80)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const skipX = useRef(new Animated.Value(80)).current;
  const skipOpacity = useRef(new Animated.Value(0)).current;

  const imageScale = useRef(new Animated.Value(0.3)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageFloat = useRef(new Animated.Value(0)).current;
  const imageRotate = useRef(new Animated.Value(-15)).current;
  const imagePulse = useRef(new Animated.Value(1)).current;

  const descX = useRef(new Animated.Value(120)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;

  const buttonScale = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const letterAnimations = useRef(
    letters.map(() => ({
      translateY: new Animated.Value(-60),
      opacity: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
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
        Animated.timing(skipX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(skipOpacity, {
          toValue: 1,
          duration: 500,
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
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(imageRotate, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),

      Animated.stagger(
        60,
        letterAnimations.map(anim =>
          Animated.parallel([
            Animated.spring(anim.translateY, {
              toValue: 0,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            }),
          ])
        )
      ),

      Animated.parallel([
        Animated.timing(descX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          friction: 4,
          tension: 120,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      startFloatingAnimation();
    });
  }, []);

  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(imageFloat, {
            toValue: -12,
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

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Animated.View
          style={{
            transform: [{ translateY: logoY }],
            opacity: logoOpacity,
          }}
        >
          <Image
            source={require('../../assets/images/LogoContainer.png')}
            style={styles.logoImage}
          />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            right: 24,
            top: 25,
            transform: [{ translateX: skipX }],
            opacity: skipOpacity,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
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
            },
          ]}
        >
          <Image
            source={require('../../assets/images/onboardingScreen2.png')}
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
                  transform: [
                    { translateY: letterAnimations[index].translateY },
                  ],
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
          Store, send & receive Payo tokens instantly.
          No bank account needed — just your phone.
        </Animated.Text>
      </View>

      {/* FOOTER */}
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Onboarding2')}
        >
          <Image
            source={require('../../assets/images/half_load.png')}
            style={styles.nextImage}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },

  skipText: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    marginBottom: 30,
  },

  mainImage: {
    width: width * 0.8,
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },

  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: width < 360 ? 24 : 28,
    fontWeight: 'bold',
    color: '#6C2BD9',
    lineHeight: 34,
  },

  description: {
    fontSize: width < 360 ? 15 : 17,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 12,
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },

  nextImage: {
    width: width < 360 ? 70 : 85,
    height: width < 360 ? 70 : 85,
    resizeMode: 'contain',
  },
});