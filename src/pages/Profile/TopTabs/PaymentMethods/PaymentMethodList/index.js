import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, BackHandler } from "react-native";
import { FAB } from "react-native-paper";

import PaymentMethodsList from "../../../../../components/Lists/PaymentMethodsList";

import { connection } from "../../../../../constant/database";
import { styles } from "./styles";
import { generalStyles } from "../../../../../constant/styles";

export default function PaymentMethodList({ navigation }) {
  const [userId, setUserId] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);

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

  function loadPaymentMethods() {
    fetch(url + "/PaymentMethods/GetPaymentMethodsUser.php", {
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
          setPaymentMethods(json.paymentMethods);
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
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;
    const unsubscribe = navigation.addListener("focus", e => {
      getAsyncUser();
      loadPaymentMethods();
    })
    return () => {
      isRendered = false;
      unsubscribe;
    };
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <FlatList
        data={paymentMethods}
        extraData={loadPaymentMethods()}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <PaymentMethodsList
            id={item.id}
            name={item.name}
            description={item.description}
            paymentMethod={item}
            navigation={navigation}
          />
        )}
      />
      <FAB
        style={generalStyles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddPaymentMethod")}
      />
    </View>
  );
}