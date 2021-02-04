import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import {
  Button,
  TextInput,
  Text,
  Provider,
  Portal,
  Modal,
} from "react-native-paper";

import MyAlert from "../../../../../components/Alert/OkAlert";

import { colors } from "../../../../../constant/color";
import { connection } from "../../../../../constant/database";
import { storage } from "../../../../../constant/storage";
import { generalStyles, theme } from "../../../../../constant/styles";
import { styles } from "./styles";

export default function AddVehicule({ navigation }) {
  const [plate, setPlate] = useState("");
  const [name, setName] = useState("");

  const [user, setUser] = useState("");

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

  function addVehicule() {
    if (plate != "" && name != "") {
      fetch(url + "/Vehicules/InsertVehicule.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plate: plate,
          name: name,
          userId: user.id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "success") {
            // showModal("Veículo registado com sucesso!", "success");
            navigation.goBack();
          }

          if (json.message === "plate_already_exists") {
            showModal("Matrícula já registada!", "warning");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showModal("Preencha todos os campos!", "warning");
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      async function getAsyncUser() {
        try {
          let value = await AsyncStorage.getItem(storage.user);
          value = JSON.parse(value);
          if (value != null) {
            setUser(value);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getAsyncUser().then();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Provider>
      <View style={styles.background}>
        <KeyboardAvoidingView>
          <ScrollView>
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: "5%",
              }}
            >
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
              <TextInput
                mode="flat"
                underlineColor={colors.main}
                selectionColor={colors.secondary}
                dense={true}
                onChangeText={(plate) => setPlate(plate)}
                label="Matrícula"
                style={generalStyles.input}
                theme={theme}
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
              <Button
                mode="contained"
                style={generalStyles.mainButton}
                title="Login"
                onPress={() => addVehicule()}
              >
                <Text style={generalStyles.mainButtonText}>
                  Adicionar Veículo
                </Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
}
