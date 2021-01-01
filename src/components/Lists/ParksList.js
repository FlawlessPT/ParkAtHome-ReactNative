import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";
import { styles } from "../../pages/Park/ParkList/styles";

export default (props) => {
    const savePark = async () => {
        try {
            const value = JSON.stringify(props.park);
            await AsyncStorage.setItem(storage.park, value);
        } catch (error) {
            alert(error);
        }
    };

    function sendTempPark() {
        savePark();
        props.navigation.navigate("Park", { park: props.park });
    }
    return (
        <View>
            <TouchableOpacity onPress={() => sendTempPark()}
                style={{ paddingHorizontal: 35, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: "80%" }}>
                    <Text style={listStyles.itemTitle}>{props.name}</Text>
                    <Text style={listStyles.itemSubtitle1}>Número de Vagas: {props.totalSpaces}</Text>
                    <Text style={listStyles.itemSubtitle2}>Valor p/hora: {props.pricePerHour} €</Text>
                </View>
                <Image
                    style={styles.parkImage}
                    source={require('../../../assets/parque_01.jpg')}
                />
            </TouchableOpacity>
            <Divider style={{ height: 2, backgroundColor: "black" }} />
        </View>
    )
}