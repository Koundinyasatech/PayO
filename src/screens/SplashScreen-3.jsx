import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

export default function SplashScreen3({ navigation }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(40, { duration: 1500 }, () => {
      runOnJS(goNext)();
    });
  }, []);

  const goNext = () => {
    navigation.replace('SplashScreen4'); // your next screen
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={['#7B2FF7', '#00C6FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dot}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});