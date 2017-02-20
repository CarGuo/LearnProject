/**
 * Created by guoshuyu on 2017/2/6.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './jscode/store/index';

import detail from './detail'

let store = configureStore();

import * as RouterUtils from './jscode/common/router';

class home extends Component {

  constructor(){
    super();
    this.state = {
      store: configureStore()
    }
  }

  render() {
        return (
          <Provider store={this.state.store}>
            {RouterUtils.getRouter()}
          </Provider>
        );
    }
}

export default home;

//将需要打开的activity关联的js注册进来
AppRegistry.registerComponent('detail', () => detail);