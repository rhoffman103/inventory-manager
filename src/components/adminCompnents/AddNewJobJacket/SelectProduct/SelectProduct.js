import React from 'react';
import FilterProductByType from './FilterProductByType';
import ProductsListByType from './ProductsListByType';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const SelectProduct = () => {
    return (
        <>
            <h5>Select Product</h5>
            <Form.Row>
                <Col xs={12} md={6}>
                    <Form.Group controlId="productionLineSelector">
                        <Form.Label>Production Line</Form.Label>
                        <Form.Control as="select" className='br-sharp'>
                            <option>PX</option>
                            <option disabled>MT</option>
                            <option disabled>SL</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <FilterProductByType />
                </Col>
            </Form.Row>
            <ProductsListByType />
        </>
    );
};

export default SelectProduct;