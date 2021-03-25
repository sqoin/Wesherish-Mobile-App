import React, { Component } from 'react';
import {
    View, TextInput, Text,
    TouchableOpacity, Button, StyleSheet, ImageBackground,AsyncStorage
} from 'react-native';

import {urlBlockchaine , urlBackEnd} from '../../utils'
class DouzeMots extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mots1:'',
            mots2:'',
            mots3:'',
            mots4:'',
            mots5:'',
            mots6:'',
            mots7:'',
            mots8:'',
            mots9:'',
            mots10:'',
            mots11:'',
            mots12:''

        }
    };



    componentWillUnmount() {

    }

    validate(){

            let self=this;
       

        let words = self.state.mots1 +' '+ self.state.mots2 +' '+ self.state.mots3 +' '+ self.state.mots4 
        +' '+ self.state.mots5 +' '+self.state.mots6 +' '+ self.state.mots7 +' '+ self.state.mots8 +' '+ self.state.mots9
        +' '+ self.state.mots10 +' '+self.state.mots11 +' '+ self.state.mots12;

        //let words = "victory cube buyer visual loan okay inmate used spawn measure palm weapon"
        let data={
            "mnemonic": words
        }
        fetch(urlBackEnd + 'wallet/getPrivateKeyFrom12Words', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(data)
            })
            
            .then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
                console.log("++++++++++++++++++2 "+JSON.stringify(data))
               // self.getUserByPrivateKey(data.privatekey)

                self.props.navigation.navigate('LoadingPage',{privateKey: data.privatekey})
                
            
            }).catch(err => { 
                console.log(err) 
            alert('Wrong words , Verify your information!')
            });
                      
            } else {
            console.log('Network request for backoffice failed with response ' + response.status);
            alert('Wrong words , Verify your information!')
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
                            marginLeft: "52%",
                            marginTop: '5%',
                        }}
                            onPress={() => { this.props.navigation.navigate('Menu') }}
                        >
                            <ImageBackground
                               
                                source={require('../assetes/x.png')}
                                style={{
                                    width: 30, height: 30,
                                   
                                }}
                            ></ImageBackground>
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
                            marginTop: '-6%',
                        }}
                            onPress={() => { this.props.navigation.navigate('WelcomeToApp') }}
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
               
               
                <View style={{ flexDirection: 'row', 
                            marginRight: '22%',
                            marginLeft: "12%",  marginTop: '10%',}}>
                <View style={{ marginTop: '0%'}}>
                <Text style={{
                            marginTop: '-15%', marginLeft: '10%', fontWeight: 'bold',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                        Please Enter your 12 words
                    </Text>
                        
                   </View>
                   
             </View>


             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '0%',}}>
              <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",marginRight: '22%',
                    marginLeft: "-10%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots1 :text})}/>
                   
                   <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots2 :text})}
                   />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '0%',}}>
              <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",marginRight: '22%',
                    marginLeft: "-10%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots3 :text})}/>
                   
                   <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots4 :text})}
                   />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '0%',}}>
              <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",marginRight: '22%',
                    marginLeft: "-10%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots5 :text})}/>
                   
                   <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots6 :text})}
                   />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '0%',}}>
              <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",marginRight: '22%',
                    marginLeft: "-10%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots7 :text})}/>
                   
                   <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots8 :text})}
                   />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '0%',}}>
              <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",marginRight: '22%',
                    marginLeft: "-10%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots9 :text})}/>
                   
                   <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots10 :text})}
                   />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginRight: '22%',
                            marginLeft: "22%",  marginTop: '0%',}}>
              <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",marginRight: '22%',
                    marginLeft: "-10%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots11 :text})}/>
                   
                   <TextInput
                    
                    label="Email"
                    style={{backgroundColor:'#FFF',width: "50%", height: "70%",
                    borderRadius: 8}}
                    onChangeText={(text) => this.setState({mots12 :text})}
                   />
        </View>
                   </View>

                <View style={styles.footer}>

       
                <View style={{ flexDirection: "row" }}>
                <TouchableOpacity 
                 disabled={!this.state.mots1 &&!this.state.mots2 &&!this.state.mots3 &&!this.state.mots4 &&!this.state.mots5
                    &&!this.state.mots6 &&!this.state.mots7
                    &&!this.state.mots8 &&!this.state.mots9 &&!this.state.mots10 
                    &&!this.state.mots11 &&!this.state.mots12
                     || this.state.executed }
                     onPress={() =>this.validate()}
                        style={{
                            marginTop: '6%', marginLeft: '16%', flexDirection: "row",
                            backgroundColor: "#2b2343", width: "70%", height: "70%",
                            borderRadius: 20,
                        }}>

                    
                        <Text style={{
                            marginTop: '3%', marginLeft: '40%',
                            color: '#FFF', fontSize: 20, textAlign: 'center'
                        }}>
                            Validate
                    </Text>
                    </TouchableOpacity>
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
        //marginTop: '10%',
        flex: 4,
        //backgroundColor: "#fff"

    },
    footer: {
        flex: 1,
        //backgroundColor: "red"
    },


});

export default DouzeMots;