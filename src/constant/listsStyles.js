import { StyleSheet } from "react-native"
import { colors } from './color'

export const listStyles = StyleSheet.create({
    itemTitle: {
        fontFamily: "Aldrich_Regular",
        marginTop: 20,
        fontSize: 20,
        textAlign: "left",
        color: colors.secondary
    },
    itemSubtitle: {
        fontFamily: "Aldrich_Regular",
        marginTop: 5,
        marginBottom: 15,
        fontSize: 20,
        textAlign: "left",
        color: colors.main
    },
    itemSubtitle1: {
        fontFamily: "Aldrich_Regular",
        marginTop: 5,
        fontSize: 20,
        textAlign: "left",
        color: colors.main
    },
    itemSubtitle2: {
        fontFamily: "Aldrich_Regular",
        marginBottom: 15,
        fontSize: 20,
        textAlign: "left",
        color: colors.main
    },
    itemTitleDisabled: {
        fontFamily: "Aldrich_Regular",
        marginTop: 20,
        fontSize: 20,
        textAlign: "left",
        color: colors.listTextDisabled
    },
    itemSubtitleDisabled: {
        fontFamily: "Aldrich_Regular",
        marginTop: 5,
        marginBottom: 15,
        fontSize: 20,
        textAlign: "left",
        color: colors.listTextDisabled
    },
    itemSubtitle1Disabled: {
        fontFamily: "Aldrich_Regular",
        marginTop: 5,
        fontSize: 20,
        textAlign: "left",
        color: colors.listTextDisabled
    },
    itemSubtitle2Disabled: {
        fontFamily: "Aldrich_Regular",
        marginBottom: 15,
        fontSize: 20,
        textAlign: "left",
        color: colors.listTextDisabled
    }
})