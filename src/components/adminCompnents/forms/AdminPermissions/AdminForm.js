import React, { useReducer, useEffect, useContext } from 'react';
import appContext from '../../../../context/appContext';
import useHandleInputChange from '../../../../hooks/useHandleInputChange';
import { clickedGivePermission } from '../../../../actions/adminPermissionActions';
import permissionsReducer from '../../../../reducers/permissionsReducer';
import { updateAdminStatus } from '../../../../actions/databaseActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PermissionWarning from './PermissionWarning';
import FormField from '../../../common/Forms/FormField';

const AdminForm = ({ employee }) => {
    const { stateDispatch } = useContext(appContext);
    const { values, handleInputChange } = useHandleInputChange({ employeeName: "" });
    const [validation, validationDispatch] = useReducer(permissionsReducer, {
        employee: {
            message: ""
        }
    });

    useEffect(() => {
        if (validation.employee.admin)
            updateAdminStatus(stateDispatch, employee);
    }, [validation.employee, employee, stateDispatch]);

    return (
        <>
            <PermissionWarning />
            <Row>
                <Col xs={12} sm={8}>
                    <FormField
                        controlId='employeeName'
                        value={values.employeeName.input}
                        name='employeeName'
                        type='text'
                        label="Confirm Employee's Name"
                        placeholder='John Smith'
                        inputChange={handleInputChange}
                        message={validation.employee.message}
                    />
                </Col>
                <Col xs={12} sm={4}  className='d-flex align-items-end pb-3'>
                    <Button
                        type='button'
                        onClick={() => validationDispatch(clickedGivePermission({
                            enteredName: values.employeeName,
                            correctName: employee.displayName,
                            id: employee.employeeId
                        }))}
                    >
                        Promote To Admin
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default AdminForm;