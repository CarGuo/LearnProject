/**
 * Created by guoshuyu on 2017/3/14.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";
import styles from '../../style/styles'
import Icon, {Button} from 'react-native-vector-icons/FontAwesome'

export default class GridCount extends Component {

    render() {
        return (
            <Grid style={{height: 200}}>
                <Row>
                    <Col>
                        <View style={{flex: 1, backgroundColor:"yellow", justifyContent:'center', alignItems: 'center'}}>
                            <Button backgroundColor="#00000000" name={'music'} color={'#885ff3'}/>
                        </View>
                    </Col>
                    <Col>

                        <View style={{flex: 1, backgroundColor:"yellow", justifyContent:'center', alignItems: 'center'}}>
                            <Button backgroundColor="#00000000" name={'music'} color={'#885ff3'}/>
                        </View>
                    </Col>
                    <Col>

                        <View style={{flex: 1, backgroundColor:"yellow", justifyContent:'center', alignItems: 'center'}}>
                            <Button backgroundColor="#00000000" name={'music'} color={'#885ff3'}/>
                        </View>
                    </Col>
                </Row>
                <Row>
                </Row>

            </Grid>
        )
    }


}