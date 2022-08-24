import React, { useLayoutEffect, useState } from 'react';
import { Alert, View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Ionicons } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';

interface contractDTO {
    "codFinancFin": number,
    "codParcFinancFin": number,
    "compFinancFin": string,
    "dtEmiTitFinancFin": string,
    "dtBaixaFinancFin": string,
    "dtVencFinancFin": string,
    "valorBoleto": string,
    "situacao": string
}

export const Financial: React.FC = () => {
    const navigation = useNavigation();
    const [ titles, setTitles ] = useState([]);
    const [notFound, setNotFound] = useState('');

    useLayoutEffect(() => {
        const started = async () => {
            const token = await AsyncStorage.getItem('tokenUser');
      
            api.post('/financ', {} , {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (response) => {
                
                if(response.data.erro) {
                    Alert.alert('Ocorreu um erro.', response.data.erro);
                    navigation.navigate('Signin');  
                    return;
                }
                
                if(response.data.resultado) {
                    setNotFound(response.data.resultado);
                }
                
                await AsyncStorage.setItem('tokenUser', response.data.token);
                setTitles(response.data.Titulos);
            });
        }

        started();
    }, []);

    const handleNextScream = async (codFinancFin: any, codParcFinancFin: any) => {
        await AsyncStorage.setItem('codFinancFin', codFinancFin.toString());
        await AsyncStorage.setItem('codParcFinancFin', codParcFinancFin.toString());
        
        navigation.navigate('BillingHistory');
    }
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Financeiro</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                
                {notFound? (
                    <Text style={styles.notFoundText}>{notFound}</Text>
                ):
                    titles.map((data: contractDTO) => (
                        <TouchableOpacity style={styles.card} onPress={() => handleNextScream(data.codFinancFin, data.codParcFinancFin)} key={data.codFinancFin}>
                            <View style={styles.cardTitle}>
                                <Text style={styles.cardTitleText}>
                                    Data Vencimento: {data.dtVencFinancFin}
                                </Text>
                            </View>
                            <View style={styles.cardContent}>
                                <Ionicons name="attach" color={colors.blue93} size={25}  />
                                <View style={styles.cardContentTexts}>
                                    <Text style={styles.cardContentText}>Valor Fatura: {data.valorBoleto}</Text>
                                    <Text style={styles.cardContentText}>Status: {data.situacao}</Text>
                                    <Text style={styles.cardContentText}>Data de emissão: {data.dtEmiTitFinancFin}</Text>
                                </View>
                                <Ionicons name="arrow-redo-outline" color={colors.blue93} size={25}   />
                            </View>
                        </TouchableOpacity>
                    )) 
                }
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
  })