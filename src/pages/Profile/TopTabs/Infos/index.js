import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { FAB, TextInput, Button, Divider } from "react-native-paper";
import { styles } from "./styles";

import { colors } from "../../../../constant/color";
import { connection } from "../../../../constant/database";
import { generalStyles } from "../../../../constant/styles";
import { themeProfile } from "../../../../constant/styles";
import { storage } from "../../../../constant/storage";

import * as Animatable from "react-native-animatable";

export default function Infos({ navigation }) {
  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(themeProfile.disable);

  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

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
    } catch (error) {
      console.log(error);
    }
  }

  async function getContact() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setContact(value.contact);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmail() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setEmail(value.email);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPassword() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
      if (value != null) {
        setPassword(value.password);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getData() {
    getName();
    getContact();
    getEmail();
    getPassword();
  }

  async function updateStorage() {
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
    } catch (error) {
      console.log(error);
    }
  }

  function updateData() {
    updateDatabase();
  }

  function updateDatabase() {
    // alert(user.id + name + contact + email + password);
    if (name != "" && contact != "" && email != "" && password != "") {
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
            alert("Atualizado com sucesso!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getAsyncUser() {
        try {
          let id = await AsyncStorage.getItem(storage.user);
          id = JSON.parse(id);

          if (id != null) {
            setUser(id);
          }
        } catch (error) {
          console.log(error);
        }
      }

      getAsyncUser().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user) {
      disable();
      getData();
    }
  }, [user]);

  return (
    <View
      style={{
        justifyContent: "center",
        backgroundColor: "white",
        flexGrow: 1,
      }}
    >
      <KeyboardAvoidingView>
        <ScrollView style={{ paddingHorizontal: "10%" }}>
          <Animatable.View
            animation="bounceInDown"
            duration={3000}
            useNativeDriver={true}
          >
            <Image
              style={styles.logo}
              source={require("../../../../../assets/profile-icon.png")}
            />
            <Divider
              style={{
                height: 3,
                backgroundColor: "black",
                marginVertical: 20,
              }}
            />
          </Animatable.View>
          <Animatable.View
            animation="bounceInLeft"
            duration={3000}
            useNativeDriver={true}
          >
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
          </Animatable.View>
          <Animatable.View
            animation="bounceInRight"
            duration={3000}
            useNativeDriver={true}
          >
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
          </Animatable.View>
          <Animatable.View
            animation="bounceInLeft"
            duration={3000}
            useNativeDriver={true}
          >
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
          </Animatable.View>
          <Animatable.View
            animation="bounceInRight"
            duration={3000}
            useNativeDriver={true}
          >
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
          </Animatable.View>
          <Animatable.View
            animation="bounceInUp"
            duration={3000}
            useNativeDriver={true}
          >
            <Button
              mode="contained"
              style={generalStyles.mainButton}
              title="Login"
              onPress={() => updateData()}
            >
              <Text style={generalStyles.mainButtonText}>Atualizar Dados</Text>
            </Button>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FAB.Group
        open={open}
        icon={open ? "close" : "dots-horizontal"}
        color={colors.text}
        fabStyle={{ backgroundColor: colors.main }}
        actions={[
          {
            icon: "logout",
            label: "Terminar Sessão",
            color: colors.text,
            style: {
              backgroundColor: colors.main,
            },
            onPress: async () => {
              try {
                await AsyncStorage.clear();
                navigation.navigate("Login");
              } catch (e) {
                console.log(e);
              }
            },
          },
          {
            icon: "square-edit-outline",
            label: "Editar Dados",
            color: colors.text,
            style: {
              backgroundColor: colors.main,
            },
            onPress: () => enable(),
          },
        ]}
        onStateChange={onStateChange}
      />
      {/* <FAB
        style={generalStyles.fab}
        icon="square-edit-outline"
        onPress={() => enable()}
      /> */}
    </View>
  );
}
