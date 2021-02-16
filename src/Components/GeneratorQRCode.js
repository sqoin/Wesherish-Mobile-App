import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground
} from 'react-native';
import QRCode from 'react-native-qrcode-generator';

class GeneratorGRCode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: 'react-native-qrcode-generator',
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
                            marginTop: '5%', marginLeft: '40%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                            QRCode
                    </Text>
                        <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "24%",
                            marginTop: '5%',
                        }}
                            onPress={() => { this.props.navigation.navigate('Settings') }}
                        >
                            <ImageBackground
                                //source={{ uri: this.state.companyLogo }}
                                source={require('../assetes/x.png')}
                                style={{
                                    width: 30, height: 30,
                                    // borderWidth: 1,
                                    //borderColor: 'black',

                                    //9borderWidth: 1
                                }}
                            ></ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>

                    <View style={styles.qr}>
                        <QRCode
                            value={this.state.text}
                            size={200}
                            bgColor='black'
                            fgColor='white' />
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
    header: {
        flex: 1,
        //backgroundColor: "red"
    },
    body: {
        //marginTop: '10%',
        flex: 4,
        justifyContent: "center",
        alignItems: "center"
        //backgroundColor: "#fff"

    },
    footer: {
        flex: 1,
        //backgroundColor: "red"
    },
    qr: {
        backgroundColor: "#fff",
        width: "52%",
        height: "50%",
        borderRadius: 17,
        justifyContent: "center",
        alignItems: "center"
        //paddingLeft: 8,
        //paddingTop: 12,
        //marginTop: "10%"
    }, view0: {
        //backgroundColor: "#fff",
        width: "60%",
        height: "47%",
        //paddingLeft: 12,
        //paddingTop: 13,
        //borderRadius: 15,
        //marginTop: "10%"
    },

});

export default GeneratorGRCode;