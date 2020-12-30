import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import IconsFA from "react-native-vector-icons/FontAwesome";

import TabBarIcon from "../components/TabBarIcon";

import ParkList from "../pages/Park/ParkList";
import Infos from "../pages/Profile/TopTabs/Infos";
import VehiculeList from "../pages/Profile/TopTabs/Vehicules/VehiculeList";
import PaymentMethodList from "../pages/Profile/TopTabs/PaymentMethods/PaymentMethodList";
import HistoryList from "../pages/History/HistoryList";

import Park from "../pages/Park/Park";
import Vehicule from "../pages/Profile/TopTabs/Vehicules/Vehicule";
import PaymentMethod from "../pages/Profile/TopTabs/PaymentMethods/PaymentMethod";
import History from "../pages/History/History";

import AddVehicule from "../pages/Profile/TopTabs/Vehicules/VehiculeAdd";
import AddPaymentMethod from "../pages/Profile/TopTabs/PaymentMethods/PaymentMethodAdd";

import Login from "../pages/Initial/Login";
import Register from "../pages/Initial/Register";

import { colors } from "../constant/color";
import { iconSize } from "../constant/size";
import { headerTitles } from "../constant/text";
import { tabBarTitles } from "../constant/text";
import { Text } from "react-native";

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
          title: tabBarTitles.infos
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

async function clearUserId() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
}

export default function MainBottomTab() {
  return (
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
        name="Main"
        component={Tabs}
        options={({ route, navigation }) => ({
          headerTitle: <Text style={{ fontFamily: "Aldrich_Regular" }}>{getHeaderTitle(route)}</Text>,
          headerLeft: null,
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.main,
          },
          headerRight: () => (
            <Button
              onPress={() => {
                clearUserId();
                navigation.navigate("Login");
              }}
            >
              <IconsFA
                name="sign-out"
                size={iconSize.delete}
                color={colors.text}
              />
            </Button>
          ),
        })}
      />
      <RootStack.Screen
        name="Park"
        component={Park}
        options={({ route }) => ({
          headerTitle: "Detalhes Parque",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.main,
            fontFamily: "Aldrich_Regular",
          },
        })}
      />
      <RootStack.Screen
        name="Vehicule"
        component={Vehicule}
        options={({ route }) => ({
          headerTitle: "(Insert Vehicule Here)",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.main,
            fontFamily: "Aldrich_Regular",
          },
          headerRight: () => (
            <Button onPress={() => alert("Delete")}>
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
        options={({ route }) => ({
          headerTitle: "(Insert Method Here)",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.main,
            fontFamily: "Aldrich_Regular",
          },
          headerRight: () => (
            <Button onPress={() => alert("Delete")}>
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
        name="History"
        component={History}
        options={({ route }) => ({
          headerTitle: "Detalhes Histórico",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.main,
            fontFamily: "Aldrich_Regular",
          },
          headerRight: () => (
            <Button onPress={() => alert("Delete")}>
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
          headerTitle: headerTitles.addVehicule,
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.main,
            fontFamily: "Aldrich_Regular",
          },
        })}
      />
      <RootStack.Screen
        name="AddPaymentMethod"
        component={AddPaymentMethod}
        options={({ route }) => ({
          headerTitle: headerTitles.addPaymentMethod,
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.secondary,
            fontFamily: "Aldrich_Regular",
          },
        })}
      />
    </RootStack.Navigator>
  );
}