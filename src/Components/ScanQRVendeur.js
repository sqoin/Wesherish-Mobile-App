import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanQRVendeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scannded: "",
           
        }
    };

    componentDidMount = () => {

    }


    componentWillUnmount() {

    }

    onSuccess = (e) => {
        this.setState({ scanned: e.data });
        console.log("-----------"+e.data);
        this.props.navigation.navigate('ValideMontant' ,  {userQRCode:''+e.data})
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
                            {/* QRCodeScanner */}
                    </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <QRCodeScanner
                        onRead={this.onSuccess}
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


});

export default ScanQRVendeur ;
