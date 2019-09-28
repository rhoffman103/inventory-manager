import React, { useContext } from 'react';
import appContext from '../../../../context/appContext';
import useModal from '../../../../hooks/useModal';
import { selectProduct } from '../../../../actions/newProductActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck';

const ProductsListByType = () => {
    const { state, stateDispatch } = useContext(appContext);
    const { productsList } = state;
    const { showModal } = useModal();

    const openFormulaModal = (id) => {
        productsList.some((product) => {
            if (product.id === id) {
                stateDispatch({
                    type: 'PRODUCT_QUICK_VIEW',
                    productQuickview: product,
                    quickviewModal: true
                });
                return true;
            }
            else return false;
        });
        showModal();
    }
    
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
                            onClick={() => selectProduct(product.id, productsList, stateDispatch)}
                        >
                            <FormCheck 
                                type='checkbox'
                                id={product.id}
                                onChange={() => selectProduct(product.id, productsList, stateDispatch)}
                                className='pl-5 cursor-pointer'
                                checked={product.isSelected || false}
                            />
                        </Col>
                        <Col xs={4} className='border-right'>{product.description}</Col>
                        <Col xs={2} className='border-right'>{product.type}</Col>
                        <Col xs={2} className='border-right'>{product.id}</Col>
                        <Col
                            xs={2}
                            className='cursor-pointer hover-light'
                            onClick={() => openFormulaModal(product.id)}
                        >
                            <span className='underline'>View</span>
                        </Col>
                    </Row>
                ))
            }
        </div>
    );
};

export default ProductsListByType;