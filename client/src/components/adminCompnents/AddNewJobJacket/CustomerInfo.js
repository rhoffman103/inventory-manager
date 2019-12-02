import React from 'react';
import moment from 'moment';
import useModal from '../../../hooks/useModal';
import FormField from '../../common/Forms/FormField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CustomerInfo = ({ values, handleInputChange }) => {
    const { showModal } = useModal();

    return (
        <>
            <Row>
                <Col xs={12} md={6}>
                    <span
                        className='cursor-pointer link font-weight-bolder'
                        onClick={() => showModal('calendarModal')}
                    >
                        Due Date
                    </span>
                    <span> {values.dueDate ? moment(values.dueDate).format('MM-DD-YYYY') : ''}</span>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <FormField
                        label='Customer'
                        name='customer'
                        value={values.customer || ''}
                        inputChange={handleInputChange}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <FormField
                        label='P.O.'
                        name='purchaseOrder'
                        value={values.purchaseOrder || ''}
                        inputChange={handleInputChange}
                    />
                </Col>
            </Row>
        </>
    );
};

export default CustomerInfo;