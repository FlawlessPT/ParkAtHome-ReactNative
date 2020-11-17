import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.divider}></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Infos")}
      >
        <Text style={styles.text}>Infos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Vehicules")}
      >
        <Text style={styles.text}>Vehicules</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Payments")}
      >
        <Text style={styles.text}>Payments</Text>
      </TouchableOpacity>
    </View>
  );
}
