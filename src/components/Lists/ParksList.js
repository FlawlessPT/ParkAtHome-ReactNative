import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";
import { styles } from "../../pages/Park/ParkList/styles";

export default (props) => {
    const fullColor = "red";
    const freeColor = "white";

    const [isFull, setIsFull] = useState(true);
    const [isFullColor, setIsFullColor] = useState(fullColor);

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

    function parkIsFull() {
        if (isFull) {
            // alert("oi");
            return <MaterialCommunityIcons style={{ marginTop: "7%", marginLeft: 10 }} name="close-circle" color="red" size={25} />
        }
        else {
            return null;
        }
    }

    return (
        // <View style={{ backgroundColor: isFullColor }}>
        <View style={{ backgroundColor: "white" }}>
            <TouchableOpacity onPress={() => sendTempPark()}
                style={{ paddingHorizontal: 35, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: "80%" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={listStyles.itemTitle}>
                            {props.name}</Text>
                        {/* {parkIsFull()} */}
                    </View>
                    <Text style={listStyles.itemSubtitle1}>Vagas: X/{props.totalSpaces}</Text>
                    <Text style={listStyles.itemSubtitle2}>{props.pricePerHour} €/hora</Text>
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