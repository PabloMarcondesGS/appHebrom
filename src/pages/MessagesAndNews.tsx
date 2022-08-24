import React from 'react';
import { View, StyleSheet, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { DefaultTheme, TextInput } from 'react-native-paper';

import { TextInputMask as InputMask } from 'react-native-masked-text';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const MessagesAndNews: React.FC = () => {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const source = {
      html: `<div>
        <h2>Where does it come from?</h2>
        <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
            Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
            "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </p>
        <p>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H. Rackham.
        </p>
      </div>  
      `
    };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Mensagens e Notícias</Text>
            </View> 
            <View style={styles.body}>
              <View style={styles.BoxInput}>
                <TextInput
                  label=""
                  mode="outlined"
                  placeholder="Filtrar"
                  left={
                    <TextInput.Icon name="magnify" />}
                  theme={{
                    ...DefaultTheme,
                    
                    colors: {
                      ...DefaultTheme.colors,
                      primary: colors.blue10,
                    },
                      
                  }}    
                  style={styles.imput}
                />
              </View>
              {/* <Text style={styles.infoTitleText}>
                  Informação
              </Text>
              <Text style={styles.infoText}>
                  Por enquanto, não há informações a serem exibidas nesta janela
                  ou não foram encontrados resultados para sua busca...
              </Text> */}
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <RenderHtml
                      contentWidth={width}
                      source={source}
                    />
                  </View>
                </View>
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
    card: {
        marginTop: 15,
        width: '100%',
        height: Dimensions.get('screen').height -150,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        marginBottom: 50
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
    infoTitleText: {
      fontFamily: fonts.medium,
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.blue99,
    },
    infoText: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: colors.blue99,
      textAlign: 'center'
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