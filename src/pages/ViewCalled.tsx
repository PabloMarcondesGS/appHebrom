import React from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { DefaultTheme } from 'react-native-paper';
import { RectButton } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { TextInputMask as InputMask } from 'react-native-masked-text';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const ViewCalled: React.FC = () => {
    const navigation = useNavigation();
    const data = [
        { label: "RECLAMAÇÕES", value: "male" },
    ];

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Visualização das Informações</Text>
            </View> 
            <View style={styles.body}>
                <Text style={styles.label}>
                    Tipo de chamado
                </Text>
                <View style={styles.containerDropdown}>
                    <Dropdown
                        label="Tipo de chamado"
                        data={data}
                        removeLabel
                        value=""
                        textInputPlaceholder="Selecione um tipo de chamado"
                        underlineColor={colors.gray10}
                        textInputStyle={{
                            fontFamily: fonts.regular,
                            fontSize: 16,
                        }}
                        itemTextStyle={{
                            fontFamily: fonts.regular,
                            fontSize: 18
                        }}
                        onChange={() => {}}
                    />
                </View>
                <Text style={styles.label}>
                    Descrição
                </Text>
                <View style={styles.BoxInput}>
                    <TextInput
                        label=""
                        value="Testando a reclamação do aplicativo"
                        multiline
                        mode="outlined"               
                        numberOfLines={4}
                        outlineColor={colors.gray70}
                        theme={{
                            ...DefaultTheme,
                            colors: {
                                ...DefaultTheme.colors,
                                primary: colors.gray90,
                            },
                        }}
                        style={styles.imput}
                    />
                </View>
                <View  style={{ paddingTop: 30 }} />
                <Text style={styles.label}>
                    Telefone
                </Text>
                <View style={styles.BoxInput}>
                    <TextInput
                        label=""
                        value="(11) 92121-2121"
                        underlineColor={colors.gray70}
                        theme={{
                            ...DefaultTheme,
                            colors: {
                                ...DefaultTheme.colors,
                                primary: colors.gray90,
                            },
                        }}
                        style={styles.imput}
                    />
                </View>
                <View  style={{ paddingTop: 30 }} />
                <Text style={styles.label}>
                    E-mail
                </Text>
                <View style={styles.BoxInput}>
                    <TextInput
                        label=""
                        value="a.a@gmail.com.br"
                        underlineColor={colors.gray70}
                        theme={{
                            ...DefaultTheme,
                            colors: {
                                ...DefaultTheme.colors,
                                primary: colors.gray90,
                            },
                        }}
                        style={styles.imput}
                    />
                </View>
            </View>
            <View style={{ padding: 20 }}> 
                <RectButton style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
                    <Text style={styles.buttonText}>
                        VER INTERAÇÕES
                    </Text>
                </RectButton>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
      flex: 1,
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
    containerDropdown : { 
      width: '100%', 
      height: 100 
    },
    navBar: {
      flex: 1, 
      width: Dimensions.get('screen').width,
      maxHeight:100,
      height:75,
      backgroundColor: colors.blue93,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 20,
      paddingLeft: 20
    },
    navBarText: {
      fontFamily: fonts.medium,
      fontSize: 18,
      color: colors.white,
    },
    navBarIcon: {
      paddingRight: 24
    },
    body: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,   
        padding: 30,
    },
    label: {
        color: colors.blue93,
        textAlign: 'left',
        fontSize: 18,
        fontFamily: fonts.medium,
    },
    btn: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.blue100
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor: colors.blue99,
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 7
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: fonts.regular,
        fontSize: 18,
        color: colors.white
    },
    BoxInput: {
        width: '100%',
        height: 100
    },
    imput: {
        backgroundColor: 'transparent',
        fontFamily: fonts.bold
    },
  });