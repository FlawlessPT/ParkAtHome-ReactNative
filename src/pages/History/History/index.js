import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { TextInput } from 'react-native-paper';

import { colors } from "../../../constant/color";

import { generalStyles, themeProfile } from '../../../constant/styles';
import { styles } from "./styles";

export default function PaymentMethod({ route, navigation }) {
  const [parkName, setParkName] = useState("");
  const [vehiculeName, setVehiculeName] = useState("");
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [paidAt, setPaidAt] = useState("");

  const { history } = route.params;

  function getParkName() {
    setParkName(history.park);
  }

  function getVehiculeName() {
    setVehiculeName(history.vehicule);
  }

  function getPaymentMethodName() {
    setPaymentMethodName(history.paymentMethod);
  }

  function getDuration() {
    setDuration(history.duration);
  }

  function getAmount() {
    setAmount(history.amount);
  }

  function getPaidAt() {
    setPaidAt(history.paid_at);
  }

  function getData() {
    getParkName();
    getVehiculeName();
    getPaymentMethodName();
    getDuration();
    getAmount();
    getPaidAt();
  }

  useEffect(() => {
    getData()
  }, []);

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
              value={parkName}
              editable={false}
              style={generalStyles.input}
              theme={themeProfile.disable}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              value={vehiculeName}
              editable={false}
              style={generalStyles.input}
              theme={themeProfile.disable}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              value={paymentMethodName}
              editable={false}
              style={generalStyles.input}
              theme={themeProfile.disable}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              value={`${duration}h`}
              editable={false}
              style={generalStyles.input}
              theme={themeProfile.disable}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              value={amount}
              editable={false}
              style={generalStyles.input}
              theme={themeProfile.disable}
            />
            <TextInput
              mode="flat"
              underlineColor={colors.main}
              selectionColor={colors.secondary}
              dense={true}
              value={paidAt}
              editable={false}
              style={generalStyles.input}
              theme={themeProfile.disable}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
