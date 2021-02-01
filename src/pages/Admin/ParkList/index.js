import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, FlatList, BackHandler } from "react-native";

import { connection } from "../../../constant/database";
import { styles } from "./styles";
import AdminParksList from "../../../components/Lists/AdminParksList";
import { generalStyles } from "../../../constant/styles";
import { storage } from "../../../constant/storage";

export default function AdminParkList({ navigation }) {
  const [parks, setParks] = useState([]);

  const [user, setUser] = useState("");

  const url = connection.url + connection.directory;

  function loadParks() {
    fetch(url + "/Parks/GetParksByUser.php", {
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
          setParks(json.parks);
        }
      })
      .catch((error) => {
        console.log(error);
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
      loadParks();
    }
  }, [user]);

  return (
    <View style={generalStyles.background}>
      <StatusBar style="auto" />
      <FlatList
        data={parks}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <AdminParksList
            id={item.id}
            name={item.name}
            totalSpaces={item.totalSpaces}
            pricePerHour={item.pricePerHour}
            totalSavedSpaces={item.totalSavedSpaces}
            park={item}
            user={user}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}
