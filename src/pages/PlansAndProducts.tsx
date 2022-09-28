import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';


interface commomQ {
  "linkProdutosPlanos": string,
}

let URLRedirect: string = '';
let contract;
export const PlansAndProducts: React.FC = () => {
      const navigation = useNavigation();
      const [ titles, setTitles ] = useState([]);
      const [notFound, setNotFound] = useState('');
  
      useLayoutEffect(() => {
        const started = async () => {
  
            const token = await AsyncStorage.getItem('tokenUser');
            contract = await AsyncStorage.getItem('contract');
            contract = contract?.split('-')[1].toString()
            // console.log(contract);
            api.post('/contratos', {} , {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(async (response) => {
                if(response.data.Contratos.resultado) {
                    setNotFound(response.data.linkProdutosPlanos);
                }
                
                await AsyncStorage.setItem('tokenUser', response.data.token);
                setTitles(response.data.Contratos);
    
                await AsyncStorage.setItem('url_produtoseplanos', JSON.stringify(response.data.Contratos.linkProdutosPlanos));
                // console.log(response.data)
            });
        }
          
          started();
      }, []);
    
      const handleNextScream = async (url_produtoseplanos: any) => {
        await AsyncStorage.setItem('url_produtoseplanos', url_produtoseplanos.toString());

        console.log(url_produtoseplanos.toString());
      }
    return (
      <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
              <View style={styles.navBar}>
                  <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                      <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                  </TouchableOpacity>
                  <Text style={styles.navBarText}>Produtos e Planos</Text>
              </View>
              <View style={styles.body}>
              <Image source={require('../assets/logo.png')}  style={styles.logo}/>
  
                  {notFound? (
                      <Text style={styles.notFoundText}>{notFound}</Text>
                  ):
                      titles.map((data: commomQ) => (
                          <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(data.linkProdutosPlanos)} key={data.linkProdutosPlanos}>
                            {/* <Feather name="link" color={colors.gray60} size={24} style={styles.navBarIcon}  /> */}
                            <Text style={styles.cardTitleText} onPress={() => Linking.openURL(data.linkProdutosPlanos)} >Produtos e Planos</Text>
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
      paddingRight: 12
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
        marginTop: 20,
        marginBottom: 20,
    },
    line: {
        width: '100%',
        height: 50,
        alignItems: 'center',
    },
    lineContents: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        borderColor: colors.gray60,
        borderStyle: 'solid',
        borderWidth: 2,
    },
    iconImg: {
        width: 30,
        marginRight: 20,
        color: 'red'
    },
    notFoundText: {
      fontFamily: fonts.medium,
      fontSize: 22,
      color: colors.gray180,
    },
    card: {
      width: '100%',
      height: 50,
      borderRadius: 10,
      marginTop: 10,
      shadowColor: "#000",
      alignContent: 'center',
      alignItems: 'center',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // elevation: 5,
      // padding: 5,
      // marginBottom: 30
    },
    cardTitleText: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.blue93,
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      // borderRadius: 10,
      // padding: 10,
    },
  })