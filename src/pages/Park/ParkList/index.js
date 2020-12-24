import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, BackHandler } from "react-native";
import { Button } from "react-native-paper";
import { connection } from "../../../constant/database";
import { colors } from "../../../constant/color";

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
    // fetch(url + "/Vehicules/GetParks.php", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId: userId,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.message == "success") {
    //       setParks(json.parks);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    getAsyncUser();
  });

  useEffect(() => {
    loadParks();
  });
  // function loadParks() {
  //   fetch(url + "/Park/GetParks.php")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setParks(json.parks);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // useEffect(() => {
  //   loadParks();
  // });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={parks}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", backgroundColor: colors.main, paddingHorizontal: 10, paddingVertical: 10, justifyContent: "center", alignContent: "center", borderRadius: 5, marginTop: 10 }}>
            <Text style={{color: "white", fontSize: 20}}>{item.name}, {item.localization}</Text>
          </View>
        )}
      />
      <Button
        title="Details"
        onPress={() => navigation.navigate("Park")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
