import React from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';

export const Contact: React.FC = () => {
    const navigation = useNavigation();

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
                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardTitle}>
                        <Text style={styles.cardTitleText}>
                            Hebrom Admistradora De Beneficios
                        </Text>
                    </View>
                    <View style={styles.cardContent}>
                        <Ionicons name="attach" color={colors.blue93} size={25}  />
                        <View style={styles.cardContentTexts}>
                            <Text style={styles.cardContentText}>
                                Avenida Hilario Pereira de Souza, 406 24° andar
                            </Text>
                            <Text style={styles.cardContentText}>
                                - Industrial Autonomistas - Osasco - SP CEP 06010-170
                            </Text>
                            <Text style={styles.cardContentText}>
                                Horário de funcionamento
                            </Text>
                            <Text style={styles.cardContentText}>
                                Segunda a Quinta das 8h00 as 18h00 Sexta das 8h00 as 17h00 Sábado e Domingo Fechado
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
  })