import React from "react";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Button } from "react-native-paper";
import IconsFA from "react-native-vector-icons/FontAwesome";

import TabBarIcon from "../components/TabBarIcon";

import ParkList from "../pages/Park/ParkList";
import HistoryList from "../pages/History/HistoryList";

import Park from "../pages/Park/Park";
import Infos from "../pages/Profile/TopTabs/Infos";
import Vehicules from "../pages/Profile/TopTabs/Vehicules";
import Methods from "../pages/Profile/TopTabs/Methods";
import History from "../pages/History/History";
import Login from "../pages/Initial/Login";
import Register from "../pages/Initial/Register";
import AddVehicule from "../pages/Profile/TopTabs/Vehicules/Add";
import AddMethod from "../pages/Profile/TopTabs/Methods/Add";

import { colors } from "../constant/color";
import { iconSize } from "../constant/size";
import { headerTitles } from "../constant/text";
import { tabBarTitles } from "../constant/text";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        name="Methods"
        component={Methods}
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
        labelStyle: { fontSize: 12 },
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
          headerTitle: getHeaderTitle(route),
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
          },
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
        name="AddMethod"
        component={AddMethod}
        options={({ route }) => ({
          headerTitle: headerTitles.addMethod,
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.main,
          },
        })}
      />
    </RootStack.Navigator>
  );
}
