import React, { useEffect, useState } from 'react';
import { getEmployeesByPermission } from '../../../actions/databaseActions';
import AdminPermissions from '../forms/AdminPermissions/index';
import FormRequestModal from '../modals/FormRequestModal';
import Loading from '../../common/Loading/Loading';

const Employees = () => {

    const [employeeList, setEmployeeList] = useState({ employees: [] });
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getEmployeesByPermission(setEmployeeList)
        .then((employees) => {
            setLoader(false);
            setEmployeeList(employees);
        });
    }, []);

    return (
        <>
            <h1>Employees & Permissions</h1>
            {loader && <Loading />}
            {employeeList.employees.map(employee => {
                return (
                    <React.Fragment key={employee.employeeId}>
                        <p className="mb-1">
                            <span className='font-weight-bold'>{employee.displayName}</span>, employee id: <span className='font-weight-bold'>{employee.employeeId}</span>
                        </p>
                        <AdminPermissions employee={employee} />
                    </React.Fragment>
                )
            })}
            <FormRequestModal />
        </>
    );
};

export default Employees;