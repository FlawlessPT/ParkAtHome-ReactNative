import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, Modal, Provider, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { colors } from "../../constant/color";
import { generalStyles, theme } from "../../constant/styles";
// import { styles } from "./styles";

export default (props) => {
  let icon;
  const iconSize = 70;
  const textSize = 20;

  const message = (
    <Text
      style={{
        fontFamily: "Aldrich_Regular",
        fontSize: textSize,
        textAlign: "center",
      }}
    >
      {props.message}
    </Text>
  );

  function setIcon() {
    switch (props.type) {
      case "success":
        return (
          <Ionicons name="ios-checkmark-circle" size={iconSize} color="green" />
        );
      case "warning":
        return <Ionicons name="ios-warning" size={iconSize} color="tomato" />;
      case "error":
        return <Ionicons name="ios-close-circle" size={iconSize} color="red" />;
    }
  }

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      contentContainerStyle={{
        borderRadius: 1,
        borderWidth: 2,
        width: 300,
        backgroundColor: "white",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          padding: 20,
          alignItems: "center",
        }}
      >
        {/* <Animatable.View animation="bounceInDown" useNativeDriver={true}> */}
        {setIcon()}
        {/* </Animatable.View> */}
        {message}
        <TouchableOpacity
          style={{
            marginTop: 5,
            alignSelf: "flex-end",
          }}
          onPress={props.onDismiss}
        >
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontFamily: "Aldrich_Regular",
              color: colors.secondary,
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
