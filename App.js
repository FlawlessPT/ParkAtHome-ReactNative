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
import Infos from "./src/pages/Profile/TopTabs/Infos";
import Vehicules from "./src/pages/Profile/TopTabs/Vehicules";
import Payments from "./src/pages/Profile/TopTabs/Payments";
import History from "./src/pages/History/History";
import InitialPage from "./src/pages/Initial/Initial";
import Login from "./src/pages/Initial/Login";
import Register from "./src/pages/Initial/Register";

const ParkListStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HistoryListStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

function ParkListStackScreen() {
  return (
    <ParkListStack.Navigator>
      <ParkListStack.Screen
        name="ParkList"
        component={ParkList}
        options={{ tabBarLabel: "Lista Parques" }}
      />
    </ParkListStack.Navigator>
  );
}

function ProfileTopTabNavigatorScreen() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Infos" component={Infos} />
      <TopTab.Screen name="Vehicules" component={Vehicules} />
      <TopTab.Screen name="Payments" component={Payments} />
    </TopTab.Navigator>
  );
}

// function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen
//         name="Profile"
//         component={Profile}
//         options={{ tabBarLabel: "Perfil" }}
//       />
//     </ProfileStack.Navigator>
//   );
// }

function HistoryListStackScreen() {
  return (
    <HistoryListStack.Navigator>
      <HistoryListStack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{ tabBarLabel: "Histórico" }}
      />
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
      <RootStack.Navigator initialRouteName="Initial">
        <RootStack.Screen
          name="Inital"
          component={InitialPage}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
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
          name="History"
          component={History}
          options={({ route }) => ({
            headerTitle: "Detalhes Histórico",
          })}
        />
        {/* <RootStack.Screen
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
            headerTitle: "Lista Veículos",
          })}
        />
        <RootStack.Screen
          name="Payments"
          component={Payments}
          options={({ route }) => ({
            headerTitle: "Lista Pagamentos",
          })}
        /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
