import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";
import { styles } from "../../pages/Park/ParkList/styles";
import { colors } from "../../constant/color";

export default (props) => {
  const saveVehicule = async () => {
    try {
      const value = JSON.stringify(props.vehicule);
      await AsyncStorage.setItem(storage.vehicule, value);
    } catch (error) {
      alert(error);
    }
  };

  function sendTempVehicule() {
    saveVehicule().then();
    props.navigation.navigate("Vehicule", {
      vehicule: props.vehicule,
      user: props.user,
    });
  }

  function plateIsUsed() {
    if (props.state == 1) {
      return (
        <Ionicons
          style={{ marginTop: 10, marginLeft: 20 }}
          name="ios-warning"
          color={"red"}
          size={30}
        />
      );
    } else {
      return null;
    }
  }

  function setIsUsed() {
    if (props.totalSavedSpaces == props.totalSpaces) {
      return (
        <TouchableOpacity
          onPress={() => sendTempVehicule()}
          style={{ paddingHorizontal: 20 }}
        >
          <Text style={listStyles.itemTitle}>
            {props.plate} {plateIsUsed()}
          </Text>
          <Text style={listStyles.itemSubtitle}>{props.name}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => sendTempVehicule()}
        style={{ paddingHorizontal: 20 }}
      >
        <Text style={listStyles.itemTitle}>
          {props.plate} {plateIsUsed()}
        </Text>
        <Text style={listStyles.itemSubtitle}>{props.name}</Text>
      </TouchableOpacity>
    );
  }

  // function setIsFullOpacity() {
  //     if (props.totalSavedSpaces == props.totalSpaces) {
  //         return fullOpacity;
  //     }
  //     else {
  //         return freeOpacity;
  //     }
  // }

  return (
    // <View style={{ backgroundColor: setIsFullColor(), opacity: setIsFullOpacity() }}>
    <View style={{ backgroundColor: "white" }}>
      {/* <View style={{ backgroundColor: "white" }}> */}
      {setIsUsed()}
      <Divider style={{ height: 2, backgroundColor: "black" }} />
    </View>
  );
};
