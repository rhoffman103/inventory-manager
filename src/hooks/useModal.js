import { useContext } from 'react';
import appContext from '../context/appContext';

const useModal = () => {
    
    const { stateDispatch } = useContext(appContext);

    const showModal = (modal) => {
        stateDispatch({
            type: 'OPEN_MODAL',
            modal
        });
    };

    const closeModal = () => {
        stateDispatch({ type: 'CLOSE_MODAL' });
    };

    return { showModal, closeModal }
};

export default useModal;