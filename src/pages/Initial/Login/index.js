import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text, Divider } from 'react-native-paper';
import { colors } from "../../../constant/color";

import { connection } from "../../../constant/database";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("joao");
  const [password, setPassword] = useState("123");

  const url = connection.url + connection.directory;

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
          switch (json.message) {
            case "success":
              saveUserId(json.user_id);
              navigation.navigate("Main");
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
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Image
            style={{
              width: "100%",
              height: 130,
              resizeMode: "contain"
            }}
            source={require('../../../../assets/logo/logo-vertical.png')}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.main}
            dense={true}
            onChangeText={(username) => setUsername(username)}
            label="Nome Utilizador"
            style={styles.input}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.main}
            dense={true}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            label="Password"
            style={styles.input}
          />
          <Button mode="contained" style={styles.buttonLogin} title="Login" onPress={() => login()}>
            <Text style={styles.buttonLoginText}>Iniciar Sessão</Text>
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonRegisterText}>Registar conta</Text>
          </Button>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "30%",
    paddingHorizontal: "10%",
    backgroundColor: "white",
    flexGrow: 1
  },
  input: {
    marginBottom: 10,
    backgroundColor: "white",
    fontSize: 18,
  },
  buttonLogin: {
    marginVertical: 10,
    backgroundColor: colors.main
  },
  buttonLoginText: {
    padding: 5,
    fontSize: 20,
    color: colors.text
  },
  buttonRegisterText: {
    padding: 5,
    fontSize: 16,
    color: colors.main
  }
});
