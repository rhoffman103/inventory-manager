import React from 'react';
import Button from 'react-bootstrap/Button';
import ModalFooter from 'react-bootstrap/ModalFooter';

const Footer = ({ select, close, isSelected }) => (
    <ModalFooter>
        <Button variant="success" onClick={select}>
            { isSelected ? 'Deselect Product' : 'Select Product' }
        </Button>
        <Button variant="secondary" onClick={close}>
            Close
        </Button>
    </ModalFooter>
);

export default Footer;