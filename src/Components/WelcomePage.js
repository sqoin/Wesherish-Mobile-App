import React, { Component } from 'react';
import {
    View, Text,
    TouchableOpacity, Button, StyleSheet,AsyncStorage,Image
} from 'react-native';
import Logout from '../SVG/logout';

class WelcomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {

            roleConnectedUser:''
      

        }
    };

    componentDidMount = () => {

        AsyncStorage.getItem("connectedMember",(err,data)=>{
            if(err){
                return;
            }
        
            this.setState({roleConnectedUser:JSON.parse(data).role})
            console.log("role user => "+JSON.parse(data).role)
                
    
              
            })


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
               
                <View style={{marginTop: '0%'}}>
                {this.state.roleConnectedUser === 'ngo' &&  <Text style={{  marginTop: '0%', marginLeft: '2%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                               As first step , you have to scan the vendor QrCode
                     </Text> } 

                {this.state.roleConnectedUser === 'vaccinTeam' &&  <Text style={{  marginTop: '0%', marginLeft: '2%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                As first step , you have to scan the beneficiary QrCode
                     </Text> } 
                     
                     <Image source={require('../assetes/image.png')}
                          style={{width: 400, height: 400,marginRight: '1%',
                          marginLeft: "1%"}} />

                   </View>
               
                  

                       <TouchableOpacity onPress={() => { this.props.navigation.navigate('scanQr') }}
                        style={{
                            marginTop: '1%', marginLeft: '0%', flexDirection: "row",
                            backgroundColor: "#2b2343", width: "100%", height: "15%",
                            borderRadius: 5
                        }}>

                    
                        <Text style={{
                            marginTop: '5%', marginLeft: '40%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                           Next step
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
    },
    body: {
        flex: 4,

    },
    footer: {
        flex: 1,
    },
    logout:{
        marginRight: '0%',
        marginLeft: "43%",
        marginTop: '5%',
    },

});

export default WelcomePage;