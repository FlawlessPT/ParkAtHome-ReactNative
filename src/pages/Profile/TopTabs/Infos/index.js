import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, KeyboardAvoidingView, Image, ScrollView } from "react-native";
import { FAB, TextInput, Button, Divider } from "react-native-paper";
import { styles } from "./styles";

import { colors } from "../../../../constant/color";
import { connection } from "../../../../constant/database";
import { generalStyles } from "../../../../constant/styles";
import { themeProfile } from "../../../../constant/styles";
import { storage } from "../../../../constant/storage";


export default function Infos({ navigation }) {
  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(themeProfile.disable);

  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = connection.url + connection.directory;

  function enable() {
    setEditable(true);
    setInputStyle(themeProfile.enable);
  }

  function disable() {
    setEditable(false);
    setInputStyle(themeProfile.disable);
  }

  async function getName() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setName(value.name);
      }
    }
    catch (error) {
      alert(error);
    }
  }

  async function getContact() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setContact(value.contact);
      }
    }
    catch (error) {
      alert(error);
    }
  }

  async function getEmail() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setEmail(value.email);
      }
    }
    catch (error) {
      alert(error);
    }
  }

  async function getPassword() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setPassword(value.password);
      }
    }
    catch (error) {
      alert(error);
    }
  }

  // async function getUser() {
  //   try {
  //     let value = await AsyncStorage.getItem(storage.user);
  //     value = JSON.parse(value);
  //     if (value != null) {
  //       setUser(value);
  //     }
  //   }
  //   catch (error) {
  //     alert(error);
  //   }
  // }

  function getData() {
    getName();
    getContact();
    getEmail();
    getPassword();
  }

  async function updateStorage() {
    // console.log(user || "oi");
    // alert(user.name);
    // console.log(user.isAdmin);
    try {
      user.name = name;
      user.contact = contact;
      user.email = email;
      user.password = password;

      let newUser = user;

      newUser = JSON.stringify(newUser);

      await AsyncStorage.setItem(storage.user, newUser);
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      console.log(value);
    }
    catch (error) {
      alert(error);
    }
  }

  function updateData() {
    updateDatabase();
  }

  function updateDatabase() {
    // alert(user.id + name + contact + email + password);
    if (name != "" && contact != "" && email != "" &&
      password != "") {
      fetch(url + "/Users/Update.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: name,
          contact: contact,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "success") {
            updateStorage();
            alert("Atualizado com sucesso!")
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  let isRendered = useRef(false);

  useEffect(() => {
    async function getAsyncUser() {
      try {
        let id = await AsyncStorage.getItem(storage.user);
        id = JSON.parse(id);

        if (id != null) {
          setUser(id);
        }
      } catch (error) {
        alert(error);
      }
    }

    getAsyncUser().then();
  }, []);

  useEffect(() => {
    if (user) {
      disable();
      getData();
    }
  }, [user]);

  // useEffect(() => {
  //   isRendered = true;
  //   const unsubscribe = navigation.addListener("focus", e => {
  //     disable();
  //     getData();
  //   })
  //   return () => {
  //     isRendered = false;
  //     unsubscribe;
  //   };
  // }, []);

  return (
    <View style={{
      justifyContent: "center",
      backgroundColor: "white",
      flexGrow: 1
    }}>
      <KeyboardAvoidingView>
        <ScrollView style={{ paddingHorizontal: "10%" }}>
          <Image
            style={styles.logo}
            source={require('../../../../../assets/profile-icon.png')}
          />
          <Divider style={{
            height: 3,
            backgroundColor: "black",
            marginVertical: 20,
          }} />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(name) => setName(name)}
            label="Nome"
            value={name}
            editable={editable}
            style={generalStyles.input}
            theme={inputStyle}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(contact) => setContact(contact)}
            label="Contacto"
            value={contact}
            editable={editable}
            style={generalStyles.input}
            theme={inputStyle}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(email) => setEmail(email)}
            label="Email"
            value={email}
            editable={editable}
            style={generalStyles.input}
            theme={inputStyle}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            label="Password"
            value={password}
            editable={editable}
            style={generalStyles.input}
            theme={inputStyle}
          />
          <Button mode="contained" style={generalStyles.mainButton} title="Login" onPress={() => updateData()}>
            <Text style={generalStyles.mainButtonText}>Atualizar Dados</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
      <FAB
        style={generalStyles.fab}
        icon="square-edit-outline"
        onPress={() => enable()}
      />
    </View>
  );
}
