import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Perfil({ route }) {
  return (
    <View style={styles.container}>
      <Text>
        O meu nome é: {route.params?.nome} e tenho {route.params?.idade} anos :D
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
