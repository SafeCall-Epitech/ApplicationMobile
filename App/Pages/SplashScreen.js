import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Easing, Image, View} from 'react-native';

const SplashScreen = ({navigation}) => {

  const titleFade = useRef(new Animated.Value(0)).current;
  const backgroundFade = useRef(new Animated.Value(0)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const SlogoFade = useRef(new Animated.Value(0)).current;
  const logoMovement = useRef(new Animated.Value(0)).current;
  const topMovement = useRef(new Animated.Value(0)).current;
   
  setTimeout(() => {
      navigation.navigate('Login');
   }, 4000);

  useEffect(() => {
    Animated.timing(backgroundFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(titleFade, {
      delay: 3500,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(logoFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(SlogoFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
      
    setTimeout(() => {
      Animated.timing(logoMovement, {
        toValue: -40,
        duration: 2000,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 2250);

    setTimeout(() => {
      Animated.timing(topMovement, {
        toValue: -20,
        duration: 2000,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 2250);
    
  }, []); 
const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      color: '#DBD0C5',
      alignItems: 'center',
      position: 'absolute',
        top: -400,
        bottom: 0,
        left: 0,
        right: 0,
    },
    image: {
      resizeMode: 'contain',
      alignItems: 'center',
      width: '50%',
      opacity: logoFade,
      transform: [{translateY: logoMovement}],
    },
    bg: {
      flex: 1,
      color: '#DBD0C5',
      resizeMode: 'cover',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    title: {
      color: "#20232a",
      textAlign: "center",
      fontSize: 35,
      fontWeight: "bold",
      top: -150,
      left: 0,
      opacity: titleFade,
    },
    bottom: {
      resizeMode: 'contain',
      alignItems: 'center',
      width: '50%',
    },
    top: {
      top: 485,
      bottom: 0,
      left: -5,
      right: 100,
      resizeMode: 'contain',
      width: '50%',
      justifyContent: 'center', /* horizontally center */
      transform: [{translateY: topMovement}],
    },
  });
    
  return (
    <View style={styles.container}>
      <Animated.Image style={styles.top} source={require('../img/toplogo.png')} />
      <Animated.Image style={styles.bottom} source={require('../img/bottomlogo.png')} />
      <Animated.Text style={styles.title}>SafeCall</Animated.Text>
    </View>
  );
};

export default SplashScreen; 