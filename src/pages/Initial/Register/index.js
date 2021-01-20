import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text, Divider } from 'react-native-paper';

import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";
import { generalStyles, theme } from '../../../constant/styles';

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const url = connection.url + connection.directory;

  function register() {
    if (name != "" && username != "" && password != ""
      && contact != "" && email != "") {
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
              navigation.navigate("Login");
              break;
            case "user_already_exists":
              alert("Utilizador já existente!")
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
          <StatusBar style="auto" />
          <Image
            style={generalStyles.logo}
            source={require('../../../../assets/logo/logo-vertical.png')}
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
          <Button mode="contained" style={generalStyles.mainButton} title="Login" onPress={() => register()}>
            <Text style={generalStyles.mainButtonText}>Criar Conta</Text>
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={generalStyles.buttonRegisterOrLoginText}>Iniciar Sessão</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// import React from "react";
// import {
//   Text,
//   View,
//   Image,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// export default class Register extends React.Component {
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <KeyboardAvoidingView
//         behavior={Platform.OS == "ios" ? "padding" : "height"}
//       >
//         <View style={{ backgroundColor: "white", height: "100%" }}>
//           <Image
//             source={require("../assets/logo.png")}
//             style={{
//               //width: "70%",
//               height: "30%",
//               alignSelf: "center",
//               marginTop: "20%",
//               resizeMode: "contain",
//             }}
//           ></Image>
//           {/* input nome */}
//           <View
//             style={{
//               flexDirection: "row",
//               alignSelf: "center",
//               width: "90%",
//               borderWidth: 2,
//               marginTop: "5%",
//               paddingHorizontal: 10,
//               borderColor: "#B72727",
//               borderRadius: 20,
//               paddingVertical: 2,
//               // height: "7%",
//             }}
//           >
//             <TextInput
//               placeholder="Nome"
//               placeholderTextColor="#B72727"
//               style={{ fontSize: 15, height: 45 }}
//             ></TextInput>
//           </View>
//           {/* input email */}
//           <View
//             style={{
//               flexDirection: "row",
//               alignSelf: "center",
//               width: "90%",
//               borderWidth: 2,
//               marginTop: "3%",
//               paddingHorizontal: 10,
//               borderColor: "#B72727",
//               borderRadius: 20,
//               paddingVertical: 2,
//               // height: "7%",
//             }}
//           >
//             <TextInput
//               placeholder="Email"
//               placeholderTextColor="#B72727"
//               style={{ fontSize: 15, height: 45 }}
//             ></TextInput>
//           </View>
//           {/* input password */}
//           <View
//             style={{
//               flexDirection: "row",
//               alignSelf: "center",
//               width: "90%",
//               borderWidth: 2,
//               marginTop: "3%",
//               paddingHorizontal: 10,
//               borderColor: "#B72727",
//               borderRadius: 20,
//               // height: "7%",
//             }}
//           >
//             <TextInput
//               secureTextEntry={true}
//               placeholder="Password"
//               placeholderTextColor="#B72727"
//               style={{ fontSize: 15, height: 45 }}
//             ></TextInput>
//           </View>
//           <View
//             style={{
//               marginHorizontal: 55,
//               alignItems: "center",
//               justifyContent: "center",
//               marginTop: "5%",
//               backgroundColor: "#B72727",
//               borderRadius: 20,
//               alignSelf: "center",
//               width: "90%",
//               height: 45,
//             }}
//           >
//             <Text
//               onPress={() => navigate("InitialPage")}
//               style={{
//                 color: "white",
//                 fontWeight: "bold",
//                 fontSize: 16,
//               }}
//             >
//               Criar Conta
//             </Text>
//           </View>
//           <Text
//             onPress={() => navigate("Login")}
//             style={{
//               alignSelf: "center",
//               color: "#B72727",
//               marginTop: "4%",
//               fontWeight: "bold",
//               fontSize: 16,
//             }}
//           >
//             Iniciar Sessão
//           </Text>
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }
