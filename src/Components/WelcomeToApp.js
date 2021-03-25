import React, { Component } from 'react';
import {
    View, Text,
    TouchableOpacity, StyleSheet,Image
} from 'react-native';

class WelcomeToApp extends Component {

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
                      
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
           
            <View style={{  alignItems: 'center'  }}>
               
                 
                 <Image source={require('../assetes/Logo.png')}
                      style={{width: 300, height: 300,
                      marginLeft: "0%",marginTop: '10%'  }} />
               
               </View>


                <View style={{   flexDirection: "row" , justifyContent:'center'}}>
                   <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginQR') }}
                    style={{
                        marginTop: '0%',   marginLeft: '0%', 
                        backgroundColor: "#2b2343", width: "40%", height: "40%", justifyContent:'center',
                        borderRadius: 20
                    }}>

                
                    <Text style={{ color: '#FFF', fontSize: 16, textAlign: 'center'}}>
                        Scan QR
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('DouzeMots') }}
                    style={{   marginLeft: '5%', 
                        backgroundColor: "#2b2343", width: "40%", height: "40%", justifyContent:'center',
                        borderRadius: 20
                    }}>

                
                    <Text style={{

                        color: '#FFF', fontSize: 16, textAlign: 'center'
                    }}>
                       Login
                </Text>
                </TouchableOpacity>
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
  
    body: {
        marginBottom: '40%',
        flex: 1,
        justifyContent:'center'
        //backgroundColor: "#fff"

    },
  


});

export default WelcomeToApp;