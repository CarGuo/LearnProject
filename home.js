/**
 * Created by guoshuyu on 2017/2/6.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';

import * as RouterUtils from './jscode/common/router';

class home extends Component {
    render() {
        return (
          RouterUtils.getRouter()
        );
    }
}

export default home;