'use strict';


import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

let createAppStore = applyMiddleware(thunk)(createStore);


export default function configureStore(){
  return (createAppStore)(reducers);
}


