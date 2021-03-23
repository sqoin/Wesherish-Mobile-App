import React, { Component } from 'react';
import {
    View, TextInput, Text, ScrollView,
    TouchableOpacity, Button, StyleSheet, ImageBackground, AsyncStorage, Image
} from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { DataTable } from 'react-native-paper';
import Logout from '../SVG/logout';
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
            dataUser: [],
            busy: true,

            HeadTable: ['To', 'From', 'Type', 'Value', 'Date'],


        }



    };

    transactions = []


    componentDidMount = () => {


console.log("publiccc =< "+this.state.publickey)
        this.getAllUsersAndPublicKeys();

    }


    componentWillUnmount() {

    }



    Logout() {
        AsyncStorage.clear()
        this.props.navigation.navigate('WelcomeToApp')
    }



    getTime(unixtime) {

        var u = new Date(unixtime * 1000);

        return  ('0' + u.getUTCDate()).slice(-2) +
            '-' + ('0' + u.getUTCMonth()).slice(-2) +
            '-'+u.getUTCFullYear() +
            ' ' + ('0' + u.getUTCHours()).slice(-2) +
            ':' + ('0' + u.getUTCMinutes()).slice(-2) 
           
    };


    getAllUsersAndPublicKeys() {
        const self = this;
        fetch(urlBackEnd + 'member/getAllUsersAndPublicKeys', {
            method: "GET"
        })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (usersList) {


                        self.transactiontabledonation(self.state.publickey, usersList);
                        self.transactiontablevaccin(self.state.publickey, usersList);
                    }).catch(err => {

                    });

                } else {

                }
            });


    }
    
    transactiontablevaccin(from, usersList) {

        var ret = [];
        let self = this;
        fetch('https://graph.sqoin.us/subgraphs/name/Wesharish/Wesharishtokenvaccine', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "query": "{transactions(where:{from:"+'\"'+from+'\"'+"}){id from to value type status timestamp}}" })
            //transactions(where:{from:"+'\"'+from+'\"'+"})

        })

            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        console.log("dattttta =< "+JSON.stringify(data))
                        data.data.transactions.map(tr => {
                            usersList.map(user => {
                                tr.from = (user.publickey ? user.publickey.toLowerCase() : "") == tr.from.toLowerCase() ? user.firstname + " " + user.lastname : tr.from
                                tr.to = (user.publickey ? user.publickey.toLowerCase() : "") == tr.to.toLowerCase() ? user.firstname + " " + user.lastname : tr.to
                            })
                            var list = [tr.to, tr.from, tr.type, tr.value, self.getTime(tr.timestamp)]
                            self.transactions.push(list)
                            var list1 = ['','', '', '', '']
                                self.transactions.push(list1)
                            self.setState({ busy: false })


                        })
                        self.setState({ busy: false })

                    }).catch(err => {
                        self.setState({ message: 'Non!' })
                    });
                } else {

                    self.setState({ serverMessage: "error on shared data" })
                }
            });
    }





    transactiontabledonation(from, usersList) {

        var ret = [];
        let self = this;
        fetch('https://graph.sqoin.us/subgraphs/name/Wesharish/Wesharishtokendonation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "query": "{transactions(where:{from:"+'\"'+from+'\"'+"}){id from to value type status timestamp}}" })
            //transactions(where:{from:"+'\"'+from+'\"'+"})

        })

            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("dattttta Donation=< "+JSON.stringify(data))
                        if (data) {
                            data.data.transactions.map(tr => {
                                usersList.map(user => {
                                    tr.from = (user.publickey ? user.publickey.toLowerCase() : "") == tr.from.toLowerCase() ? user.firstname + " " + user.lastname : tr.from
                                    tr.to = (user.publickey ? user.publickey.toLowerCase() : "") == tr.to.toLowerCase() ? user.firstname + " " + user.lastname : tr.to
                                })
                                var list = [tr.to, tr.from, tr.type, tr.value, self.getTime(tr.timestamp)]
                                var list1 = ['','', '', '', '']
                                self.transactions.push(list1)
                                self.transactions.push(list)
                                self.setState({ busy: false })
                            })



                        }
                        self.setState({ busy: false })


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
                    <TouchableOpacity
                          style ={styles.logout}
                                onPress={() => { this.Logout()  }}>
                                 <Logout  onPress={() => { this.Logout()  }} />

                     </TouchableOpacity>
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





                    <View >

                        {this.state.error === 1 &&
                            <Text style={{
                                marginTop: '0%', marginLeft: '2%',
                                color: '#FFF', fontSize: 26, textAlign: 'center'
                            }}>

                                {this.state.errorMessage}
                            </Text>}

                        {this.state.error === 0 &&
                            <Text style={{
                                marginTop: '-10%', marginLeft: '2%',
                                color: '#FFF', fontSize: 26, textAlign: 'center'
                            }}> Transactions List </Text>}

                    </View>


                    {this.state.busy ?
                        (<UIActivityIndicator color='white' marginTop='25%' />)
                        :
                        (<Table borderStyle={{ borderWidth: 0 }} style={{ marginTop: '10%', }}>
                            <Row data={this.state.HeadTable} style={styles.HeadStyle} style={{ backgroundColor: '#FEF5E7' }} textStyle={{ color: '#17202A', textAlign: 'center' }} />
                            <ScrollView style={{ height: 500 }} vertical={true}>
                                <Rows data={this.transactions} style={{ backgroundColor: '#2b2343' }} textStyle={{ color: '#FFF', textAlign: 'center' }} />
                            </ScrollView>
                        </Table>)

                    }



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
        marginLeft: "80%",
        marginTop: '5%',
    },


});

export default TransactionPage;