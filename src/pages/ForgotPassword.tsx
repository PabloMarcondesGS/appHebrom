// import React from 'react';
// import { View } from 'react-native';

// export const ForgotPassword: React.FC = () => {
//   return <View />;
// }


import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Image, View, SafeAreaView, Text, Alert, KeyboardAvoidingView } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { Link, useNavigation } from '@react-navigation/native';
import { TextInputMask as InputMask } from 'react-native-masked-text';
import { RectButton } from 'react-native-gesture-handler';
import { TextInput, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import api from '../services/api';

export const ForgotPassword: React.FC = () => {
    const [ cpf, setCpf ] = useState('');
    const [ cpfError, setCpfError ]  = useState(false);
    const [ cpfErrorMessage, setCpfErrorMessage ]  = useState('');
    const [ borDate, setborDate ] = useState('');
    const [ passwordError, setPasswordError ]  = useState(false);
    const [ passwordErrorMessage, setPasswordErrorMessage ]  = useState('');

    const navigation = useNavigation();

    const handleSubmit = () => {
        setCpfError(false);
        setPasswordError(false);

        if(!cpf) {
            setCpfError(true);
            setCpfErrorMessage('Cpf deve ser preenchido para realizar reset.');
            return;
        }

        const data = {
            "cpf": cpf,
            "DataNasc": borDate,
        }

        api.post('/EsqueciMinhaSenha', data)
        .then(async response => {
            if(response.data.erro) {
                Alert.alert(
                    'Verifique seu email',
                    response.data.erro
                )
            }
            navigation.navigate('Signin');
        });
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../assets/fundo.png')} style={styles.content}>
                    <Image source={require('../assets/logoMin.png')}  style={styles.logo}/>
                    <View style={{ width: '100%', height: 'auto' }}>
                        <KeyboardAvoidingView style={styles.BoxInput}>
                            <TextInput
                                label="Informe o número do seu CPF:"
                                underlineColor="#fff"
                                placeholderTextColor={colors.blue10}
                                onChangeText={setCpf}

                                theme={{
                                    ...DefaultTheme,
                                    
                                    colors: {
                                        ...DefaultTheme.colors,
                                        primary: colors.blue10,
                                    },
                                    
                                }}    
                                style={styles.imput}
                            />
                            <HelperText type="error" visible={cpfError}>
                                { cpfErrorMessage }
                            </HelperText>
                        </KeyboardAvoidingView>
                        <View style={styles.BoxInput}>
                            <TextInput
                                label="Informe a data de nascimento:"
                                underlineColor="#fff"
                                onChangeText={borDate}
                                placeholderTextColor={colors.blue10}
                                theme={{
                                    ...DefaultTheme,
                                    
                                    colors: {
                                        ...DefaultTheme.colors,
                                        primary: colors.blue10,
                                    },
                                    
                                }}
                                secureTextEntry={true}
                                style={styles.imput}
                            />
                            <HelperText type="error" visible={passwordError}>
                                { passwordErrorMessage }
                            </HelperText>
                        </View>
                        <RectButton style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>
                                Resetar senha
                            </Text>
                        </RectButton>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    logo: {
        marginTop: 15,
        width: 207,
        height: 253
    },
    linkForgotPasswordText: {
        fontFamily: fonts.bold,
        fontSize: 15,
        color: colors.blue95,
        textDecorationLine: 'underline',
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor: colors.blue99,
        justifyContent: 'center',
        marginTop: 10,
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
})