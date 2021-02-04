import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";

export default (props) => {
  const savePaymentMethod = async () => {
    try {
      const value = JSON.stringify(props.paymentMethod);
      await AsyncStorage.setItem(storage.paymentMethod, value);
    } catch (error) {
      console.log(error);
    }
  };

  function sendTempPaymentMethod() {
    savePaymentMethod().then();
    props.navigation.navigate("PaymentMethod", {
      paymentMethod: props.paymentMethod,
      user: props.user,
    });
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => sendTempPaymentMethod()}
        style={{ paddingHorizontal: 20 }}
      >
        <Text style={listStyles.itemTitle}>{props.name}</Text>
        <Text style={listStyles.itemSubtitle}>{props.description}</Text>
      </TouchableOpacity>
      <Divider style={{ height: 2, backgroundColor: "black" }} />
    </View>
  );
};
