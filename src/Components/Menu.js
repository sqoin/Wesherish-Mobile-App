import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage
} from 'react-native';
import Close from '../SVG/Close'
import {urlBlockchaine , urlBackEnd} from '../../utils'

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            balance:0,
            serverMessage:''

        }
    };

    componentDidMount = () => {
        let self= this;

        AsyncStorage.getItem("connectedMember",(err,dataUser)=>{
            if(err){
                return;
            }
            
            AsyncStorage.getItem("connectedPrivatekey",(err,privatekey)=>{
                if(err){
                    return;
                }
            
                self.getBalance(JSON.parse(dataUser).publickey)
            })
        })
       

    }


    componentWillUnmount() {

   
    }


    //getBalnce
    getBalance(publickey){
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
        
             let balanceValue =  balance * 1000000000000000000
            self.setState({ balance:balanceValue}) 
            
            }).catch(err => { console.log(err) });
            
            } else {
        
            console.log('Network request for backoffice failed with response ' + response.status);
            
            
            }
            });
    }

    
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
               
                    <View style={{ marginTop: '5%', marginLeft: '3%', marginRight: "3%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%', fontWeight: 'bold',
                                color: '#ec6e5d', fontSize: 40, textAlign: 'center'
                            }}>
                                W
                    </Text>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%', fontWeight: 'bold',
                                color: '#F58720', fontSize: 40, textAlign: 'center'
                            }}>
                                S
                    </Text>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%', fontWeight: 'bold',
                                color: '#F58720', fontSize: 40, textAlign: 'center'
                            }}>
                                C
                    </Text>
                        </View>
                        <View style={{ marginTop: '3%', marginLeft: '30%', flexDirection: "column", justifyContent: 'center' }}>
                            <Text style={{
                                marginTop: '0%', marginLeft: '20%',
                                color: '#fff', fontSize: 14, textAlign: 'center'
                            }}>
                                 Capital total 
                    </Text>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%', fontWeight: 'bold',
                                color: '#fff', fontSize: 14, textAlign: 'center'
                            }}>
                               {this.state.balance} Wsh 

                                
                    </Text>

                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={{
                        marginTop: '0%', marginLeft: '0%',
                        backgroundColor: "#2c2444", width: "90%", height: "50%"
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <ImageBackground
                                //source={{ uri: this.state.companyLogo }}
                                source={require('../assetes/!.png')}
                                style={{
                                    width: 40, height: 40,
                                    // borderWidth: 1,
                                    //borderColor: 'black',
                                    marginRight: '0%',
                                    marginLeft: "1%",
                                    marginTop: '3%',
                                    //9borderWidth: 1
                                }}
                            ></ImageBackground>
                            <Text style={{
                                marginTop: '4%', marginLeft: '3%',
                                color: '#fff', fontSize: 20
                            }}>
                                Une action est requise
                    </Text>
                            <ImageBackground
                                //source={{ uri: this.state.companyLogo }}
                                source={require('../assetes/Xb.png')}
                                style={{
                                    width: 40, height: 40,
                                    // borderWidth: 1,
                                    //borderColor: 'black',
                                    marginRight: '0%',
                                    marginLeft: "15%",
                                    marginTop: '3%',
                                    //9borderWidth: 1
                                }}
                            ></ImageBackground>
                        </View>
                        <Text style={{
                            marginTop: '3%', marginLeft: '15%',
                            color: '#fff', fontSize: 16, width: "80%"
                        }}>
                            Paramétrez votre clé papier au cas où vouz perdriez ou
                            remplaceriez votre téléphone. Votre clé sera également requise si vous
                            modifiez les Paramétres de sécurite de votre téléphone.

                    </Text>
                        <TouchableOpacity
                        //onPress={() => { this.props.navigation.navigate('testPage') }}
                        >
                            <Text style={{
                                marginTop: '5%', marginLeft: '15%',
                                color: '#4e50a9', fontSize: 14
                            }}>
                                Continuer
                    </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('WeCoin') }}
                        style={{
                            marginTop: '5%', marginLeft: '0%', flexDirection: "row",
                            backgroundColor: "#F58720", width: "90%", height: "20%",
                            borderRadius: 5
                        }}>
                        <View style={styles.W_icon}>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%',
                                color: '#fff', fontSize: 20, fontWeight: 'bold'
                            }}>
                             W
                            </Text>
                        </View>
                        <View style={{ marginTop: '0%', marginLeft: '2%', flexDirection: "column", justifyContent: 'center' }}>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%',
                                color: '#fff', fontSize: 24
                            }}>
                                WesharishCoin
                    </Text>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%',
                                color: '#fff', fontSize: 14
                            }}>
                               {this.state.balance} Wsh
                    </Text>

                        </View>
                        <View style={{
                            marginTop: '0%', marginLeft: '10%',
                            flexDirection: "column", justifyContent: 'center'
                        }}>
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%',
                                color: '#fff', fontSize: 24
                            }}>
                                {/* 0,00 TND */}
                    </Text>
                            <Text style={{
                                marginTop: '0%', marginLeft: '35%',
                                color: '#fff', fontSize: 14
                            }}>
                                {/* 0 WSC */}
                    </Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>

                    <View style={{
                        marginTop: '0%', marginLeft: '0%', alignItems: "center",
                        flexDirection: "column", justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Settings') }}
                        >
                            <Text style={{
                                marginTop: '0%', marginLeft: '0%',
                                color: '#fff', fontSize: 24
                            }}>
                                ...
                    </Text>
                        </TouchableOpacity>
                        <Text style={{
                            marginTop: '0%', marginLeft: '0%',
                            color: '#fff', fontSize: 16
                        }}>
                            Menu
                    </Text>

                    </View>
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
        //justifyContent: "center",
        alignItems: "center",
        //marginTop: '10%',
        flex: 4,
        //backgroundColor: "#fff"

    },
    footer: {
        flex: 0.5,
        backgroundColor: "#332444",
        //backgroundColor: "red"
    },
    W_icon: {
        marginTop: "5%",
        marginLeft: "2%",
        height: 50,
        width: 50,  //The Width must be the same as the height
        borderRadius: 200,
        backgroundColor: '#f3960b',
        alignItems: "center",
        justifyContent: "center"

    }

});

export default Menu;