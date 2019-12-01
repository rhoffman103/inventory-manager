import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import ModalContainer from './ModalContainer';

const GenericMessageModal = () => {

    const { state } = useContext(appContext);
    const { genericMessageModal, data } = state.modal;

    return (
        (genericMessageModal && data)
        ?   <>
                <ModalContainer
                    title={!data.message.err ? 'Success!' : 'Woops!'}
                    backdrop='static'
                >
                    { data.message
                        ?   <p>{data.message}</p>
                        :   <>
                                <p>{data.message.code}</p>
                                <p className='text-danger'>{data.message.err}</p>
                            </>
                    }
                </ModalContainer>
            </>
        : <></>
    );
};

export default GenericMessageModal;