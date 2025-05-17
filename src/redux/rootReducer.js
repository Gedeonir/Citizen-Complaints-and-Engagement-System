
import { combineReducers } from 'redux';
import reducer from './Reducers/counterReducer';

const rootReducer = combineReducers({
    counter: reducer,

});

export default rootReducer;