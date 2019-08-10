import { useContext } from 'react';
import appContext from '../context/appContext';

const useModal = () => {
    
    const { stateDispatch } = useContext(appContext);

    const showModal = () => {
        stateDispatch({
            type: 'SIMPLE_STATE_UPDATE',
            key: 'isModal',
            value: true
        });
    };

    const closeModal = () => {
        stateDispatch({
            type: 'SIMPLE_STATE_UPDATE',
            key: 'isModal',
            value: false
        });
    };

    return { showModal, closeModal }
};

export default useModal;