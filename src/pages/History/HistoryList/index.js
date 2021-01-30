import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, BackHandler } from "react-native";

import HistoryItemsList from "../../../components/Lists/HistoryItemsList";

import { connection } from "../../../constant/database";
import { styles } from "./styles";
import { storage } from "../../../constant/storage";

export default function HistoryList({ navigation }) {
  const [user, setUser] = useState("");
  const [history, setHistory] = useState([]);

  const url = connection.url + connection.directory;

  function loadHistory() {
    fetch(url + "/History/GetHistoryNames.php", {
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
          setHistory(json.history);
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
    const unsubscribe = navigation.addListener('focus', () => {
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
    })

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <FlatList
        data={history}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <HistoryItemsList
            history={item}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}