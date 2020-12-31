import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";

export default (props) => {
    const saveVehicule = async () => {
        try {
            const value = JSON.stringify(props.vehicule);
            await AsyncStorage.setItem(storage.vehicule, value);
        } catch (error) {
            alert(error);
        }
    };

    function sendTempVehicule() {
        saveVehicule();
        // alert(JSON.stringify(props.vehicules.name));
        props.navigation.navigate("Vehicule", { vehicule: props.vehicule });
    }

    return (
        <View>
            <TouchableOpacity onPress={() => sendTempVehicule()}
                style={{ paddingHorizontal: 20 }}>
                <View style={{ width: "70%" }}>
                    <Text style={listStyles.itemTitle}>{props.plate}</Text>
                    <Text style={listStyles.itemSubtitle}>{props.name}</Text>
                </View>
            </TouchableOpacity>
            <Divider style={{ height: 2, backgroundColor: "black" }} />
        </View>
    )
}