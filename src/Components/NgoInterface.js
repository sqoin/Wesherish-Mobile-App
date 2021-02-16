import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {urlBlockchaine , urlBackEnd} from '../../utils'
class NgoInterface extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scannded: "",
            memberPublickey:"",
            memberPrivateKey:""
        }
    };

    componentDidMount = () => {

        AsyncStorage.getItem("connectedMember",(err,data)=>{
            if(err){
                return;
            }
        
            this.setState({memberPublickey:JSON.parse(data).publickey})
            AsyncStorage.getItem("connectedPrivatekey",(err,data)=>{
                if(err){
                    return;
                }
            
    
                this.setState({memberPrivateKey:data})
            })
      
        })
       

    }


    componentWillUnmount() {

    }




    burnDonationToken(ngoPrivateKey, ngoPublickey , vendeurPublickey){

        let data={
            "address":"0x48cf5eCdB25635787c82d513c7f13d62abA1F1B4",
            "contenu":1,
            "from":"0xB1014cF81c00caEb30534e0f90995Be726f8B36C",
            "privateKey":"d900db4bc9128f868f8a249c22a43c499aed7e4694eca6214da5899b3eb45d17"
        }
        let self=this;
        fetch(urlBlockchaine + 'api/burnDonationTokenFunction', {
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
        
           
            self.setState({ serverMessage: "data shared succefully" , balance:text}) 
            console.log("this is the balance => "+self.state.balance)
            
            }).catch(err => { console.log(err) });
            
            } else {
            
            self.setState({ serverMessage: "error on shared data" })
            console.log('Network request for backoffice failed with response ' + response.status);
            
            
            }
            });
    
    }

    
    onSuccess = (e) => {
        this.setState({ scanned: e.data });
    //Alert (Are you sure you wnt to burn this wallet ?)
        this.burnDonationToken(ngoPrivateKey, ngoPublickey , vendeurPublickey)
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
                            Ngo Interface
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

export default NgoInterface;