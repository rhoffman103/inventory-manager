import React, { useContext } from 'react'
import appContext from '../../../context/appContext';
import ModalContainer from '../../common/Modals/ModalContainer';

const UpdateEmployeeModal = () => {

    const { state } = useContext(appContext);
    const { updateEmployee } = state;
    const title = !updateEmployee.err ? 'Success!' : 'Woops!'

    return (
        <ModalContainer title={title} backdrop='static'>
            { updateEmployee.message && <p>{updateEmployee.message}</p> }
            { updateEmployee.err && <p className='text-danger'>{updateEmployee.err}</p> }
        </ModalContainer>
    );
};

export default UpdateEmployeeModal;