import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RadioButton, TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { DefaultTheme } from "react-native-paper";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const TicketsandSuport: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState(false);
  const [cpfErrorMessage, setCpfErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [textMensag, settextMensag] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const navigation = useNavigation();

  async function handleFetchData() {
    const response = await AsyncStorage.getItem("TicketType");
    const responseTwo = await AsyncStorage.getItem("TicketSubType");
    console.log(response, responseTwo);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  const handleSubmit = async () => {
    setCpfError(false);
    setPasswordError(false);

    let contract = await AsyncStorage.getItem("contract");
    contract = contract?.split("-")[1].toString()
      ? contract?.split("-")[1].toString()
      : "9999";
    const token = await AsyncStorage.getItem("tokenUser");

    if (!textMensag) {
      setCpfError(true);
      setCpfErrorMessage("A mensagem do ticket deve estar preenchida.");
      return;
    }

    let ddd = fone.substr(2);
    const teste = fone.replace(/\s/g, "");
    let contato = teste.substr(2, 9);

    const data = {
      contrato: contract,
      tipoAtendimento: 1,
      subTipoAtendimento: 1,
      descricao: textMensag,
      DDD: ddd,
      telefone: contato,
      email: email,
    };

    console.log(data);

    api
      .put("/sac", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (response) => {
        // if(response.data.erro) {
        //     Alert.alert(
        //         'Erro ao abrir ticket',
        //         response.data.erro
        //     )
        // }
        Alert.alert("Protocolo gerado com sucesso");

        if (response.data.token) {
          await AsyncStorage.setItem("tokenUser", response.data.token);
          Alert.alert("Protocolo gerado com sucesso");
          navigation.navigate("MainMenu");
        }
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.navigate("MainMenu")}>
            <Feather
              name="arrow-left"
              color={colors.white}
              size={30}
              style={styles.navBarIcon}
            />
          </TouchableOpacity>
          <Text style={styles.navBarText}>Chamados</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Descreve Seu problema</Text>
          <View style={styles.BoxInput}>
            <TextInput
              label="Sua Resposta:"
              underlineColor={colors.blue10}
              onChangeText={settextMensag}
              placeholderTextColor={colors.blue10}
              theme={{
                ...DefaultTheme,

                colors: {
                  ...DefaultTheme.colors,
                  primary: colors.blue10,
                },
              }}
              style={styles.imput}
            />
          </View>
          <View style={styles.BoxInput}>
            <TextInput
              label="insira seu email:"
              underlineColor={colors.blue10}
              onChangeText={setEmail}
              placeholderTextColor={colors.blue10}
              theme={{
                ...DefaultTheme,

                colors: {
                  ...DefaultTheme.colors,
                  primary: colors.blue10,
                },
              }}
              style={styles.imput}
            />
          </View>
          <View style={styles.BoxInput}>
            <TextInput
              label="insira seu telefone com DDD:"
              underlineColor={colors.blue10}
              onChangeText={setFone}
              placeholderTextColor={colors.blue10}
              theme={{
                ...DefaultTheme,

                colors: {
                  ...DefaultTheme.colors,
                  primary: colors.blue10,
                },
              }}
              style={styles.imput}
            />
          </View>
          <View style={styles.SectionStep}>
            <View style={styles.Step} />
            <View style={styles.Step} />
            <View style={styles.CurrentStep} />
          </View>
          <View style={styles.groupButtons}>
            <RectButton
              style={styles.button}
              onPress={() => navigation.navigate("TicketSubType")}
            >
              <Text style={styles.buttonText}>CANCELAR</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>FINALIZAR</Text>
            </RectButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
  },
  containerDropdown: {
    width: "100%",
    height: 100,
  },
  navBar: {
    flex: 1,
    width: Dimensions.get("screen").width,
    maxHeight: 75,
    backgroundColor: colors.blue93,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 20,
  },
  navBarText: {
    fontFamily: fonts.medium,
    fontSize: 20,
    color: colors.white,
  },
  navBarIcon: {
    paddingRight: 24,
  },
  body: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.blue93,
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.gray77,
    textAlign: "left",
    paddingBottom: 30,
  },
  radio: {
    width: "100%",
    borderTopColor: colors.gray68,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  radioLabel: {
    color: colors.gray180,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  contentGroup: {
    width: "100%",
    height: "auto",
    marginBottom: 30,
  },
  groupButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
    height: 50,
    backgroundColor: colors.blue99,
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 7,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.white,
  },
  BoxInput: {
    width: "100%",
    height: 100,
  },
  imput: {
    backgroundColor: "transparent",
    fontFamily: fonts.bold,
  },
  SectionStep: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
  },

  Step: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.gray100,
    marginLeft: 7,
    marginRight: 7,
  },
  CurrentStep: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.yellow10,
    marginLeft: 7,
    marginRight: 7,
  },
});
