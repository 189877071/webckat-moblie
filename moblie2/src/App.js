import React, { Component } from 'react'

import { View, Text, StatusBar } from 'react-native'

import { createStore, applyMiddleware, combineReducers } from 'redux'

import { Provider } from 'react-redux'

import reduxThunk from 'redux-thunk'

import reducers from './reducers'

import Login from './containers/Login'

const newReducers = combineReducers(reducers);

const newCreateStore = applyMiddleware(reduxThunk)(createStore);

const store = newCreateStore(newReducers);



class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <View>
                    {/* <StatusBar backgroundColor='#475061'></StatusBar> */}
                    <Login />
                </View>
            </Provider>
        )
    }
}

export default App;