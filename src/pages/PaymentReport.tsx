import React from 'react';
import { View, StyleSheet, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const PaymentReport: React.FC = () => {
    const navigation = useNavigation();

    const data = [
        { label: "2020", value: "2020" },
        { label: "2019", value: "2019" },
      ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                        <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                    </TouchableOpacity>
                    <Text style={styles.navBarText}>Informe de Pagamentos</Text>
                </View> 
                <View style={styles.body}>
                    <View style={styles.containerDropdown}>
                        <Dropdown
                            label="Selecione um ano"
                            data={data}
                            value=""
                            textInputPlaceholder="Selecione um ano"
                            underlineColor={colors.gray10}
                            textInputStyle={{
                            fontFamily: fonts.regular,
                            fontSize: 18,
                            }}
                            itemTextStyle={{
                            fontFamily: fonts.regular,
                            fontSize: 18
                            }}
                            onChange={() => {}}
                        />
                    </View>
                    <RectButton style={styles.button} onPress={() => Alert.alert('Atenção', 'Não há IR a ser mostrado')}>
                        <Text style={styles.buttonText}>
                            ABRIR
                        </Text>
                    </RectButton>
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
      width: '60%',
      height: 55,
      backgroundColor: colors.blue99,
      justifyContent: 'center',
      marginTop: 30,
      borderRadius: 7
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: fonts.regular,
        fontSize: 18,
        color: colors.white
    },
  });