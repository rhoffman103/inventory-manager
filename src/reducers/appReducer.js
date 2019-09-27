import combineReducers from "./combineReducers";
import authenticationReducer from './authReducer';
import componentsReducer from './componentsReducer';
import formRequestReducer from './formRequestReducer';
import navReducer from './navReducer';
import databaseReducer from './databaseReducer';

const appReducer = combineReducers({
    authenticationReducer,
    componentsReducer,
    formRequestReducer,
    navReducer,
    databaseReducer
});


export default appReducer;