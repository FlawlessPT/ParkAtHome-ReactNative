import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import {
  Button,
  TextInput,
  Text,
  Modal,
  Provider,
  Portal,
} from "react-native-paper";

// import MyAlert from "../../../../../components/Alert/MyAlert";

import { colors } from "../../../../../constant/color";
import { connection } from "../../../../../constant/database";
import { storage } from "../../../../../constant/storage";
import { generalStyles, theme } from "../../../../../constant/styles";
import { styles } from "./styles";

export default function AddPaymentMethod({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [user, setUser] = useState("");

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const url = connection.url + connection.directory;

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
          console.log(error);
        });
    } else {
      alert("Preencha todos os campos!");
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
            {/* <Portal>
              <SuccessAlert
                navigation={navigation}
                visible={visible}
                message="Oi oi eu sou linda"
                onDismiss={hideModal}
              />
            </Portal> */}
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
              <Button
                mode="contained"
                style={generalStyles.mainButton}
                title="Login"
                onPress={() => addPaymentMethod()}
              >
                <Text style={generalStyles.mainButtonText}>
                  Adicionar Método
                </Text>
              </Button>
              <Button
                mode="contained"
                style={generalStyles.mainButton}
                title="Login"
                onPress={showModal}
              >
                <Text style={generalStyles.mainButtonText}>
                  Adicionar Método
                </Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
}
