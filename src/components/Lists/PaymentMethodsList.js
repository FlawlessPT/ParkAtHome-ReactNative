import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";
import { storage } from "../../constant/storage";

export default (props) => {
    const savePaymentMethod = async () => {
        try {
            const value = JSON.stringify(props.paymentMethod);
            await AsyncStorage.setItem(storage.paymentMethod, value);
        } catch (error) {
            alert(error);
        }
    };

    function sendTempPaymentMethod() {
        savePaymentMethod();
        props.navigation.navigate("PaymentMethod", { paymentMethod: props.paymentMethod });
    }

    return (
        <View>
            <TouchableOpacity onPress={() => sendTempPaymentMethod()}
                style={{ paddingHorizontal: 20 }}>
                <View style={{ width: "70%" }}>
                    <Text style={listStyles.itemTitle}>{props.name}</Text>
                    <Text style={listStyles.itemSubtitle}>{props.description}</Text>
                </View>
            </TouchableOpacity>
            <Divider style={{ height: 2, backgroundColor: "black" }} />
        </View>
    )
}