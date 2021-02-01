import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";

export default (props) => {
  const saveHistory = async () => {
    try {
      const value = JSON.stringify(props.history);
      await AsyncStorage.setItem(storage.history, value);
    } catch (error) {
      alert(error);
    }
  };

  function sendTempHistory() {
    saveHistory();
    props.navigation.navigate("History", {
      history: props.history,
      user: props.user,
    });
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => sendTempHistory()}
        style={{ paddingHorizontal: 20 }}
      >
        <View style={{ width: "70%" }}>
          <Text style={listStyles.itemTitle}>{props.history.park}</Text>
          <Text style={listStyles.itemSubtitle1}>{props.history.vehicule}</Text>
          <Text style={listStyles.itemSubtitle2}>
            {props.history.paymentMethod}
          </Text>
        </View>
      </TouchableOpacity>
      <Divider style={{ height: 2, backgroundColor: "black" }} />
    </View>
  );
};
