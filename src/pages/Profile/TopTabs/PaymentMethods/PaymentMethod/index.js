import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { FAB, Button, TextInput, Text } from 'react-native-paper';

import { colors } from "../../../../../constant/color";
import { connection } from "../../../../../constant/database";
import { storage } from "../../../../../constant/storage";
import { generalStyles, theme, themeProfile } from '../../../../../constant/styles';
import { styles } from "./styles";

export default function PaymentMethod({ route, navigation }) {
    const [editable, setEditable] = useState(false);
    const [inputStyle, setInputStyle] = useState(themeProfile.disable);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { paymentMethod } = route.params;

    const url = connection.url + connection.directory;

    function enable() {
        setEditable(true);
        setInputStyle(themeProfile.enable);
    }

    function disable() {
        setEditable(false);
        setInputStyle(themeProfile.disable);
    }

    function getName() {
        setName(paymentMethod.name);
    }

    function getDescription() {
        setDescription(paymentMethod.description);
    }

    function getData() {
        getName();
        getDescription();
    }

    function updateButton() {
        if (editable) {
            return (
                <Button mode="contained" style={generalStyles.mainButton} title="Login" onPress={() => updatePaymentMethod()}>
                    <Text style={generalStyles.mainButtonText}>Atualizar Veículo</Text>
                </Button>
            )
        }
        else {
            return null;
        }
    }

    function updatePaymentMethod() {
        if (name != "" && description != "") {
            fetch(url + "/PaymentMethods/Update.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: paymentMethod.id,
                    name: name,
                    description: description,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message === "success") {
                        alert("Atualizado com sucesso!")
                        navigation.goBack()
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            alert("Preencha todos os campos!");
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", e => {
            disable();
            getData();
        })

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.background}>
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={{
                        marginTop: 10,
                        paddingHorizontal: "5%",
                    }}>
                        <StatusBar style="auto" />
                        <TextInput
                            mode="flat"
                            underlineColor={colors.main}
                            selectionColor={colors.secondary}
                            dense={true}
                            onChangeText={(name) => setName(name)}
                            label="Nome"
                            value={name}
                            editable={editable}
                            style={generalStyles.input}
                            theme={inputStyle}
                        />
                        <TextInput
                            mode="flat"
                            underlineColor={colors.main}
                            selectionColor={colors.secondary}
                            dense={true}
                            onChangeText={(description) => setDescription(description)}
                            label="Descrição"
                            value={description}
                            editable={editable}
                            style={generalStyles.input}
                            theme={inputStyle}
                        />
                        {updateButton()}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <FAB
                style={generalStyles.fab}
                icon="square-edit-outline"
                onPress={() => enable()}
            />
        </View>
    );
}
