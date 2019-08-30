import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const FormField = ({ label, controlId, message, name, type, placeholder, inputChange, value }) => (
    <Form.Group controlId={controlId}>
        <Form.Row>
            <Col xs={6}>
                <Form.Label>{label}</Form.Label>
            </Col>
            { message &&
                <Col xs={6}>
                    <div className="float-right text-danger">{message}</div>
                </Col>
            }
        </Form.Row>
        <Form.Control
            name={name}
            type={type}
            value={value}
            className='br-sharp'
            placeholder={placeholder}
            onChange={inputChange}
        />
    </Form.Group>
);

export default FormField;