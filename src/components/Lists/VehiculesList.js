import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";

export default (props) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("Vehicule");//TODO: Pass param here
            }} style={{ paddingHorizontal: 20 }}>
                <View style={{ width: "70%" }}>
                    <Text style={listStyles.itemTitle}>{props.plate}</Text>
                    <Text style={listStyles.itemSubtitle}>{props.name}</Text>
                </View>
            </TouchableOpacity>
            <Divider style={{ height: 2, backgroundColor: "black" }} />
        </View>
    )
}