import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/Home";
import Sobre from "./src/Sobre";
import Perfil from "./src/Perfil";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Sobre" component={Sobre}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            title: "Bem-vindo",
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
