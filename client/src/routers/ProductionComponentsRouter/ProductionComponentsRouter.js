import React from 'react';
import { Route, Switch } from "react-router-dom";
import LineSwitch from './LineSwitch';

const ProductionComponentsRouter = () => (
    <Switch>
        <Route
            path='/production/px'
            render={(props) => <LineSwitch {...props} line='PX' />}
        />
    </Switch>
);

export default ProductionComponentsRouter;