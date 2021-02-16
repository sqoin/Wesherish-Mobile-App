import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class VaccinTeamInterface extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scannded: ""
        }
    };

    componentDidMount = () => {

    }


    componentWillUnmount() {

    }

    onSuccess = (e) => {
        this.setState({ scanned: ''+e.data });
        console.log("-----------"+e.data);
    }
    

    burnDonationToken(vendeurprivateKey , vendeurPublickey , userkey){

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




    transferfromdonation(){

        let data={
            "recipient":"0x241037ba12eEf56f2DFfE32A2bF67bf49dbD6195",
            "amount":1,
            "from":"0x48cf5eCdB25635787c82d513c7f13d62abA1F1B4",
            "privateKey":"4f4fe0167219001d6b9dcc02d5741f6164dc48ca1396e2be4169deab7104f06d"
        }
        let self=this;
        fetch(urlBlockchaine + 'api/transferFunction', {
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
    allToAction() {
        var self = this;
        if
            (self.state.productdetails.action_name == DISCOUNT_CODE) {
            this.props.navigation.navigate('DiscountCode');
        }
        else if (self.state.productdetails.action_name == VIDEO) {

            this.props.navigation.navigate('ProductVideo');

        }
        else if (self.state.productdetails.action_name == NEWS_LETTERS) {
            this.props.navigation.navigate('NewLetter');
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            marginTop: '5%', marginLeft: '30%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                            {/* QRCodeScanner */}
                    </Text>
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

export default VaccinTeamInterface ;
