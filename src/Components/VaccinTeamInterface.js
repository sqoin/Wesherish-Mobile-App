import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground , Alert,AsyncStorage
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {urlBlockchaine , urlBackEnd} from '../../utils'

class VaccinTeamInterface extends Component {

    constructor(props) {
        super(props)
        this.state = {

            //simpleUserPublickey:'0x48cf5eCdB25635787c82d513c7f13d62abA1F1B4',
           // simpleUserPrivateKey:'4f4fe0167219001d6b9dcc02d5741f6164dc48ca1396e2be4169deab7104f06d',
            simpleUserPublickey:'', 
           simpleUserPrivateKey:'',
            vaccinTeamPublickey:'',
            vaccinTeamPrivateKey:'',
            vaccinNumber:0
        }
    };

    componentDidMount = () => {
        let self=this;
       

        AsyncStorage.getItem("connectedMember",(err,dataUser)=>{
            if(err){
                return;
            }
               
            AsyncStorage.getItem("connectedPrivatekey",(err,privatekey)=>{
                if(err){
                    return;
                }

                self.setState({vaccinTeamPrivateKey :privatekey , vaccinTeamPublicKey: JSON.parse(dataUser).publickey})


                //for test
               //self.getBalance(this.state.simpleUserPublickey) 
            
            })
        })



    }


    componentWillUnmount() {

    }

    onSuccess = (e) => {
        this.setState({ simpleUserPrivateKey: ''+e.data });
       this.getUserPublickeyByPrivateKey(''+e.data)
    }


    //getBalance
  getBalance( publickey){
     
    let data={
        "address":publickey,
       // "privateKey":privateKey
    }
    let self=this;
    fetch(urlBlockchaine + 'api/getBalanceOfVaccin', {
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
            console.log(balance)

            let balanceValue = (balance * 1000000000000000000)
            
            self.setState({ vaccinNumber: balanceValue })

            if (balanceValue === 0){

                alert("No more vaccine for this  citizen ! ")
               
            }else{
                self.approveVaccin() ;
            }
              
        }).catch(err => {
            self.props.navigation.navigate('WelcomeVaccin')
            console.log(err) });
        
        } else {
        
        console.log('Network request for backoffice failed with response ' + response.status);
        
        
        }
        });

      }

       getUserPublickeyByPrivateKey(privateKey){

        const self=this;
        fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privateKey, {
            method: "GET"
    
        })
    
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                     
                       self.setState({simpleUserPublickey:data.publickey}) 
                       self.getBalance(data.publickey) ;            
                      }).catch(err => {
                        self.props.navigation.navigate('WelcomeVaccin')  
                        console.log(err) });
    
                } else {
                    console.log('Network request for backoffice failed with response ' + response.status);
                    alert("verify your informations please !")
                    self.props.navigation.navigate('WelcomeVaccin')
                }
            });
    
    
     }

    //approve vaccin
   approveVaccin (){
       let {vaccinTeamPublicKey , simpleUserPrivateKey , simpleUserPublickey}=this.state;

       console.log (this.state.vaccinNumber)

      let data={
        "ngoAccount":vaccinTeamPublicKey,
        "from":simpleUserPublickey,
        "amount":1,
        "privateKey":simpleUserPrivateKey
  
         }
       const self=this;
       fetch(urlBlockchaine +'api/approveVaccineTokenFunction' , {
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
                   console.log("++++++"+JSON.stringify(data))
                   if (data.tx !==undefined){

                       console.log("approved successfully! ")
                       self.burnVaccinToken()
                   }
                   else{
                   
                     alert("approval failed, Try again! ")
                     self.props.navigation.navigate('WelcomeVaccin')
                   }
                

               }).catch(err => { console.log(err) });

           } else {
               console.log('Network request for backoffice failed with response ' + response.status);


           }
       });

   }

   burnVaccinToken(){

    Alert.alert('Burn Vaccin ' , 'Are you sure about burning this token ?', [
        {text:'NO' , onPress: ()=> alert("You didn't complete the burn process ! if you want to try again scan the code once again! ") , style:'cancel'},
        {text:'YES' , onPress: ()=> this.ConfirmburnVaccinToken() }
    ])

   }
    ConfirmburnVaccinToken(){


        let {vaccinTeamPublicKey , vaccinTeamPrivateKey , simpleUserPublickey}=this.state;

        let data={
            "address":simpleUserPublickey,
            "from":vaccinTeamPublicKey,
            "contenu":1,
            "privateKey":vaccinTeamPrivateKey
           
                  }
                const self=this;
                fetch(urlBlockchaine +'api/burnVaccineTokenFunction' , {
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
                           console.log("---"+JSON.stringify(data))
                            if (data.err !==undefined){
                                alert('the vaccin burn was failed , please try again! ')
                                self.props.navigation.navigate('WelcomeVaccin')
                            }
                            else {
                                alert ("The token burning process was successfully completed!" )
                                self.props.navigation.navigate('WelcomeVaccin')
                            }
                         
         
                        }).catch(err => { console.log(err) });
         
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
                            marginTop: '5%', marginLeft: '30%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                          Vaccin Interface
                    </Text>
                    <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "13%",
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

export default VaccinTeamInterface ;
