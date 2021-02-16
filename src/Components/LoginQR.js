import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {urlBlockchaine , urlBackEnd} from '../../utils'
class LoginQR extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scannded: ""
        }
    };

    componentDidMount = () => {

        this.getUserByPrivateKey('4f4fe0167219001d6b9dcc02d5741f6164dc48ca1396e2be4169deab7104f06d')
    }


    componentWillUnmount() {

    }

    onSuccess = (e) => {
        this.setState({ scanned: e.data });
    }

 getUserByPrivateKey(privateKey){

    const self=this;
    fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privateKey, {
        method: "GET"

    })

        .then(function (response) {
            if (response.ok) {
                response.json().then(function (json) {
                    let member =json[0];
                     AsyncStorage.setItem("connectedMember",JSON.stringify(member))
                     AsyncStorage.setItem("connectedPrivatekey",privateKey)
                     console.log("role => "+member.role)
                     if (member.role ==='ngo'){
                         //navigate to ngo interface
                         self.props.navigation.navigate('NgoInterface')
                     }
                     else if (member.role ==='vendeur'){
                        //navigate to vendeur interface
                        self.props.navigation.navigate('Menu')
                    }
                    else if (member.role ==='vaccinTeam'){
                        //navigate to vaccinTeam interface
                        self.props.navigation.navigate('VaccinTeamInterface')
                    }
                    else{
                        alert("verify your informations please !")
                    }
                     

                }).catch(err => { console.log(err) });

            } else {
                console.log('Network request for backoffice failed with response ' + response.status);
                alert("verify your informations please !")
            }
        });


 }




    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            marginTop: '5%', marginLeft: '40%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                            Login
                    </Text>
                        <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "38%",
                            marginTop: '5%',
                        }}
                            onPress={() => { this.props.navigation.navigate('Settings') }}
                        >
                            <ImageBackground
                                //source={{ uri: this.state.companyLogo }}
                                source={require('../assetes/x.png')}
                                style={{
                                    width: 30, height: 30,
                                    // borderWidth: 1,
                                    //borderColor: 'black',

                                    //9borderWidth: 1
                                }}
                            ></ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        containerStyle={{ marginTop: 0 }}
                        cameraStyle={{
                            height: 200, marginTop: 0, width: 220,
                            alignSelf: 'center', justifyContent: 'center'
                        }}
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
        //backgroundColor: "#fff"

    },
    footer: {
        flex: 1,
        //backgroundColor: "red"
    },


});

export default LoginQR;