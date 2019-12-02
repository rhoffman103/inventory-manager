import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignupForm from '../components/adminCompnents/forms/SignUpForm';
import Employees from '../components/adminCompnents/Employees';
import NewProduct from '../components/adminCompnents/Products/NewProduct';
import AddNewJobJacket from '../components/adminCompnents/AddNewJobJacket';
import UpdateSchedule from '../components/adminCompnents/UpdateSchedule';
import UpdateProduct from '../components/adminCompnents/UpdateProduct';

const AdminComponentsRouter = () => (
    <Switch>
        <Route exact path='/admin/addNewEmployee' component={SignupForm} />
        <Route exact path='/admin/employeesAndPermissions' component={Employees} />
        <Route exact path='/admin/newProduct' component={NewProduct} />
        <Route exact path='/admin/addNewJobJacket' component={AddNewJobJacket} />
        <Route exact path='/admin/updateSchedule' component={UpdateSchedule} />
        <Route exact path='/admin/updateProduct' component={UpdateProduct} />
    </Switch>
);

export default AdminComponentsRouter;