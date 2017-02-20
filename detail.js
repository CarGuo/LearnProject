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

import { NativeModules } from 'react-native';
const { DetailModule } = NativeModules;

export default class detail extends Component {
    constructor(props) {
        super(props);
        //设置state
        this.state = {
            text1: 'detail, default  text 1',
            text2: 'detail, default  text 2',
            text3: 'detail, default  text 3',
            text4: 'detail, default  text 4',
        }
    }

    componentDidMount(){   //这是React的生命周期函数，会在界面加载完成后执行一次
        DetailModule.getDataFromIntent(
            (successMsg) =>{
                this.setState({text1: successMsg,}); //状态改变的话重新绘制界面
            },
            (errorMsg) => {alert(errorMsg)}
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>{this.state.text1}</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>{this.state.text2}</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>{this.state.text2}</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>{this.state.text4}</Text>
                </View>
            </View>);

    }
}
AppRegistry.registerComponent('detail', () => detail);