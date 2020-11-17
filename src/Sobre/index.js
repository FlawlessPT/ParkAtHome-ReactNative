import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Sobre({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Sobre</Text>
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
