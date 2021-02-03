import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  parkImage: {
    height: 90,
    width: 90,
    borderRadius: 20,
  },
  parkImageDisabled: {
    height: 90,
    width: 90,
    borderRadius: 20,
    opacity: 1,
  },
  noParksAssociatedContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
