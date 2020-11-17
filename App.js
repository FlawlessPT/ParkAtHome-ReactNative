import React from "react";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ParkList from "./src/pages/Park/ParkList";
import Profile from "./src/pages/Profile/Profile";
import HistoryList from "./src/pages/History/HistoryList";

import Park from "./src/pages/Park/Park";
import Infos from "./src/pages/Profile/Tabs/Infos";
import Vehicules from "./src/pages/Profile/Tabs/Vehicules";
import Payments from "./src/pages/Profile/Tabs/Payments";
import History from "./src/pages/History/History";

const ParkListStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HistoryListStack = createStackNavigator();

// const ParkStack = createStackNavigator();
// const InfosStack = createStackNavigator();
// const HistoryStack = createStackNavigator();

const BottomTabs = createBottomTabNavigator();
const RootStack = createStackNavigator();

function ParkListStackScreen() {
  return (
    <ParkListStack.Navigator>
      <ParkListStack.Screen
        name="ParkList"
        component={ParkList}
        options={{ tabBarLabel: "Lista Parques" }}
      />
      {/* <ParkListStack.Screen
        name="ParkStack"
        component={Park}
        options={{ title: "Parque" }}
      ></ParkListStack.Screen> */}
    </ParkListStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: "Perfil" }}
      />
      {/* <ProfileStack.Screen
        name="Infos"
        component={Infos}
        options={{ title: "Informações" }}
      ></ProfileStack.Screen> */}
    </ProfileStack.Navigator>
  );
}

function HistoryListStackScreen() {
  return (
    <HistoryListStack.Navigator>
      <HistoryListStack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{ tabBarLabel: "Histórico" }}
      />
      {/* <HistoryListStack.Screen
        name="History"
        component={History}
        options={{ title: "Histórico" }}
      ></HistoryListStack.Screen> */}
    </HistoryListStack.Navigator>
  );
}

function Tabs() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="ParkList" component={ParkListStackScreen} />
      <BottomTabs.Screen name="Profile" component={ProfileStackScreen} />
      <BottomTabs.Screen
        name="HistoryList"
        component={HistoryListStackScreen}
      />
    </BottomTabs.Navigator>
  );
}

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "ParkList";

  switch (routeName) {
    case "ParkList":
      return "Lista Parques";
    case "Profile":
      return "Perfil";
    case "HistoryList":
      return "Histórico";
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Main">
        <RootStack.Screen
          name="Main"
          component={Tabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <RootStack.Screen
          name="Park"
          component={Park}
          options={({ route }) => ({
            headerTitle: "Detalhes Parque",
          })}
        />
        <RootStack.Screen
          name="Infos"
          component={Infos}
          options={({ route }) => ({
            headerTitle: "Infos",
          })}
        />
        <RootStack.Screen
          name="Vehicules"
          component={Vehicules}
          options={({ route }) => ({
            headerTitle: "Veículos",
          })}
        />
        <RootStack.Screen
          name="Payments"
          component={Payments}
          options={({ route }) => ({
            headerTitle: "Pagamentos",
          })}
        />
        <RootStack.Screen name="History" component={History} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
