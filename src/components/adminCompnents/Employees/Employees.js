import React, { useEffect, useState, useContext } from 'react';
import appContext from '../../../context/appContext';
import { getEmployeesByPermission } from '../../../actions/databaseActions';
import AdminPermissions from '../forms/AdminPermissions/index';
import UpdateEmployeeModal from '../modals/UpdateEmployeeModal';
import Loading from '../../common/Loading/Loading';

const Employees = () => {

    const { state } = useContext(appContext);

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
            {loader && <Loading />}
            {employeeList.employees.map(employee => {
                return (
                    <React.Fragment key={employee.employeeId}>
                        <p className="mb-1">
                            <span className='font-weight-bold'>{employee.displayName}</span>, employee id: <span className='font-weight-bold'>{employee.employeeId}</span>
                        </p>
                        <AdminPermissions employee={employee} />
                        { state.isModal && <UpdateEmployeeModal />}
                    </React.Fragment>
                )
            })}
        </>
    );
};

export default Employees;