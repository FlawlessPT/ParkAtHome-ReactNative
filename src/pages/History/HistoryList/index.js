import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, BackHandler, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";

import HistoryItemsList from "../../../components/Lists/HistoryItemsList";

import { connection } from "../../../constant/database";
import { styles } from "./styles";
import { storage } from "../../../constant/storage";
import { colors } from "../../../constant/color";

export default function HistoryList({ navigation }) {
  const [user, setUser] = useState("");
  const [history, setHistory] = useState([]);

  const url = connection.url + connection.directory;

  function loadHistory() {
    fetch(url + "/History/GetHistory.php", {
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
        } else {
          setHistory([]);
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
      loadHistory();
    }
  }, [user]);

  function hasHistoryItems() {
    if (history.length > 0) {
      return (
        <FlatList
          data={history}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <HistoryItemsList
              history={item}
              user={user}
              navigation={navigation}
            />
          )}
        />
      );
    } else {
      return (
        <Animatable.View
          animation="bounceInDown"
          duration={1500}
          useNativeDriver={true}
          style={styles.noHistoryItemsContainer}
        >
          <Entypo name="emoji-sad" size={60} color={colors.main}></Entypo>
          <Text
            style={{
              textAlign: "center",
              color: colors.main,
              fontSize: 26,
              fontWeight: "700",
            }}
          >
            Não existem itens guardados no histórico!
          </Text>
        </Animatable.View>
      );
    }
  }

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      {hasHistoryItems()}
    </View>
  );
}
