import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground
} from 'react-native';


class ValideMontant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            memberPublickey:"",
            memberPrivateKey:"",
            simpleUserCode: this.props.route.params.userQRCode ? this.props.route.params.userQRCode : ""

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


    //getUserBalance
    


    transferfromdonation(vendeurprivateKey , vendeurPublickey , userkey){

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


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            marginTop: '5%', marginLeft: '37%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                        Valider transfer
                    </Text>
                        <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "22%",
                            marginTop: '5%',
                        }}
                            onPress={() => { this.props.navigation.navigate('Menu') }}
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
               
                <View style={{marginTop: '0%'}}>
                   <Text style={{  marginTop: '20%', marginLeft: '0%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                               Entre Votre Montant :

                     </Text> 
                   <TextInput
                           label="Email"
                           style={{backgroundColor:'#FFF', alignItems: 'center', justifyContent:'center', marginRight: '22%',
                           marginLeft: "21%",
                           marginTop: '10%',}}
     
                          />
                   </View>
               
                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '10%',}}>
            <Button
                style={{width: 50}}
                title='Valider'
                onPress={() => {
                console.log('Bouton cliqué !');
              }}>
            </Button>
            <Button
                style={{width: 10}}
                title='Annuler'
                onPress={() => { this.props.navigation.navigate('Menu') 
              }}>
            </Button>
        </View>
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

export default ValideMontant;