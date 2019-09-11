import { useContext } from 'react';
import appContext from '../context/appContext';

const useModal = () => {
    
    const { stateDispatch } = useContext(appContext);

    const showModal = () => {
        stateDispatch({
            type: 'HANDLE_MODAL',
            showSpinner: false,
            isModal: true
        });
    };

    const closeModal = () => {
        stateDispatch({
            type: 'HANDLE_MODAL',
            showSpinner: false,
            isModal: false
        });
    };

    return { showModal, closeModal }
};

export default useModal;