import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const MyWebComponent = ({navigation}) => {

  const route = useRoute();
  const CallWith = route.params?.guest;
  const Caller = route.params?.UserName;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: `https://safecall-web.vercel.app/phonecall/${CallWith}/${Caller}` }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 30,
          backgroundColor: 'red',
          borderRadius: 5,
          // alignSelf: 'center',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
         <Icon size={20} name="phone-slash"/>
        {/* <Text style={{ color: 'white' }}>Your Button</Text> */}
      </TouchableOpacity>
    </View>
  );
}

export default MyWebComponent