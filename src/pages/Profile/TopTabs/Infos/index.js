import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Image, ScrollView } from "react-native";
import { FAB, TextInput, Button, Divider } from "react-native-paper";
import { styles } from "./styles";

import { colors } from "../../../../constant/color";
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
        setName(value[0].name);
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
        setContact(value[0].contact);
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
        setEmail(value[0].email);
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
        setPassword(value[0].password);
      }
    }
    catch (error) {
      alert(error);
    }
  }

  async function getUser() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setUser(value);
      }
    }
    catch (error) {
      alert(error);
    }
  }

  function getData() {
    getName();
    getContact();
    getEmail();
    getPassword();
    getUser();
  }

  async function updateStorage() {
    // console.log(user || "oi");
    // alert(user[0].name);
    // console.log(user[0].isAdmin);
    try {
      user[0].name = name;
      user[0].contact = contact;
      user[0].email = email;
      user[0].password = password;

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
    updateStorage();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", e => {
      disable();
      getData();
    })

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={generalStyles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
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
            underlineColor={colors.main}//TODO: FIX INPUT STYLES
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
