import combineReducers, { combineReducersSpreadState } from "./combineReducers";
import authenticationReducer from './authReducer';
import componentsReducer from './componentsReducer';
import formRequestReducer from './formRequestReducer';
import navReducer from './navReducer';
import databaseReducer from './databaseReducer';
import modalsReducer from './modalsReducer';
import productionReducer from './productionReducer';

const dataReducer = combineReducersSpreadState({
    databaseReducer,
    productionReducer
});

const appReducer = combineReducers({
    auth: authenticationReducer,
    components: componentsReducer,
    db: dataReducer,
    forms: formRequestReducer,
    modal: modalsReducer,
    navbar: navReducer
});


export default appReducer;