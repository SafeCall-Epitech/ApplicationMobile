import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnimatedText = props => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Ajouter un point à la fin de la chaîne de points
      setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500);

    // Nettoyer l'intervalle lorsqu'on quitte le composant
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bonjour {props.userName}</Text>
      <Text style={styles.appointments}>
        Vous avez 3 rendez-vous aujourd'hui
        {/* Vous avez {props.RDVN} rendez-vous{dots} */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 150,
    left: 0,
    right: 0,

  },
  greeting: {
    fontSize: 35,
    color: 'black',
  },
  appointments: {
    fontSize: 22,
    color: 'black',
    marginTop: 10,
  },
});

export default AnimatedText;
