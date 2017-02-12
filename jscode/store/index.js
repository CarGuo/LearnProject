'use strict';


import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

let middlewares = [
	thunk
];

let createAppStore = applyMiddleware(...middlewares)(createStore);


export default function configureStore(){
  return (createAppStore)(reducers);
}


