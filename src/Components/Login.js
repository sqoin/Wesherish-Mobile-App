import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground
} from 'react-native';


class testPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activationCode: null,
            showSubmitButton: false,
            isActivated: false
        }
    };

    componentDidMount = () => {

    }


    componentWillUnmount() {

    }

    _handleActivationCode = () => {
        if (this.state.activationCode === '1234') {
            this.props.navigation.navigate('Menu')
            this.setState({ showSubmitButton: false })
            //this.setState({isActivated: true})
        } else {
            this.setState({
                activationCode: null
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>

                </View>
                <View style={styles.body}>
                    <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                        <Text style={{
                            marginTop: '0%', marginLeft: '0%', fontWeight: 'bold',
                            color: '#ec6e5d', fontSize: 44, textAlign: 'center'
                        }}>
                            W
                    </Text>
                        <Text style={{
                            marginTop: '0%', marginLeft: '0%', fontWeight: 'bold',
                            color: '#F58720', fontSize: 44, textAlign: 'center'
                        }}>
                            S
                    </Text>
                        <Text style={{
                            marginTop: '0%', marginLeft: '0%', fontWeight: 'bold',
                            color: '#F58720', fontSize: 44, textAlign: 'center'
                        }}>
                            C
                    </Text>
                    </View>
                    <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="* * * *"
                            placeholderTextColor='#ec6e5d'
                            style={{ fontSize: 60 }}
                            onChangeText={value =>
                                this.setState({ activationCode: value }, () => {
                                    if (this.state.activationCode.length === 4) {
                                        this.setState({
                                            showSubmitButton: true
                                        })
                                    }
                                })
                            }
                        />

                        {this.state.showSubmitButton ? (
                            <TouchableOpacity onPress={this._handleActivationCode}
                                style={{
                                    backgroundColor: "#f9ac2d",
                                    width: "40%",
                                    height: "10%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: '3%',
                                }}
                            >
                                <Text style={{
                                    marginTop: '0%', marginLeft: '0%',
                                    color: '#FFF', fontSize: 18, textAlign: 'center'
                                }}>
                                    SUBMIT
                    </Text>
                            </TouchableOpacity>
                        ) : (<></>)}
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