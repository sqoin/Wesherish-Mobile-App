import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage
} from 'react-native';


import {urlBlockchaine , urlBackEnd} from '../../utils'
class ValideMontant extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
            venderPublickey:"",
            venderPrivateKey:"",
            simpleUserPrivateKey: this.props.route.params.userQRCode ? this.props.route.params.userQRCode : "",
            simpleUserPublickey:'',
         // simpleUserPublickey:'0x48cf5eCdB25635787c82d513c7f13d62abA1F1B4',
          //simpleUserPrivateKey:'4f4fe0167219001d6b9dcc02d5741f6164dc48ca1396e2be4169deab7104f06d',
            executed : false,
            simpleUserBalance:0,
            vendeurCalculatedAmount:''

        }
    };

    componentDidMount = () => {

        let self=this ;

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


   
       //approve Donation
        approveDonation (){
            let {venderPublickey , simpleUserPrivateKey , simpleUserPublickey , vendeurCalculatedAmount}=this.state;
            console.log("amount to be given =>  "+vendeurCalculatedAmount + "user amount "+this.state.simpleUserBalance)
            let data={
                "from":simpleUserPublickey,
                "ngoAccount":venderPublickey,
                "amount":vendeurCalculatedAmount ,
                "privateKey":simpleUserPrivateKey
          
                 }
            const self=this;
            fetch(urlBlockchaine +'api/approveDonationTokenFunction' , {
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

                        console.log("++++++++++++++++++ "+JSON.stringify(data))
                        if (data.tx !==undefined){
                            console.log("approved successfully! ")
                            self.transferfromdonation()
                        }
                        else{
                          alert("transaction failed , please try later! ")
                          self.setState({ executed : false})
                        }
                        
    
                    }).catch(err => {
                        alert("transaction failed , please try later! ")
                        self.setState({ executed : false})
                        console.log(err) });
    
                } else {
                    self.setState({ executed : false})
                    alert("transaction failed , please try later! ")
    
    
                }
            });
    
        }




    burnDonationToken(){
        let {venderPublickey , venderPrivateKey , simpleUserPublickey , vendeurCalculatedAmount}=this.state;

        let data={
            "address":simpleUserPublickey,
            "contenu":vendeurCalculatedAmount,
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
            response.json().then(function (data) {
        
                console.log("++++++++++++++++++3 "+JSON.stringify(data))
                if (data.err !==undefined){
                    alert('the donation burn was failed , please try again! ')
                    self.setState({ executed : false})
                }
                else {
                    self.setState({ executed : false})
                    alert ("The token burning process was successfully completed!" )
                    self.props.navigation.navigate('Menu') 
                    
                }
            
            }).catch(err => {
                alert("transaction failed , please try later! ")
                self.setState({ executed : false})
                console.log(err) });
            
            } else {
            
                self.setState({ executed : false})
                alert("transaction failed , please try later! ")
            
            
            }
            });
    
    }




    getUserPublickeyByPrivateKey(privatekey){

        
        console.log("useeer privateKey "+privatekey)

        const self=this;

        self.setState({ executed : true})
        fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privatekey, {
            method: "GET"
    
        })
    
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        if (data[0].publickey === undefined){

                            alert("check your informations ! there is no user with this privatekey in our plateform")
                            self.props.navigation.navigate('WelcomeNgo')

                        }else{
                            self.setState({simpleUserPublickey:data[0].publickey}) 
                            self.getBalance(data[0].publickey) ;  
                        }
                     
                          
                      }).catch(err => {
                        self.setState({ executed : false})  
                        console.log(err) });
    
                } else {
                    self.setState({ executed : false})
                    console.log('Network request for backoffice failed with response ' + response.status);
                    alert("verify your informations please !")
                }
            });
    
    
     }
    


    transferfromdonation(){


        let {venderPublickey , simpleUserPrivateKey , simpleUserPublickey , vendeurCalculatedAmount}=this.state;
        let data={
            "recipient": venderPublickey,
            "amount":vendeurCalculatedAmount,
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
            response.json().then(function (data) {
                console.log("++++++++++++++++++2 "+JSON.stringify(data))
                if (data.err !==undefined){
                    alert('the transfer  was failed , please try again! ')
                    self.setState({ executed : false})
                }
                else {
                   self.burnDonationToken()
                }
            
            }).catch(err => {
                alert("transaction failed , please try later! ")
                self.setState({ executed : false})
                console.log(err) });
            
            } else {
            
                self.setState({ executed : false})
                alert("transaction failed , please try later! ")
            
            
            }
            });
    
    }



       getBalance(publickey){



        //this.setState({ executed: true })

        console.log("useer publickey => "+publickey)

        let data={
            "address":publickey,
         
        }
        let self=this;
        fetch(urlBlockchaine + 'api/getBalanceOfDonation', {
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

                let balanceValue = (balance * 1000000000000000000)
            
                self.setState({ simpleUserBalance: balanceValue })
              console.log('heeeeeeeeere'+balanceValue)
                if (balanceValue === 0){
    
                    alert("the citizen has no balance ! ")
                    self.setState({ executed : false})
                }else{
                    self.approveDonation() ;
                }
                  

        
            
            }).catch(err => {
                self.setState({ executed : false})
                console.log(err) });
            
            } else {
            
            self.setState({ executed : false})
            console.log('Network request for backoffice failed with response ' + response.status);
            
            
            }
            });


    }

    validateTransfer(){

        this.getUserPublickeyByPrivateKey(this.state.simpleUserPrivateKey)
      
        //forTest
       // this.getbalance(this.state.simpleUserPublickey )
    } 
    annulerTransfer(){ 
        this.props.navigation.navigate('Menu') 
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
                       
                    </Text>
                        
                    </View>
                </View>
                <View style={styles.body}>
               
                <View style={{marginTop: '0%'}}>
                   <Text style={{  marginTop: '20%', marginLeft: '0%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                               Enter the total cost of purchasing

                     </Text> 
                   <TextInput
                          
                           label="Email"
                           style={{backgroundColor:'#FFF', alignItems: 'center', justifyContent:'center', marginRight: '22%',
                           marginLeft: "21%",
                           marginTop: '10%',}}
                           onChangeText={(text) => this.setState({vendeurCalculatedAmount :text})}
                           keyboardType = 'numeric'
                           
     
                          />


                   </View>
               
                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '10%',}}>
            <Button
                disabled={!this.state.vendeurCalculatedAmount || this.state.executed }
                style={{width: 50,backgroundColor: this.state.disabled ? 'red': 'green'}}
                title={!this.state.executed ?'Validate' : 'waiting'}              
                 onPress= {() => this.validateTransfer()}>
            </Button>
            <Button
                style={{width: 10}}
                title='Cancel'
                onPress={() => this.annulerTransfer()}>
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