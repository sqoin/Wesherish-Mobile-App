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
                                 Balance 
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