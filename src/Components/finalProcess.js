
import React, { Component } from 'react';
import { version } from 'react';
import {
    View, Text,Alert,
    TouchableOpacity, Button, StyleSheet,AsyncStorage
} from 'react-native';
import {
    UIActivityIndicator,
  } from 'react-native-indicators';

  import {urlBlockchaine , urlBackEnd} from '../../utils'
import Error from '../SVG/error';
import Success from '../SVG/success';
import Logout from '../SVG/logout';

  
class finalProcess extends Component {

    constructor(props) {
        super(props)
        this.state = {


                //The beneficaire or the vendor
                userScanedPrivateKey:this.props.route.params.privateKey ? this.props.route.params.privateKey : "",
                userScanedPublickey:"",
                userScanedBalance:0,

                //The NGO or the vaccinTeam 
                connectedUserPublickey:"",
                connectedUserPrivateKey:'',
                connectedUserRole:'',
               
                //Messages Error / Success
                //message:"",
                error :  0 ,
                successMessage:undefined,
                result : undefined,
                errorMessage : undefined,
                test:'ameni'

        }

       /* this.callbackFunction=this.callbackFunction.bind(this)
        this.secondCallback = this.secondCallback.bind(this)
        this.thirdCallback=this.thirdCallback.bind(this)*/


        this.getUserPublickeyByPrivateKey = this.getUserPublickeyByPrivateKey.bind(this);
        //this.onPress = this.onPress.bind(this);

        //bind "this" for vaccin functionality
        this.getBalanceVaccin = this.getBalanceVaccin.bind(this);
        this.approveVaccin = this.approveVaccin.bind(this);
        this.burnVaccinToken=this.burnVaccinToken.bind(this);
        this.ConfirmburnVaccinToken=this.ConfirmburnVaccinToken.bind(this);
      


        //bind "this" for donation functionality
        this.getBalanceDonation = this.getBalanceDonation.bind(this);
        this.approveDonation = this.approveDonation.bind(this);
        this.ConfirmburnDonationToken=this.ConfirmburnDonationToken.bind(this);
        this.burnDonationToken=this.burnDonationToken.bind(this);
        
    };

    componentDidMount = () => {


       AsyncStorage.getItem("connectedMember",(err,dataUser)=>{
            AsyncStorage.getItem("connectedPrivatekey",(err,privatekey)=>{
            if(err){
                return;
            }

               let role = JSON.parse(dataUser).role ;
                this.setState({connectedUserPrivateKey :privatekey ,connectedUserPublickey:JSON.parse(dataUser).publickey ,  connectedUserRole:JSON.parse(dataUser).role})

                if (role === 'ngo'){
                  this.getUserPublickeyByPrivateKey(this.state.userScanedPrivateKey , this.getBalanceDonation)
                }else{
                    this.getUserPublickeyByPrivateKey(this.state.userScanedPrivateKey , this.getBalanceVaccin ) 
                }


            })
        })
 

        

         /** test calllback function */
        //this.callMe(this.state.test , this.callbackFunction)
    }



    /** test calllback function */
    /*  callMe(string , callback){
        console.log("herre "+string)
        let name = "lamis" ;

       callback(name ,  this.secondCallback )
    }
    callbackFunction(name , callback){
        console.log("i'm on callback function " + name )
        let test = "this is the second callback"
        callback(test  , this.thirdCallback)
    }
    secondCallback(test , callback){
        let name="this is thirdcallBack11"
        console.log(test)
        callback(name )
    }

    thirdCallback(test){
        console.log(test)
    }*/


    //get Scaned User publickey 
    getUserPublickeyByPrivateKey(privateKey , callback){
    
        const self=this;
        fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privateKey, {
            method: "GET"
    
        })
    
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        console.log("resssult "+ JSON.stringify(data))
                     
                                if (data[0].publickey === undefined){

                                    self.setState({result : 1 ,errorMessage:"This user is not a member on our platform , Please Verify your Informations!"})

                                }else{

                                    self.setState({userScanedPublickey:data[0].publickey})
                                    console.log("----"+self.state.connectedUserRole)
                                    if (self.state.connectedUserRole === 'ngo'){
                                      
                                        callback(data[0].publickey , self.approveDonation)
                                      }else{
                                        callback(data[0].publickey , self.approveVaccin)       
                                      }

                                      
                                }

                              
                      }).catch(err => {
                       
                        console.log(err) });
    
                } else {
                    self.setState({result : 1 , errorMessage:'server Error , please try again Later!'})
                    
                 
                }
            });
     }

    //getBalanceDonation
    getBalanceDonation( publickey , callback){
    let data={ "address":publickey }
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
            
            self.setState({ userScanedBalance: balanceValue })

            if (balanceValue === 0){

                //alert("the vendeur has no balance ! ")
                self.setState({   result : 1 , errorMessage:"the vendeur has no balance ! "})
            }else{
           
                //approve donation
               callback(self.burnDonationToken()) 

            }
              
        }).catch(err => { console.log(err);

            //error while transaction
            self.setState({result : 1 , errorMessage:'Transaction Failed , please Try again!'})
          });
        
        } else {
        
        self.setState({result : 1 , errorMessage:'server Error , Please Try Later!'})
        
        }
        });}



        //getBalanceVaccin
       getBalanceVaccin( publickey , callback){


        let self=this;
        let data={
            "address":publickey,
           // "privateKey":privateKey
        }
    
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
                console.log("number of vaccin available "+ balance)
    
                let balanceValue = (balance * 1000000000000000000)
       
    
                if (balanceValue === 0){
                    self.setState({result : 1 , errorMessage:"No more vaccine for this  citizen ! "})
                   
                }else{
           
                   
                    callback(self.burnVaccinToken)
                }
                  
            }).catch(err => {
                console.log(err) });
            
            } else {
            
          
            self.setState({result : 1 , errorMessage:'Server Error , Please Try Later'})
            
            }
            })
            }
    

   //approve donation 
   approveDonation (callback){
   
    let {connectedUserPublickey , userScanedPublickey , userScanedPrivateKey , userScanedBalance}=this.state;
  
    let data={
   "from":userScanedPublickey,
   "ngoAccount":connectedUserPublickey,//
   "amount":userScanedBalance ,
   "privateKey":userScanedPrivateKey
  
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
              console.log(JSON.stringify(data))
                if (data.tx !==undefined){
                   
                 

                    //burnDonationToken
                    callback();
                   
                }
                else{
                // console.log("Transaction failed , Try again please! ")
                 self.setState({result : 1 , errorMessage:"Transaction failed , Try again please!"})
                
                }
                

               }).catch(err => { console.log(err);
                self.setState({result : 1 , errorMessage:"Transaction failed , Try again please!"})
                });

           } else {
            

               self.setState({result : 1 , errorMessage:'server Error Please Try Later!'})
           }
       });

   }

   //approve vaccin
   approveVaccin (callback){
    let {connectedUserPublickey , userScanedPublickey , userScanedPrivateKey }=this.state;

    console.log("approve address => "+ connectedUserPublickey + " "+userScanedPublickey +" "+userScanedPrivateKey)

   let data={
     "ngoAccount":connectedUserPublickey,
     "from":userScanedPublickey,
     "amount":1,
     "privateKey":userScanedPrivateKey

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
        
                    callback();  
                }
                else{
               
                
                  self.setState({result : 1 ,errorMessage:"Transaction Failed, Try again "})
                }
             

            }).catch(err => { console.log(err) });

        } else {
               self.setState({result : 1 ,errorMessage:'Server failed , Please Try again Later !'})
        }
    });

}


   burnDonationToken(){

    let self =this;
    Alert.alert('Burn Donation ' , 'Are you sure about burning this token ?', [
        {text:'NO' , onPress: ()=> alert("You didn't complete the burn process ! if you want to try again scan the code once again! ") , style:'cancel'},
        {text:'YES' , onPress: ()=> self.ConfirmburnDonationToken() }
    ])

   }

    ConfirmburnDonationToken(){

        let {connectedUserPublickey , connectedUserPrivateKey , userScanedPublickey , userScanedBalance}=this.state;
        console.log(self.connectedUserPrivateKey+' '+self.connectedUserPublickey+' '+self.userScanedPrivateKey+' '+self.userScanedBalance)
               
        let data={
            "address":userScanedPublickey,//connectedUserPublickey
            "contenu":userScanedBalance,
            "from":connectedUserPublickey,//connectedUserPublickey
            "privateKey":connectedUserPrivateKey
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

                console.log("transaction id => "+JSON.stringify(data))
    
                if (data.err !==undefined){
                  
                    self.setState({result : 1 , successMessage:data.txid})
                }
                else {
        
                    self.setState({result : 1 ,errorMessage:"Transaction Failed , please Try again!"})
         
                }
            
            }).catch(err => {
              
                 self.setState({result : 1 , errorMessage:'server error , please Try again!'})
                });
            } else {
            
            self.setState({result : 1 , errorMessage:'server error , please Try again!'})
            
            
            }
            });
    
    } 

   
      
        
    
       burnVaccinToken(){
    let self=this;
    console.log("------------------"+this.connectedUserPublickey+' '+this.userScanedPublickey+' '+this.connectedUserPrivateKey)
        Alert.alert('Burn Vaccin ' , 'Are you sure about burning this token ?', [
            {text:'NO' , onPress: ()=> alert("You didn't complete the burn process ! if you want to try again scan the code once again! ") , style:'cancel'},
            {text:'YES' , onPress: ()=> self.ConfirmburnVaccinToken() }
        ])
    
       }
        ConfirmburnVaccinToken(){
            let {connectedUserPublickey , connectedUserPrivateKey , userScanedPublickey }=this.state;
            console.log(this.connectedUserPublickey+' '+this.userScanedPublickey+' '+this.connectedUserPrivateKey)
            let data={
                "address":userScanedPublickey,//connectedUserPublickey
                "from":connectedUserPublickey,//userScanedPublickey
                "contenu":1,
                "privateKey":connectedUserPrivateKey
               
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
                  
                                self.setState({result : 1 , successMessage:'Transaction was successfully completed '})
                            }
                            else {
                    
                                self.setState({result : 1 ,  errorMessage:"Transaction Failed , please Try again!"})
                     
                            }
                        
                        }).catch(err => {
                          
                             self.setState({result : 1 , errorMessage:'server error , please Try again!'})
                            });
                        } else {
                        
                        self.setState({ result : 1 , errorMessage:'server error , please Try again!'})
                        
                        
                        }
                        });
                    }

        Logout(){
            AsyncStorage.clear()
            this.props.navigation.navigate('WelcomeToApp')
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
                    <TouchableOpacity
                          style ={styles.logout}
                                onPress={() => { this.Logout()  }}>
                                 <Logout  onPress={() => { this.Logout()  }} />

                     </TouchableOpacity>
                    </View>
                </View>
               
                <View style={styles.body}>


                {this.state.successMessage !== undefined   &&


                <View style={{marginTop: '0%'}}>
                {this.state.connectedUserRole === 'vaccinTeam' && <Text style={{  marginTop: '0%', marginLeft: '0%',
                            color: '#FFF', fontSize: 20, textAlign: 'center' } }>The beneficaire public key :</Text> }

                {this.state.connectedUserRole === 'ngo' && <Text style={{  marginTop: '0%', marginLeft: '0%',
                            color: '#FFF', fontSize: 20, textAlign: 'center' } }>The Vender public key :</Text> }

                                       
                                            
                                  


                <Text style={{  marginBottom: '7%', marginLeft: '0%',
                        color: '#FFF', fontSize: 15, textAlign: 'center',  fontWeight: 'bold' } }>
                        {this.state.userScanedPublickey}        
                 </Text> 



                 <View  style={styles.box} >
                    <View style={styles.svg}><Success/></View>
                    <Text style={styles.successtext}>SUCCESS</Text>
                    <Text style={styles.paragraph} > Tx Id :  {this.state.successMessage}</Text>
                </View>

              
                   </View>
                   
                   }


                {this.state.errorMessage !== undefined   &&
                    <View  style={styles.box} >

                    <View style={styles.svg}><Error/></View>
                 
                     <Text style={styles.errortext}>ERROR</Text>
                    <Text style={styles.paragraph} >  {this.state.errorMessage}</Text>
                    </View>  }

               
               

          

               
                    {this.state.result === undefined &&  <UIActivityIndicator color='white' marginTop='2%' />}
              
            




                   </View>
                   
                    
          {this.state.result !== undefined  &&
                <View style={styles.footer}>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('WelcomeToApp') }}
                    style={{
                         marginLeft: '5%', 
                        backgroundColor: "#2b2343", width: "40%", height: "30%",
                        borderRadius: 20 , justifyContent:'center'
                    }}>

                
                    <Text style={{
                      
                        color: '#FFF', fontSize: 16, textAlign: 'center'
                    }}>
                        Scan Another QR
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('scanQr') }}
                    style={{
                       marginLeft: '5%',
                        backgroundColor: "#2b2343", width: "40%", height: "30%",
                        borderRadius: 20,justifyContent:'center'
                    }}>

                
                    <Text style={{
                      
                        color: '#FFF', fontSize: 16, textAlign: 'center'
                    }}>
                       Home page
                </Text>
                </TouchableOpacity>
                    
                
                </View>}
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
        
        flex: 4,
        justifyContent:'center',
        //backgroundColor: "green"

    },
    logout:{
        marginRight: '0%',
        marginLeft: "43%",
        marginTop: '5%',
    },
    footer: {
        flex: 1,
        flexDirection: "row"
        //backgroundColor: "red"
    },
    svg:{
        marginBottom: '2%',
        marginTop: '1%',
        //backgroundColor:"green",
        //height:"40%"
       
     
    },
    box: {
        justifyContent:'center',
        height: '60%',
        width:"80%",
        backgroundColor: 'white',
        alignItems:'center',
        //margin: 8,
        marginTop: '0%', marginLeft: '10%'


    },
    paragraph: {

    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#241c33'
   
  },

  successtext: {

    textAlign: 'center',
    marginBottom: '10%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green'
   
  },

  errortext: {
 
    textAlign: 'center',
    marginBottom: '10%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
   
  }


});



export default finalProcess;