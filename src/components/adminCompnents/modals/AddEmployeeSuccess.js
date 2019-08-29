import React from 'react'
import ModalContainer from '../../common/Modals/ModalContainer';

const AddEmployeeSuccess = ({ employeeName, err }) => {

    let title = employeeName ? 'Success!' : 'Woops!'

    return (
        <ModalContainer title={title} backdrop='static'>
            { employeeName && <p>Added New Employee: {employeeName}</p> }
            { err && <p className='text-danger'>{err}</p> }
        </ModalContainer>
    );
};

export default AddEmployeeSuccess;