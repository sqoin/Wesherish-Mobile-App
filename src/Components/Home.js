import React from 'react';

import { View, Button, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: "#fff",
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '10%',
        // marginTop:"25%" // is 50% of container width
    }
});
function Home(props) {
    return (
        <View style={styles.container}>

            <View style={{ marginLeft: "30%", marginTop: "10%", flexDirection: 'column' }}>
                <Button style={styles.item} title="testPage" onPress={() => props.navigation.navigate('testPage')}></Button>
                {/* <Button style={styles.item} title="Login" onPress={() => props.navigation.navigate('Login')}></Button> */}
                <Button style={styles.item} title="Menu" onPress={() => props.navigation.navigate('Menu')}></Button>
                <Button style={styles.item} title="LoginQR" onPress={() => props.navigation.navigate('LoginQR')}></Button>
                <Button style={styles.item} title="VaccinTeamInterface" onPress={() => props.navigation.navigate('VaccinTeamInterface')}></Button>
                {/* <Button style={styles.item} title="ScanQRPage" onPress={() => props.navigation.navigate('WeCoin')}></Button> */}
                <Button style={styles.item} title="ValideMontant" onPress={() => props.navigation.navigate('ValideMontant')}></Button>
                <Button style={styles.item} title="NgoInterface" onPress={() => props.navigation.navigate('NgoInterface')}></Button>
                <Button style={styles.item} title="WelcomeVaccin" onPress={() => props.navigation.navigate('WelcomeVaccin')}></Button>
                <Button style={styles.item} title="WelcomeNgo" onPress={() => props.navigation.navigate('WelcomeNgo')}></Button>
                <Button style={styles.item} title="WelcomeToApp" onPress={() => props.navigation.navigate('WelcomeToApp')}></Button>
                <Button style={styles.item} title="DouzeMots" onPress={() => props.navigation.navigate('DouzeMots')}></Button>
                <Button style={styles.item} title="LoadingPage" onPress={() => props.navigation.navigate('LoadingPage')}></Button>
                <Button style={styles.item} title="Loadingvaccin" onPress={() => props.navigation.navigate('Loadingvaccin')}></Button>  
                <Button style={styles.item} title="ConfirmationNgo" onPress={() => props.navigation.navigate('ConfirmationNgo')}></Button>
                <Button style={styles.item} title="InvalidAdress" onPress={() => props.navigation.navigate('InvalidAdress')}></Button>
                <Button style={styles.item} title="TransactionPage" onPress={() => props.navigation.navigate('TransactionPage')}></Button>
            </View>




        </View>
    );
}
export default Home;