import React from 'react';
import { Route, Switch } from "react-router-dom";

const Schedule = ({ line }) => (
    <div>{line}</div>
);

const ProductionComponentsRouter = () => (
    <Switch>
        <Route
            exact path='/production/px/schedule'
            render={(props) => <Schedule {...props} line='PX' />}
        />
    </Switch>
);

export default ProductionComponentsRouter;