import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import useModal from '../../../hooks/useModal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalContainer = ({ children, title }) => {
    const { state } = useContext(appContext);
    const { closeModal } = useModal();

    return (
        <>
            <Modal show={state.isModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalContainer;