import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Alert, Linking, Clipboard  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import api from '../services/api';
import fonts from '../styles/fonts';

interface contractDTO {
    "dtVencFinancFin": string,
    "valorBoleto": string,
    "situacao": string,
    "linhaDigitavel": string,
    "linkExterno": string
}

export const BillingHistory: React.FC = () => {
    const navigation = useNavigation();
    const [ contract, setContract ] = useState([]);
    const [notFound, setNotFound] = useState('');

    useLayoutEffect(() => {
        const started = async () => {
            const token = await AsyncStorage.getItem('tokenUser');
            const codFinancFin = await AsyncStorage.getItem('codFinancFin');
            const codParcFinancFin = await AsyncStorage.getItem('codParcFinancFin');
            
            api.post('/financHist', {
                "codFinancFin": Number(codFinancFin),
                "codParcFinancFin": Number(codParcFinancFin)
            } , {
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
                setContract(response.data.Titulos);
            });
        }

        started();
    }, []);

    const handleCopy = (line: string) => {
        Clipboard.setString(line);
    }   

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Financial')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Histórico de Faturamento</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                {notFound?(
                    <Text style={styles.notFoundText}>{notFound}</Text>
                ): contract.map((data: contractDTO) => (
                    <>
                        <View style={styles.line} key={data.linhaDigitavel}>
                            <View style={styles.lineContent}>
                                <Text style={styles.label}>Vencimento:</Text>
                                <Text style={styles.value}>{data.dtVencFinancFin}</Text>
                            </View>
                            <View style={styles.underline} />
                        </View>
                        <View style={styles.line}>
                            <View style={styles.lineContent}>
                                <Text style={styles.label}>Referência:</Text>
                                <Text style={styles.value}>MENSALIDADE</Text>
                            </View>
                        </View>
                        <View style={styles.line}>
                            <View style={styles.lineContent}>
                                <Text style={styles.label}>Status da Fatura:</Text>
                                <Text style={styles.value}>{data.situacao}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.copyableFieldLabel}>Linha digitável</Text>
                            <View style={styles.copyableField}>
                                <Text style={styles.copyableFieldValue}>{data.linhaDigitavel}</Text>
                            </View>
                        </View>
                        <View style={styles.line}>
                            <TouchableOpacity style={styles.lineContents} onPress={() => handleCopy(data.linhaDigitavel)}>
                                <Image source={require('../assets/icons/Raster.png')}  style={styles.iconImg}/>
                                <Text style={styles.value}>Copiar linha digitável</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}>
                            <TouchableOpacity style={styles.lineContents} onPress={() => Linking.openURL(data.linkExterno)}>
                                <Image source={require('../assets/icons/Rasters.png')}  style={styles.iconImg}/>
                                <Text style={styles.value}> Segunda via de boleto</Text>
                            </TouchableOpacity>
                            <View style={styles.underline} />
                        </View>
                        <View style={styles.line}>
                            <TouchableOpacity style={styles.lineContents} onPress={() => navigation.navigate('InvoiceDetails')}>
                                <Image source={require('../assets/icons/Calc.png')}  style={styles.iconImg}/>
                                <Text style={styles.value}>Exibir detalhes desta fatura</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', paddingTop: 10, }}>
                            <RectButton style={styles.button} onPress={() => navigation.navigate('Financial')}>
                                <Text style={styles.buttonText}>
                                    RETORNAR
                                </Text>
                            </RectButton>
                        </View>
                    </>
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
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
        padding: 30,
        alignItems: 'center',
    },
    logo: {
        width: 330,
        height: 123,
        marginBottom: 40,
    },
    underline: {  
        backgroundColor: colors.gray100,
        width: '100%',
        height: 2, 
        marginTop: 10
    },
    line: {
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    lineContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lineContents: {
        paddingTop: 15,
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.blue10,
    },
    value: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.gray120,
    },
    row: {
        width: '100%',
        flexDirection: 'column',
    },
    copyableField: {
        width: '100%',
        height: 20,
        borderColor: colors.gray120,
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    copyableFieldLabel:{
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.gray120,
    },
    copyableFieldValue: {
        fontFamily: fonts.medium,
        fontSize: 9,
        color: colors.gray120,
    },
    iconImg: {
        width: 30,
        marginRight: 20
    },
    button: {
        marginTop: '10%',
        backgroundColor: '#555557', 
        width: '100%', 
        height: 45, 
        justifyContent: 'center', 
        borderRadius: 5 
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.white
    },
    notFoundText: {
        fontFamily: fonts.medium,
        fontSize: 22,
        color: colors.gray180,
    },
  })

