import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Image, ScrollView } from "react-native";
import { FAB, TextInput, Button, Divider } from "react-native-paper";
import { styles } from "./styles";

import { colors } from "../../../../constant/color";
import { generalStyles } from "../../../../constant/styles";
import { theme } from "../../../../constant/styles";

export default function Infos({ navigation }) {
  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(generalStyles.inputDisabled);

  function enable() {
    setEditable(true);
    setInputStyle(generalStyles.input);
  }

  function disable() {
    setEditable(false);
    setInputStyle(generalStyles.inputDisabled);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", e => {
      disable();
    })

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={generalStyles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Image
            style={styles.logo}
            source={require('../../../../../assets/profile-icon.png')}
          />
          <Divider style={{
            height: 3,
            backgroundColor: "black",
            marginVertical: 20,
          }} />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(name) => setName(name)}
            label="Nome"
            editable={editable}
            style={inputStyle}
            theme={theme}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(contact) => setContact(contact)}
            label="Contacto"
            editable={editable}
            style={inputStyle}
            theme={theme}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}//TODO: FIX INPUT STYLES
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(email) => setEmail(email)}
            label="Email"
            editable={editable}
            style={generalStyles.input}
            theme={theme}
          />
          <TextInput
            mode="flat"
            underlineColor={colors.main}
            selectionColor={colors.secondary}
            dense={true}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            label="Password"
            editable={editable}
            style={inputStyle}
            theme={theme}
          />
          <Button mode="contained" style={generalStyles.mainButton} title="Login" onPress={() => alert("edit")}>
            <Text style={generalStyles.mainButtonText}>Atualizar Dados</Text>
          </Button>
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
