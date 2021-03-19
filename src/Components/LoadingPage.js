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
 

  import {urlBlockchaine , urlBackEnd} from '../../utils'
class LoadingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            privateKey:this.props.route.params.privateKey ? this.props.route.params.privateKey : "",
            publickey : undefined , 
            error :  0 ,
            successMessage: 0,
            result : undefined,
            errorMessage : undefined,
            role:undefined,


      HeadTable: ['to', 'from', 'type', 'value', 'data'],
      DataTable: [
       
      ]
     

        }
    };

    componentDidMount = () => {



        //callback
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
            body: JSON.stringify(data)
    
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                console.log("la reponse => "+text)
                    if (text ==="true"){

                        self.setState({result : 1 , successMessage:1 , role:"Ngo"})  
                      
                    }
                    else{
                        self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  
                    }
                }).catch(err => { console.log(err)
                    self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  
                });

            } else {
             
                self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  

            }
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
            body: JSON.stringify(data)
    
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                    console.log("la reponse => "+text)
                   if (text ==="true"){
                    self.setState({result : 1 , successMessage:1 , role:"VaccinTeam"}) 

                    }else{
                    
                              self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  
                        }


                }).catch(err => { console.log(err)
                    self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  
                });

            } else {
                console.log('Network request for backoffice failed with response ' + response.status);
                self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  

            }
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
            body: JSON.stringify(data)
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(function (text) {
                    if (text ==="true" ){
                        self.setState({result : 1 , successMessage:1 , role:"Vendeur"}) 
                    
                    }else{

                        self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  
                    }


                }).catch(err => { console.log(err)
                    self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  
                });

            } else {
                self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  

            }
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
                     if (json.length ===0){

                        alert("herreeee ")
                        self.setState({result : 1 , error:1 , errorMessage:"You are not a member on this community! verify your informations "})  
                     }
                    
                     else{

                        AsyncStorage.setItem("connectedMember",JSON.stringify(member))

                        //AsyncStorage.getItem("connectedMember")
                        AsyncStorage.setItem("connectedPrivatekey",privateKey)
                     
                     
                      
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
                        self.setState({result : 1 , error:1 , errorMessage:"You don't have the right to access to this app!"})  
                       }
                     }
                }).catch(err => {
                    self.setState({result : 1 , error:1 , errorMessage:'server error , Please Try Later!'})   
                });

            } else {
                self.setState({result : 1 , error:1, errorMessage:'server error , Please Try Later!'})  
            }
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
                                 onPress={() => {this.Logout() }}>
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
               

                   {this.state.result === undefined &&  <UIActivityIndicator color='white' marginTop='25%' /> }

                    {this.state.error ===  1 && this.state.successMessage ===0 &&

                                <View style={{marginTop: '0%'}}> 
                                <Text style={{  marginTop: '0%', marginLeft: '2%',
                                color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                {this.state.errorMessage}
                                </Text> 
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginQR')}}
                                    style={{
                                        marginTop: '70%', marginLeft: '0%', flexDirection: "row",
                                        backgroundColor: "#2b2343", width: "100%", height: "15%",
                                        borderRadius: 20
                                    }}>

                                
                                    <Text style={{
                                        marginTop: '5%', marginLeft: '35%',
                                        color: '#FFF', fontSize: 16, textAlign: 'center'
                                    }}>
                                        Scan Again 
                                </Text>
                                </TouchableOpacity> 

                                </View> 
                            
                            }

                            {this.state.successMessage ===  1 && this.state.error ===  0 &&

                            <View >


                                    <Text style={{  marginTop: '0%', marginLeft: '2%',
                                    color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                    
                                        You are welcome 
                                    </Text> 
                                    <Text style={{  marginTop: '0%', marginLeft: '2%',
                                    color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                    
                                    {this.state.role}
                                    </Text>

                                <Text style={{  marginTop: '0%', marginLeft: '2%',
                                        color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                            Your Public Key: 
                                       
                                            
                                    </Text> 
                                    <Text style={{  marginTop: '0%', marginLeft: '2%',
                                    color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                    
                                    {this.state.publickey}
                                    </Text> 
                                    <Text style={{  marginTop: '0%', marginLeft: '2%',
                                    color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                    
                                 {/*    { this.props.navigation.navigate('TransactionPage',{publickey: publickey})} */}
                                    </Text> 


                                 <TouchableOpacity onPress={() => {this.navigateToScanPage()}} 
                              
                                    style={{
                                        marginTop: '30%', marginLeft: '0%', flexDirection: "row",
                                        backgroundColor: "#2b2343", width: "100%", height: "12%",
                                        borderRadius: 20
                                    }}>

                                
                                    <Text style={{
                                        marginTop: '5%', marginLeft: '45%',
                                        color: '#FFF', fontSize: 16, textAlign: 'center'
                                    }}>
                                        Next 
                                </Text>
                                </TouchableOpacity> 
                                <TouchableOpacity onPress={() => {this.navigateToTransactionPage()}} 
                              
                              style={{
                                  marginTop: '5%', marginLeft: '0%', flexDirection: "row",
                                  backgroundColor: "#2b2343", width: "100%", height: "12%",
                                  borderRadius: 20
                              }}>

                          
                              <Text style={{
                                  marginTop: '5%', marginLeft: '37%',
                                  color: '#FFF', fontSize: 16, textAlign: 'center'
                              }}>
                                  History transaction
                          </Text>
                          </TouchableOpacity> 

                            </View> }
                           
                   
     
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

export default LoadingPage;