import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, Image, BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Divider } from "react-native-paper";
import { add } from "react-native-reanimated";
import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";

import { generalStyles } from "../../../constant/styles";

export default function Park({ route, navigation }) {
  const { id } = route.params;

  const url = connection.url + connection.directory;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [totalSpaces, setTotalSpaces] = useState("");
  const [localization, setLocalization] = useState("");
  const [nrFloors, setNrFloors] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const [vehiculeName, setVehiculeName] = useState("");

  const [userId, setUserId] = useState("");

  async function getAsyncUser() {
    try {
      let id = await AsyncStorage.getItem("user_id");
      id = JSON.parse(id);

      if (id != null) {
        setUserId(id);
      }
    } catch (error) {
      alert(error);
    }
  }

  function loadParkInfo() {
    fetch(url + "/Parks/GetParkById.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setName(json.park[0].name);
          setAddress(json.park[0].address);
          setContact(json.park[0].contact);
          setEmail(json.park[0].email);
          setTotalSpaces(json.park[0].totalSpaces);
          setLocalization(json.park[0].localization);
          setNrFloors(json.park[0].nrFloors);
          setPricePerHour(json.park[0].pricePerHour);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function saveSpace() {
    fetch(url + "/Users/SaveSpace.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        userId: userId,
        vehicule: vehiculeName,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setName(json.park[0].name);
          setAddress(json.park[0].address);
          setContact(json.park[0].contact);
          setEmail(json.park[0].email);
          setTotalSpaces(json.park[0].totalSpaces);
          setLocalization(json.park[0].localization);
          setNrFloors(json.park[0].nrFloors);
          setPricePerHour(json.park[0].pricePerHour);
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
    getAsyncUser();
  }, []);

  useEffect(() => {
    loadParkInfo();
  }, []);

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
            Preço: <Text style={{ color: colors.secondary }}>{pricePerHour}</Text> €
          </Text>
          <Button style={generalStyles.mainButton} onPress={() => alert("oi")}>
            <Text style={generalStyles.mainButtonText}>Reservar</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
