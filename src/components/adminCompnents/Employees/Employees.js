import React, { useEffect, useState } from 'react';
import { getEmployeesByPermission } from '../../../actions/databaseActions';
import AdminPermissions from '../forms/AdminPermissions/index';

const Employees = () => {

    const [employeeList, setEmployeeList] = useState({ employees: [] });

    useEffect(() => {
        getEmployeesByPermission(setEmployeeList)
        .then((employees) => setEmployeeList(employees));
    }, []);

    return (
        <>
            {employeeList.employees.map(employee => {
                return (
                    <React.Fragment key={employee.employeeId}>
                        <p className="mb-1">
                            <span className='font-weight-bold'>{employee.displayName}</span>, employee id: <span className='font-weight-bold'>{employee.employeeId}</span>
                        </p>
                        <AdminPermissions name={employee.displayName} id={employee.employeeId} />
                    </React.Fragment>
                )
            })}
        </>
    );
};

export default Employees;