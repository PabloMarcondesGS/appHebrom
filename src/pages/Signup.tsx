import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Image, View, SafeAreaView, Text, Alert } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { Link, useNavigation } from '@react-navigation/native';
import { TextInputMask as InputMask } from 'react-native-masked-text';
import { RectButton } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import api from '../services/api';

interface returnDto {
    token: any;
    erro: any;
}

export const Signup: React.FC = () => {
    const navigation = useNavigation();
    const [ cpf, setCpf ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleSubmit = () => {
        if(password !== confirmPassword) {
            Alert.alert(
                "Erro",
                "Senha e a confirmação de senha estão diferentes"
            );
            return;
        }

        const data = {
            "cpfRespFinanceiro": cpf,
            "numCelular": phone.replace(/[^0-9]+/g,''),
            "senha": password,
            "email": email
        }
        // console.log(data);
        api.post('/cadastrar', data)
        .then(response => {
            if(response.data.erro) {
                Alert.alert(
                    'Erro ao realizar cadastro',
                    response.data.erro
                )
            }
            navigation.navigate('Signin');
        });
        // console.log(teste);
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../assets/fundo.png')} style={styles.content}>
                    <Image source={require('../assets/logoMin.png')}  style={styles.logo}/>
                    <View style={{ width: '100%', height: 'auto', paddingBottom: 60 }}>
                        <View style={styles.BoxInput}>
                            <TextInput
                                label="CPF:"
                                underlineColor="#fff"
                                onChangeText={setCpf}
                                placeholderTextColor={colors.blue10}
                                // render={
                                //     props =>
                                //     <InputMask
                                //         {...props}
                                //         type={'cpf'}
                                //     />
                                // }
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
                                label="Celular:"
                                underlineColor="#fff"
                                onChangeText={setPhone}
                                placeholderTextColor={colors.blue10}
                                // render={
                                //     props =>
                                //     <InputMask
                                //         {...props}
                                //         type={'cel-phone'}
                                //         options={{
                                //             maskType: 'BRL',
                                //             withDDD: true,
                                //             dddMask: '(99) '
                                //         }}

                                //     />
                                // }
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
                                label="Email:"
                                underlineColor="#fff"
                                onChangeText={setEmail}
                                placeholderTextColor={colors.blue10}
                                style={styles.imput}
                            />
                        </View>
                        <View style={styles.BoxInput}>
                            <TextInput
                                label="Senha:"
                                underlineColor="#fff"
                                placeholderTextColor={colors.blue10}
                                onChangeText={setPassword}
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
                        </View>
                        <View style={styles.BoxInput}>
                            <TextInput
                                label="Confirme a senha:"
                                underlineColor="#fff"
                                placeholderTextColor={colors.blue10}
                                onChangeText={setConfirmPassword}
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
                        </View>
                        <RectButton style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>
                                ENTRAR
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
        padding: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    logo: {
        marginTop: 30,
        width: 207,
        height: 253
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
        height: 70
    },
    imput: {
        backgroundColor: 'transparent',
        fontFamily: fonts.bold
    },
})