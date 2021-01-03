import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, Text } from 'react-native-paper';

import { colors } from "../../../../../constant/color";
import { connection } from "../../../../../constant/database";
import { storage } from "../../../../../constant/storage";
import { generalStyles, theme } from '../../../../../constant/styles';
import { styles } from "./styles";

export default function AddPaymentMethod({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [user, setUser] = useState("");

  const url = connection.url + connection.directory;

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

  function addPaymentMethod() {
    if (name != "" && description != "") {
      fetch(url + "/PaymentMethods/InsertPaymentMethod.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          userId: user.id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "success") {
            navigation.goBack();
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", e => {
      getUser();
    })

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{
            marginTop: 10,
            paddingHorizontal: "5%",
          }}>
            <StatusBar style="auto" />
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
              onChangeText={(description) => setDescription(description)}
              label="Descrição"
              style={styles.input}
              theme={theme}
            />
            <Button mode="contained" style={generalStyles.mainButton} title="Login" onPress={() => addPaymentMethod()}>
              <Text style={generalStyles.mainButtonText}>Adicionar Método</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
