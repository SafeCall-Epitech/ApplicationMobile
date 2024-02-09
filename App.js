import React from "react";
import Navigation from "./Pages/Navigation"
import { View, Text } from "react-native";
import { fetch } from "react-native-ssl-pinning";

const App = () => {

  // const fetchData = () => {
  //   fetch('https://x2024safecall3173801594000.westeurope.cloudapp.azure.com/profile/Theau', {
  //     method: "GET",
  //     timeoutInterval: 10000,
  //     sslPinning: {
  //       certs: ['certificate'],
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log("ERROR : " + err);
  //   })
  // }

  // fetchData();

  return (
    <Navigation/>
    );
};

export default App;
