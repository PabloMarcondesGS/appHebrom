import React, { useState, useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown, IDropdownData } from 'sharingan-rn-modal-dropdown';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import fonts from '../styles/fonts';
import colors from '../styles/colors';
import api from '../services/api';

interface dataContractDTO {
  "codPlano": any,
  "codContrato": any,
  "datAdmissaoPlano": any,
  "datExclusaoPlano": any,
  "nomeTipoPlano": any,
  "nomePlano": any,
  "documentoCPF": any,
  "linkRedeCredenciada": any,
  "linkProdutosPlanos": any,
  "linkOuvidoria": any,
  "linkPerguntasFrequentes": any,
}

export const MainMenu: React.FC = () => {
  const navigation = useNavigation();
  const [ release, setRelease ] = useState(false);
  const [ dataContract, setDataContract ] = useState<IDropdownData[]>([])
  const [ contract, setContract ] = useState('');

  useEffect(() => {
    const started = async () => {
      const token = await AsyncStorage.getItem('tokenUser');
      const _contract = await AsyncStorage.getItem('contract');
      
      api.post('/contratos', {} , {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(async (response) => {
        if(response.data.erro) {
          Alert.alert('Ocorreu um erro.', response.data.erro);
          navigation.navigate('Signin');  
          return;
        }
        const data = [];
        await AsyncStorage.setItem('tokenUser', response.data.token);
        
        for (let i = 0; i < response.data.Contratos.length; i++) {
          const { nomePlano, codContrato, codPlano }: dataContractDTO = response.data.Contratos[i];
          data.push(
            { label: nomePlano, value: `${codPlano}-${codContrato}` }
          )  
        }
        
        if(_contract) {
          setContract(_contract);
        } else {
          setContract(data[0].value);
          await AsyncStorage.setItem('contract', data[0].value);
        }
        
        setDataContract(data);
        setRelease(true);
      });
    }

    started();
  }, []);

  const onChange = async (value: string) => {
    setContract(value);
    await AsyncStorage.setItem('contract', value);
  }

  return (
    <SafeAreaView style={styles.container}>
      { release ? (
        <ImageBackground source={require('../assets/fundo.png')} style={styles.content}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Feather name="menu" color={colors.white} size={40} style={styles.navBarIcon}  />
            </TouchableOpacity>
            <Text style={styles.navBarText}>HEBROM BENEFÍCIOS</Text>
          </View> 
          <View style={styles.containerDropdown}>
            <Dropdown
              label="Selecione um plano"
              data={dataContract}
              textInputPlaceholder="Selecione um plano"
              value={contract}
              underlineColor={colors.gray10}
              primaryColor={colors.blue101}
              textInputStyle={{
                fontFamily: fonts.regular,
                fontSize: 18,
                color: colors.blue101
              }}
              itemTextStyle={{
                fontFamily: fonts.regular,
                fontSize: 18,
                color: colors.blue101
              }}
              onChange={onChange}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.row}>
            <View style={styles.line}>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DigitalCard')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Icones_Carteirinha_Virtual.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Carteirinha Virtual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Financial')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Boletos_e_Pagamentos.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Boletos e Pagamentos 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Handoff')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Rede_Credenciada.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Rede Credenciada
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line}>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PaymentReport')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Icones_Informe_de_rendimentos.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Informe para declaração (IR)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MessagesAndNews')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Icones_Mensagens_e_notícias.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Mensagens e Notícias 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CallOpening')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Abertura_Chamado.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Abertura de Chamados
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line}>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DigitalCard')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Produtos_e_Planos.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Produtos e Planos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Contact')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Icones_Canais_de_contato.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Canais de Contato
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ombudsman')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Ouvidoria.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Ouvidoria
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line}>
              <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('CommonQuestions')}}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Icones_Adicionar_dependentes-13.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Perguntas Frequentes
                </Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Research')}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/Avalie_sua_Experiência.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Avalie sua Experiência
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={async () => {
                await AsyncStorage.clear();
                navigation.navigate('Signin');
              }}>
                <View style={styles.boxImg}>
                  <Image source={require('../assets/icons/adaptive-icon.png')} style={styles.cardImg} />
                </View>
                <Text style={styles.cardText}>
                  Sair do Sistema
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      ): null }
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
    height: Dimensions.get('screen').height
  },
  containerDropdown : { 
    width: '100%', 
    height: 100 
  },
  navBar: {
    flex: 1, 
    width: Dimensions.get('screen').width,
    height:64,
    maxHeight:64,
    paddingLeft: 10,
    backgroundColor: colors.blue93,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarText: {
    fontFamily: fonts.medium,
    fontSize: 20,
    color: colors.white,
  },
  navBarIcon: {
    paddingRight: 24
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    marginBottom: 30,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-around',  
    width: Dimensions.get('screen').width,
    paddingBottom: 10
  },
  card: {
    width: 100,
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  boxImg: {
    width: 100,
    height: 100,
    backgroundColor: '#016881',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13
  },
  cardImg: {
    width: 90,
    height: 90
  },
  cardText: {
    fontFamily: fonts.regular,
    color: colors.blue90,
    fontSize: 14,
    textAlign: 'center',
  }
})