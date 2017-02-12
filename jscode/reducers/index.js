
import { combineReducers } from 'redux';
import userReducer from './page1';

export default combineReducers({
	userStore: userReducer,
});
