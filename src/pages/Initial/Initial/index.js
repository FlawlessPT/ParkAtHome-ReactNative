import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Initial({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Initial{"\n"}</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      ></Button>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
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
