import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';

export const CallOpening: React.FC = () => {
    const navigation = useNavigation();
    const [ calls, setCalls ] = useState([]);
    const [ release, setRelease ] = useState(false);

    interface callDTO {
        "codSacAtend": number,
        "dataSacAtend": string,
        "observacoes": string,
        "subTipoSacAtend": string,
        "tipoSacAtend": string,
    }

    useLayoutEffect(() => {
        const started = async () => {
            const token = await AsyncStorage.getItem('tokenUser');
            const contract = await AsyncStorage.getItem('contract');
      
            api.post('/sac', { contrato: contract?.split('-')[1].toString() } , {
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
              if(response.data.Atendimentos === null) {
                setRelease(false);    
              }
              setCalls(response.data.Atendimentos);
              setRelease(true);
            });
        }

        started();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Abertura de Chamados</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                {release? calls.map((data: callDTO) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ViewCalled')} key={data.codSacAtend}>
                        <View style={styles.cardTitle}>
                            <Text style={styles.cardTitleText}>
                                Data Abertura: {data.dataSacAtend}
                            </Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Ionicons name="attach" color={colors.blue93} size={25}  />
                            <View style={styles.cardContentTexts}>
                                <Text style={styles.cardContentText}>{data.tipoSacAtend}</Text>
                                <Text style={styles.cardContentText}>{data.subTipoSacAtend}</Text>
                            </View>
                            <Ionicons name="arrow-redo-outline" color={colors.blue93} size={20}   />
                        </View>
                    </TouchableOpacity>
                )): (
                    <Text style={styles.cardTitleText}>
                        Nenhum chamado encontrado
                    </Text>
                )}
            </View>
            <RectButton style={styles.btnCircle} onPress={() => navigation.navigate('Drawer')}>
                <AntDesign name="plus" color="#fff" size={35} />
            </RectButton>
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
        padding: 10
    },
    cardContentText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.gray80,
    },
    btnCircle: { 
        width: 62, 
        height: 62, 
        backgroundColor: '#016881', 
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: '5%',
        right: -280
    },
  })