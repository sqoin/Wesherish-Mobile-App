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

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Menu') }}
                    >
                        <ImageBackground
                            //source={{ uri: this.state.companyLogo }}
                            source={require('../assetes/We.png')}
                            style={{
                                width: 390, height: 240,
                                // borderWidth: 1,
                                //borderColor: 'black',
                                marginRight: '0%',
                                marginLeft: "3%",
                                marginTop: '0%',
                                //9borderWidth: 1
                            }}
                        ></ImageBackground>
                    </TouchableOpacity>

                </View>
                <View style={styles.body}>


                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={{
                        backgroundColor: "#f9ac2d",
                        width: "25%",
                        height: "80%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: '0%',
                    }}
                    //onPress={() => { this.props.navigation.navigate('Menu') }}
                    >
                        <Text style={{
                            marginTop: '0%', marginLeft: '0%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                            envoyer
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#f9ac2d",
                        width: "25%",
                        height: "80%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: '3%',
                    }}
                    //onPress={() => { this.props.navigation.navigate('Menu') }}
                    >
                        <Text style={{
                            marginTop: '0%', marginLeft: '0%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                            Recevoir
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#f9ac2d",
                        width: "40%",
                        height: "80%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: '3%',
                    }}
                    //onPress={() => { this.props.navigation.navigate('Menu') }}
                    >
                        <Text style={{
                            marginTop: '0%', marginLeft: '0%',
                            color: '#FFF', fontSize: 16, textAlign: 'center'
                        }}>
                            Absorber QR Code
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        //backgroundColor: "black"
    },
    header: {
        flex: 2,
        backgroundColor: "#f39404"
    },
    body: {
        //marginTop: '10%',
        flex: 3,
        backgroundColor: "#fff"

    },
    footer: {
        flex: 0.5,
        backgroundColor: "#f39404",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },


});

export default testPage;