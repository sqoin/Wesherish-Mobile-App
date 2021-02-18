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

        this.getUserByPrivateKey('d900db4bc9128f868f8a249c22a43c499aed7e4694eca6214da5899b3eb45d17')
    }


    componentWillUnmount() {

    }

    onSuccess = (e) => {
        this.setState({ scanned: e.data });
    }




    
    isNgo (publickey, privateKey){
        let data={
            "address":publickey,
            "from":publickey,
            "privateKey":privateKey
        }
        const self=this;
        fetch(urlBlockchaine +'api/isNgoFunction' , {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(data)
    
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                   // console.log("la reponse => "+text)
                    if (text ===true ){
                        self.props.navigation.navigate('NgoInterface')
                    }
                    else{
                        alert("Invalid Address , verify your informations!")
                    }


                }).catch(err => { console.log(err) });

            } else {
                console.log('Network request for backoffice failed with response ' + response.status);


            }
        });

    }


    isVaccinTeam (publickey, privateKey){
        let data={
            "address":publickey,
            "from":publickey,
            "privateKey":privateKey}


        const self=this;
        fetch(urlBlockchaine +'api/isVaccinTeamFunction', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(data)
    
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                   /// console.log("la reponse => "+text)
                    if (text ===true ){

                        self.props.navigation.navigate('VaccinTeamInterface')
                    }else{
                            alert("verify your informations")
                        }


                }).catch(err => { console.log(err) });

            } else {
                console.log('Network request for backoffice failed with response ' + response.status);


            }
        });

    }

    isVendor (publickey  , privateKey){
        let data={

            "address":publickey,
            "from":publickey,
            "privateKey":privateKey
        }
        const self=this;
        fetch(urlBlockchaine +'api/isVendorFunction', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {

                   // console.log("la reponse => "+text)
                    if (text ===true ){

                        self.props.navigation.navigate('Menu')
                    }


                }).catch(err => { console.log(err) });

            } else {
                console.log('Network request for backoffice failed with response ' + response.status);


            }
        });

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
                     if (member.length ===0){
                        alert("verify your informations please !")
                     }
                    
                     else{

                        AsyncStorage.setItem("connectedMember",JSON.stringify(member))
                        AsyncStorage.setItem("connectedPrivatekey",privateKey)
                       console.log("role => "+JSON.stringify(member))
   
                      
                        if (member.role ==='ngo' ){
                            //navigate to ngo interface
                           
                            self.isNgo(member.publickey,privateKey)
                        }
                        else if (member.role ==='vendeur'){
                           //navigate to vendeur interface
                           
                           self.isVendor(member.publickey,privateKey)
                       }
                       else if (member.role ==='vaccinTeam'){
                           //navigate to vaccinTeam interface
                           
                           self.isVaccinTeam(member.publickey,privateKey)
                       }
                       else{
                           alert("verify your informations please !")
                       }
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