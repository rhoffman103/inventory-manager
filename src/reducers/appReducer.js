import combineReducers from "./combineReducers";
import authenticationReducer from './authReducer';
import componentsReducer from './componentsReducer';
import formRequestReducer from './formRequestReducer';

const appReducer = combineReducers({
    authenticationReducer,
    componentsReducer,
    formRequestReducer
});


export default appReducer;