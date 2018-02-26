import React, { Component } from 'react'

import { TextInput, StyleSheet, View } from 'react-native'

import Icons from '../Iconfont'

import { r } from '../common'

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        height: r(120),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: r(52)
    },
    content: {
        width: r(921),
        flexDirection: 'row',
        height: r(120),
        borderBottomWidth: 1,
        borderBottomColor: '#627383',
    },
    icon: {
        width: r(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputView: {
        flex: 1
    },
    input: {
        fontSize: r(42),
        color: '#333',
    }
})

export default class LoginInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconColor: '#627383'
        }
    }
    fouch() {
        this.setState({ iconColor: '#394551' });
    }
    burl() {
        this.setState({ iconColor: '#627383' });
    }
    render() {
        const { iconname, placeholder, password } = this.props;
        return (
            <View style={styles.box}>
                <View style={styles.content}>
                    <View style={styles.icon}>
                        <Icons name={iconname} size={r(50)} color={this.state.iconColor} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='default'
                            maxLength={40}
                            placeholder={placeholder}
                            placeholderTextColor='#999'
                            secureTextEntry={false}
                            underlineColorAndroid='transparent'
                            secureTextEntry={!!password}
                            style={styles.input}
                            onFocus={() => this.fouch()}
                            onBlur={() => this.burl()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}