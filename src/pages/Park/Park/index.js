import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Image, BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Divider } from "react-native-paper";
import { add } from "react-native-reanimated";
import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";
import { storage } from "../../../constant/storage";

import { generalStyles } from "../../../constant/styles";

export default function Park({ route, navigation }) {
  const { park } = route.params;

  const url = connection.url + connection.directory;

  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [totalSpaces, setTotalSpaces] = useState("");
  const [localization, setLocalization] = useState("");
  const [nrFloors, setNrFloors] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const [vehicules, setVehicules] = useState([]);

  const [plate, setPlate] = useState("");

  const [user, setUser] = useState("");

  function loadParkInfo() {
    setAddress(park.address);
    setContact(park.contact);
    setEmail(park.email);
    setTotalSpaces(park.totalSpaces);
    setLocalization(park.localization);
    setNrFloors(park.nrFloors);
    setPricePerHour(park.pricePerHour);
  }

  function getPlatesByUser() {
    fetch(url + "/Vehicules/GetVehiculesUser.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "success") {
          setVehicules(json.vehicules);
          // console.log(json.vehicules);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function saveSpace() {
    // console.log(`Vehicules: \n${vehicules[0].plate}`);
    fetch(url + "/Spaces/SaveSpace.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        plate: "11-22-AA",
        parkId: park.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "success") {
          alert("Vaga reservada com sucesso");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

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
    if (user && vehicules) {
      loadParkInfo();
      getPlatesByUser();
    }
  }, [user])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     let isActive = true;

  //     getAsyncUser();
  //     loadParkInfo();
  //     saveSpace();

  //     return () => {
  //       isActive = false;
  //     };
  //   }, [])
  // );

  return (
    <View style={generalStyles.background}>
      <ScrollView>
        <Image
          style={{
            width: "100%",
            height: 200,
          }}
          source={require('../../../../assets/parque_01.jpg')}
        />
        <View style={{
          marginTop: 10,
          paddingHorizontal: "5%",
        }}>
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 30,
            color: colors.main,
          }}>
            Detalhes Parque
        </Text>
          <Divider style={{
            height: 3,
            backgroundColor: "black",
            marginVertical: 10,
          }} />
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 20,
            color: colors.main,
            marginBottom: 5,
          }}>
            Morada: <Text style={{ color: colors.secondary }}>{address}</Text>
          </Text>
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 20,
            color: colors.main,
            marginBottom: 5,
          }}>
            Localização: <Text style={{ color: colors.secondary }}>{localization}</Text>
          </Text>
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 20,
            color: colors.main,
            marginBottom: 5,
          }}>
            Lotação: <Text style={{ color: colors.secondary }}>{totalSpaces}</Text> veiculos
        </Text>
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 20,
            color: colors.main,
            marginBottom: 5,
          }}>
            Andares: <Text style={{ color: colors.secondary }}>{nrFloors}</Text>
          </Text>
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 20,
            color: colors.main,
            marginBottom: 5,
          }}>
            Contacto: <Text style={{ color: colors.secondary }}>{contact}</Text>
          </Text>
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 20,
            color: colors.main,
            marginBottom: 5,
          }}>
            Email: <Text style={{ color: colors.secondary }}>{email}</Text>
          </Text>
          <Text style={{
            fontFamily: "Aldrich_Regular",
            fontSize: 20,
            color: colors.main,
            marginBottom: 5,
          }}>
            Preço: <Text style={{ color: colors.secondary }}>{pricePerHour}</Text> €/hora
          </Text>
          <Button style={generalStyles.mainButton} onPress={() => saveSpace()}>
            <Text style={generalStyles.mainButtonText}>Reservar</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
