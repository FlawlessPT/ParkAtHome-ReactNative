import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { FAB } from "react-native-paper";
import styles from "./styles";

export default function Methods({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Home{"\n"}</Text>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddMethod")}
      />
    </View>
  );
}
