import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";
import { styles } from "../../pages/Park/ParkList/styles";
import { colors } from "../../constant/color";

export default (props) => {
  // const fullColor = "#FF8484";
  const fullColor = "#a8a8a8";
  const freeColor = "white";

  // const fullOpacity = 0.4;
  // const freeOpacity = 1;

  const savePark = async () => {
    try {
      const value = JSON.stringify(props.park);
      await AsyncStorage.setItem(storage.park, value);
    } catch (error) {
      alert(error);
    }
  };

  function sendTempPark() {
    savePark();
    props.navigation.navigate("AdminPark", {
      park: props.park,
      user: props.user,
    });
  }

  function parkIsFull() {
    if (props.totalSavedSpaces == props.totalSpaces) {
      return (
        <MaterialCommunityIcons
          style={{ marginTop: "8%", marginLeft: 10 }}
          name="close-circle"
          color={colors.listTextDisabled}
          size={25}
        />
      );
    } else {
      return null;
    }
  }

  function setIsFullColor() {
    if (props.totalSavedSpaces == props.totalSpaces) {
      return fullColor;
    } else {
      return freeColor;
    }
  }

  function setIsEnabled() {
    if (props.totalSavedSpaces == props.totalSpaces) {
      return (
        <TouchableOpacity
          onPress={() => sendTempPark()}
          style={{
            paddingHorizontal: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: "80%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={listStyles.itemTitleDisabled}>{props.name}</Text>
              {parkIsFull()}
            </View>
            <Text style={listStyles.itemSubtitle1Disabled}>
              {props.park.address}
            </Text>
            <Text style={listStyles.itemSubtitle2Disabled}>
              {props.park.localization}
            </Text>
          </View>
          <Image
            style={styles.parkImageDisabled}
            source={require("../../../assets/parque_01.jpg")}
          />
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <TouchableOpacity
          onPress={() => sendTempPark()}
          style={{
            paddingHorizontal: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: "80%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={listStyles.itemTitle}>{props.name}</Text>
              {parkIsFull()}
            </View>
            <Text style={listStyles.itemSubtitle1}>{props.park.address}</Text>
            <Text style={listStyles.itemSubtitle2}>
              {props.park.localization}
            </Text>
          </View>
          <Image
            style={styles.parkImage}
            source={require("../../../assets/parque_01.jpg")}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    // <View style={{ backgroundColor: setIsFullColor(), opacity: setIsFullOpacity() }}>
    <View style={{ backgroundColor: setIsFullColor() }}>
      {/* <View style={{ backgroundColor: "white" }}> */}
      {setIsEnabled()}
      <Divider style={{ height: 2, backgroundColor: "black" }} />
    </View>
  );
};
