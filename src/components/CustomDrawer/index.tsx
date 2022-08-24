import React from 'react';
import { View, StyleSheet, ScrollView, Text, useWindowDimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons';

  
export function CustomDrawer(props: any) {
  const navigation = useNavigation();

    return (
      <DrawerContentScrollView  style={styles.container} {...props}>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.content}>
            <View style={styles.cardTop}>
              <Text style={styles.cardText}>Bem vindo</Text>  
              <Text style={styles.cardText}>JOÃO DA SILVA</Text>  
            </View>  
            <View style={styles.row}>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Carteirinha virtual"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('DigitalCard');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Boletos e Pagamentos"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('Financial');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Rede Credenciada"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('Handoff');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Infotme para Declaração"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('PaymentReport');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Mensagens e Notícias"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('MessagesAndNews');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Abertura de Chamado"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('CallOpening');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Produtos e Planos"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('DigitalCard');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Canais de Contato"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    navigation.navigate('Contact');
                  }}
                />
                <View style={styles.underline} />
              </View>
              <View style={styles.line}>
                <DrawerItem
                  style={styles.contentLine}
                  label="Ouvidoria"
                  icon={
                    () => (
                      <AntDesign
                        style={styles.iconItem}
                        name="right"
                        size={20}
                        color={colors.gray180}
                      />
                   )
                  }
                  labelStyle={styles.textItem}
                  onPress={() => {
                    // navigation.navigate('Screen1');
                  }}
                />
                <View style={styles.underline} />
              </View>
            </View>
          </ScrollView>
      </DrawerContentScrollView>
    );
  }

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue93,
  },
  content: {
    flex: 1,
    width: 280,
    flexDirection: 'row',
  },
  cardTop: {
    flex: 1,
    backgroundColor: colors.blue93,
    height: 126,
    width: 280,
    justifyContent: 'center',
    paddingLeft: 30
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
  cardText: {
    fontFamily: fonts.medium,
    fontSize: 20,
    color: colors.white,
  },
  row: {
    flex: 1,
    backgroundColor: colors.gray50,
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
  }, 
  line: {
    backgroundColor: colors.gray50,
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  underline: {  
    backgroundColor: colors.gray80,
    width: 250,
    height: 2, 
  },
  contentLine: {
    justifyContent: 'center',
    width: 250,
    height: '100%',
  },
  iconItem: {
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },
  textItem: {
    color: colors.gray180, 
    textAlign: 'left', 
    fontFamily: fonts.bold, 
    fontSize: 14,
  } 
});