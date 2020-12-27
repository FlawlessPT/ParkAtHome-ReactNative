import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, BackHandler, Image, TouchableOpacity } from "react-native";
import { Button, Divider } from "react-native-paper";

import { connection } from "../../../constant/database";
import { colors } from "../../../constant/color";
import { generalStyles } from "../../../constant/styles";
import { styles } from "./styles";
import ParksList from "../../../components/Lists/ParksList";

export default function ParkList({ navigation }) {
  const [userId, setUserId] = useState("");
  const [parks, setParks] = useState([]);

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

  function loadParks() {
    fetch(url + "/Parks/GetParks.php")
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setParks(json.parks);
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
    getAsyncUser();
  }, []);

  useEffect(() => {
    loadParks();
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <FlatList
        data={parks}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <ParksList name={item.name}
            totalSpaces={item.totalSpaces}
            pricePerHour={item.pricePerHour}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}
