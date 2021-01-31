import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  BackHandler,
  Alert,
  Text,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { FAB } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";

import SavedSpacesList from "../../../../../components/Lists/SavedSpacesList";

import { connection } from "../../../../../constant/database";
import { styles } from "./styles";
import { generalStyles } from "../../../../../constant/styles";
import { storage } from "../../../../../constant/storage";
import { colors } from "../../../../../constant/color";
import { ScrollView } from "react-native-gesture-handler";

export default function SavedSpaceList({ navigation }) {
  const [user, setUser] = useState("");
  const [savedSpaces, setSavedSpaces] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const url = connection.url + connection.directory;

  function loadSavedSpaces() {
    fetch(url + "/Spaces/GetSavedSpaces.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setSavedSpaces(json.savedSpaces);
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
      loadSavedSpaces();
    }
  }, [user]);

  // async function onRefresh() {
  //   setRefreshing(true);
  //   await loadSavedSpaces2();
  // }

  function hasSavedSpaces() {
    if (savedSpaces.length > 0) {
      return (
        <FlatList
          data={savedSpaces}
          keyExtractor={({ id }, index) => id}
          onRefresh={() => onRefresh}
          refreshing={refreshing}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <SavedSpacesList savedSpace={item} navigation={navigation} />
          )}
        />
      );
    } else {
      return (
        <View style={styles.noPlatesContainer}>
          <Entypo name="emoji-sad" size={60} color={colors.main}></Entypo>
          <Text
            style={{
              textAlign: "center",
              color: colors.main,
              fontSize: 26,
              fontWeight: "700",
            }}
          >
            Não há reservas efetuadas.
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      {hasSavedSpaces()}
      {/* <FlatList
        data={savedSpaces}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <SavedSpacesList
            savedSpace={item}
            navigation={navigation}
          />
        )}
      /> */}
      {/* <FlatList
        data={savedSpaces}
        keyExtractor={({ id }, index) => id}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        renderItem={({ item }) => (
          <SavedSpacesList savedSpace={item} navigation={navigation} />
        )}
      /> */}
    </View>
  );
}
