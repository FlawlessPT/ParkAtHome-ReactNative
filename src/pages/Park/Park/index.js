import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Button, Divider, Modal, Provider, Portal } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import MyAlert from "../../../components/Alert/OkAlert";

import { colors } from "../../../constant/color";
import { connection } from "../../../constant/database";
import { storage } from "../../../constant/storage";
import { generalStyles } from "../../../constant/styles";

export default function Park({ route, navigation }) {
  const { park, totalSavedSpaces } = route.params;

  const url = connection.url + connection.directory;

  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [totalSpaces, setTotalSpaces] = useState("");
  const [totalSavedSpace, setTotalSavedSpaces] = useState(0);
  const [localization, setLocalization] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const [vehicules, setVehicules] = useState([]);
  const [plate, setPlate] = useState("---");
  const [user, setUser] = useState("");

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setPlate("---");
    setVisible(false);
  };

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [message, setMessage] = useState("Erro");
  const [type, setType] = useState("error");

  const showAlert = (message, type) => {
    setMessage(message);
    setType(type);
    setVisibleAlert(true);
  };
  const hideAlert = () => setVisibleAlert(false);

  function loadParkInfo() {
    setAddress(park.address);
    setContact(park.contact);
    setEmail(park.email);
    setTotalSpaces(park.totalSpaces);
    setTotalSavedSpaces(park.totalSavedSpaces);
    setLocalization(park.localization);
    setPricePerHour(park.pricePerHour);
  }

  function getPlatesByUser() {
    fetch(url + "/Vehicules/GetVehiculesNotSaved.php", {
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
          setVehicules(json.vehicules);
        } else {
          setVehicules([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function saveSpace() {
    if (plate != "---") {
      fetch(url + "/Spaces/SaveSpace.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          plate: plate,
          parkId: park.id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "success") {
            setVisible(false);
            setParkInfo();
            hideModal();
            Alert.alert(
              "Sucesso",
              "Vaga A" + json.savedSpace.idSpace + " reservada com sucesso!",
              [{ text: "OK", onPress: () => navigation.goBack() }],
              { cancelable: true }
            );
            // navigation.navigate("Main", {
            //   screen: "Profile",
            //   params: {
            //     screen: "SavedSpacesList",
            //   },
            // });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showAlert("Selecione uma matrícula!", "warning");
    }
  }

  function setParkInfo() {
    fetch(url + "/Parks/GetParkById.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: park.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "success") {
          updateParkInfo(
            json.park.address,
            json.park.localization,
            json.park.totalSpaces,
            json.park.totalSavedSpaces,
            json.park.contact,
            json.park.email,
            json.park.pricePerHour
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateParkInfo(
    address,
    localization,
    totalSpaces,
    totalSavedSpaces,
    contact,
    email,
    pricePerHour
  ) {
    setAddress(address);
    setLocalization(localization);
    setTotalSpaces(totalSpaces);
    setTotalSavedSpaces(totalSavedSpaces);
    setContact(contact);
    setEmail(email);
    setPricePerHour(pricePerHour);
  }

  function buttonSaveSpace() {
    if (totalSavedSpace == park.totalSpaces) {
      return (
        <Button style={generalStyles.mainButtonDisabled} disabled={true}>
          <Text style={generalStyles.mainButtonText}>Reservar</Text>
        </Button>
      );
    } else {
      return (
        <Button style={generalStyles.mainButton} onPress={showModal}>
          <Text style={generalStyles.mainButtonText}>Reservar</Text>
        </Button>
      );
    }
  }

  let loadPlates = vehicules.map((item, index) => {
    return (
      <Picker.Item label={item.plate} value={item.plate} key={index + 1} />
    );
  });

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getAsyncUser() {
        try {
          let id = await AsyncStorage.getItem(storage.user);
          id = JSON.parse(id);

          if (id != null) {
            setUser(id);
          }
        } catch (error) {
          console.log(error);
        }
      }

      getAsyncUser().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user && vehicules) {
      loadParkInfo();
      getPlatesByUser();
    }
  }, [user]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     let isActive = true;

  //     getAsyncUser();
  //     loadParkInfo();
  //     saveSpace();

  //     return () => {
  //       isActive = false;
  //     };
  //   }, [])
  // );

  return (
    <Provider>
      <View style={generalStyles.background}>
        <ScrollView>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                borderRadius: 1,
                borderWidth: 2,
                backgroundColor: "white",
                height: 120,
                width: 300,
                alignSelf: "center",
              }}
            >
              <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
                {/* <Text style={{
                  alignSelf: "flex-end",
                  fontSize: 20,
                  marginBottom: 25
                }}>
                  Matriculas...
                </Text> */}
                <Picker
                  itemStyle={{
                    color: "black",
                    fontSize: 16,
                    height: 100,
                    textAlign: "right",
                  }}
                  prompt={"Matrículas Disponíveis: "}
                  style={{ width: "100%", textAlign: "right" }}
                  mode="dialog"
                  selectedValue={plate}
                  onValueChange={(value) => setPlate(value)}
                >
                  <Picker.Item
                    label={"Selecionar Matricula..."}
                    value={"---"}
                    key={0}
                  />
                  {loadPlates}
                </Picker>
                <TouchableOpacity
                  style={{
                    marginTop: 5,
                    alignSelf: "flex-end",
                  }}
                  onPress={() => saveSpace()}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Aldrich_Regular",
                      color: colors.secondary,
                    }}
                  >
                    Reservar
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <MyAlert
              visible={visibleAlert}
              type={type}
              message={message}
              onDismiss={hideAlert}
              navigation={navigation}
            />
          </Portal>
          <Image
            style={{
              width: "100%",
              height: 200,
            }}
            source={require("../../../../assets/parque_01.jpg")}
          />
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontFamily: "Aldrich_Regular",
                fontSize: 30,
                color: colors.main,
              }}
            >
              Detalhes Parque
            </Text>
            <Divider
              style={{
                height: 3,
                backgroundColor: "black",
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                fontFamily: "Aldrich_Regular",
                fontSize: 20,
                color: colors.main,
                marginBottom: 5,
              }}
            >
              Morada: <Text style={{ color: colors.secondary }}>{address}</Text>
            </Text>
            <Text
              style={{
                fontFamily: "Aldrich_Regular",
                fontSize: 20,
                color: colors.main,
                marginBottom: 5,
              }}
            >
              Localização:{" "}
              <Text style={{ color: colors.secondary }}>{localization}</Text>
            </Text>
            <Text
              style={{
                fontFamily: "Aldrich_Regular",
                fontSize: 20,
                color: colors.main,
                marginBottom: 5,
              }}
            >
              Lotação:{" "}
              <Text style={{ color: colors.secondary }}>
                {totalSavedSpace} / {totalSpaces}
              </Text>{" "}
              veiculos
            </Text>
            <Text
              style={{
                fontFamily: "Aldrich_Regular",
                fontSize: 20,
                color: colors.main,
                marginBottom: 5,
              }}
            >
              Contacto:{" "}
              <Text style={{ color: colors.secondary }}>{contact}</Text>
            </Text>
            <Text
              style={{
                fontFamily: "Aldrich_Regular",
                fontSize: 20,
                color: colors.main,
                marginBottom: 5,
              }}
            >
              Email: <Text style={{ color: colors.secondary }}>{email}</Text>
            </Text>
            <Text
              style={{
                fontFamily: "Aldrich_Regular",
                fontSize: 20,
                color: colors.main,
                marginBottom: 5,
              }}
            >
              Preço:{" "}
              <Text style={{ color: colors.secondary }}>{pricePerHour}</Text>{" "}
              €/hora
            </Text>
            {buttonSaveSpace()}
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
}
