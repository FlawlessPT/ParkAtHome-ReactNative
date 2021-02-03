import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import { FAB, TextInput, Button } from "react-native-paper";

import { colors } from "../../../../../constant/color";
import { connection } from "../../../../../constant/database";
import { storage } from "../../../../../constant/storage";
import {
  generalStyles,
  theme,
  themeProfile,
} from "../../../../../constant/styles";
import { styles } from "./styles";

export default function Vehicule({ route, navigation }) {
  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(themeProfile.disable);

  const [plate, setPlate] = useState("");
  const [name, setName] = useState("");

  const { vehicule } = route.params;

  const url = connection.url + connection.directory;

  function enable() {
    setEditable(true);
    setInputStyle(themeProfile.enable);
    updateButton();
  }

  function disable() {
    setEditable(false);
    setInputStyle(themeProfile.disable);
    updateButton();
  }

  function getPlate() {
    setPlate(vehicule.plate);
    // try {
    //     let value = await AsyncStorage.getItem(storage.vehicule);
    //     value = JSON.parse(value);
    //     if (value != null) {
    //         setPlate(value[0].plate);
    //     }
    // }
    // catch (error) {
    //     alert(error);
    // }
  }

  function getName() {
    setName(vehicule.name);
    // try {
    //     let value = await AsyncStorage.getItem(storage.vehicule);
    //     value = JSON.parse(value);
    //     if (value != null) {
    //         setName(value[0].name);
    //     }
    // }
    // catch (error) {
    //     alert(error);
    // }
  }

  function getData() {
    getPlate();
    getName();
  }

  function updateButton() {
    if (editable) {
      return (
        <Button
          disabled={!editable}
          mode="contained"
          style={generalStyles.mainButton}
          onPress={() => updateVehicule()}
        >
          <Text style={generalStyles.mainButtonText}>Atualizar Veículo</Text>
        </Button>
      );
    } else {
      return null;
    }
  }

  function updateVehicule() {
    if (name != "" && plate != "") {
      fetch(url + "/Vehicules/Update.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: vehicule.id,
          name: name,
          plate: plate,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "success") {
            alert("Atualizado com sucesso!");
            navigation.goBack();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Preencha todos os campos!");
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      disable();
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: "5%",
            }}
          >
            <StatusBar style="auto" />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              onChangeText={(plate) => setPlate(plate)}
              label="Matrícula"
              value={plate}
              editable={editable}
              style={generalStyles.input}
              theme={inputStyle}
            />
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
            {updateButton()}
          </View>
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
