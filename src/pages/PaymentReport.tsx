import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

let contract;
interface news {
    "anoInformePgto": string,
    "linkInformePgto": string,
}

export const PaymentReport: React.FC = () => {
    const navigation = useNavigation();
    const [ titles, setTitles ] = useState([]);
    const [notFound, setNotFound] = useState('');

    useLayoutEffect(() => {
        const started = async () => {

            const token = await AsyncStorage.getItem('tokenUser');
            contract = await AsyncStorage.getItem('contract');
            contract = contract?.split('-')[1].toString()
            console.log(token);
            console.log(contract);

            api.post('/InformePgto', {} , {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (response) => {
                console.log(response)
                if(response.data.erro) {
                    Alert.alert('Ocorreu um erro.', response.data.erro);
                    navigation.navigate('Signin');  
                    return;
                }
                
                if(response.data.resultado) {
                    setNotFound(response.data);
                }
                
                await AsyncStorage.setItem('tokenUser', response.data.token);
                setTitles(response.data.Anos);
            });
        }
        started();
    }, []);

    const handleNextScream = async (anoInformePgto: any, linkInformePgto: any) => {
        await AsyncStorage.setItem('ano', anoInformePgto.toString());
        await AsyncStorage.setItem('linkInformePgto', linkInformePgto.toString());
    }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Informe de rendimentos</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                {notFound? (
                    <Text style={styles.notFoundText}>{notFound}</Text>
                ):
                    titles.map((data: news) => (
                        <TouchableOpacity style={styles.card} onPress={() => handleNextScream(data.anoInformePgto, data.linkInformePgto)} key={data.anoInformePgto}>
                            <View style={styles.cardTitle}>
                                <Text style={styles.cardTitleText}>
                                    Hebrom Admistradora De Beneficios
                                </Text>
                            </View>
                            <View style={styles.cardContent}>
                                <TouchableOpacity style={styles.cardContentTexts} onPress={() => Linking.openURL(data.linkInformePgto)}>
                                    <Text style={styles.cardContentText}>IR ano: {data.anoInformePgto}</Text>
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
        fontSize: 15,
        color: colors.gray80,
        lineHeight: 18
    },
    notFoundText: {
        fontFamily: fonts.medium,
        fontSize: 22,
        color: colors.gray180,
    },
  })