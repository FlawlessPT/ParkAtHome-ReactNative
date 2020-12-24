import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Register({ navigation }) {
  const url = connection.url + connection.directory;

  // function register() {
  //   fetch(url + "/Register.php", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       password: password,
  //     }),
  //   });
  // }

  const saveUserId = async (userId) => {
    try {
      const value = JSON.stringify(userId);
      await AsyncStorage.setItem("user_id", value);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Register{"\n"}</Text>
      <Button
        title="Registar Conta"
        onPress={() => navigation.navigate("Main")}
      ></Button>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

// import React from "react";
// import {
//   Text,
//   View,
//   Image,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// export default class Register extends React.Component {
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <KeyboardAvoidingView
//         behavior={Platform.OS == "ios" ? "padding" : "height"}
//       >
//         <View style={{ backgroundColor: "white", height: "100%" }}>
//           <Image
//             source={require("../assets/logo.png")}
//             style={{
//               //width: "70%",
//               height: "30%",
//               alignSelf: "center",
//               marginTop: "20%",
//               resizeMode: "contain",
//             }}
//           ></Image>
//           {/* input nome */}
//           <View
//             style={{
//               flexDirection: "row",
//               alignSelf: "center",
//               width: "90%",
//               borderWidth: 2,
//               marginTop: "5%",
//               paddingHorizontal: 10,
//               borderColor: "#B72727",
//               borderRadius: 20,
//               paddingVertical: 2,
//               // height: "7%",
//             }}
//           >
//             <TextInput
//               placeholder="Nome"
//               placeholderTextColor="#B72727"
//               style={{ fontSize: 15, height: 45 }}
//             ></TextInput>
//           </View>
//           {/* input email */}
//           <View
//             style={{
//               flexDirection: "row",
//               alignSelf: "center",
//               width: "90%",
//               borderWidth: 2,
//               marginTop: "3%",
//               paddingHorizontal: 10,
//               borderColor: "#B72727",
//               borderRadius: 20,
//               paddingVertical: 2,
//               // height: "7%",
//             }}
//           >
//             <TextInput
//               placeholder="Email"
//               placeholderTextColor="#B72727"
//               style={{ fontSize: 15, height: 45 }}
//             ></TextInput>
//           </View>
//           {/* input password */}
//           <View
//             style={{
//               flexDirection: "row",
//               alignSelf: "center",
//               width: "90%",
//               borderWidth: 2,
//               marginTop: "3%",
//               paddingHorizontal: 10,
//               borderColor: "#B72727",
//               borderRadius: 20,
//               // height: "7%",
//             }}
//           >
//             <TextInput
//               secureTextEntry={true}
//               placeholder="Password"
//               placeholderTextColor="#B72727"
//               style={{ fontSize: 15, height: 45 }}
//             ></TextInput>
//           </View>
//           <View
//             style={{
//               marginHorizontal: 55,
//               alignItems: "center",
//               justifyContent: "center",
//               marginTop: "5%",
//               backgroundColor: "#B72727",
//               borderRadius: 20,
//               alignSelf: "center",
//               width: "90%",
//               height: 45,
//             }}
//           >
//             <Text
//               onPress={() => navigate("InitialPage")}
//               style={{
//                 color: "white",
//                 fontWeight: "bold",
//                 fontSize: 16,
//               }}
//             >
//               Criar Conta
//             </Text>
//           </View>
//           <Text
//             onPress={() => navigate("Login")}
//             style={{
//               alignSelf: "center",
//               color: "#B72727",
//               marginTop: "4%",
//               fontWeight: "bold",
//               fontSize: 16,
//             }}
//           >
//             Iniciar Sessão
//           </Text>
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }
