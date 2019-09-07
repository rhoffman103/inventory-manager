import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

const FormField = ({ label, controlId, message, name, type, placeholder, inputChange, value }) => (
    <Form.Group controlId={controlId}>
        <Row>
            <Col xs={6}>
                <Form.Label>{label}</Form.Label>
            </Col>
            { message &&
                <Col xs={6}>
                    <div className="float-right text-danger">{message}</div>
                </Col>
            }
        </Row>
        <FormControl
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