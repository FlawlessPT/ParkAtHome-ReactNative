import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Text, Divider, Button, Modal, Portal, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

import { colors } from "../../../../../constant/color";

import { generalStyles, themeProfile } from '../../../../../constant/styles';
import { styles } from "./styles";
import { connection } from "../../../../../constant/database";
import { storage } from "../../../../../constant/storage";

export default function SavedSpace({ route, navigation }) {
    const [parkName, setParkName] = useState("");
    const [idSpace, setIdSpace] = useState("");
    const [plate, setPlate] = useState("");
    const [vehiculeName, setVehiculeName] = useState("");
    const [pricePerHour, setPricePerHour] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [user, setUser] = useState("");
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");

    var timer;

    const [realTime, setRealTime] = useState("00:00:00");
    const [calculatedAmount, setCalculatedAmount] = useState(0);
    const [calculatedTime, setCalculatedTime] = useState(0);

    const [visible, setVisible] = useState(false);

    const { savedSpace } = route.params;

    const url = connection.url + connection.directory;

    const showModal = () => {
        //stop timer
        calculateAmount();
        setVisible(true)
    };
    const hideModal = () => {
        setPaymentMethod("Métodos Disponíveis: ")
        setVisible(false)
    };

    function fixDate(date) {
        var newDate = date.split("-");

        return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
    }

    function calculateAmount() {
        let totalHours = parseInt(realTime.substring(1, 2));
        let totalMinutes = parseInt(realTime.substring(3, 5));

        // alert(totalHours + " " + totalMinutes)

        let finalPrice = 0
        let finalTime = 0

        if (totalHours < 1)
            totalHours = 1

        if (totalMinutes > 0) {
            totalMinutes = parseFloat(((savedSpace.pricePerHour * totalMinutes) / 60).toFixed(2))
        }

        finalTime = parseFloat(totalHours + totalMinutes)
        finalPrice = finalTime * savedSpace.pricePerHour

        setCalculatedAmount(finalPrice.toFixed(2))
        setCalculatedTime(finalTime.toFixed(2))
    }

    function updateAmount(time) {
        let totalHours = parseInt(time.substring(1, 2));
        let totalMinutes = parseInt(time.substring(3, 5));

        // alert(totalHours + " " + totalMinutes)

        let finalValue = 0;

        if (totalHours < 1)
            totalHours = 1

        if (totalMinutes > 0) {
            totalMinutes = parseFloat(((savedSpace.pricePerHour * totalMinutes) / 60).toFixed(2))
        }

        finalValue = (totalHours + totalMinutes) * savedSpace.pricePerHour;

        setCalculatedAmount(finalValue.toFixed(2));
    }

    function getSavedAt() {
        setDate(fixDate(savedSpace.saved_at.substring(0, 10)));
        setTime(savedSpace.saved_at.substring(11, 16));//without seconds
        // setTime(savedSpace.saved_at.substring(11));//with seconds
    }

    function loadSavedSpaceInfo() {
        setParkName(savedSpace.park);
        setIdSpace(savedSpace.idSpace);
        setPricePerHour(savedSpace.pricePerHour);
        setPlate(savedSpace.plate)
        setVehiculeName(savedSpace.vehicule);
        getSavedAt();
    }

    function getPaymentMethodsByUser() {
        fetch(url + "/PaymentMethods/GetPaymentMethodsUser.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user.id,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.message === "success") {
                    setPaymentMethods(json.paymentMethods)
                }
            })
            .catch((error) => {
                alert(error);
            });
    }

    function removeSavedSpace() {
        //calculate amount
        fetch(url + "/Spaces/RemoveSavedSpace.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: savedSpace.id,
                amount: calculatedAmount,
                duration: calculatedTime,
                userId: savedSpace.idUser,
                idSpace: savedSpace.idSpace,
                paymentMethod: paymentMethod,
                idVehicule: savedSpace.idVehicule,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.message === "success") {
                    alert("Reserva terminada.\nObrigado pela preferência e volte sempre!");
                    navigation.goBack();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function updateTime() {

        let savedAtTime = savedSpace.saved_at.substring(11);

        let savedAtHours = savedAtTime.substring(0, 2);
        let actualHours = new Date().toLocaleTimeString().substring(0, 2);

        let savedAtMinutes = savedAtTime.substring(3, 5);
        let actualMinutes = new Date().toLocaleTimeString().substring(3, 5);

        let savedAtSeconds = savedAtTime.substring(6, 8);
        let actualSeconds = new Date().toLocaleTimeString().substring(6, 8);

        //fix hours on first save when hour == 2 && savedHour == 1
        let finalHour = Math.abs(savedAtHours - actualHours);
        let finalMinutes = Math.abs(savedAtMinutes - actualMinutes);
        let finalSeconds = Math.abs(savedAtSeconds - actualSeconds);

        if (savedAtMinutes > actualMinutes) {
            finalMinutes = parseInt(actualMinutes) + Math.abs(savedAtMinutes - actualMinutes)
        }

        if (finalSeconds >= 59) {
            finalSeconds = (finalSeconds - 60);
            finalMinutes++;
        }

        if (finalMinutes >= 59) {
            finalMinutes = (finalMinutes - 60);
            finalHour++;
        }

        let time = (finalHour < 10 ? "0" + finalHour : finalHour) + ":" +
            (finalMinutes < 10 ? "0" + finalMinutes : finalMinutes) + ":" +
            (finalSeconds < 10 && finalSeconds > -1 ? "0" + finalSeconds : finalSeconds);
        setRealTime(time);
        updateAmount(time)

        timer = setInterval(() => {
            if (finalSeconds >= 59) {
                finalSeconds = (finalSeconds - 60);
                finalMinutes++;
            }

            if (finalMinutes >= 59) {
                finalMinutes = (finalMinutes - 60);
                if (finalMinutes == -1) {
                    finalMinutes++;
                }
                finalHour++;
            }

            finalSeconds++;

            let time = (finalHour < 10 ? "0" + finalHour : finalHour) + ":" +
                (finalMinutes < 10 ? "0" + finalMinutes : finalMinutes) + ":" +
                (finalSeconds < 10 && finalSeconds > -1 ? "0" + finalSeconds : finalSeconds);
            setRealTime(time);
            updateAmount(time)
        }, 1000);
    }

    let loadPaymentMethods = paymentMethods.map((item, index) => {
        return (
            <Picker.Item label={item.name} value={item.name} key={index + 1} />
        );
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            async function getAsyncUser() {
                try {
                    let id = await AsyncStorage.getItem(storage.user);
                    id = JSON.parse(id);

                    if (id != null) {
                        setUser(id);
                    }
                } catch (error) {
                    alert(error);
                }
            }

            getAsyncUser().then();
        })

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (user && paymentMethods) {
            loadSavedSpaceInfo();
            getPaymentMethodsByUser();
        }
    }, [user])

    useEffect(() => {
        if (user) {
            updateTime();
        }
    }, [user])

    return (
        <Provider>
            <View style={styles.background}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View style={{
                            marginTop: 15,
                            paddingHorizontal: "5%",
                        }}>
                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ borderRadius: 1, borderWidth: 2, backgroundColor: "white", width: 300, alignSelf: "center" }}>
                                    <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
                                        <Text style={{ color: colors.main, fontSize: 25, textAlign: "center", fontFamily: "Aldrich_Regular" }}>Terminar Reserva</Text>
                                        <Divider style={{ height: 2, backgroundColor: "black", marginVertical: 15 }} />
                                        <Text style={{ marginBottom: 5, color: colors.secondary, fontSize: 20, textAlign: "center", fontFamily: "Aldrich_Regular" }}>Total a pagar: <Text style={{ color: colors.main, fontSize: 20, textAlign: "center", fontFamily: "Aldrich_Regular" }}>{calculatedAmount} </Text>€</Text>
                                        <Picker
                                            itemStyle={{
                                                color: "black",
                                                fontSize: 18,
                                                height: 100,
                                                textAlign: "right",
                                            }}
                                            prompt={"Métodos Disponíveis: "}
                                            style={{ textAlign: "right" }}
                                            mode="dialog"
                                            selectedValue={paymentMethod}
                                            onValueChange={(value) => setPaymentMethod(value)}
                                        >
                                            <Picker.Item label={"Selecionar Método..."} value={"Selecionar Método..."} key={0} />
                                            {loadPaymentMethods}
                                        </Picker>
                                        <TouchableOpacity
                                            style={{
                                                marginTop: 5,
                                                alignSelf: "flex-end",
                                            }}
                                            onPress={() => removeSavedSpace()}
                                        >
                                            <Text style={{
                                                fontSize: 20,
                                                fontFamily: "Aldrich_Regular",
                                                color: colors.secondary
                                            }}>Terminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </Portal>
                            <StatusBar style="auto" />
                            <Text style={{ color: colors.secondary, fontSize: 20, textAlign: "center", fontFamily: "Aldrich_Regular" }}>Parque</Text>
                            <Text style={{ color: colors.main, fontSize: 30, textAlign: "center", fontFamily: "Aldrich_Regular" }}>{parkName}</Text>
                            <Divider style={{ height: 2, backgroundColor: "black", marginVertical: 15 }} />
                            <Text style={{ color: colors.secondary, fontSize: 20, textAlign: "center", fontFamily: "Aldrich_Regular" }}>Vaga:</Text>
                            <Text style={{ color: colors.main, fontSize: 50, textAlign: "center", fontWeight: "bold", fontFamily: "Aldrich_Regular" }}>A{idSpace}</Text>
                            <Divider style={{ height: 2, backgroundColor: "black", marginVertical: 15 }} />
                            <View style={{ alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
                                <View style={{ alignItems: "flex-end", marginRight: 25 }}>
                                    <MaterialCommunityIcons name="car-side" size={80} color={colors.main} />
                                    <Text style={{ color: colors.main, fontSize: 25, fontFamily: "Aldrich_Regular" }}>{plate}</Text>
                                    <Text style={{ color: colors.secondary, fontSize: 15, fontFamily: "Aldrich_Regular" }}>{vehiculeName}</Text>
                                </View>
                                <View>
                                    <Text style={{ color: colors.secondary, fontSize: 20, fontFamily: "Aldrich_Regular" }}>Entrada</Text>
                                    <Text style={{ color: colors.main, fontSize: 30, fontFamily: "Aldrich_Regular" }}>{time}</Text>
                                    <Text style={{ color: colors.secondary, fontSize: 20, fontFamily: "Aldrich_Regular" }}>{date}</Text>
                                </View>
                            </View>
                            <Divider style={{ height: 2, backgroundColor: "black", marginVertical: 15 }} />
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: "50%", borderRightWidth: 2, paddingRight: 10 }}>
                                    <Text style={{ textAlign: "center", color: colors.secondary, fontSize: 20, fontFamily: "Aldrich_Regular" }}>Duração: </Text>
                                    <Text style={{ textAlign: "center", color: colors.main, fontSize: 30, fontFamily: "Aldrich_Regular" }}>{realTime}</Text>
                                </View>
                                <View style={{ width: "50%" }}>
                                    <Text style={{ textAlign: "center", color: colors.secondary, fontSize: 20, fontFamily: "Aldrich_Regular" }}>Total a pagar: </Text>
                                    <Text style={{ textAlign: "center", color: colors.main, fontSize: 30, fontFamily: "Aldrich_Regular" }}>{calculatedAmount} €</Text>
                                </View>
                            </View>
                            <Button mode="contained" style={generalStyles.finishButton} onPress={showModal}>
                                <Text style={generalStyles.mainButtonText}>Terminar</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Provider >
    );
}
