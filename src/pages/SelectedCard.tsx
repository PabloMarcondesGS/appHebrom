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
  "nomePlano": string,
  "CNS": string,
  "dataNascimentoBeneficiario": string,
  "registroANSPlano": number,
  "dataAdmissaoBeneficiario": string,
  "abrangenciaPlano": any,
  "acomodacaoPlano": string,
  "seguroAssistencial": any,
  "empresa": string
}

export const SelectedCard: React.FC = () => {
  const navigation = useNavigation();
    const [ contracts, setContracts ] = useState([]);
    const [ release, setRelease ] = useState(false);

    useLayoutEffect(() => {
        const started = async () => {
            const token = await AsyncStorage.getItem('tokenUser');
            const contratoBeneficiario = await AsyncStorage.getItem('contract');
            const controleBeneficiario = await AsyncStorage.getItem('controleBeneficiario');
      
            api.post('/cartBenef', { contratoBeneficiario: contratoBeneficiario, controleBeneficiario: controleBeneficiario } , {
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
  
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Carteirinha Digital</Text>
            </View> 
            <View style={styles.body}>
                {release? contracts.map((data: contractDTO) => (
                  <View style={styles.card} key={data.contratoBeneficiario}>
                    <View style={styles.headerCard}>
                      <View style={styles.cardLogo} />
                      <View style={styles.headerLabelContent}>
                        <Text style={styles.headerLabel}>
                          PLANO DE SAÚDE
                        </Text>
                      </View>
                    </View>
                    <View style={styles.lineCard}>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Beneficiário:</Text>
                        <Text style={styles.lineValue}>{data.nomeBeneficiario}</Text>
                      </View>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Código:</Text>
                        <Text style={styles.lineValue}>{data.contratoBeneficiario}</Text>
                      </View>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Plano:</Text>
                        <Text style={styles.lineValue}>{data.nomePlano}</Text>
                      </View>
                    </View>
                    <View style={styles.lineInverseCard}>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Número CNS:</Text>
                        <Text style={styles.lineValue}>{data.CNS === 'null' ? '' : data.CNS}</Text>
                      </View>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Data de nascimento:</Text>
                        <Text style={styles.lineValue}>{data.dataNascimentoBeneficiario}</Text>
                      </View>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Registro ANS:</Text>
                        <Text style={styles.lineValue}>{data.registroANSPlano}</Text>
                      </View>
                    </View>
                    <View style={styles.lineCard}>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Contratação:</Text>
                        <Text style={styles.lineValue}>{data.dataAdmissaoBeneficiario}</Text>
                      </View>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Abrangência:</Text>
                        <Text style={styles.lineValue}>{data.abrangenciaPlano == null ? '' : data.abrangenciaPlano}</Text>
                      </View>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Seguro assistencial:</Text>
                        <Text style={styles.lineValue}>{data.seguroAssistencial == 'null' ? '' : data.seguroAssistencial}</Text>
                      </View>
                    </View>
                    <View style={styles.lineInverseCard}>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Empresa:</Text>
                        <Text style={styles.lineValue}>{data.empresa}</Text>
                      </View>
                      <View style={styles.lineColumm}>
                        <Text style={styles.lineLabel}>Acomodação:</Text>
                        <Text style={styles.lineValue}>{data.acomodacaoPlano}</Text>
                      </View>
                      <View style={styles.lineColumm} />
                    </View>
                    <View style={styles.footerCard} /> 
                  </View>
                )): null}
            </View>
        </View> 
    </View>
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
    paddingLeft: 20,
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
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    height: '85%',
    borderColor: colors.gray90,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    flexDirection: 'row',
    transform: [{ rotate: '180deg'}],
  },
  headerCard: {
    height: '100%',
    width: '25%',
    backgroundColor: colors.blue93,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '180deg'}],
  },
  footerCard: {
    width: '7%',
    height: '100%',
    backgroundColor: colors.blue93,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    transform: [{ rotate: '180deg'}],
  },
  lineCard: {
    width: '17%',
    height: '100%',
    backgroundColor: colors.white,
    flexDirection: 'column',
    transform: [{ rotate: '180deg'}],
    justifyContent: 'space-around'
  },
  lineInverseCard: {
    width: '17%',
    height: '100%',
    backgroundColor: colors.blue70,
    flexDirection: 'column',
    transform: [{ rotate: '180deg'}],
    justifyContent: 'space-around'
  },
  cardLogo: {
    width: '80%',
    height: '50%',
    backgroundColor: colors.white,
    borderRadius: 10
  },
  headerLabelContent: { 
    width: '100%',
    height: '50%',
    alignItems: 'center', 
    justifyContent: 'center',
    transform: [{ rotate: '90deg'}], 
  },
  headerLabel: {
    fontFamily: fonts.medium,
    fontSize: 20,
    width: 200,
    color: colors.white,   
  },
  lineColumm: {
    height: '10%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    transform: [{ rotate: '90deg'}], 
  },
  lineLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.black,    
    fontWeight: 'bold',
    width:200,
  },
  lineValue: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.black,    
    width:200
  }
});
