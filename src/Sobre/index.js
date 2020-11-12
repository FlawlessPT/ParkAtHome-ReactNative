import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ({ route }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>
        O meu nome é: {route.params?.nome}
        Tenho {route.params?.idade}
      </Text>
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
