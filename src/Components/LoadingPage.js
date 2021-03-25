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
import { color } from 'react-native-reanimated';
  import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
  import Error from '../SVG/error';
  import Success from '../SVG/success';

  import {urlBlockchaine , urlBackEnd} from '../../utils'
import Logout from '../SVG/logout';
class LoadingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            privateKey:this.props.route.params.privateKey ? this.props.route.params.privateKey : "",
            publickey : undefined , 
            successMessage: undefined,
            result : undefined,
            errorMessage : undefined,
            role:undefined,


      HeadTable: ['to', 'from', 'type', 'value', 'data'],
      DataTable: [
       
      ]
     

        }
    };

    componentDidMount = () => {
    
        this.getUserByPrivateKey(this.state.privateKey)
        //this.transactiontable();
    }


    componentWillUnmount() {
   
    }

    isNgo (publickey){
        let data={
            "address":publickey,
        }
        const self=this;
        self.setState({publickey:publickey})
        fetch(urlBlockchaine +'api/isNgoFunction' , {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(data),
            timeout: 9000
    
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                console.log("la reponse => "+text)
                    if (text ==="true"){

                        self.setState({result : 1 , successMessage:"Your current Role is Ngo" , role:"Ngo"})  
                      
                    }else if (JSON.parse(text).err !==undefined){
                        self.setState({result : 1 , error:1 , errorMessage:"server Error, Please Try Again Later!"})  
                    }
                    else{
                        self.setState({result : 1 , error:1 , errorMessage:"you are not authorised to access this application!"})  
                    }
                }).catch(err => { console.log(err)
                    self.setState({result : 1 , error:1 , errorMessage:"server Error, Please Try Again Later!"})  
                });

            } else {
             
                self.setState({result : 1 , error:1 , errorMessage:"server Error, Please Try Again Later!"})  

            }
        }).catch(err => { console.log(err)
            self.setState({result : 1 , errorMessage:"server Timeout Error, Please Try Again Later!"})  
        });


    }


    isVaccinTeam (publickey){
        let data={
            "address":publickey
        }


        const self=this;
        self.setState({publickey:publickey})
        console.log('-------'+this.state.publickey)
        fetch(urlBlockchaine +'api/isVaccinTeamFunction', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(data),
            timeout: 9000
    
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                    console.log("la reponse => "+text)
                   if (text ==="true"){
                    self.setState({result : 1 , successMessage:"Your current Role is VaccinTeam" , role:"VaccinTeam"}) 
    
                }else if (JSON.parse(text).err !==undefined){
                    self.setState({result : 1 , error:1 , errorMessage:"server Error, Please Try Again Later!"})  
                
                    }else{
                    
                              self.setState({result : 1 ,  errorMessage:"you are not authorised to access this application!"})  
                        }


                }).catch(err => { console.log(err)
                    self.setState({result : 1 , errorMessage:"server Error, Please Try Again Later!"})  
                });

            } else {
                console.log("timeout prblm ")
                self.setState({result : 1 ,  errorMessage:"server Error, Please Try Again Later!"})  

            }
        }).catch(err => { console.log(err)
            self.setState({result : 1 , errorMessage:"server Timeout Error, Please Try Again Later!"})  
        });

    }

    isVendor (publickey ){
        let data={

            "address":publickey,
         
        }
        const self=this;
        self.setState({publickey:publickey})
        fetch(urlBlockchaine +'api/isVendorFunction', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(data),
            timeout: 9000
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                    if (text ==="true" ){
                        self.setState({result : 1 , successMessage:'Your current Role is vendor' , role:"vendor"}) 
                        
                    }else if (JSON.parse(text).err !==undefined){
                        self.setState({result : 1 , error:1 , errorMessage:"server Error, Please Try Again Later!"})  
                    
                    }else{

                        self.setState({result : 1 ,  errorMessage:"you are not authorised to access this application!"})  
                    }


                }).catch(err => { console.log(err)
                    self.setState({result : 1 ,  errorMessage:"server Error, Please Try Again Later!"})  
                });

            } else {
                self.setState({result : 1 , errorMessage:"server Error, Please Try Again Later!"})  

            }
      }).catch(err => { console.log(err)
            self.setState({result : 1 , errorMessage:"server Timeout Error, Please Try Again Later!"})  
        });


    }


 getUserByPrivateKey(privateKey){

    const self=this;
    fetch(urlBackEnd +'member/getUserByPrivateKey?privateKey=' + privateKey, {
        method: "GET"

    })

        .then(function (response) {
            if (response.ok) {
                response.json().then(function (json) {
                    let member =json[0];

                    console.log("aaaaa "+JSON.stringify(member))
                     if (json.length ===0){
              
                        self.setState({result : 1 , errorMessage:"Invalid PrivateKey , please verify your informations!"})  
                     }
                    
                     else{

                        AsyncStorage.setItem("connectedMember",JSON.stringify(member))

                        AsyncStorage.setItem("connectedPrivatekey",privateKey)
                     
                        console.log("member.role"+member.role)
                     
                      
                        if (member.role ==='ngo' ){
                            self.isNgo(member.publickey)
                        }
                        else if (member.role ==='vendeur'){
                          self.isVendor(member.publickey)
                       }
                       else if (member.role ==='vaccinTeam'){
                           self.isVaccinTeam(member.publickey)
                       }
                       else{
                        self.setState({result : 1 , errorMessage:"you are not authorised to access this application!"})  
                       }
                     }
                }).catch(err => {
                    self.setState({result : 1 ,  errorMessage:'server error , Please Try Later!'})   
                });

            } else {
                self.setState({result : 1 , errorMessage:'server error , Please Try Later!'})  
            }
     }).catch(err => { console.log(err)
            self.setState({result : 1 , errorMessage:"server Error, Please Try Again Later!"})  
        });



 }



  navigateToTransactionPage(){
      let self=this;
     let {publickey}=this.state
     this.props.navigation.navigate('TransactionPage',{publickey:publickey})
    console.log('heerrrree'+publickey)

 } 

 navigateToScanPage(){

    let {role}=this.state
    //alert(role)
     if(role==="Vendeur"){
    this.props.navigation.navigate('Menu')
     }else {
        this.props.navigation.navigate('WelcomePage')
     }

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
               

                   {this.state.result === undefined &&  <UIActivityIndicator color='white' marginTop='15%' /> }

                   
                            {this.state.successMessage !==  undefined &&

                            <View >


                                <Text style={{  marginTop: '5%', marginLeft: '2%',
                                        color: '#FFF', fontSize: 20, textAlign: 'center' } }>
                                            Your Public Key is:  
                                       
                                            
                                    </Text> 
                                    <Text style={{  marginTop: '0%', marginLeft: '2%', 
                                    color: '#FFF', fontSize: 15, textAlign: 'center', fontWeight: 'bold' } }>
                                    
                                    {this.state.publickey}
                                  </Text> 
                                  
                                <View  style={styles.box} >
                                <View style={styles.svg}><Success/></View>
                                <Text style={styles.successtext}>SUCCESS</Text>
                                <Text style={styles.paragraph} > {this.state.successMessage} </Text>
                                <Text style={styles.link}  onPress={() => { this.props.navigation.navigate('TransactionPage' , {publickey:this.state.publickey})  }} > View your Transactions </Text>

                            </View>

                          
                                
                            </View> }


                            {this.state.errorMessage !== undefined   &&
                                <View  style={styles.box} >

                                <View style={styles.svg}><Error/></View>
                            
                                <Text style={styles.errortext}>ERROR</Text>
                                <Text style={styles.paragraph} >  {this.state.errorMessage}</Text>
                                </View>  }
                
                   
     
                   </View> 
                   
                    

                <View style={styles.footer}>

                    
                {this.state.errorMessage !== undefined   &&  <TouchableOpacity onPress={() => { this.props.navigation.navigate('WelcomeToApp')}}
                                    style={{
                                        marginTop: '0%', marginLeft: '0%',
                                        backgroundColor: "#2b2343", width: "50%", height: "40%",
                                        borderRadius: 20, justifyContent:'center'
                                    }}>

                                
                                    <Text style={{
                                        marginTop: '0%', marginLeft: '0%',
                                        color: '#FFF', fontSize: 16, textAlign: 'center'
                                    }}>
                                        Scan QrCode 
                                </Text>
                  </TouchableOpacity> }
                  {this.state.successMessage !==  undefined &&     <TouchableOpacity onPress={() => {this.navigateToScanPage()}} 
                              style={{
                                marginTop: '0%', marginLeft: '0%',
                                backgroundColor: "#2b2343", width: "50%", height: "40%",
                                borderRadius: 20, justifyContent:'center'
                            }}>

                        
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%',
                                color: '#FFF', fontSize: 16, textAlign: 'center'
                            }}>
                                        Next 
                                </Text>
                    </TouchableOpacity> }


       
                    
                
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

    link:{
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#A52A2A' ,
        textDecorationLine: 'underline',  
    },
    footer: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
       // backgroundColor: "red"
    },
    svg:{
        marginBottom: '2%',
        marginTop: '1%',
        //backgroundColor:"green",
        //height:"40%"
       
     
    },

    logout:{
        marginRight: '0%',
        marginLeft: "43%",
        marginTop: '5%',
    },
    box: {
        justifyContent:'center',
        height: '60%',
        width:"80%",
        backgroundColor: 'white',
        alignItems:'center',
        marginTop:'10%',
      marginLeft: '10%'


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

export default LoadingPage;