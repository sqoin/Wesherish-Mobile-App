import React, { Component } from 'react';
import {
    View, TextInput, Text, ScrollView,
    TouchableOpacity, Button, StyleSheet, ImageBackground, AsyncStorage, Image
} from 'react-native';

import { color } from 'react-native-reanimated';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


import { urlBlockchaine, urlBackEnd } from '../../utils'
class TransactionPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            publickey: this.props.route.params.publickey ? this.props.route.params.publickey : "",
            //publickey : undefined , 
            error: 0,
            successMessage: 0,
            result: undefined,
            errorMessage: undefined,
            role: undefined,


            HeadTable: ['To', 'From', 'Type', 'Value', 'Date'],
            DataTable: [

            ]


        }
    };

    componentDidMount = () => {

        /*     AsyncStorage.getItem("connectedMember",(err,data)=>{
                if(err){
                    return;
                }
            
                this.setState({roleConnectedUser:JSON.parse(data).role})
                console.log("role user => "+JSON.parse(data).role)  
            })
     */


        console.log('heereee' + this.state.publickey)
        this.transactiontabledonation(this.state.publickey);
        this.transactiontablevaccin(this.state.publickey);

    }


    componentWillUnmount() {

    }



    Logout() {
        AsyncStorage.clear()
        this.props.navigation.navigate('WelcomeToApp')
    }



    getTime(unixtime) {

        var u = new Date(unixtime * 1000);

        return u.getUTCFullYear() +
            '-' + ('0' + u.getUTCMonth()).slice(-2) +
            '-' + ('0' + u.getUTCDate()).slice(-2) +
            ' ' + ('0' + u.getUTCHours()).slice(-2) +
            ':' + ('0' + u.getUTCMinutes()).slice(-2) +
            ':' + ('0' + u.getUTCSeconds()).slice(-2) +
            '.' + (u.getUTCMilliseconds() / 1000).toFixed(2).slice(2, 5)
    };


    transactiontablevaccin(from) {

        //form
        var ret = [];


        let self = this;
        fetch('https://graph.sqoin.us/subgraphs/name/Wesharish/Wesharishtokenvaccine', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "query": "{transactions(where:{from:" + '\"' + from + '\"' + "}){id from to value type status timestamp}}" })
            //transactions(where:{from:"+'\"'+from+'\"'+"})

        })

            .then(function (response) {
                // console.log("response => "+JSON.stringify(response))
                if (response.ok) {
                    response.json().then(function (data) {
                        if (data) {
                            if (Array.isArray(data.data.transactions) && data.data.transactions.length > 0)
                        data.data.transactions.map(element => {
                            ret.push([element.from, element.to, element.type, element.value, self.getTime(element.timestamp)])
                        })
                        else {
                            self.setState({ result: 1, error: 1, errorMessage: "There is no transactions yet!Tapez un message" })

                        }}

                    }).catch(err => {

                        self.setState({ message: 'Non!' })
                    });
                } else {

                    self.setState({ serverMessage: "error on shared data" })
                }
            });
    }


    transactiontabledonation(from) {

        //form
        var ret = [];


        let self = this;
        fetch('https://graph.sqoin.us/subgraphs/name/Wesharish/Wesharishtokendonation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "query": "{transactions(where:{from:" + '\"' + from + '\"' + "}){id from to value type status timestamp}}" })
            //transactions(where:{from:"+'\"'+from+'\"'+"})

        })

            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        if (data) {
                            if (Array.isArray(data.data.transactions) && data.data.transactions.length > 0)
                                data.data.transactions.map(element => {
                                    ret.push([element.from, element.to, element.type, element.value, self.getTime(element.timestamp)])
                                })
                            else {
                                self.setState({ result: 1, error: 1, errorMessage: "There is no transactions yet!Tapez un message" })

                            }
                        }

                        self.setState({ DataTable: ret }, () => {
                            console.log(JSON.stringify(self.state.DataTable))

                        })

                    }).catch(err => {

                        self.setState({ message: 'Non!' })
                    });
                } else {

                    self.setState({ serverMessage: "error on shared data" })
                }
            });
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
                            backgroundColor: "#2b2343", borderRadius: 5
                        }}

                        >
                            <Button

                                color="#2b2343"
                                style={{ width: 70 }}
                                title='Log out'
                                onPress={() => { this.Logout() }}>
                            </Button>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            marginTop: '5%', marginLeft: '37%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>

                        </Text>
                        <TouchableOpacity style={{
                            marginRight: '0%',
                            marginLeft: "-32%",
                            marginTop: '-10%',
                        }}
                            onPress={() => { this.props.navigation.navigate('LoadingPage') }}
                        >
                            <ImageBackground

                                source={require('../assetes/back.png')}
                                style={{
                                    width: 30, height: 30,

                                }}
                            ></ImageBackground>
                        </TouchableOpacity>


                    </View>
                </View>
                <View style={styles.body}>


                    { this.state.error === 0 &&
                    <view>
                     <Text style={{
                        marginTop: '0%', marginLeft: '2%',
                        color: '#FFF', fontSize: 26, textAlign: 'center'
                    }}>

                        You are welcome
                            </Text>
                        <Table borderStyle={{ borderWidth: 0 }} style={{ marginTop: '10%', }}>
                            <Row data={this.state.HeadTable} style={styles.HeadStyle} style={{ backgroundColor: '#FEF5E7' }} textStyle={{ color: '#17202A', textAlign: 'center' }} />
                            <ScrollView style={{ height: 500 }} vertical={true}>
                                <Rows data={this.state.DataTable} style={{ backgroundColor: '#2b2343' }} textStyle={{ color: '#FFF', textAlign: 'center' }} />
                            </ScrollView>
                        </Table></view>}


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

export default TransactionPage;