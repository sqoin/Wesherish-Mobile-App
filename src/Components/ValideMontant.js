import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground
} from 'react-native';


class ValideMontant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            venderPublickey:"",
            venderPrivateKey:"",
            //simpleUserCode:""
            simpleUserPrivateKey: this.props.route.params.userQRCode ? this.props.route.params.userQRCode : "",
            simpleUserPublickey:''

        }
    };

    componentDidMount = () => {

        AsyncStorage.getItem("connectedMember",(err,data)=>{
            if(err){
                return;
            }
        
           
            AsyncStorage.getItem("connectedPrivatekey",(err,privatekey)=>{
                if(err){
                    return;
                }
            
    
                self.setState({venderPrivateKey :privatekey ,venderPublickey:JSON.parse(data).publickey})
            })
      
        })

    }


    componentWillUnmount() {

    }


    onSuccess = (e) => {
        this.setState({ simpleUserPrivateKey: ''+e.data });
        this.getUserPublickeyByPrivateKey(''+e.data)
       
    }
//approve Donation

        approveDonation (){
            let {venderPublickey , simpleUserPrivateKey , simpleUserPublickey}=this.state;
            let data={
           "from":venderPublickey,
           "ngoAccount":simpleUserPublickey,
           "amount":1,
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

                        if (data.tx !==undefined){
                            console.log("approved successfully! ")
                            self.transferfromdonation()
                        }
                        else{
                          console.log("approval failed! ")
                        }
                        
    
                    }).catch(err => { console.log(err) });
    
                } else {
                    console.log('Network request for backoffice failed with response ' + response.status);
    
    
                }
            });
    
        }




    burnDonationToken(){
        let {venderPublickey , venderPrivateKey , simpleUserPublickey}=this.state;

        let data={
            "address":simpleUserPublickey,
            "contenu":1,
            "from":venderPublickey,
            "privateKey":venderPrivateKey
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


    //getUserPublickeyByPrivateKey (simpleUserPrivateKey)


    getUserPublickeyByPrivateKey(PrivateKey){

        const self=this;
        fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + PrivateKey, {
            method: "GET"
    
        })
    
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (json) {
                     
                       self.setState({simpleUserPublickey:data.publickey})   
                       self.approveDonation();            
                      }).catch(err => { console.log(err) });
    
                } else {
                    console.log('Network request for backoffice failed with response ' + response.status);
                    alert("verify your informations please !")
                }
            });
    
    
     }
    


    transferfromdonation(){


        let {venderPublickey , simpleUserPrivateKey , simpleUserPublickey}=this.state;
        let data={
            "recipient": venderPublickey,
            "amount":1,
            "from":simpleUserPublickey,
            "privateKey":simpleUserPrivateKey
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
        
           
          
          
              self.getbalance();
            
            }).catch(err => { console.log(err) });
            
            } else {
            
            self.setState({ serverMessage: "error on shared data" })
            console.log('Network request for backoffice failed with response ' + response.status);
            
            
            }
            });
    
    }



       getbalance(){


        let { simpleUserPrivateKey , simpleUserPublickey}=this.state;
        let data={
            "address":simpleUserPublickey,
            "privateKey":simpleUserPrivateKey
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
            response.text().then(function (text) {
        
                if (text ===0){
                    console.log("get balance successfully! ")
                    self.burnDonationToken()
                }
                else{
                  alert("get balance failed! ")
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