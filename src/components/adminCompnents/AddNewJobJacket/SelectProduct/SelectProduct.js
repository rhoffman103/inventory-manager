import React from 'react';
import FilterProductByType from './FilterProductByType';
import ProductsListByType from './ProductsListByType';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const SelectProduct = ({ handleInputChange }) => {
    return (
        <>
            <h5>Select Product</h5>
            <Form.Row>
                <Col xs={12} md={6} className='pr-3'>
                    <Form.Group controlId="productionLineSelector">
                        <Form.Label>Production Line</Form.Label>
                        <Form.Control
                            as="select"
                            className='br-sharp'
                            onChange={(e) => handleInputChange({ target: { name: 'productionLine', value: e.target.value } })}
                        >
                            <option>Select</option>
                            <option>PX</option>
                            <option disabled>MT</option>
                            <option disabled>SL</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pl-3'>
                    <FilterProductByType />
                </Col>
            </Form.Row>
            <ProductsListByType />
        </>
    );
};

export default SelectProduct;