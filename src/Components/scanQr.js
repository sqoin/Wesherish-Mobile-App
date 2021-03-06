import React, { Component } from 'react';
import {
    View, Text,
    TouchableOpacity, Button, StyleSheet,AsyncStorage
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Logout from '../SVG/logout';



class scanQr extends Component {


    onSuccess = (e) => {
        this.props.navigation.navigate('finalProcess',{privateKey: e.data})
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
                            marginTop: '5%', marginLeft: '30%', fontWeight: 'bold',
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
                    <QRCodeScanner
                        onRead={this.onSuccess.bind()}
                        containerStyle={{ marginTop: 0 }}
                        cameraStyle={{
                            height: 200, marginTop: 0, width: 220,
                            alignSelf: 'center', justifyContent: 'center'
                        }}
                    />

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
    logout:{
        marginRight: '0%',
        marginLeft: "43%",
        marginTop: '5%',
    },

});

export default scanQr ;
