import React, { useContext } from 'react';
import appContext from '../../../../context/appContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck';

const ProductsListByType = () => {
    const { state, stateDispatch } = useContext(appContext);
    const { productsList } = state;
    
    const selectProduct = (id) => {
        let products = productsList.map(product => {
            if (product.id === id) product.isSelected = true;
            else product.isSelected = false;
            return product;
        });

        stateDispatch({
            type: 'SET_PRODUCTS_LIST',
            products
        });
    };
    
    return (
        <div className='products-grid overflow-auto'>
            <Row className='dark-theme border mx-0 py-2 min-w-618'>
                <Col xs={2} className='border-right'>Select</Col>
                <Col xs={4} className='border-right'>Description</Col>
                <Col xs={2} className='border-right'>Film Type</Col>
                <Col xs={2} className='border-right'>Product ID</Col>
                <Col xs={2}>Formula</Col>
            </Row>
            {productsList &&
                productsList.map((product) => (
                    <Row
                        key={product.id}
                        className={`border border-top-0 mx-0 products-list min-w-618 ${product.isSelected && 'selected-product'}`}
                    >
                        <Col
                            xs={2}
                            className='border-right'
                            onClick={() => selectProduct(product.id)}
                        >
                            <FormCheck 
                                type='checkbox'
                                id={product.id}
                                onChange={() => selectProduct(product.id)}
                                className='pl-5 cursor-pointer'
                                checked={product.isSelected || false}
                            />
                        </Col>
                        <Col xs={4} className='border-right'>{product.description}</Col>
                        <Col xs={2} className='border-right'>{product.type}</Col>
                        <Col xs={2} className='border-right'>{product.id}</Col>
                        <Col xs={2} className='cursor-pointer'>View</Col>
                    </Row>
                ))
            }
        </div>
    );
};

export default ProductsListByType;