import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const SelectProductionLine = ({ onChange }) => (
    <Form.Row>
            <Col xs={12} md={6} className='pr-3'>
                <Form.Group controlId="productionLineSelector">
                    <Form.Label>Production Line</Form.Label>
                    <Form.Control
                        as="select"
                        className='br-sharp'
                        onChange={(e) => onChange({ target: { name: 'productionLine', value: e.target.value } })}
                    >
                        <option>Select</option>
                        <option>PX</option>
                        <option disabled>MT</option>
                        <option disabled>SL</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Form.Row>
);

export default SelectProductionLine;