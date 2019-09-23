import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignupForm from '../components/adminCompnents/forms/SignUpForm';
import Employees from '../components/adminCompnents/Employees';
import NewProduct from '../components/adminCompnents/Products/NewProduct';
import AddNewJobJacket from '../components/adminCompnents/AddNewJobJacket';

const AdminComponentsRouter = () => (
    <Switch>
        <Route exact path='/admin/addNewEmployee' component={SignupForm} />
        <Route exact path='/admin/employeesAndPermissions' component={Employees} />
        <Route exact path='/admin/newProduct' component={NewProduct} />
        <Route exact path='/admin/addNewJobJacket' component={AddNewJobJacket} />
    </Switch>
);

export default AdminComponentsRouter;