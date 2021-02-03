import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, FlatList, BackHandler, Text } from "react-native";
import { FAB } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import PaymentMethodsList from "../../../../../components/Lists/PaymentMethodsList";

import { connection } from "../../../../../constant/database";
import { styles } from "./styles";
import { generalStyles } from "../../../../../constant/styles";
import { storage } from "../../../../../constant/storage";
import { colors } from "../../../../../constant/color";

export default function PaymentMethodList({ navigation }) {
  const [user, setUser] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);

  const url = connection.url + connection.directory;

  function loadPaymentMethods() {
    fetch(url + "/PaymentMethods/GetPaymentMethodsUser.php", {
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
          setPaymentMethods(json.paymentMethods);
        } else {
          setPaymentMethods([]);
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
          console.log(error);
        }
      }

      getAsyncUser().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user) {
      loadPaymentMethods();
    }
  }, [user]);

  function hasPaymentMethodsSaved() {
    if (paymentMethods.length > 0) {
      return (
        <FlatList
          data={paymentMethods}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <PaymentMethodsList
              id={item.id}
              name={item.name}
              description={item.description}
              paymentMethod={item}
              user={user}
              navigation={navigation}
            />
          )}
        />
      );
    } else {
      return (
        <View style={styles.noPaymentMethodsContainer}>
          <Entypo name="emoji-sad" size={60} color={colors.main}></Entypo>
          <Text
            style={{
              textAlign: "center",
              color: colors.main,
              fontSize: 26,
              fontWeight: "700",
            }}
          >
            Não há métodos de pagamento guardados!
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      {hasPaymentMethodsSaved()}
      <FAB
        style={generalStyles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddPaymentMethod")}
      />
    </View>
  );
}
