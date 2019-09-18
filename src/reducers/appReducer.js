import combineReducers from "./combineReducers";
import authenticationReducer from './authReducer';
import componentsReducer from './componentsReducer';
import formRequestReducer from './formRequestReducer';
import navReducer from './navReducer';

const appReducer = combineReducers({
    authenticationReducer,
    componentsReducer,
    formRequestReducer,
    navReducer
});


export default appReducer;