import React from 'react';
import { View, StyleSheet,Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { DefaultTheme } from 'react-native-paper';
import { TextInputMask as InputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native-paper';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const ReopeningCall: React.FC = () => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate('CallOpening')}>
                <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
            </TouchableOpacity>
            <Text style={styles.navBarText}>Abertura de Chamados</Text>
          </View> 
          <View style={styles.body}>
               {/* step 1 
              <View style={{ 
                width: '100%',
                height: '100%',
                justifyContent: 'space-around'
               }}>
                <Text style={styles.label}>Qual é o tipo de chamado que deseja abrir?</Text> 
                <View style={styles.BoxInput}>
                  <TextInput
                    label="Buscar"
                    mode="outlined"
                    outlineColor="#5A6978"
                    left={
                      <TextInput.Icon name="magnify" color="#5A6978" />}
                    theme={{
                      ...DefaultTheme,
                      
                      colors: {
                        ...DefaultTheme.colors,
                        primary: colors.gray85,
                      },
                    }}
                    style={styles.imput}
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.boxOptions}>
                  <Text style={styles.optionsLabel}>RECLAMAÇÕES</Text>
                  <Text style={styles.optionsLabel}>SUGESTÕES</Text>
                  <Text style={styles.optionsLabel}>AGRADECIMENTOS E ELOGIOS</Text>
                </ScrollView>
                <View style={styles.footer}>
                  <View style={styles.boxItensSteps}>
                    <View style={styles.itensStepsCurrent} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                  </View>
                  <View style={styles.boxBtns}>
                    <RectButton style={styles.button2} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          ANTERIOR
                        </Text>
                    </RectButton>
                    <RectButton style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          PRÓXIMO
                        </Text>
                    </RectButton>
                  </View>
                </View>
              </View> 
              step 2*
              <View style={{ 
                width: '100%',
                height: '100%',
                justifyContent: 'space-around'
               }}>
                <View style={{ 
                  width: '100%',
                  height: '55%',
                }}>
                  <Text style={styles.label}>Descreva como podemos ajudá-lo</Text> 
                  <View style={styles.BoxInput}>
                    <TextInput
                      label="Digite Aqui..."
                      multiline
                      mode="outlined"
                      numberOfLines={10}
                      outlineColor={colors.gray70}
                      theme={{
                          ...DefaultTheme,
                          colors: {
                              ...DefaultTheme.colors,
                              primary: colors.blue93,
                          },
                      }}
                      style={styles.imput}
                    />
                  </View>
                </View>
                <View style={styles.footer}>
                  <View style={styles.boxItensSteps}>
                    <View style={styles.itensStepsCurrent} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                  </View>
                  <View style={styles.boxBtns}>
                    <RectButton style={styles.button2} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          ANTERIOR
                        </Text>
                    </RectButton>
                    <RectButton style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          PRÓXIMO
                        </Text>
                    </RectButton>
                  </View>
                </View>
              </View>
                 step 3  
              <View style={{ 
                width: '100%',
                height: '100%',
                justifyContent: 'space-around'
               }}>
                <View style={{ width: '100%', height: 100, justifyContent: 'space-between', marginBottom: 200 }}>
                  <Text style={styles.label}>Qual o telefone para contato?</Text> 
                  <View style={styles.BoxInput}>
                    <TextInput
                        label="Digite aqui..."
                        underlineColor="#5A6978"
                        placeholderTextColor={colors.blue10}
                        render={
                          props =>
                          <InputMask
                            {...props}
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                          />
                        }
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
                </View>
                <View style={styles.footer}>
                  <View style={styles.boxItensSteps}>
                    <View style={styles.itensStepsCurrent} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                  </View>
                  <View style={styles.boxBtns}>
                    <RectButton style={styles.button2} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          ANTERIOR
                        </Text>
                    </RectButton>
                    <RectButton style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          PRÓXIMO
                        </Text>
                    </RectButton>
                  </View>
                </View>
              </View>
              Step 4*/}
              <View style={{ 
                width: '100%',
                height: '100%',
                justifyContent: 'space-around'
               }}>
                <View style={{ width: '100%', height: 100, justifyContent: 'space-between', marginBottom: '70%' }}>
                  <Text style={styles.label}>Qual o e-mail para contato?</Text> 
                  <View style={styles.BoxInput}>
                    <TextInput
                        label="Digite Aqui..."
                        value=""  
                        underlineColor={colors.gray70}
                        theme={{
                            ...DefaultTheme,
                            colors: {
                                ...DefaultTheme.colors,
                                primary: colors.blue93,
                            },
                        }}    
                        style={styles.imput}
                    />
                  </View>
                </View>
                <View style={styles.footer}>
                  <View style={styles.boxItensSteps}>
                    <View style={styles.itensStepsCurrent} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                    <View style={styles.itensSteps} />
                  </View>
                  <View style={styles.boxBtns}>
                    <RectButton style={styles.button2} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          ANTERIOR
                        </Text>
                    </RectButton>
                    <RectButton style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>
                          PRÓXIMO
                        </Text>
                    </RectButton>
                  </View>
                </View>
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
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      paddingTop: '10%',
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
        alignItems: 'center',
        paddingTop: 40,
        flexDirection: 'column'
    },
    label: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.blue93,
      textAlign: 'center'
    },
    boxOptions: {
      width: '100%',
      height: 'auto',
      flexDirection: 'column',
      paddingTop: 40
    },
    optionsLabel : {
      color: colors.gray65,
      fontFamily: fonts.bold,
      fontSize: 20,
      lineHeight: 50
    },
    footer: {
      width: '100%',
      backgroundColor: 'transparent',
      position: 'relative',
      bottom: 0
    },
    boxItensSteps: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    itensSteps: {
      width: 15,
      height: 15,
      borderRadius: 100,
      backgroundColor: colors.gray20,
      marginRight: 15
    },
    itensStepsCurrent: {
      width: 15,
      height: 15,
      borderRadius: 100,
      backgroundColor: colors.yellow10,
      marginRight: 15
    },
    boxBtns: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    BoxInput: {
      width: '100%',
      height: 90
  },
  imput: {
      backgroundColor: 'transparent',
      fontFamily: fonts.bold
  },
  button: {
    width: 160,
    height: 45,
    backgroundColor: colors.blue99,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 5,
  },
  button2: {
    width: 160,
    height: 45,
    backgroundColor: colors.gray68,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 5
  },
  buttonText: {
      textAlign: 'center',
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.white
  },
  })