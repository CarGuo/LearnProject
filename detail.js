/**
 * Created by guoshuyu on 2017/2/20.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';

import styles from './jscode/style/styles'

export default class detail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>detail, default  text 1</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>detail, default  text 2</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>detail, default  text 3</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>detail, default  text 4</Text>
                </View>
            </View>);

    }
}
AppRegistry.registerComponent('detail', () => detail);