import React from 'react';
import { View, StyleSheet,Image, Dimensions, Text ,SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';

export const Ombudsman: React.FC = () => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                    <Feather name="arrow-left" color={colors.white} size={30} style={styles.navBarIcon}  />
                </TouchableOpacity>
                <Text style={styles.navBarText}>Ouvidoria</Text>
            </View> 
            <View style={styles.body}>
                <Image source={require('../assets/logo.png')}  style={styles.logo}/>
                <View style={styles.line}>
                    <TouchableOpacity  style={styles.lineContents} onPress={() => Linking.openURL('https://api.cibernetsolutions.com.br:8443/mdsv/apex_dev/egus.web/Ouvidoria')}>
                        <Feather name="link" color={colors.gray60} size={24} style={styles.navBarIcon}  />
                        <Text style={{color: colors.gray60, fontSize: 18}}>Ouvidoria</Text>
                    </TouchableOpacity>
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
  })