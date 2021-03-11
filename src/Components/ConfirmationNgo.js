import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage,Image
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

  import {urlBlockchaine , urlBackEnd} from '../../utils'
class ConfirmationNgo extends Component {

    constructor(props) {
        super(props)
        this.state = {
      simpleUserPublickey:this.props.route.params.publickey ? this.props.route.params.publickey : "",
      simpleUserPrivateKey:this.props.route.params.privatekey ? this.props.route.params.privatekey : "",
      ngoPublickey:'',
      ngoPrivateKey:'',
      vendeurBalance:0,
      scanned: "",
    //publickey:""
    message:""

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
                    self.getBalance(self.state.simpleUserPublickey)
    
              
            })
      
        })


    }


    componentWillUnmount() {
       

    }



    
//getBalance
getBalance( publickey){
    let data={
        "address":publickey,
       // "privateKey":privateKey
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
            
            self.setState({ vendeurBalance: balanceValue })

            if (balanceValue === 0){

                //alert("the vendeur has no balance ! ")
                self.setState({message:"the vendeur has no balance ! "})
            }else{
                self.approveDonation() ;
            }
              
        }).catch(err => { console.log(err);

            //error while transaction
            self.setState({message:'error while transaction'})
          });
        
        } else {
        
        console.log('Network request for backoffice failed with response ' + response.status);
        self.setState({message:'Network request for backoffice failed with response ' + response.status})
        
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
   "amount":vendeurBalance ,
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
              // console.log(JSON.stringify(data))
                if (data.tx !==undefined){
                    //console.log("approved successfully! ")
                    self.burnDonationToken()
                }
                else{
                // console.log("Transaction failed , Try again please! ")
                 self.setState({message:"Transaction failed , Try again please!"})
                
                }
                

               }).catch(err => { console.log(err);
                self.setState({message:"Transaction failed , Try again please!"})
                });

           } else {
               //console.log('Network request for backoffice failed with response ' + response.status);

               self.setState({message:'Network request for backoffice failed with response ' + response.status})
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
        
               // console.log("------- "+JSON.stringify(data))
           
                if (data.err !==undefined){
                    //console.log('the donation burn was failed , please try again! ')
                    self.setState({message:'the donation burn was failed , please try again!'})
                }
                else {
                    //console.log ("The token burning process was successfully completed!" )
                    self.setState({message:"The token burning process was successfully completed!"+data.text})
                   //transaction Id :  data.txid
                }
            
            }).catch(err => {
              //  self.props.navigation.navigate('ConfirmationNgo');
                 //console.log(err) 
                 self.setState({message:'the donation burn was failed , please try again!'})
                });
            } else {
            
            self.setState({ serverMessage: "error on shared data" })
            //console.log('Network request for backoffice failed with response ' + response.status);
            self.setState({message:'Network request for backoffice failed with response ' + response.status})
            
            
            }
            });
    
    }






    
   

    render() {
        let {publickey}=this.state
        return (

            
            <View style={styles.container}>

                <View style={styles.header}>
                <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            marginTop: '5%', marginLeft: '37%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                     
                    </Text>
                        <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "43%",
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
               
                <View style={{marginTop: '0%'}}>
                   <Text style={{  marginTop: '0%', marginLeft: '2%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                               

                              
                     </Text> 
                     <Text style={{  marginTop: '0%', marginLeft: '2%',
                        color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                        {this.state.simpleUserPublickey}

                        {this.state.message}

                          
                 </Text> 
              
           

                     <UIActivityIndicator color='white' marginTop='85%' />

                   </View>
               
                  

                   <TouchableOpacity onPress={() => { this.props.navigation.navigate('WelcomeToApp') }}
                    style={{
                        marginTop: '75%', marginLeft: '5%', flexDirection: "row",
                        backgroundColor: "#2b2343", width: "40%", height: "10%",
                        borderRadius: 20
                    }}>

                
                    <Text style={{
                        marginTop: '7%', marginLeft: '15%',
                        color: '#FFF', fontSize: 16, textAlign: 'center'
                    }}>
                        Scan Another QR
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('NgoInterface') }}
                    style={{
                        marginTop: '-12%', marginLeft: '55%', flexDirection: "row",
                        backgroundColor: "#2b2343", width: "40%", height: "10%",
                        borderRadius: 20
                    }}>

                
                    <Text style={{
                        marginTop: '7%', marginLeft: '25%',
                        color: '#FFF', fontSize: 16, textAlign: 'center'
                    }}>
                       Home page
                </Text>
                </TouchableOpacity>
          
           
     
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

export default ConfirmationNgo;