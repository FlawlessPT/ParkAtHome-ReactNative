import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, BackHandler } from "react-native";
import { FAB } from "react-native-paper";

import VehiculesList from "../../../../../components/Lists/VehiculesList";

import { connection } from "../../../../../constant/database";
import { styles } from "./styles";
import { generalStyles } from "../../../../../constant/styles";

export default function VehiculeList({ navigation }) {
  const [userId, setUserId] = useState("");
  const [vehicules, setVehicules] = useState([]);

  const url = connection.url + connection.directory;

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

  function loadVehicules() {
    fetch(url + "/Vehicules/GetVehiculesUser.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setVehicules(json.vehicules);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;
    const unsubscribe = navigation.addListener("focus", e => {
      getAsyncUser();
      loadVehicules();
    })
    return () => {
      isRendered = false;
      unsubscribe;
    };
  }, []);

  // useEffect(() => {

  //   const unsubscribe = navigation.addListener("focus", e => {
  //     getAsyncUser();
  //     loadVehicules();
  //   })

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <FlatList
        data={vehicules}
        extraData={loadVehicules()}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <VehiculesList
            id={item.id}
            name={item.name}
            plate={item.plate}
            vehicule={item}
            navigation={navigation}
          />
        )}
      />
      <FAB
        style={generalStyles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddVehicule")}
      />
    </View>
  );
}