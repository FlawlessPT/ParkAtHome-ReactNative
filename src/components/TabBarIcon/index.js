import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { iconSize } from "../../constant/size";
import { Image } from "react-native";

export default function MainTabIcon({ focused, color, route }) {
  let iconName;
  let size;

  switch (route) {
    case "ParkList":
      iconName = `${focused ? "home" : "home-outline"}`;
      size = iconSize.bottomTabs;
      break;
    case "Profile":
      iconName = `${focused ? "account-circle" : "account-circle-outline"}`;
      size = iconSize.bottomTabs;
      break;
    case "HistoryList":
      iconName = `${focused ? "history" : "history"}`;
      size = iconSize.bottomTabs;
      break;
    // if (iconName == "history") {
    //   return (
    //     <Image
    //       source={require("../../../assets/history.png")}
    //       style={{ width: 23, height: 23 }}
    //     />
    //   );
    // } else if (iconName == "history-outline") {
    //   return (
    //     <Image
    //       source={require("../../../assets/history-outline.png")}
    //       style={{ width: 23, height: 23 }}
    //     />
    //   );
    // }
    default:
      iconName = "alert-octagram";
      size = iconSize.bottomTabs;
      break;
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
}
