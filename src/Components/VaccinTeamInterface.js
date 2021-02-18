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
            simpleUserPublickey:'', 
            simpleUserPrivateKey:'',
            vaccinTeamPublickey:'',
            vaccinTeamPrivateKey:''
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
        
            
            })
        })



    }


    componentWillUnmount() {

    }

    onSuccess = (e) => {
        this.setState({ simpleUserPrivateKey: ''+e.data });
       this.getUserPublickeyByPrivateKey(''+e.data)
    }

       getUserPublickeyByPrivateKey(privateKey){

        const self=this;
        fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privateKey, {
            method: "GET"
    
        })
    
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (json) {
                     
                       self.setState({simpleUserPublickey:data.publickey}) 
                       self.approveVaccin() ;             
                      }).catch(err => { console.log(err) });
    
                } else {
                    console.log('Network request for backoffice failed with response ' + response.status);
                    alert("verify your informations please !")
                }
            });
    
    
     }

    //approve vaccin
   approveVaccin (){
       let {vaccinTeamPublicKey , simpleUserPrivateKey , simpleUserPublickey}=this.state;

      // console.log (vaccinTeamPublicKey + " "+simpleUserPublickey + " "+simpleUserPrivateKey)

      let data={
        "ngoAccount":vaccinTeamPublicKey,
        "from":simpleUserPublickey,
        "amount":1,
        "privateKey":simpleUserPrivateKey
  
         }
       const self=this;
       fetch(urlBlockchaine +'api/approuveVaccineTokenFunction' , {
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
                   //console.log("++++++"+JSON.stringify(data))
                   if (data.tx !==undefined){

                       console.log("approved successfully! ")
                       self.burnVaccinToken()
                   }
                   else{
                     alert("approval failed, Try again! ")
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

                            if (data.err !==undefined){
                                alert('the vaccin burn was failed , please try again! ')
                            }
                            else {
                                alert ("The token burning process was successfully completed!" )
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
