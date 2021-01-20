import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { BackHandler, View } from "react-native";

import Routes from "./navigation/";

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  componentDidMount() {
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.loadFonts();
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  // }

  async loadFonts() {
    await Font.loadAsync({
      Aldrich_Regular: require("../assets/fonts/Aldrich-Regular.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </View>
    );
  }
}
