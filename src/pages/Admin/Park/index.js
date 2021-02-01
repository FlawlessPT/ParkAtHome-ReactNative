import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  TextInput,
  Button,
  Divider,
  Checkbox,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";
import { storage } from "../../../constant/storage";
import { themeProfile } from "../../../constant/styles";
import { generalStyles } from "../../../constant/styles";
import { add } from "react-native-reanimated";

export default function AdminPark({ route, navigation }) {
  const { park } = route.params;

  const url = connection.url + connection.directory;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [totalSpaces, setTotalSpaces] = useState("");
  const [totalSavedSpace, setTotalSavedSpaces] = useState(0);
  const [localization, setLocalization] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const [vehicules, setVehicules] = useState([]);
  const [user, setUser] = useState("");

  // const [checked, setChecked] = React.useState(false);

  function loadParkInfo() {
    setName(park.name);
    setAddress(park.address);
    setContact(park.contact);
    setEmail(park.email);
    setTotalSpaces(park.totalSpaces);
    setTotalSavedSpaces(park.totalSavedSpaces);
    setLocalization(park.localization);
    // setNrFloors(park.nrFloors);
    setPricePerHour(park.pricePerHour);
  }

  function updatePark() {
    fetch(url + "/Parks/Update.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: park.id,
        name: name,
        address: address,
        localization: localization,
        // totalSpaces: totalSpaces,
        contact: contact,
        email: email,
        pricePerHour: pricePerHour,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "success") {
          alert("Parque atualizado com sucesso!");
          navigation.goBack();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => true);
  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", () => true);
  // }, []);

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
          alert(error);
        }
      }

      getAsyncUser().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user && vehicules) {
      loadParkInfo();
    }
  }, [user]);

  return (
    <View style={generalStyles.background}>
      <KeyboardAvoidingView>
        <ScrollView style={{ paddingHorizontal: "10%" }}>
          {/* <Image
            style={styles.logo}
            source={require("../../../../../assets/profile-icon.png")}
          /> */}
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              fontFamily: "Aldrich_Regular",
              color: colors.secondary,
            }}
          >
            Configurações Gerais
          </Text>
          <Divider
            style={{
              height: 2,
              backgroundColor: "black",
              marginVertical: 15,
            }}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(name) => setName(name)}
            label="Nome Parque"
            value={name}
            style={generalStyles.input}
            theme={themeProfile.enable}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(address) => setAddress(address)}
            label="Morada"
            value={address}
            style={generalStyles.input}
            theme={themeProfile.enable}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(localization) => setLocalization(localization)}
            label="Localização"
            value={localization}
            style={generalStyles.input}
            theme={themeProfile.enable}
          />
          {/* <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(totalSpaces) => setTotalSpaces(totalSpaces)}
            label="Total Vagas"
            value={totalSpaces}
            style={generalStyles.input}
            theme={themeProfile.enable}
          /> */}
          <Text
            style={{
              fontSize: 20,
              marginTop: 30,
              fontFamily: "Aldrich_Regular",
              color: colors.secondary,
            }}
          >
            Contactos
          </Text>
          <Divider
            style={{
              height: 2,
              backgroundColor: "black",
              marginVertical: 15,
            }}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(contact) => setContact(contact)}
            label="Contacto"
            value={contact}
            style={generalStyles.input}
            theme={themeProfile.enable}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(email) => setEmail(email)}
            label="Email"
            value={email}
            style={generalStyles.input}
            theme={themeProfile.enable}
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: 30,
              fontFamily: "Aldrich_Regular",
              color: colors.secondary,
            }}
          >
            Taxa (hora)
          </Text>
          <Divider
            style={{
              height: 2,
              backgroundColor: "black",
              marginVertical: 15,
            }}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(pricePerHour) => setPricePerHour(pricePerHour)}
            label="Preço"
            value={pricePerHour}
            style={generalStyles.input}
            theme={themeProfile.enable}
          />
          {/* <Text
            style={{
              fontSize: 20,
              marginTop: 30,
              fontFamily: "Aldrich_Regular",
              color: colors.secondary,
            }}
          >
            Estado
          </Text>
          <Divider
            style={{
              height: 2,
              backgroundColor: "black",
              marginVertical: 15,
            }}
          /> */}
          {/* <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          /> */}
          <Button
            mode="contained"
            style={generalStyles.mainButton}
            title="Atualizar"
            onPress={() => updatePark()}
          >
            <Text style={generalStyles.mainButtonText}>Atualizar</Text>
          </Button>
          {/* <Button
            mode="contained"
            style={generalStyles.finishButton}
            title="Atualizar"
            onPress={() => updateData()}
          >
            <Text style={generalStyles.mainButtonText}>Eliminar</Text>
          </Button> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
