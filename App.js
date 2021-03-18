import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Components/Home';
import ValideMontant from './src/Components/ValideMontant'
import Menu from './src/Components/Menu';
import Settings from './src/Components/Settings';
import LoginQR from './src/Components/LoginQR';
import scanQr from './src/Components/scanQr';
import ScanQRVendeur from './src/Components/ScanQRVendeur';
import  WelcomePage  from './src/Components/WelcomePage';
import  WelcomeToApp  from './src/Components/WelcomeToApp';
import  DouzeMots  from './src/Components/DouzeMots';
import  LoadingPage  from './src/Components/LoadingPage';
import  finalProcess  from './src/Components/finalProcess';
import  WeCoin  from './src/Components/WeCoin';

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
          <Stack.Screen name="WeCoin" component={WeCoin} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="LoginQR" component={LoginQR} />
          <Stack.Screen name="scanQr" component={scanQr} />
          <Stack.Screen name="ScanQRVendeur" component={ScanQRVendeur} />
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="WelcomeToApp" component={WelcomeToApp} />
          <Stack.Screen name="DouzeMots" component={DouzeMots} />
          <Stack.Screen name="LoadingPage" component={LoadingPage} />
          <Stack.Screen name="finalProcess" component={finalProcess} />
          
        </Stack.Navigator>
      </NavigationContainer >
    )
  }
}
export default App;
