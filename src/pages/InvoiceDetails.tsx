import React, { useLayoutEffect, useState } from 'react';
import { Alert, View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Entypo } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';

interface descriptiveDTO {
    "tipoServico": string,
    "tipoBeneficiario": string,
    "valorServico": string,
    "nomeBeneficiario": string
}

export const InvoiceDetails: React.FC = () => {
    const navigation = useNavigation();
    const [ descriptive, setDescriptive ] = useState<descriptiveDTO[]>([]);
    const [ release, setRelease ] = useState(false);

    useLayoutEffect(() => {
        const started = async () => {
            const token = await AsyncStorage.getItem('tokenUser');
            const codFinancFin = await AsyncStorage.getItem('codFinancFin');
            const codParcFinancFin = await AsyncStorage.getItem('codParcFinancFin');
      
            api.post('/financDet', {
                "codFinancFin": Number(codFinancFin),
                "codParcFinancFin": Number(codParcFinancFin)
            } , {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (response) => {
                console.log(response.data)
                if(response.data.erro) {
                    Alert.alert('Ocorreu um erro.', response.data.erro);
                    navigation.navigate('Signin');  
                    return;
                }
                
                await AsyncStorage.setItem('tokenUser', response.data.token);
                setDescriptive(response.data.Descritivo);
                
                setRelease(true);
            });
        }

        started();
        // console.log(contract);
    }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('BillingHistory')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Detalhes da fatura</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                {release? descriptive.map((data: descriptiveDTO) => (
                    <View style={styles.card}>
                        <View style={styles.cardTitle}>
                            <Text style={styles.cardTitleText}>
                                Nome do associado: {data.nomeBeneficiario}
                            </Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Entypo name="calculator" color={colors.blue93} size={25}  />
                            <View style={styles.cardContentTexts}>
                                <Text style={styles.cardContentText}>Tipo de Associado: {data.tipoBeneficiario}</Text>
                                <Text style={styles.cardContentText}>Mensalidade: {data.valorServico}</Text>
                                <Text style={styles.cardContentText}>Tipo de Serviço: {data.tipoServico}</Text>
                            </View>
                        </View>
                    </View>
                )): null}
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
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    containerDropdown : { 
      width: '100%', 
      height: 100 
    },
    navBar: {
      flex: 1, 
      width: Dimensions.get('window').width,
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,   
        padding: 10,
        alignItems: 'center'
    },
    logo: {
        width: 300,
        height: 93,
        marginTop: 20,
        marginBottom: 20,
    },
    card: {
        width: '100%',
        height: 200,
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
        padding: 20
    },
    cardContentText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.gray80,
        lineHeight: 30
    },
  })