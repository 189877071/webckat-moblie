import React, { Component } from 'react'

import { View, Text, StyleSheet } from 'react-native'


import { BoxShadow, BorderShadow } from 'react-native-shadow'

const styles = StyleSheet.create({
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
});

export default class Dome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const shadowOpt = {
            width:150,
            height:150,
            color:"#000",
            border:10,
            radius:3,
            opacity:0.5,
            x:0,
            y:0,
            style:{marginVertical: 50}
        }
        return (
            <View style={styles.box}>
                <BoxShadow setting={shadowOpt}>
                </BoxShadow>
            </View>
        )
    }
}
