import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { connection } from "../../../constant/database";

export default function ParkList({ navigation }) {
  const [userId, setUserId] = useState("");
  const [parks, setParks] = useState([]);
  const [plates, setPlates] = useState([]);

  const [pageTitle, setPageTitle] = useState("A carregar...");

  const url = connection.url + connection.directory;

  const setSavedUser = async () => {
    try {
      let id = await AsyncStorage.getItem("user_id");
      id = JSON.parse(id);

      if (id != null) {
        setUserId(id);
        // alert(userId);
        loadPlates();
      }
    } catch (error) {
      alert(error);
    }
  };

  function loadPlates() {
    setPageTitle("Carregado!");
    fetch(url + "/Vehicules/GetPlatesUser.php", {
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
          setPlates(json.plates);
        } else {
          alert("Sem matriculas associadas!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    setSavedUser();
  }, []);
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
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={plates}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <View>
              <Button mode="contained">{item.name}</Button>
            </View>
            <View>
              <Button mode="contained">{item.plate}</Button>
            </View>
          </View>
        )}
      />
      <Text>
        {pageTitle}
        {"\n"}
      </Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate("Park")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
