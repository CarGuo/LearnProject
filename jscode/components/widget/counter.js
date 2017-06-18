import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        padding: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    }
});

export default class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //这两个方法函数，是从父类传递进来的，父类从actions/counter.js获取到
        const {counter, increment, decrement} = this.props;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>redux test</Text>
                <Text>{counter}</Text>
                <TouchableOpacity onPress={increment} style={styles.button}>
                    <Text>up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={decrement} style={styles.button}>
                    <Text>down</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
