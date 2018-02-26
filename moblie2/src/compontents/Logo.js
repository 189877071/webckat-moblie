import React, { Component } from 'react'

import { View, Image, StyleSheet } from 'react-native'

import { r } from '../common'

const styles = StyleSheet.create({
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topImg: {
        width: r(450),
        height: r(450),
        marginTop: r(50)
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomImg: {
        width: r(374),
        height: r(121),
    }
})

class Logo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[styles.box]}>
                <View style={styles.top}>
                    <Image style={styles.topImg} source={require('../assets/image/logo-top.png')} />
                </View>
                <View style={styles.bottom}>
                    <Image style={styles.bottomImg} source={require('../assets/image/login-bottom.png')} />
                </View>
            </View>
        )
    }
}

export default Logo;