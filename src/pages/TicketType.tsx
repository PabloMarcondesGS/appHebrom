import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TicketType: React.FC = () => {
  const navigation = useNavigation();

  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [value, setValue] = useState("");

  const handleOne = () => {
    setValue("1");
    setOptionOne(true);
    setOptionTwo(false);
    setOptionThree(false);
  };
  const handleTwo = () => {
    setValue("2");
    setOptionOne(false);
    setOptionTwo(true);
    setOptionThree(false);
  };
  const handleThree = () => {
    setValue("3");
    setOptionOne(false);
    setOptionTwo(false);
    setOptionThree(true);
  };

  const handleSubmit = async () => {
    await AsyncStorage.setItem("TicketType", value);
    navigation.navigate("TicketSubType");
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
          <Text style={styles.navBarText}>Abertura de Chamado</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>
            Qual é o tipo de chamado que deseja abrir?
          </Text>

          <View style={styles.InputBox}>
            <Feather name="search" size={20} color="#808080" />
            <TextInput style={styles.Input} placeholder="Buscar" />
          </View>
          <View style={styles.GroupOptions}>
            <RectButton style={styles.Options} onPress={handleOne}>
              <Text style={styles.ButtonOptions}>reclamações</Text>
              {optionOne && (
                <AntDesign name="check" size={24} color="#808080" />
              )}
            </RectButton>
            <RectButton onPress={handleTwo} style={styles.Options}>
              <Text style={styles.ButtonOptions}>sugestões</Text>
              {optionTwo && (
                <AntDesign name="check" size={24} color="#808080" />
              )}
            </RectButton>
            <RectButton onPress={handleThree} style={styles.Options}>
              <Text style={styles.ButtonOptions}>Agradecimentos e elogios</Text>
              {optionThree && (
                <AntDesign name="check" size={24} color="#808080" />
              )}
            </RectButton>
          </View>
          <View style={styles.SectionStep}>
            <View style={styles.CurrentStep} />
            <View style={styles.Step} />
            <View style={styles.Step} />
          </View>
          <View style={styles.BoxInput}>
            <View style={styles.groupButtons}>
              <RectButton
                style={styles.buttonBack}
                onPress={() => navigation.navigate("CallOpening")}
              >
                <Text style={styles.buttonText}>Anterior</Text>
              </RectButton>
              <RectButton style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Próximo</Text>
              </RectButton>
            </View>
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
    fontSize: 16,
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
  },

  buttonBack: {
    width: "49%",
    height: 50,
    backgroundColor: colors.gray68,
    justifyContent: "center",
    marginBottom: 30,
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
  InputBox: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.gray68,
    border: 1,
    paddingLeft: 15,
  },
  Input: {
    height: "100%",
    width: "100%",
    marginLeft: 10,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  Options: {
    marginTop: 10,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
  },

  ButtonOptions: {
    color: colors.gray68,
    fontFamily: fonts.bold,
    textTransform: "uppercase",
    fontSize: 17,
    marginRight: 15,
  },
  GroupOptions: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "flex-start",
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
