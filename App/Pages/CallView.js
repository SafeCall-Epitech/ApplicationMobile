import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const MyWebComponent = ({navigation}) => {

  const route = useRoute();
  const CallWith = route.params?.guest;
  const Caller = route.params?.UserName;
  return <WebView source={{ uri: `https://safecall-web.vercel.app/mobile_call/${CallWith}/${Caller}`, javaScriptEnabled: true, DOMdomStorageEnabled: true, originWhitelist: ["https://*"], mixedContentMode: "always",}} style={{ flex: 1 }} />;
}

export default MyWebComponent