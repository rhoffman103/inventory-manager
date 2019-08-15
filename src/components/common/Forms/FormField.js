import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const FormField = ({ label, controlId, message, name, type, placeholder, inputChange, }) => (
    <Form.Group controlId={controlId}>
        <Form.Row>
            <Col xs={6}>
                <Form.Label>{label}</Form.Label>
            </Col>
            { message &&
                <Col xs={6}>
                    <div className="float-right">{message}</div>
                </Col>
            }
        </Form.Row>
        <Form.Control
            className='br-sharp'
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={inputChange}
        />
    </Form.Group>
);

export default FormField;