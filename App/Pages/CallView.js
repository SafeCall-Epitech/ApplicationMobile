import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const MyWebComponent = ({navigation}) => {

  const route = useRoute();
  const CallWith = route.params?.guest;
  const Caller = route.params?.UserName;
  return (
    <WebView
      source={{ uri: `https://safecall-web.vercel.app/phonecall/${CallWith}/${Caller}` }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      mediaPlaybackRequiresUserAction={false}  // Permet la lecture automatique du son et de la vidéo
    />
  );
}

export default MyWebComponent