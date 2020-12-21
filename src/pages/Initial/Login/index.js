import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";

import { connection } from "../../../constant/database";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url = connection.url + connection.directory;

  // function register() {
  //   fetch(url + "/Register.php", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       password: password,
  //     }),
  //   });
  // }

  const saveUserId = async (userId) => {
    try {
      const value = JSON.stringify(userId);
      await AsyncStorage.setItem("user_id", value);
    } catch (error) {
      alert(error);
    }
  };

  function login() {
    if (username != "" && password != "") {
      fetch(url + "/Login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          // alert(json.message + "\n" + json.user_id);
          saveUserId(json.user_id);
          navigation.navigate("Main");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="email-address"
        onChangeText={(username) => setUsername(username)}
        placeholder="username"
        placeholderTextColor="gray"
        style={styles.input}
      />
      <TextInput
        onChangeText={(password) => setPassword(password)}
        placeholder="password"
        secureTextEntry={true}
        placeholderTextColor="gray"
        style={styles.input}
      />
      <Button title="Login" onPress={() => login()}></Button>
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
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    color: "black",
  },
});
