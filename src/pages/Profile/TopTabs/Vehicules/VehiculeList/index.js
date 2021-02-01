import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, BackHandler, Alert } from "react-native";
import { FAB } from "react-native-paper";

import VehiculesList from "../../../../../components/Lists/VehiculesList";

import { connection } from "../../../../../constant/database";
import { styles } from "./styles";
import { generalStyles } from "../../../../../constant/styles";
import { storage } from "../../../../../constant/storage";

export default function VehiculeList({ navigation }) {
  const [user, setUser] = useState("");
  const [vehicules, setVehicules] = useState([]);

  const url = connection.url + connection.directory;

  function loadVehicules() {
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
    if (user) {
      loadVehicules();
    }
  }, [user]);

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <FlatList
        data={vehicules}
        // extraData={loadVehicules()}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <VehiculesList
            id={item.id}
            name={item.name}
            plate={item.plate}
            state={item.state}
            vehicule={item}
            user={user}
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
