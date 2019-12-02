import React from 'react';
import FormField from '../../common/Forms/FormField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OrderSpecs = ({ values, handleInputChange }) => {

    return (
        <div className='mt-3'>
            <h5>Customer Order Specs</h5>
            <Row>
                <Col xs={12} md={6}>
                    <FormField
                        label='Total MSF'
                        name='totalMSF'
                        value={values.totalMSF || ''}
                        inputChange={handleInputChange}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <FormField
                        label='Roll Length'
                        name='rollLength'
                        value={values.rollLength || ''}
                        inputChange={handleInputChange}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <FormField
                        label='Total Rolls'
                        name='totalRolls'
                        value={values.totalRolls || ''}
                        inputChange={handleInputChange}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <FormField
                        label='Core Diameter'
                        name='coreDiameter'
                        value={values.coreDiameter || ''}
                        inputChange={handleInputChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default OrderSpecs;