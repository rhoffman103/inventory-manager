import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const FormSubmitButtons = ({ onSubmit, clearForm }) => (
    <Row>
        <Col>
            <div className="float-right mt-4">
                <Button
                    variant="primary"
                    type="button"
                    onClick={onSubmit}
                >
                    Create
                </Button>

                <span 
                    className="pointer align-middle ml-2"
                    onClick={clearForm}
                >
                    <u>cancel</u>
                </span>
            </div>
        </Col>
    </Row>
);

export default FormSubmitButtons;