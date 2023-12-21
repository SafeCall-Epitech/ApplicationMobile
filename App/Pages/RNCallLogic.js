import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { RTCView, getUserMedia } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';

const MyComponent = () => {
  const [stream, setStream] = useState(null);
  const myVideo = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
        try {
            InCallManager.start({media: 'audio'});
            InCallManager.setForceSpeakerphoneOn(true);
            InCallManager.setSpeakerphoneOn(true);
          } catch (err) {
            console.log('InApp Caller ---------------------->', err);
          }
    };

    getMedia();
  }, []);

  return (
    <View>
        <RTCView
            ref={myVideo}
            style={{ width: 200, height: 200 }}
            streamURL={stream && stream.toURL()}
        />
    </View>
  );
};

export default MyComponent;
