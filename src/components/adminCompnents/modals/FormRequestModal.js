import React, { useContext } from 'react'
import appContext from '../../../context/appContext';
import ModalContainer from '../../common/Modals/ModalContainer';

const FormRequestModal = () => {

    const { state } = useContext(appContext);
    const { formRequest } = state;
    const title = !formRequest.err ? 'Success!' : 'Woops!'

    return (
        <ModalContainer title={title} backdrop='static'>
            { formRequest.message && <p>{formRequest.message}</p> }
            { formRequest.err && <p className='text-danger'>{formRequest.err}</p> }
        </ModalContainer>
    );
};

export default FormRequestModal;