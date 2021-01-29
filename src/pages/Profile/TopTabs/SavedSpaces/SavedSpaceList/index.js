import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, BackHandler, Alert, Text, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import ActionButton from 'react-native-action-button';

import SavedSpacesList from "../../../../../components/Lists/SavedSpacesList";

import { connection } from "../../../../../constant/database";
import { styles } from "./styles";
import { generalStyles } from "../../../../../constant/styles";
import { storage } from "../../../../../constant/storage";
import { colors } from "../../../../../constant/color";

export default function SavedSpaceList({ navigation }) {
  const [user, setUser] = useState("");
  const [savedSpaces, setSavedSpaces] = useState([]);

  const url = connection.url + connection.directory;

  function loadSavedSpaces() {
    fetch(url + "/Spaces/GetSavedSpaces.php", {
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
      loadSavedSpaces();
    }
  }, [user]);

  function hasSavedSpaces() {
    if (savedSpaces.length > 0) {
      return (
        <FlatList
          data={savedSpaces}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <SavedSpacesList
              savedSpace={item}
              navigation={navigation}
            />
          )}
        />
      )
    }
    else {
      return (
        <View style={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
          <Entypo name="emoji-sad" size={60} color={colors.main}></Entypo>
          <Text style={{ textAlign: "center", color: colors.main, fontSize: 26, fontWeight: "700" }}>Não há reservas efetuadas.</Text>
        </View>
      )
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
      {/* <ActionButton buttonColor={colors.main} useNativeDriver={true}>
        <ActionButton.Item
          buttonColor={colors.main}
          title="Add to Watch Later"
          onPress={() => alert('Added to watch later')}>
          <IconsFA name="warning" style={thisStyles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Add to Favourite"
          onPress={() => alert('Added to favourite')}>
          <IconsFA name="warning" style={thisStyles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="Share"
          onPress={() => alert('Share Post')}>
          <IconsFA name="warning" style={thisStyles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton> */}
    </View>
  );
}

const thisStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});