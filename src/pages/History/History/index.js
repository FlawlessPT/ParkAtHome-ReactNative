// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState, useRef } from "react";
// import { View, ScrollView, KeyboardAvoidingView } from "react-native";
// import { TextInput } from 'react-native-paper';

// import { colors } from "../../../constant/color";

// import { generalStyles, themeProfile } from '../../../constant/styles';
// import { styles } from "./styles";

// export default function History({ route, navigation }) {
//   const [parkName, setParkName] = useState("");
//   const [vehiculeName, setVehiculeName] = useState("");
//   const [paymentMethodName, setPaymentMethodName] = useState("");
//   const [duration, setDuration] = useState("");
//   const [amount, setAmount] = useState("");
//   const [paidAt, setPaidAt] = useState("");

//   const { history } = route.params;

//   function getParkName() {
//     setParkName(history.park);
//   }

//   function getVehiculeName() {
//     setVehiculeName(history.vehicule);
//   }

//   function getPaymentMethodName() {
//     setPaymentMethodName(history.paymentMethod);
//   }

//   function getDuration() {
//     setDuration(history.duration);
//   }

//   function getAmount() {
//     setAmount(history.amount);
//   }

//   function getPaidAt() {
//     setPaidAt(history.paid_at);
//   }

//   function getData() {
//     getParkName();
//     getVehiculeName();
//     getPaymentMethodName();
//     getDuration();
//     getAmount();
//     getPaidAt();
//   }

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getData();
//     })

//     return unsubscribe;
//   }, [navigation]);

//   return (
//     <View style={styles.background}>
//       <KeyboardAvoidingView>
//         <ScrollView>
//           <View style={{
//             marginTop: 10,
//             paddingHorizontal: "5%",
//           }}>
//             <StatusBar style="auto" />
//             <TextInput
//               mode="flat"
//               underlineColor={colors.main}
//               selectionColor={colors.secondary}
//               dense={true}
//               value={parkName}
//               editable={false}
//               style={generalStyles.input}
//               theme={themeProfile.disable}
//             />
//             <TextInput
//               mode="flat"
//               underlineColor={colors.main}
//               selectionColor={colors.secondary}
//               dense={true}
//               value={vehiculeName}
//               editable={false}
//               style={generalStyles.input}
//               theme={themeProfile.disable}
//             />
//             <TextInput
//               mode="flat"
//               underlineColor={colors.main}
//               selectionColor={colors.secondary}
//               dense={true}
//               value={paymentMethodName}
//               editable={false}
//               style={generalStyles.input}
//               theme={themeProfile.disable}
//             />
//             <TextInput
//               mode="flat"
//               underlineColor={colors.main}
//               selectionColor={colors.secondary}
//               dense={true}
//               value={`${duration}h`}
//               editable={false}
//               style={generalStyles.input}
//               theme={themeProfile.disable}
//             />
//             <TextInput
//               mode="flat"
//               underlineColor={colors.main}
//               selectionColor={colors.secondary}
//               dense={true}
//               value={amount}
//               editable={false}
//               style={generalStyles.input}
//               theme={themeProfile.disable}
//             />
//             <TextInput
//               mode="flat"
//               underlineColor={colors.main}
//               selectionColor={colors.secondary}
//               dense={true}
//               value={paidAt}
//               editable={false}
//               style={generalStyles.input}
//               theme={themeProfile.disable}
//             />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Text, Divider, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../../../constant/color";

import { generalStyles, themeProfile } from "../../../constant/styles";
import { styles } from "./styles";
import { connection } from "../../../constant/database";
import { storage } from "../../../constant/storage";

export default function History({ route, navigation }) {
  const [parkName, setParkName] = useState("");
  const [vehiculeName, setVehiculeName] = useState("");
  const [plate, setPlate] = useState("");
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [idSpace, setIdSpace] = useState("");
  const [duration, setDuration] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [paidAt, setPaidAt] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [user, setUser] = useState("");

  const { history } = route.params;

  function fixDate(date) {
    var newDate = date.split("-");

    return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
  }

  function getPaidAt() {
    setPaidAt(history.paid_at);
    setDate(fixDate(history.paid_at.substring(0, 10)));
    setTime(history.paid_at.substring(11, 16)); //without seconds
  }

  function loadHistoryInfo() {
    setParkName(history.park);
    setVehiculeName(history.vehicule);
    setPaymentMethodName(history.paymentMethod);
    setIdSpace(history.idSpace);
    setPlate(history.plate);
    setFinalDuration();
    setAmount(history.amount);
    getPaidAt();
  }

  function setFinalDuration() {
    let actualDuration = history.duration;

    let splitDuration = actualDuration.split(":");

    let finalHours = splitDuration[0];
    let finalMinutes = splitDuration[1];
    let finalSeconds = splitDuration[2];

    setDuration(finalHours + ":" + finalMinutes + ":" + finalSeconds);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadHistoryInfo();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ marginTop: 15, paddingHorizontal: "5%" }}>
            <StatusBar style="auto" />
            <Text
              style={{
                color: colors.secondary,
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Aldrich_Regular",
              }}
            >
              Parque
            </Text>
            <Text
              style={{
                color: colors.main,
                fontSize: 30,
                textAlign: "center",
                fontFamily: "Aldrich_Regular",
              }}
            >
              {parkName}
            </Text>
            <Divider
              style={{
                height: 2,
                backgroundColor: "black",
                marginVertical: 15,
              }}
            />
            <Text
              style={{
                color: colors.secondary,
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Aldrich_Regular",
              }}
            >
              Vaga:
            </Text>
            <Text
              style={{
                color: colors.main,
                fontSize: 50,
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "Aldrich_Regular",
              }}
            >
              A{idSpace}
            </Text>
            <Divider
              style={{
                height: 2,
                backgroundColor: "black",
                marginVertical: 15,
              }}
            />
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ alignItems: "flex-end", marginRight: 25 }}>
                <MaterialCommunityIcons
                  name="car-side"
                  size={80}
                  color={colors.main}
                />
                <Text
                  style={{
                    color: colors.main,
                    fontSize: 25,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  {plate}
                </Text>
                <Text
                  style={{
                    color: colors.secondary,
                    fontSize: 15,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  {vehiculeName}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: colors.secondary,
                    fontSize: 20,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  Pagamento
                </Text>
                <Text
                  style={{
                    color: colors.main,
                    fontSize: 30,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  {time}
                </Text>
                <Text
                  style={{
                    color: colors.secondary,
                    fontSize: 20,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  {date}
                </Text>
              </View>
            </View>
            <Divider
              style={{
                height: 2,
                backgroundColor: "black",
                marginVertical: 15,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ width: "50%", borderRightWidth: 2, paddingRight: 10 }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.secondary,
                    fontSize: 16,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  Método Pagamento:
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.main,
                    fontSize: 25,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  {paymentMethodName}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.secondary,
                    fontSize: 16,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  Total a pagar:
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.main,
                    fontSize: 25,
                    fontFamily: "Aldrich_Regular",
                  }}
                >
                  {amount} €
                </Text>
              </View>
            </View>
            <Divider
              style={{
                height: 2,
                backgroundColor: "black",
                marginVertical: 15,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                color: colors.secondary,
                fontSize: 20,
                fontFamily: "Aldrich_Regular",
              }}
            >
              Duração
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: colors.main,
                fontSize: 30,
                fontFamily: "Aldrich_Regular",
              }}
            >
              {duration || "00:00"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
