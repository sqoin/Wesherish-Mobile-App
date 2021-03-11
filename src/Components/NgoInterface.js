import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage, Alert
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {urlBlockchaine , urlBackEnd} from '../../utils'
class NgoInterface extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }
    };

    componentDidMount = () => {
      
        //for test
        //self.getBalance(this.state.simpleUserPublickey )
                    
       

    }
    
    componentWillUnmount() {

    }

      
    onSuccess = (e) => {
       
      
        this.getUserPublickeyByPrivateKey(''+e.data)
      
       
    }



getUserPublickeyByPrivateKey(privatekey){

    const self=this;
    fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privatekey, {
        method: "GET"

    })

        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                 
                  

                   if (data[0].publickey === undefined){

                    console.log("check your informations ! there is no user with this privatekey in our plateform")


                    

                   }else{

                    self.props.navigation.navigate('ConfirmationNgo' ,  {privatekey:privatekey ,  publickey:data[0].publickey})
                   
                   }
                            
                  }).catch(err => { console.log(err)
                    });

            } else {
                console.log('Network request for backoffice failed with response ' + response.status);
               
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
                            
                    </Text>

                        <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "40%",
                            marginTop: '5%',
                            backgroundColor: "#2b2343",borderRadius: 5
                        }}
                            
                        >
                           <Button

                                 color="#2b2343"
                                 style={{width: 70 }}
                                 title='Log out'
                                 onPress={() => { this.props.navigation.navigate('LoginQR') }}>
                            </Button>
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