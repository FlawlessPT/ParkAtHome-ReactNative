import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text } from 'react-native-paper';

import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";
import { storage } from "../../../constant/storage";
import { generalStyles, theme } from '../../../constant/styles';


export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url = connection.url + connection.directory;

  const saveUserId = async (userId, user) => {
    try {
      // console.log("nada nada");
      // console.log("............")
      await AsyncStorage.clear();
      // console.log(await AsyncStorage.getItem(storage.userId))
      // console.log(await AsyncStorage.getItem(storage.user));

      const value = JSON.stringify(userId);
      const userObject = JSON.stringify(user);

      // console.log("-----------")
      await AsyncStorage.setItem(storage.userId, value);
      await AsyncStorage.setItem(storage.user, userObject);

      // console.log(await AsyncStorage.getItem(storage.userId))
      // console.log(await AsyncStorage.getItem(storage.user));

      if (value != null) {
        navigation.navigate("Main");
      }
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
          switch (json.message) {
            case "success":
              saveUserId(json.user_id, json.user);
              break;
            case "login_failed":
              alert("Dados incorretos!")
              break;
            case "error":
              alert("Erro de servidor!")
              break;
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <View style={generalStyles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Image
            style={generalStyles.logo}
            source={require('../../../../assets/logo/logo-vertical.png')}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={false}
            onChangeText={(username) => setUsername(username)}
            label="Nome Utilizador"
            style={generalStyles.input}
            theme={theme}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            label="Password"
            style={generalStyles.input}
            theme={theme}
          />
          <Button mode="contained" style={generalStyles.mainButton} title="Login" onPress={() => login()}>
            <Text style={generalStyles.mainButtonText}>Iniciar Sessão</Text>
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={generalStyles.buttonRegisterOrLoginText}>Registar conta</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
