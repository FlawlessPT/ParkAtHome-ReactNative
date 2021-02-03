import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";

export default (props) => {
  const saveSavedSpace = async () => {
    try {
      const value = JSON.stringify(props.savedSpace);
      await AsyncStorage.setItem(storage.savedSpace, value);
    } catch (error) {
      console.log(error);
    }
  };

  function sendTempSavedSpace() {
    saveSavedSpace().then();
    props.navigation.navigate("SavedSpace", {
      savedSpace: props.savedSpace,
      user: props.user,
    });
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => sendTempSavedSpace()}
        style={{ paddingHorizontal: 20 }}
      >
        <Text style={listStyles.itemTitle}>
          {props.savedSpace.vehicule} ({props.savedSpace.pricePerHour})
        </Text>
        <Text style={listStyles.itemSubtitle}>{props.savedSpace.saved_at}</Text>
      </TouchableOpacity>
      <Divider style={{ height: 2, backgroundColor: "black" }} />
    </View>
  );
};
