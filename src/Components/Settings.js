import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground
} from 'react-native';


class testPage extends Component {

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
                            marginTop: '5%', marginLeft: '40%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                            Paramétres
                    </Text>
                        <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "24%",
                            marginTop: '5%',
                        }}
                            onPress={() => { this.props.navigation.navigate('Menu') }}
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
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('ScanQRVendeur') }}
                        style={{
                            marginTop: '0%', marginLeft: '0%', flexDirection: "row",
                            backgroundColor: "#2b2343", width: "100%", height: "15%",
                            borderRadius: 5
                        }}>

                        <ImageBackground
                            //source={{ uri: this.state.companyLogo }}
                            source={require('../assetes/Sc.png')}
                            style={{
                                width: 30, height: 30,
                                // borderWidth: 1,
                                //borderColor: 'black',
                                marginRight: '0%',
                                marginLeft: "5%",
                                marginTop: '4%',
                                //9borderWidth: 1
                            }}
                        ></ImageBackground>
                        <Text style={{
                            marginTop: '5%', marginLeft: '3%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                            Scanner le code QR
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('GeneratorQRCode') }}
                        style={{
                            marginTop: '1%', marginLeft: '0%', flexDirection: "row",
                            backgroundColor: "#2b2343", width: "100%", height: "15%",
                            borderRadius: 5
                        }}>

                        <ImageBackground
                            //source={{ uri: this.state.companyLogo }}
                            source={require('../assetes/Pr.png')}
                            style={{
                                width: 30, height: 30,
                                // borderWidth: 1,
                                //borderColor: 'black',
                                marginRight: '0%',
                                marginLeft: "5%",
                                marginTop: '4%',
                                //9borderWidth: 1
                            }}
                        ></ImageBackground>
                        <Text style={{
                            marginTop: '5%', marginLeft: '3%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                            Préférences
                    </Text>
                    </TouchableOpacity>
                    <View style={{
                        marginTop: '1%', marginLeft: '0%', flexDirection: "row",
                        backgroundColor: "#2b2343", width: "100%", height: "15%",
                        borderRadius: 5
                    }}>

                        <ImageBackground
                            //source={{ uri: this.state.companyLogo }}
                            source={require('../assetes/Ce.png')}
                            style={{
                                width: 30, height: 30,
                                // borderWidth: 1,
                                //borderColor: 'black',
                                marginRight: '0%',
                                marginLeft: "5%",
                                marginTop: '4%',
                                //9borderWidth: 1
                            }}
                        ></ImageBackground>
                        <Text style={{
                            marginTop: '5%', marginLeft: '3%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                            Center de sécurité
                    </Text>
                    </View>
                    <View style={{
                        marginTop: '1%', marginLeft: '0%', flexDirection: "row",
                        backgroundColor: "#2b2343", width: "100%", height: "15%",
                        borderRadius: 5
                    }}>

                        <ImageBackground
                            //source={{ uri: this.state.companyLogo }}
                            source={require('../assetes/A.png')}
                            style={{
                                width: 30, height: 30,
                                // borderWidth: 1,
                                //borderColor: 'black',
                                marginRight: '0%',
                                marginLeft: "5%",
                                marginTop: '4%',
                                //9borderWidth: 1
                            }}
                        ></ImageBackground>
                        <Text style={{
                            marginTop: '5%', marginLeft: '3%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                            A propos de
                    </Text>
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
        //backgroundColor: "#fff"

    },
    footer: {
        flex: 1,
        //backgroundColor: "red"
    },


});

export default testPage;