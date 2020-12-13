import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text
        style={{
          fontFamily: "Aldrich_Regular",
          fontSize: 64,
        }}
      >
        Login{"\n"}
      </Text>
      <Button
        title="Iniciar Sessão"
        onPress={() => navigation.navigate("Main")}
      ></Button>
      <Button
        title="Registar"
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
