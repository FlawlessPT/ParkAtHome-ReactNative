import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text, Provider, Portal } from "react-native-paper";

import MyAlert from "../../../components/Alert/OkAlert";

import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";
import { storage } from "../../../constant/storage";
import { generalStyles, theme } from "../../../constant/styles";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Erro");
  const [type, setType] = useState("error");

  const showModal = (message, type) => {
    setMessage(message);
    setType(type);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const url = connection.url + connection.directory;

  const saveUser = async (user, userType) => {
    try {
      await AsyncStorage.clear();

      const userObject = JSON.stringify(user);
      await AsyncStorage.setItem(storage.user, userObject);

      if (userType == "admin") {
        navigation.navigate("AdminParkList");
      } else {
        navigation.navigate("Main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function login() {
    // navigation.navigate("Main");
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
              saveUser(json.user, json.userType);
              break;
            case "login_failed":
              showModal("Dados incorretos!", "warning");
              break;
            case "error":
              showModal("Erro de servidor!", "error");
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showModal("Preencha todos os campos!", "warning");
    }
  }

  return (
    <Provider>
      <View style={generalStyles.container}>
        <KeyboardAvoidingView>
          <ScrollView>
            <Portal>
              <MyAlert
                visible={visible}
                type={type}
                message={message}
                onDismiss={hideModal}
                navigation={navigation}
              />
            </Portal>
            <Image
              style={generalStyles.logo}
              source={require("../../../../assets/logo/logo-vertical.png")}
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
            <Button
              mode="contained"
              style={generalStyles.mainButton}
              title="Login"
              // onPress={showModal}
              onPress={() => login()}
            >
              <Text style={generalStyles.mainButtonText}>Iniciar Sessão</Text>
            </Button>
            <Button mode="text" onPress={() => navigation.navigate("Register")}>
              <Text style={generalStyles.buttonRegisterOrLoginText}>
                Registar conta
              </Text>
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
}
