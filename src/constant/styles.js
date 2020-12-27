import { StyleSheet } from "react-native"
import { configureFonts } from "react-native-paper";
import { colors } from './color'

export const generalStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: "10%",
        backgroundColor: "white",
        flexGrow: 1
    },
    logo: {
        width: "100%",
        height: 130,
        resizeMode: "contain"
    },
    input: {
        padding: -10,
        marginBottom: 10,
        backgroundColor: "white",
        fontSize: 18,
    },
    mainButton: {
        marginVertical: 10,
        backgroundColor: colors.main
    },
    mainButtonText: {
        padding: 5,
        fontSize: 20,
        fontFamily: "Aldrich_Regular",
        color: colors.text
    },
    buttonRegisterOrLoginText: {
        padding: 5,
        fontSize: 16,
        fontFamily: "Aldrich_Regular",
        color: colors.main
    }
});

export const theme = {
    fonts: configureFonts({
        default: {
            regular: {
                fontFamily: "Aldrich_Regular",
            }
        }
    }),
    colors: {
        primary: colors.main,
        placeholder: colors.secondary,
        text: colors.main,
    },
};