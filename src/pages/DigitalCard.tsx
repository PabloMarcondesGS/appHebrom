import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text ,SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';

interface contractDTO {
    "contratoBeneficiario": number,
    "controleBeneficiario": number,
    "nomeBeneficiario": string,
}

export const DigitalCard: React.FC = () => {
    const navigation = useNavigation();
    const [ contracts, setContracts ] = useState([]);
    const [ release, setRelease ] = useState(false);

    useLayoutEffect(() => {
        const started = async () => {
            const token = await AsyncStorage.getItem('tokenUser');
            const contract = await AsyncStorage.getItem('contract');
      
            api.post('/contratobenef', { contratoBeneficiario: contract } , {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (response) => {
              if(response.data.erro) {
                Alert.alert('Ocorreu um erro.', response.data.erro);
                navigation.navigate('Signin');  
                return;
              }
              
              await AsyncStorage.setItem('tokenUser', response.data.token);
              setContracts(response.data.Contratos);
              setRelease(true)
            });
        }

        started();
    }, []);

    const handleCardSelected = async (controleBeneficiario: string) => {
        await AsyncStorage.setItem('controleBeneficiario', controleBeneficiario);
        navigation.navigate('SelectedCard');
    }
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Carteirinha Digital</Text>
            </View> 
            <View style={styles.body}>
                <Text style={styles.title}>
                    Selecione o associado:
                </Text>
                {
                    release && contracts.length > 0 ?
                        contracts.map((data: contractDTO) => (
                            <View style={styles.options} key={data.contratoBeneficiario}>
                                <TouchableOpacity style={styles.option} onPress={() => handleCardSelected(data.controleBeneficiario.toString())}>
                                    <Text style={styles.optionText}>
                                        { data.nomeBeneficiario }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    : (
                        <View style={{ flex: 1 }}>
                            <Text style={styles.optionText}>
                                Nenhum associado encontrado
                            </Text>
                        </View>
                    )
                }
            </View>
        </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').width
    },
    containerDropdown : { 
      width: '100%', 
      height: 100 
    },
    navBar: {
      flex: 1, 
      width: Dimensions.get('screen').width,
      maxHeight:75,
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
        paddingLeft: 30,
        paddingRight: 30,
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: 25,
        color: colors.blue93,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    options: {
        width: '100%',
        height: 'auto',
    },
    option: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderColor: colors.gray60,
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center'
    },
    optionText: {
        fontFamily: fonts.medium,
        fontSize: 20,
        color: colors.gray180,
        textAlign: 'center'
    }
  });