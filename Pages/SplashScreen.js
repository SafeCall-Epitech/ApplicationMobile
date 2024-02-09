import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing, Image, View } from 'react-native';
import Color from '../color.js';


const SplashScreen = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const scaleAnimation = Animated.timing(logoScale, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    });

    Animated.parallel([fadeInAnimation, scaleAnimation]).start();

    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.light3,
    },
    image: {
      resizeMode: 'contain',
      width: 250,
      height: 250,
      opacity: logoOpacity,
      transform: [{ scale: logoScale }],
      // tintColor: Color.dark2,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={styles.image}
        source={require('../img/SafeCallBlackPicto.png')}
      />
    </View>
  );
};

export default SplashScreen;
