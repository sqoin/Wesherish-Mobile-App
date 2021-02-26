import React, { Component } from 'react';
import {
    View, TextInput, Text,Platform,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage,Image
} from 'react-native';

import {urlBlockchaine , urlBackEnd} from '../../utils'
class WelcomeToApp extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    };

    componentDidMount = () => {

    }


    componentWillUnmount() {

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
                       {/* <Button

                             color="#2b2343"
                             style={{width: 70 }}
                             title='Log out'
                             onPress={() => { this.props.navigation.navigate('LoginQR') }}>
                        </Button> */}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
           
            <View style={{marginTop: '0%'}}>
               
                 
                 <Image source={require('../assetes/Logo.png')}
                      style={{width: 400, height: 400,marginRight: '1%',
                      marginLeft: "1%",marginTop: '10%'}} />
                 <Text style={{  marginTop: '0%', marginLeft: '30%',
                        color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                         
                 </Text>
               </View>


                   <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginQR') }}
                    style={{
                        marginTop: '0%', marginLeft: '5%', flexDirection: "row",
                        backgroundColor: "#2b2343", width: "40%", height: "10%",
                        borderRadius: 20
                    }}>

                
                    <Text style={{
                        marginTop: '7%', marginLeft: '30%',
                        color: '#FFF', fontSize: 16, textAlign: 'center'
                    }}>
                        Scan QR
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('DouzeMots') }}
                    style={{
                        marginTop: '-12%', marginLeft: '55%', flexDirection: "row",
                        backgroundColor: "#2b2343", width: "40%", height: "10%",
                        borderRadius: 20
                    }}>

                
                    <Text style={{
                        marginTop: '7%', marginLeft: '39%',
                        color: '#FFF', fontSize: 16, textAlign: 'center'
                    }}>
                       Login
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

export default WelcomeToApp;