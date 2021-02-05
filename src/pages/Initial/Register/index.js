import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  Button,
  TextInput,
  Text,
  Provider,
  Portal,
  Modal,
} from "react-native-paper";

import MyAlert from "../../../components/Alert/OkAlert";

import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";
import { generalStyles, theme } from "../../../constant/styles";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const url = connection.url + connection.directory;

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Erro");
  const [type, setType] = useState("error");

  const showModal = (message, type) => {
    setMessage(message);
    setType(type);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  function register() {
    if (
      name != "" &&
      username != "" &&
      password != "" &&
      contact != "" &&
      email != ""
    ) {
      fetch(url + "/Register.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          password: password,
          contact: contact,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          switch (json.message) {
            case "success":
              Alert.alert(
                "Sucesso",
                "Utilizador registado com sucesso!\n\nPara prosseguir, inicie sessão.",
                [{ text: "OK" }],
                { cancelable: true }
              );
              navigation.navigate("Login");
              break;
            case "user_already_exists":
              showModal("Utilizador já existente!", "warning");
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
            <StatusBar style="auto" />
            <Image
              style={generalStyles.logo}
              source={require("../../../../assets/logo/logo-vertical.png")}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              onChangeText={(name) => setName(name)}
              label="Nome"
              style={generalStyles.input}
              theme={theme}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              onChangeText={(contact) => setContact(contact)}
              label="Contacto"
              style={generalStyles.input}
              theme={theme}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              onChangeText={(email) => setEmail(email)}
              label="Email"
              style={generalStyles.input}
              theme={theme}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
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
              onPress={() => register()}
            >
              <Text style={generalStyles.mainButtonText}>Criar Conta</Text>
            </Button>
            <Button mode="text" onPress={() => navigation.navigate("Login")}>
              <Text style={generalStyles.buttonRegisterOrLoginText}>
                Iniciar Sessão
              </Text>
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
}
