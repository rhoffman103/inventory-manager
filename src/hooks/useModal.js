import { useContext } from 'react';
import appContext from '../context/appContext';

const useModal = () => {
    
    const { stateDispatch } = useContext(appContext);

    const auxAction = (auxModal, bool) => ({
        type: 'HANDLE_AUX_MODAL',
        auxModal: [auxModal],
        value: bool
    });

    const modalAction = (bool) => ({
        type: 'HANDLE_MODAL',
        showSpinner: false,
        isModal: bool
    });

    const showModal = (auxModal) => {
        auxModal && stateDispatch(auxAction(auxModal, true));
        stateDispatch(modalAction(true));
    };

    const closeModal = (auxModal) => {
        auxModal && stateDispatch(auxAction(auxModal, false));
        stateDispatch(modalAction(false));
    };

    return { showModal, closeModal }
};

export default useModal;