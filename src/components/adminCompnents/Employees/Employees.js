import React, { useEffect, useState } from 'react';
import { getEmployeesByPermission } from '../../../database/employeesAccess';
import AdminPermissions from '../forms/AdminPermissions/index';
import FormRequestModal from '../modals/FormRequestModal';
import Loading from '../../common/Loading/Loading';

const Employees = () => {

    const [employeeList, setEmployeeList] = useState({ employees: [] });
    const [isMounted, setMount] = useState(false);

    useEffect(() => {
        getEmployeesByPermission(setEmployeeList)
        .then((employees) => {
            if (isMounted) setEmployeeList(employees);
        });
    }, [isMounted]);

    useEffect(() => {
        setMount(true);
        return () => setMount(false);
    }, []);

    return (
        <>
            <h1>Employees & Permissions</h1>
            <Loading loader={!employeeList.employees.length} />
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