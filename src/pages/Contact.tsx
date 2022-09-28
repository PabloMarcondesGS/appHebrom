import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

let contract;
interface news {
    "WhatsApp": string,
    "TelAtend": string,
    "Email": string,
    "Endereco": string,
    "Observacao": string,
}

export const Contact: React.FC = () => {
    const navigation = useNavigation();
    const [ titles, setTitles ] = useState([]);
    const [notFound, setNotFound] = useState('');

    useLayoutEffect(() => {
        const started = async () => {

            const token = await AsyncStorage.getItem('tokenUser');
            contract = await AsyncStorage.getItem('contract');
            contract = contract?.split('-')[1].toString() ? contract?.split('-')[1].toString() : '9999';
            api.post('/canaisDeContato', { contrato: `${contract}` } , {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (response) => {
                console.log(response.data)
                if(response.data.erro) {
                    Alert.alert('Ocorreu um erro.', response.data.erro);
                    navigation.navigate('Signin');  
                    return;
                }
                
                if(response.data.resultado) {
                    setNotFound(response.data);
                }
                
                await AsyncStorage.setItem('tokenUser', response.data.token);
                setTitles(response.data.Contatos);
            });
        }
        started();
    }, []);

    const handleNextScream = async (WhatsApp: any, TelAtend: any, Email: any, Endereco: any, Observacao: any) => {
        await AsyncStorage.setItem('WhatsApp', WhatsApp.toString());
        await AsyncStorage.setItem('TelAtend', TelAtend.toString());
        await AsyncStorage.setItem('Email', Email.toString());
        await AsyncStorage.setItem('Endereco', Endereco.toString());
        await AsyncStorage.setItem('Observacao', Observacao.toString());
    }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Contato</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                {notFound? (
                    <Text style={styles.notFoundText}>{notFound}</Text>
                ):
                    titles.map((data: news) => (
                        <TouchableOpacity style={styles.card} onPress={() => handleNextScream(data.WhatsApp, data.TelAtend, data.Endereco, data.Email, data.Observacao)} key={data.WhatsApp}>
                            <View style={styles.cardTitle}>
                                <Text style={styles.cardTitleText}>
                                    Hebrom Admistradora De Beneficios
                                </Text>
                            </View>
                            <View style={styles.cardContent}>
                                <TouchableOpacity style={styles.cardContentTexts} >
                                    <Text style={styles.cardContentText}>WhatsApp: {data.WhatsApp}</Text>
                                    <Text style={styles.cardContentText}>Tel: {data.TelAtend}</Text>
                                    <Text style={styles.cardContentText}>E-mail: {data.Email}</Text>
                                    <Text style={styles.cardContentText}>Endereço: {data.Endereco}</Text>
                                    <Text style={styles.cardContentText}>OBS: {data.Observacao}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )) 
                }
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
      fontSize: 20,
      color: colors.white,
    },
    navBarIcon: {
      paddingRight: 24
    },
    body: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,   
        padding: 10,
        alignItems: 'center'
    },
    logo: {
        width: 330,
        height: 123,
        marginTop: 20,
        marginBottom: 20,
    },
    card: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10
    },
    cardTitle: {
        width: '100%',
        height: 50,
        backgroundColor: colors.gray,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center'
    },
    cardTitleText: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.blue93,
    },
    cardContent: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },
    cardContentTexts: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5
    },
    cardContentText: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.gray80,
        lineHeight: 18
    },
    notFoundText: {
        fontFamily: fonts.medium,
        fontSize: 22,
        color: colors.gray180,
    },
  })