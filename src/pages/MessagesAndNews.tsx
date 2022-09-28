import React, { useLayoutEffect, useState } from 'react';
import { Alert, View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Ionicons } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';

interface news {
    "titulo": string,
    "linkImagem": string,
    "resumoNoticias": string,
    "linkHtml": string,
}

export const MessagesAndNews: React.FC = () => {
    const navigation = useNavigation();
    const [ titles, setTitles ] = useState([]);
    const [notFound, setNotFound] = useState('');

    useLayoutEffect(() => {
        const started = async () => {

            const token = await AsyncStorage.getItem('tokenUser');
            let contract = await AsyncStorage.getItem('contract');
            contract = contract?.split('-')[1].toString() ? contract?.split('-')[1].toString() : '9999';

            api.post('/mensagenseNoticias', { contrato: `${contract}` } , {
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
                    setNotFound(response.data.mensagensNoticias);
                }
                
                await AsyncStorage.setItem('tokenUser', response.data.token);
                setTitles(response.data.mensagensNoticias);
            });
        }
        started();
    }, []);

    const handleNextScream = async (titulo: any, resumoNoticias: any, linkImagem: any, linkHtml: any) => {
        await AsyncStorage.setItem('titulo', titulo.toString());
        await AsyncStorage.setItem('resumoNoticias', resumoNoticias.toString());
        await AsyncStorage.setItem('linkImagem', linkImagem);
        await AsyncStorage.setItem('linkHtml', linkHtml);
    }
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Mensagens e Noticias</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                <ScrollView >
                {notFound? (
                    <Text style={styles.notFoundText}>{notFound}</Text>
                ):
                    titles.map((data: news) => (
                        <TouchableOpacity style={styles.card} onPress={() => handleNextScream(data.titulo, data.resumoNoticias, data.linkImagem, data.linkHtml)} key={data.titulo}>
                            <View style={styles.cardTitle}>
                                <Text style={styles.cardTitleText}>
                                    Resumo: {data.resumoNoticias}
                                </Text>
                            </View>
                            <View style={styles.cardContent}>
                                {/* <Image style={styles.btnCircle} source={require(`${data.linkImagem}`)} /> */}
                                <Ionicons name="attach" color={colors.blue93} size={25}  />
                                <TouchableOpacity style={styles.cardContentTexts} onPress={() => Linking.openURL(data.linkHtml)}>
                                    <Text style={styles.cardContentText}>Noticia: {data.titulo}</Text>
                                    <Text style={styles.cardContentText}>Resumo: {data.resumoNoticias}</Text>
                                </TouchableOpacity>
                                <Ionicons name="arrow-redo-outline" color={colors.blue93} size={25} onPress={() => Linking.openURL(data.linkHtml)} key={data.titulo}/>
                            </View>
                        </TouchableOpacity>
                    )) 
                }
                </ScrollView>
            </View>
            <View style={{ width: '100%', height: 130 }} />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
      flex: 1,
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
    scrow: {
        flex: 1,
        width: '90%',
        height: '90%',
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
        padding: 30,
        alignItems: 'center'
    },
    logo: {
        width: 330,
        height: 123,
        marginBottom: 20,
    },
    card: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 5,
        marginBottom: 30
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
        fontSize: 15,
        color: colors.blue93,
    },
    cardContent: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    cardContentTexts: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        padding: 8
    },
    cardContentText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.gray80,
    },
    notFoundText: {
        fontFamily: fonts.medium,
        fontSize: 22,
        color: colors.gray180,
    },
    btnCircle: { 
        width: 62, 
        height: 62, 
        backgroundColor: '#016881', 
        // borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: '5%',
        right: -280
    },
  })