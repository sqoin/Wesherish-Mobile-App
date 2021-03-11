import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Components/Home';
import ValideMontant from './src/Components/ValideMontant'
import Login from './src/Components/Login'
import Menu from './src/Components/Menu';
import Settings from './src/Components/Settings';
import WeCoin from './src/Components/WeCoin'
import LoginQR from './src/Components/LoginQR';
import GeneratorQRCode from './src/Components/GeneratorQRCode';
import ScanQRPage from './src/Components/VaccinTeamInterface';
import NgoInterface from './src/Components/NgoInterface';
import VaccinTeamInterface from './src/Components/VaccinTeamInterface';
import ScanQRVendeur from './src/Components/ScanQRVendeur';
import  WelcomeVaccin  from './src/Components/WelcomeVaccin';
import  WelcomeNgo  from './src/Components/WelcomeNgo';
import  WelcomeToApp  from './src/Components/WelcomeToApp';
import  DouzeMots  from './src/Components/DouzeMots';
import  LoadingNgo  from './src/Components/LoadingNgo';
import  Loadingvaccin  from './src/Components/Loadingvaccin';
import  ConfirmationNgo  from './src/Components/ConfirmationNgo';
import  InvalidAdress  from './src/Components/InvalidAdress';

class App extends Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeToApp" screenOptions={{
          headerShown: false
        }} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ValideMontant" component={ValideMontant} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="WeCoin" component={WeCoin} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="LoginQR" component={LoginQR} />
          <Stack.Screen name="GeneratorQRCode" component={GeneratorQRCode} />
          <Stack.Screen name="NgoInterface" component={NgoInterface} />
          <Stack.Screen name="VaccinTeamInterface" component={VaccinTeamInterface} />
          <Stack.Screen name="ScanQRVendeur" component={ScanQRVendeur} />
          <Stack.Screen name="WelcomeVaccin" component={WelcomeVaccin} />
          <Stack.Screen name="WelcomeNgo" component={WelcomeNgo} />
          <Stack.Screen name="WelcomeToApp" component={WelcomeToApp} />
          <Stack.Screen name="DouzeMots" component={DouzeMots} />
          <Stack.Screen name="LoadingNgo" component={LoadingNgo} />
          <Stack.Screen name="Loadingvaccin" component={Loadingvaccin} />
          <Stack.Screen name="ConfirmationNgo" component={ConfirmationNgo} />
          <Stack.Screen name="InvalidAdress" component={InvalidAdress} />
          
        </Stack.Navigator>
      </NavigationContainer >
    )
  }
}
export default App;
