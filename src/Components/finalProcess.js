import React, { Component } from 'react';
import {
    View, Text,Alert,
    TouchableOpacity, Button, StyleSheet,AsyncStorage
} from 'react-native';
import {
    UIActivityIndicator,
  } from 'react-native-indicators';

  import {urlBlockchaine , urlBackEnd} from '../../utils'
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
                message:"",
                error :  0 ,
                successMessage: 0,
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

                                    self.setState({result : 1 , successMessage:0,message:"check your informations ! there is no user with this privatekey in our plateform"})

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
                    self.setState({result : 1 , successMessage:0,message:'Network request for backoffice failed with response ' + response.status})
                    alert("verify your informations please !")
                 
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
                self.setState({   result : 1 , successMessage:0,message:"the vendeur has no balance ! "})
            }else{
           
                //approve donation
               callback(self.burnDonationToken()) 

            }
              
        }).catch(err => { console.log(err);

            //error while transaction
            self.setState({result : 1 , successMessage:0,message:'error while transaction'})
          });
        
        } else {
        
        console.log('Network request for backoffice failed with response ' + response.status);
        self.setState({result : 1 , successMessage:0,message:'Network request for backoffice failed with response ' + response.status})
        
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
                    self.setState({result : 1 , successMessage:0,message:"No more vaccine for this  citizen ! "})
                   
                }else{
           
                   
                    callback(self.burnVaccinToken)
                }
                  
            }).catch(err => {
                console.log(err) });
            
            } else {
            
          
            self.setState({result : 1 , successMessage:0,message:'Network request for backoffice failed with response ' + response.status})
            
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
                   
                    self.setState({result : 1 , successMessage:0,message:"approved successfully!"})

                    //burnDonationToken
                    callback();
                   
                }
                else{
                // console.log("Transaction failed , Try again please! ")
                 self.setState({result : 1 , successMessage:0,message:"Transaction failed , Try again please!"})
                
                }
                

               }).catch(err => { console.log(err);
                self.setState({result : 1 , successMessage:0,message:"Transaction failed , Try again please!"})
                });

           } else {
            

               self.setState({result : 1 , successMessage:0,message:'Network request for backoffice failed with response ' + response.status})
           }
       });

   }

   //approve vaccin
   approveVaccin (callback){
    let {connectedUserPublickey , userScanedPublickey , userScanedPrivateKey }=this.state;

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
         
                    //alert("approved successfully! ")
                    self.setState({result : 1 , successMessage:0,message:"approved successfully! "})

                    callback();  
                }
                else{
               
                  alert("approval failed, Try again! ")
                  self.setState({result : 1 , successMessage:0,message:"approval failed, Try again! "})
                }
             

            }).catch(err => { console.log(err) });

        } else {
         self.setState({message:'Network request for backoffice failed with response ' + response.status})


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
    
                console.log(self.connectedUserPrivateKey+' '+self.connectedUserPublickey+' '+self.userScanedPrivateKey+' '+self.userScanedBalance)
                if (data.err !==undefined){
                  
                    self.setState({result : 1 , successMessage:0,message:'the donation burn was failed , please try again!'})
                }
                else {
        
                    self.setState({result : 1 , successMessage:0,message:"The token burning process was successfully completed!"+data.text})
         
                }
            
            }).catch(err => {
              
                 self.setState({message:'the donation burn was failed , please try again!'})
                });
            } else {
            
            self.setState({ serverMessage: "error on shared data" })
            self.setState({result : 1 , successMessage:0,message:'Network request for backoffice failed with response ' + response.status})
            
            
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
                            
                                    self.setState({result : 1 , successMessage:0,message:'the vaccin burn was failed , please try again! '})
                   
                                }
                                else {
                                    self.setState({result : 1 , successMessage:0,message:'The token burning process was successfully completed!'})
                                    
                                }
                             
             
                            }).catch(err => { console.log(err) });
             
                        } else {
                            self.setState({result : 1 , successMessage:0,message:'Network request for backoffice failed with response ' + response.status})
             
             
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
                                 onPress={() => { this.Logout()  }}>
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
               
                <View style={styles.body}>
                {this.state.successMessage ===  0 && this.state.error ===  0 &&
                <View style={{marginTop: '0%'}}>
                {this.state.connectedUserRole === 'vaccinTeam' && <Text style={{  marginTop: '0%', marginLeft: '2%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                               
                   The beneficaire public key :
                              
                     </Text> }

                     {this.state.connectedUserRole === 'ngo' && <Text style={{  marginTop: '0%', marginLeft: '2%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                               
                   The Vender public key :
                              
                     </Text> }
                     <Text style={{  marginTop: '0%', marginLeft: '2%',
                        color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                        {this.state.userScanedPublickey}

               

                          
                 </Text> 
                 <Text style={{  marginTop: '0%', marginLeft: '2%',
                        color: '#FFF', fontSize: 26, textAlign: 'center' } }>

                        {this.state.message}
              
                 </Text> 
                 {this.state.result === undefined &&  <UIActivityIndicator color='white' marginTop='85%' />}
                   </View>}
               
              
            



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
                
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('scanQr') }}
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

export default finalProcess;