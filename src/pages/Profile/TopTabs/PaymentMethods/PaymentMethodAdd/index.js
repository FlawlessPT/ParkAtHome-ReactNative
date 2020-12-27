import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { generalStyles } from "../../../../../constant/styles";

export default function AddPaymentMethod({ navigation }) {
  return (
    <View style={generalStyles.container}>
      <StatusBar style="auto" />
      <Text>Add{"\n"}</Text>
    </View>
  );
}
