import React from 'react';
import { Route, Switch } from "react-router-dom";
import Schedule from '../components/productionComponents/Schedule';

const ProductionComponentsRouter = () => (
    <Switch>
        <Route
            exact path='/production/px/schedule'
            render={(props) => <Schedule {...props} line='PX' />}
        />
    </Switch>
);

export default ProductionComponentsRouter;