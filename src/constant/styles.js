import { StyleSheet } from "react-native";
import { configureFonts } from "react-native-paper";
import { colors } from "./color";

export const generalStyles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: "10%",
    backgroundColor: "white",
    flexGrow: 1,
  },
  logo: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
  input: {
    paddingBottom: 0,
    marginBottom: 10,
    backgroundColor: "white",
    fontSize: 18,
  },
  mainButton: {
    borderRadius: 2,
    marginVertical: 10,
    backgroundColor: colors.main,
  },
  finishButton: {
    marginTop: 20,
    borderRadius: 2,
    marginVertical: 10,
    backgroundColor: "green",
  },
  mainButtonDisabled: {
    borderRadius: 2,
    marginVertical: 10,
    backgroundColor: colors.buttonDisabled,
  },
  mainButtonText: {
    padding: 5,
    fontSize: 20,
    fontFamily: "Aldrich_Regular",
    color: colors.text,
  },
  buttonRegisterOrLoginText: {
    padding: 5,
    fontSize: 16,
    fontFamily: "Aldrich_Regular",
    color: colors.main,
  },
  fab: {
    backgroundColor: "#0063a1",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

// export const themeEnabled = {
//     fonts: configureFonts({
//         default: {
//             regular: {
//                 fontFamily: "Aldrich_Regular",
//             }
//         }
//     }),
//     colors: {
//         primary: colors.main,
//         placeholder: colors.secondary,
//         text: colors.main,
//     },
// };

// export const themeDisabled = {
//     fonts: configureFonts({
//         default: {
//             regular: {
//                 fontFamily: "Aldrich_Regular",
//             }
//         }
//     }),
//     colors: {
//         primary: colors.main,
//         placeholder: colors.secondary,
//         text: colors.secondary,
//     },
// };

export const theme = {
  fonts: configureFonts({
    default: {
      regular: {
        fontFamily: "Aldrich_Regular",
      },
    },
  }),
  colors: {
    primary: colors.main,
    placeholder: colors.secondary,
    text: colors.main,
  },
};

export const themeProfile = {
  enable: {
    fonts: configureFonts({
      default: {
        regular: {
          fontFamily: "Aldrich_Regular",
        },
      },
    }),
    colors: {
      primary: colors.main,
      placeholder: colors.secondary,
      text: colors.main,
    },
  },
  disable: {
    fonts: configureFonts({
      default: {
        regular: {
          fontFamily: "Aldrich_Regular",
        },
      },
    }),
    colors: {
      primary: colors.main,
      placeholder: colors.secondary,
      text: colors.secondary,
    },
  },
};
