import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HistoryList({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>History{"\n"}</Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate("History")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
