import React, { Component } from 'react'

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

import { connect } from 'react-redux'

import {} from '../config'

import Logo from '../compontents/Logo'

import LoginInput from '../compontents/LoginInput'

import Icons from '../Iconfont'

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    box: {
        position: 'relative'
    },
    img: {
        position: 'absolute',
        width,
        height,
        zIndex: -1
    }
})

class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // iconName, placeholder, password
        return (
            <View style={styles.box}>
                <Image style={styles.img} source={require('../assets/image/bg1.jpg')} />
                <Logo />
                <LoginInput iconname='icon-xingming' placeholder='用户名/邮箱' />
                <LoginInput iconname='icon-password' placeholder='密码' password={true} />
            </View>
        )
    }
}

export default connect((state, props) => {
    return {}
})(Login);