import React, { useState } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Provider, Portal } from "react-native-paper";

import IconsFA from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MyAlert from "../components/Alert/OkAlert";
import TabBarIcon from "../components/TabBarIcon";

import AdminPark from "../pages/Admin/Park";
import AdminParkList from "../pages/Admin/ParkList";

import ParkList from "../pages/Park/ParkList";
import Infos from "../pages/Profile/TopTabs/Infos";
import VehiculeList from "../pages/Profile/TopTabs/Vehicules/VehiculeList";
import PaymentMethodList from "../pages/Profile/TopTabs/PaymentMethods/PaymentMethodList";
import SavedSpacesList from "../pages/Profile/TopTabs/SavedSpaces/SavedSpaceList";
import HistoryList from "../pages/History/HistoryList";

import Park from "../pages/Park/Park";
import Vehicule from "../pages/Profile/TopTabs/Vehicules/Vehicule";
import PaymentMethod from "../pages/Profile/TopTabs/PaymentMethods/PaymentMethod";
import SavedSpace from "../pages/Profile/TopTabs/SavedSpaces/SavedSpace";
import History from "../pages/History/History";

import AddVehicule from "../pages/Profile/TopTabs/Vehicules/VehiculeAdd";
import AddPaymentMethod from "../pages/Profile/TopTabs/PaymentMethods/PaymentMethodAdd";

import Login from "../pages/Initial/Login";
import Register from "../pages/Initial/Register";

import { colors } from "../constant/color";
import { fonts } from "../constant/fonts";
import { iconSize } from "../constant/size";
import { headerTitles } from "../constant/text";
import { tabBarTitles } from "../constant/text";
import { storage } from "../constant/storage";

import { Alert, Text } from "react-native";
import { connection } from "../constant/database";

const ParkListStack = createStackNavigator();
const HistoryListStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

function ParkListStackScreen() {
  return (
    <ParkListStack.Navigator>
      <ParkListStack.Screen name="ParkList" component={ParkList} />
    </ParkListStack.Navigator>
  );
}

function ProfileTopTabNavigatorScreen() {
  return (
    <TopTab.Navigator
      backBehavior="none"
      tabBarOptions={{
        style: {
          backgroundColor: colors.main,
        },
        activeTintColor: colors.text,
        pressColor: colors.text,
        indicatorStyle: {
          backgroundColor: colors.text,
          padding: 2,
        },
        labelStyle: { fontFamily: "Aldrich_Regular", fontSize: 11 },
      }}
    >
      <TopTab.Screen
        name="Infos"
        component={Infos}
        options={{
          title: tabBarTitles.infos,
        }}
      />
      <TopTab.Screen
        name="VehiculeList"
        component={VehiculeList}
        options={{
          title: tabBarTitles.vehicules,
        }}
      />
      <TopTab.Screen
        name="PaymentMethodList"
        component={PaymentMethodList}
        options={{
          title: tabBarTitles.methods,
        }}
      />
      <TopTab.Screen
        name="SavedSpacesList"
        component={SavedSpacesList}
        options={{
          title: tabBarTitles.savedSpaces,
        }}
      />
    </TopTab.Navigator>
  );
}

function HistoryListStackScreen() {
  return (
    <HistoryListStack.Navigator>
      <HistoryListStack.Screen name="HistoryList" component={HistoryList} />
    </HistoryListStack.Navigator>
  );
}

function Tabs() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        tintColor: colors.text,
        activeTintColor: colors.text,
        inactiveTintColor: colors.text,
        style: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.main,
          overflow: "hidden",
          elevation: 0,
          shadowOpacity: 0,
        },
        labelStyle: { fontFamily: "Aldrich_Regular", fontSize: 12 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => <TabBarIcon {...props} route={route.name} />,
      })}
    >
      <BottomTab.Screen
        name="ParkList"
        component={ParkListStackScreen}
        options={{
          title: "Parques",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTopTabNavigatorScreen}
        options={{
          title: "Perfil",
        }}
      />
      <BottomTab.Screen
        name="HistoryList"
        component={HistoryListStackScreen}
        options={{
          title: "Histórico",
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "ParkList";

  switch (routeName) {
    case "ParkList":
      return headerTitles.parkList;
    case "Profile":
      return headerTitles.profile;
    case "HistoryList":
      return headerTitles.historyList;
  }
}

export default function MainBottomTab() {
  const [park, setPark] = useState("");
  const [vehicule, setVehicule] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [savedSpace, setSavedSpace] = useState("");
  const [historyItem, setHistoryItem] = useState("");

  const url = connection.url + connection.directory;

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Erro");
  const [type, setType] = useState("error");

  const showModal = (message, type) => {
    setMessage(message);
    setType(type);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  async function getPark() {
    try {
      let id = await AsyncStorage.getItem(storage.park);
      id = JSON.parse(id);

      if (id != null) {
        setPark(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getVehicule() {
    try {
      let id = await AsyncStorage.getItem(storage.vehicule);
      id = JSON.parse(id);

      if (id != null) {
        setVehicule(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPaymentMethod() {
    try {
      let id = await AsyncStorage.getItem(storage.paymentMethod);
      id = JSON.parse(id);

      if (id != null) {
        setPaymentMethod(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSavedSpace() {
    try {
      let id = await AsyncStorage.getItem(storage.savedSpace);
      id = JSON.parse(id);

      if (id != null) {
        setSavedSpace(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getHistoryItem() {
    try {
      let id = await AsyncStorage.getItem(storage.history);
      id = JSON.parse(id);

      if (id != null) {
        setHistoryItem(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function setParkTitle() {
    getPark();
    return <Text style={{ fontFamily: fonts.main }}>{park.name}</Text>;
  }

  function setVehiculeTitle() {
    getVehicule();
    return (
      <Text style={{ fontFamily: fonts.main }}>{vehicule.plate || "---"}</Text>
    );
  }

  function setPaymentMethodTitle() {
    getPaymentMethod();
    return (
      <Text style={{ fontFamily: fonts.main }}>
        {paymentMethod.name || "---"}
      </Text>
    );
  }

  function setHistoryItemTitle() {
    getHistoryItem();
    return (
      <Text style={{ fontFamily: fonts.main }}>
        Reserva {historyItem.id || 0}
      </Text>
    );
  }

  function setSavedSpaceTitle() {
    getSavedSpace();
    return (
      <Text style={{ fontFamily: fonts.main }}>
        Vaga A{savedSpace.idSpace || 0}
      </Text>
    );
  }

  function deleteVehicule(navigation, vehicule, user) {
    fetch(url + "/Vehicules/DeleteVehicule.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: vehicule.id,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        switch (json.message) {
          case "success":
            navigation.goBack();
            break;
          case "delete_failed":
            Alert.alert(
              "Erro",
              "Não foi possível eliminar. Este registo já não deve existir.",
              [{ text: "OK", onPress: () => navigation.goBack() }],
              { cancelable: true }
            );
            break;
          case "plate_is_used":
            showModal(
              "Não pode eliminar um veículo que está a ser utilizado!",
              "warning"
            );
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deletePaymentMethod(navigation, paymentMethod, user) {
    fetch(url + "/PaymentMethods/DeletePaymentMethod.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: paymentMethod.id,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        switch (json.message) {
          case "success":
            navigation.goBack();
            break;
          case "delete_failed":
            Alert.alert(
              "Erro",
              "Não foi possível eliminar. Este registo já não deve existir.",
              [{ text: "OK", onPress: () => navigation.goBack() }],
              { cancelable: true }
            );
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteHistoryItem(navigation, historyItem, user) {
    fetch(url + "/History/DeleteHistoryItem.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: historyItem.id,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        switch (json.message) {
          case "success":
            navigation.goBack();
            break;
          case "delete_failed":
            Alert.alert(
              "Erro",
              "Não foi possível eliminar. Este registo já não deve existir.",
              [{ text: "OK", onPress: () => navigation.goBack() }],
              { cancelable: true }
            );
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deletePark(navigation, park, user) {
    fetch(url + "/Parks/DeletePark.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: park.id,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        switch (json.message) {
          case "success":
            navigation.goBack();
            break;
          case "delete_failed":
            Alert.alert(
              "Erro",
              "Não foi possível eliminar. Este registo já não deve existir.",
              [{ text: "OK", onPress: () => navigation.goBack() }],
              { cancelable: true }
            );
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Provider>
      <Portal>
        <MyAlert
          visible={visible}
          type={type}
          message={message}
          onDismiss={hideModal}
          // navigation={navigation}
        />
      </Portal>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen
          name="Login"
          component={Login}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
        <RootStack.Screen
          name="Register"
          component={Register}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
        <RootStack.Screen
          name="AdminParkList"
          component={AdminParkList}
          options={({ route, navigation }) => ({
            headerTitle: (
              <Text style={{ fontFamily: fonts.main }}>Os seus Parques</Text>
            ),
            headerLeft: null,
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
            headerRight: () => (
              <Button
                onPress={async () => {
                  try {
                    await AsyncStorage.clear();
                    navigation.navigate("Login");
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={iconSize.delete}
                  color={colors.text}
                />
              </Button>
            ),
          })}
        />
        <RootStack.Screen
          name="AdminPark"
          component={AdminPark}
          options={({ route, navigation }) => ({
            headerTitle: setParkTitle(),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
            headerRight: () => (
              <Button
                onPress={() =>
                  deletePark(navigation, route.params.park, route.params.user)
                }
              >
                <IconsFA
                  name="trash"
                  size={iconSize.delete}
                  color={colors.text}
                />
              </Button>
            ),
          })}
        />
        <RootStack.Screen
          name="Main"
          component={Tabs}
          options={({ route, navigation }) => ({
            headerTitle: (
              <Text style={{ fontFamily: fonts.main }}>
                {getHeaderTitle(route)}
              </Text>
            ),
            headerLeft: null,
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
          })}
        />
        <RootStack.Screen
          name="Park"
          component={Park}
          options={({ route }) => ({
            headerTitle: setParkTitle(),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
          })}
        />
        <RootStack.Screen
          name="Vehicule"
          component={Vehicule}
          options={({ route, navigation }) => ({
            headerTitle: setVehiculeTitle(),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
            headerRight: () => (
              <Button
                onPress={() =>
                  deleteVehicule(
                    navigation,
                    route.params.vehicule,
                    route.params.user
                  )
                }
              >
                <IconsFA
                  name="trash"
                  size={iconSize.delete}
                  color={colors.text}
                />
              </Button>
            ),
          })}
        />
        <RootStack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={({ route, navigation }) => ({
            headerTitle: setPaymentMethodTitle(),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
            headerRight: () => (
              <Button
                onPress={() =>
                  deletePaymentMethod(
                    navigation,
                    route.params.paymentMethod,
                    route.params.user
                  )
                }
              >
                <IconsFA
                  name="trash"
                  size={iconSize.delete}
                  color={colors.text}
                />
              </Button>
            ),
          })}
        />
        <RootStack.Screen
          name="SavedSpace"
          component={SavedSpace}
          options={({ route, navigation }) => ({
            headerTitle: setSavedSpaceTitle(),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
          })}
        />
        <RootStack.Screen
          name="History"
          component={History}
          options={({ route, navigation }) => ({
            headerTitle: setHistoryItemTitle(),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
            headerRight: () => (
              <Button
                onPress={() =>
                  deleteHistoryItem(
                    navigation,
                    route.params.history,
                    route.params.user
                  )
                }
              >
                <IconsFA
                  name="trash"
                  size={iconSize.delete}
                  color={colors.text}
                />
              </Button>
            ),
          })}
        />
        <RootStack.Screen
          name="AddVehicule"
          component={AddVehicule}
          options={({ route }) => ({
            headerTitle: (
              <Text style={{ fontFamily: fonts.main }}>
                {headerTitles.addVehicule}
              </Text>
            ),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
          })}
        />
        <RootStack.Screen
          name="AddPaymentMethod"
          component={AddPaymentMethod}
          options={({ route }) => ({
            headerTitle: (
              <Text style={{ fontFamily: fonts.main }}>
                {headerTitles.addPaymentMethod}
              </Text>
            ),
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
          })}
        />
      </RootStack.Navigator>
    </Provider>
  );
}
