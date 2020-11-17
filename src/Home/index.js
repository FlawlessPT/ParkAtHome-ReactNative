import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Home{"\n"}</Text>
      <Button
        title="Perfil"
        onPress={() =>
          navigation.navigate("Perfil", { nome: "João", idade: "19" })
        }
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
