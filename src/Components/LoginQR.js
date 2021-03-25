import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {urlBlockchaine , urlBackEnd} from '../../utils'
import Logout from '../SVG/logout';
class LoginQR extends Component {

    

    onSuccess = (e) => {

         this.props.navigation.navigate('LoadingPage',{privateKey: e.data})
    }
    Logout(){
        AsyncStorage.clear()
        this.props.navigation.navigate('WelcomeToApp')
       }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                   
                     
                       

                    <TouchableOpacity
                          style ={styles.logout}
                                onPress={() => { this.Logout()  }}>
                                 <Logout  onPress={() => { this.Logout()  }} />

                     </TouchableOpacity>
                
                </View>
                <View style={styles.body}>
                   <Text style={styles.text}>Scan QR Code</Text> 
                  
                    <QRCodeScanner
                        onRead={this.onSuccess.bind()} 
                        containerStyle={{ marginTop: 0 }}
                        cameraStyle={{
                            height: 200, marginTop: 0, width: 220,
                            alignSelf: 'center', justifyContent: 'center',
                          
                        }}
                        reactivate='true'
                     
                       
                       
                    />
                  
                </View>
                <View style={styles.footer}>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#241c33"
    },
    header: {
        flex: 1,
        //backgroundColor: "red"
    },
    body: {
        //marginTop: '10%',
        flex: 4,
        justifyContent:'center'
        //backgroundColor: "#fff"

    },
    text:{
        textAlign:'center',
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        //backgroundColor: "red"
    },
    logout:{
        marginRight: '0%',
        marginLeft: "80%",
        marginTop: '5%',
    },

});

export default LoginQR;