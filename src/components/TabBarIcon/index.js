import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { iconSize } from "../../constant/size";

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
      iconName = `${focused ? "view-list" : "view-list"}`;
      size = iconSize.bottomTabs;
      break;
    default:
      iconName = "alert-octagram";
      size = iconSize.bottomTabs;
      break;
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
}
