import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import useModal from '../../../hooks/useModal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalContainer = ({ children, title, Footer, backdrop, confirmOk, closeHandler, centered, size }) => {
    const { state } = useContext(appContext);
    const { closeModal } = useModal();

    const handleClose = () => {
        if (closeHandler) closeModal(closeHandler);
        else closeModal();
    };

    return (
        <Modal
            show={state.isModal}
            onHide={closeModal}
            backdrop={backdrop}
            centered={centered}
            size={size}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            { Footer
                ?   Footer
                :   <Modal.Footer>
                        { confirmOk && 
                            <Button variant="success" onClick={handleClose}>
                                Done
                            </Button>
                        }
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>  
            }
        </Modal>
    );
};

export default ModalContainer;