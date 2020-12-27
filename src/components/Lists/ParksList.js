import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { listStyles } from "../../constant/listsStyles";
import { styles } from "../../pages/Park/ParkList/styles";

export default (props) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("Park", { id: props.id });//TODO: Pass param here
            }} style={{ paddingHorizontal: 35, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
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