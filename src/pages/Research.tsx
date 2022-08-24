import React from 'react';
import { View, StyleSheet, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { DefaultTheme } from 'react-native-paper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const Research: React.FC = () => {
    const navigation = useNavigation();
    const [checked, setChecked] = React.useState('first');

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Pesquisas</Text>
            </View> 
            <View style={styles.body}>
                <Text style={styles.title}>
                    AVALIE SUA EXPERIÊNCIA
                </Text>
                <Text style={styles.label}>
                    COMENTÁRIOS
                </Text>
                <View style={styles.BoxInput}>
                    <TextInput
                        label="Sua Resposta:"
                        underlineColor={colors.blue10}
                        placeholderTextColor={colors.blue10}
                        theme={{
                            ...DefaultTheme,
                            
                            colors: {
                                ...DefaultTheme.colors,
                                primary: colors.blue10,
                            },
                            
                        }}
                        secureTextEntry={true}
                        style={styles.imput}
                    />
                </View>
                <View style={styles.groupButtons}>
                    <RectButton style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                            ANTERIOR 
                        </Text>
                    </RectButton>
                    <RectButton style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                            FINALIZAR 
                        </Text>
                    </RectButton>
                </View>
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
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-evenly',
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
        height: Dimensions.get('screen').width,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.blue93,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    label: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.gray77,
        textAlign: 'left',
        paddingBottom: 30
    },
    radio: {
        width: '100%',
        borderTopColor: colors.gray68,
        borderTopWidth: 1,
        borderStyle: 'solid',
    },
    radioLabel: {
        color: colors.gray180,
        fontSize: 18,
        fontFamily: fonts.bold,
    },
    contentGroup: { 
        width: '100%',
        height: 'auto',
        marginBottom: 30
    },
    groupButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '49%',
        height: 50,
        backgroundColor: colors.blue99,
        justifyContent: 'center',
        marginBottom: 30,
        borderRadius: 7
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.white
    },
    BoxInput: {
        width: '100%',
        height: 100
    },
    imput: {
        backgroundColor: 'transparent',
        fontFamily: fonts.bold
    },
  })