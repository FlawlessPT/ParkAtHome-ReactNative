import React from "react";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ParkList from "./src/pages/Park/ParkList";
import HistoryList from "./src/pages/History/HistoryList";

import Park from "./src/pages/Park/Park";
import History from "./src/pages/History/History";

import Infos from "./src/pages/Profile/TopTabs/Infos";
import Vehicules from "./src/pages/Profile/TopTabs/Vehicules";
import Payments from "./src/pages/Profile/TopTabs/Payments";

import Login from "./src/pages/Initial/Login";
import Register from "./src/pages/Initial/Register";

import AddVehicule from "./src/pages/Profile/TopTabs/Vehicules/Add";
import AddPayment from "./src/pages/Profile/TopTabs/Payments/Add";

import { Button } from "react-native-paper";
import IconsFA from "react-native-vector-icons/FontAwesome";
import { colors } from "./src/constant/color";
import { iconSize } from "./src/constant/size";
import { headerTitles } from "./src/constant/text";
import { tabBarTitles } from "./src/constant/text";

const ParkListStack = createStackNavigator();
const ProfileStack = createStackNavigator();
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
        labelStyle: { fontSize: 13 },
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
        name="Vehicules"
        component={Vehicules}
        options={{
          title: tabBarTitles.vehicules,
        }}
      />
      <TopTab.Screen
        name="Payments"
        component={Payments}
        options={{
          title: tabBarTitles.payments,
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
    <BottomTab.Navigator>
      <BottomTab.Screen name="ParkList" component={ParkListStackScreen} />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTopTabNavigatorScreen}
      />
      <BottomTab.Screen name="HistoryList" component={HistoryListStackScreen} />
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

export default function App() {
  return (
    <NavigationContainer>
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
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerLeft: null,
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
            headerRight: () => (
              <Button onPress={() => alert("OI")}>
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
            },
            headerRight: () => (
              <Button onPress={() => alert("OI")}>
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
            },
            headerRight: () => (
              <Button onPress={() => alert("OI")}>
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
            },
          })}
        />
        <RootStack.Screen
          name="AddPayment"
          component={AddPayment}
          options={({ route }) => ({
            headerTitle: headerTitles.addPayment,
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.main,
            },
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
