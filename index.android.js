/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import { Provider } from 'react-redux';
import Home from './home'

import configureStore from './jscode/store/index';

let store = configureStore();

export default class learnProject extends Component {

  constructor(){
    super();
    this.state = {
      store: configureStore()
    }
  }

  render() {
    return (

      <Provider store={this.state.store}>
        <Home/>
      </Provider>
    );
  }
}
AppRegistry.registerComponent('learnProject', () => learnProject);
