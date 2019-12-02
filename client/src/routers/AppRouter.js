import React, { useContext } from 'react';
import appContext from '../context/appContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Production from '../pages/Production';

const ProtectedRoute = ({ component: Component, auth, accessLevel, ...rest }) => (
    accessLevel
    ?   auth[accessLevel]
        ?   <Route {...rest} render={(props) => (
                <Component {...props} />
            )} />
        :   <Redirect to='/' />
    :   auth.uid
        ?   <Route {...rest} render={(props) => (
                <Component {...props} />
            )} />
        :   <Redirect to='/' />
);

const AppRouter = () => {
    const { state } = useContext(appContext);

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute
                path="/admin"
                component={Admin}
                auth={state.auth}
                accessLevel='admin'
            />
            <ProtectedRoute
                path="/production"
                component={Production}
                auth={state.auth}
            />
            <Route path ='*'>
                <Redirect to='/' />
            </Route>
        </Switch>
    );
};

export default AppRouter;