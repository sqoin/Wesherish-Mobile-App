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
class LoadingNgo extends Component {

    constructor(props) {
        super(props)
        this.state = {
          publickey:this.props.route.params.publickey ? this.props.route.params.publickey : "",
     

        }
    };

    componentDidMount = () => {


    }


    componentWillUnmount() {
        this.setState({ scanned: e.data });
     

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
                                 onPress={() => { this.props.navigation.navigate('LoginQR') }}>
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
               
                <View style={{marginTop: '0%'}}>
                   <Text style={{  marginTop: '0%', marginLeft: '2%',
                            color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                                Votre Public key Ngo : 

                              
                     </Text> 
                     <Text style={{  marginTop: '0%', marginLeft: '2%',
                        color: '#FFF', fontSize: 26, textAlign: 'center' } }>
                        {this.state.publickey}

                          
                 </Text> 
              
           

                     <UIActivityIndicator color='white' marginTop='85%' />

                   </View>
               
                  

                       <TouchableOpacity onPress={() => { this.props.navigation.navigate('WelcomeNgo') }}
                        style={{
                            marginTop: '70%', marginLeft: '0%', flexDirection: "row",
                            backgroundColor: "#2b2343", width: "100%", height: "15%",
                            borderRadius: 20
                        }}>

                    
                        <Text style={{
                            marginTop: '5%', marginLeft: '35%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                           Scanner Votre QR
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

export default LoadingNgo;