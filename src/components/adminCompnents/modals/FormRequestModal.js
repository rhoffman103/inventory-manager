import React, { useContext } from 'react'
import appContext from '../../../context/appContext';
import ModalContainer from '../../common/Modals/ModalContainer';

const FormRequestModal = () => {

    const { state } = useContext(appContext);
    const { forms, modal } = state;

    return (
        modal.formRequestModal && forms.data
        ?   <ModalContainer title={!forms.data.err ? 'Success!' : 'Woops!'} backdrop='static'>
                { forms.data.message
                    ?   <p>{forms.data.message}</p>
                    :   <>
                            <p>{forms.data.code}</p>
                            <p className='text-danger'>{forms.data.err}</p>
                        </>
                }
            </ModalContainer>
        :   <></>
    );
};

export default FormRequestModal;