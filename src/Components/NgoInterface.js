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
        //for test
          //  simpleUserPublickey:'0x48cf5eCdB25635787c82d513c7f13d62abA1F1B4',
            //simpleUserPrivateKey:'4f4fe0167219001d6b9dcc02d5741f6164dc48ca1396e2be4169deab7104f06d',
            simpleUserPublickey:'',
            simpleUserPrivateKey:'',
            ngoPublickey:'',
            ngoPrivateKey:'',
            vendeurBalance:0
        }
    };

    componentDidMount = () => {
        let self=this;

        AsyncStorage.getItem("connectedMember",(err,data)=>{
            if(err){
                return;
            }
        
            
                AsyncStorage.getItem("connectedPrivatekey",(err,privatekey)=>{
                    if(err){
                        return;
                    }

                    self.setState({ngoPrivateKey :privatekey ,ngoPublickey:JSON.parse(data).publickey})
                   
    
              
            })
      
        })

        //for test
        ///self.getBalance(this.state.simpleUserPrivateKey ,this.state.simpleUserPublickey )
                    
       

    }
    
    componentWillUnmount() {

    }

      
    onSuccess = (e) => {
        this.setState({ simpleUserPrivateKey: ''+e.data });
        this.getUserPublickeyByPrivateKey(''+e.data)
       
    }



getUserPublickeyByPrivateKey(privatekey){

    const self=this;
    fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privatekey, {
        method: "GET"

    })

        .then(function (response) {
            if (response.ok) {
                response.json().then(function (json) {
                 
                   self.setState({simpleUserPublickey:data.publickey}) 
                   self.getBalance(self.state.simpleUserPrivateKey ,data.publickey )            
                  }).catch(err => { console.log(err) });

            } else {
                console.log('Network request for backoffice failed with response ' + response.status);
                alert("verify your informations please !")
            }
        });


 }

//getBalance
getBalance(privateKey , publickey){
    let data={
        "address":publickey,
        "privateKey":privateKey
    }
    let self=this;
    fetch(urlBlockchaine + 'api/subscribeToBalance', {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(data)
        })
        
        .then(function (response) {
        if (response.ok) {
        response.text().then(function (balance) {
            
            self.setState({ vendeurBalance: balance })
            self.approveDonation() ; 
        }).catch(err => { console.log(err) });
        
        } else {
        
        console.log('Network request for backoffice failed with response ' + response.status);
        
        
        }
        });

}

//approve donation 

approveDonation (){

    let {ngoPublickey , simpleUserPrivateKey , simpleUserPublickey , vendeurBalance}=this.state;
    console.log(vendeurBalance )
    let data={
   "from":simpleUserPublickey,
   "ngoAccount":ngoPublickey,
   "amount":vendeurBalance,
   "privateKey":simpleUserPrivateKey
  
         }
       const self=this;
       fetch(urlBlockchaine +'api/approuveDonationTokenFunction' , {
           method: "POST",
           headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
           },
           body: JSON.stringify(data)
   
       })
       .then(function (response) {
           if (response.ok) {
               response.json().then(function (data) {
              //  console.log(JSON.stringify(data))
                if (data.tx !==undefined){
                    console.log("approved successfully! ")
                    self.burnDonationToken()
                }
                else{
                 alert("approval failed , Try again please! ")
                }
                

               }).catch(err => { console.log(err) });

           } else {
               console.log('Network request for backoffice failed with response ' + response.status);


           }
       });

   }


   burnDonationToken(){

    Alert.alert('Burn Donation ' , 'Are you sure about burning this token ?', [
        {text:'NO' , onPress: ()=> alert("You didn't complete the burn process ! if you want to try again scan the code once again! ") , style:'cancel'},
        {text:'YES' , onPress: ()=> this.ConfirmburnDonationToken() }
    ])

   }

    ConfirmburnDonationToken(){

        let {ngoPublickey , ngoPrivateKey , simpleUserPublickey , vendeurBalance}=this.state;

        let data={
            "address":simpleUserPublickey,
            "contenu":vendeurBalance,
            "from":ngoPublickey,
            "privateKey":ngoPrivateKey
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
            response.json().then(function (data) {
        
                console.log(JSON.stringify(data))
           
                if (data.err !==undefined){
                    alert('the donation burn was failed , please try again! ')
                }
                else {
                    alert ("The token burning process was successfully completed!" )
                }
            
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