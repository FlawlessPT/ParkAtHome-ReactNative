import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, FlatList, BackHandler } from "react-native";

import { connection } from "../../../constant/database";
import { styles } from "./styles";
import ParksList from "../../../components/Lists/ParksList";
import { generalStyles } from "../../../constant/styles";

export default function ParkList({ navigation }) {
  const [parks, setParks] = useState([]);

  const url = connection.url + connection.directory;

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
    loadParks();
  }, []);

  return (
    <View style={generalStyles.background}>
      <StatusBar style="auto" />
      <FlatList
        data={parks}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <ParksList id={item.id} name={item.name}
            totalSpaces={item.totalSpaces}
            pricePerHour={item.pricePerHour}
            park={item}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}
