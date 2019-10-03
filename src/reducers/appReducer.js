import combineReducers from "./combineReducers";
import authenticationReducer from './authReducer';
import componentsReducer from './componentsReducer';
import formRequestReducer from './formRequestReducer';
import navReducer from './navReducer';
import databaseReducer from './databaseReducer';
import modalsReducer from "./modalsReducer";

const appReducer = combineReducers({
    auth: authenticationReducer,
    components: componentsReducer,
    db: databaseReducer,
    forms: formRequestReducer,
    modal: modalsReducer,
    navbar: navReducer
});


export default appReducer;