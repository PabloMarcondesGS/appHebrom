import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Signin } from '../pages/Signin';
// import { TermsAndConditions } from '../pages/TermsAndConditions';
import { Signup } from '../pages/Signup';
import { ForgotPassword } from '../pages/ForgotPassword';
import { MainMenu } from '../pages/MainMenu';
import CustomDrawer from '../components/CustomDrawer';
import { DigitalCard } from '../pages/DigitalCard';
import { Financial } from '../pages/Financial';
import { InvoiceDetails } from '../pages/InvoiceDetails';
import { BillingHistory } from '../pages/BillingHistory';
import { Handoff } from '../pages/Handoff';
import { PaymentReport } from '../pages/PaymentReport';
import { MessagesAndNews } from '../pages/MessagesAndNews';
import { CallOpening } from '../pages/CallOpening';
import { ViewCalled } from '../pages/ViewCalled';
import { ReopeningCall } from '../pages/ReopeningCall';
import { Contact } from '../pages/Contact';
import { Research } from '../pages/Research';
import { SelectedCard } from '../pages/SelectedCard';
import { Ombudsman } from '../pages/Ombudsman';
import { CommonQuestions } from '../pages/CommonQuestions';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoute() {
  return (
      <Drawer.Navigator 
        initialRouteName="Signin" 
        drawerPosition='left'
        drawerContent={(props) => <CustomDrawer {...props}  />}
      >
        <Drawer.Screen name="MainMenu" component={MainMenu}  />
        {/* <Drawer.Screen name="TermsAndConditions" component={TermsAndConditions}  /> */}
        <Drawer.Screen name="Signin" component={Signin} />
        <Drawer.Screen name="DigitalCard" component={DigitalCard} />
        <Drawer.Screen name="InvoiceDetails" component={InvoiceDetails} />
        <Drawer.Screen name="MessagesAndNews" component={MessagesAndNews} />
        <Drawer.Screen name="CallOpening" component={CallOpening} />
        <Drawer.Screen name="ViewCalled" component={ViewCalled} />
        <Drawer.Screen name="ReopeningCall" component={ReopeningCall} />
        <Drawer.Screen name="Contact" component={Contact} />
        <Drawer.Screen name="Research" component={Research} />
        <Drawer.Screen name="Ombudsman" component={Ombudsman} />
      </Drawer.Navigator>
  );
}


function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer" headerMode="none">
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu} 
        />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Drawer" component={DrawerRoute} />
        <Stack.Screen name="DigitalCard" component={DigitalCard} />
        <Stack.Screen name="SelectedCard" component={SelectedCard} />
        <Stack.Screen name="Financial" component={Financial} />
        <Stack.Screen name="BillingHistory" component={BillingHistory} />
        <Stack.Screen name="InvoiceDetails" component={InvoiceDetails} />
        <Stack.Screen name="Handoff" component={Handoff} />
        <Stack.Screen name="PaymentReport" component={PaymentReport} />
        <Drawer.Screen name="Ombudsman" component={Ombudsman} />
        <Drawer.Screen name="CommonQuestions" component={CommonQuestions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;