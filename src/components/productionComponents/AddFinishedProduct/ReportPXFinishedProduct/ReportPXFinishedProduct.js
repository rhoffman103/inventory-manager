import React from 'react';
import FormField from '../../../common/Forms/FormField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { pxRollSet } from '../../../../constants/pxConstants';

const ReportPXFinishedProduct = ({ values, handleInputChange }) => {

    const handleCheck = (e) => {
        const { name, checked } = e.target
        handleInputChange({
            target: {
                name,
                value: checked === true
            }
        });
    };

    return (
        <>
            { pxRollSet.map((rollPosition, i) => (
                <Row key={`${rollPosition}-${i}`}>
                    <Col xs={8} sm={5}>
                        <FormField
                            controlId={rollPosition}
                            value={values[`${rollPosition}Length`]}
                            name={`${rollPosition}Length`}
                            type='number'
                            label={`${rollPosition} Length`}
                            placeholder={'0'}
                            inputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs={8} sm={5}>
                        <FormField
                            controlId={rollPosition}
                            value={values[`${rollPosition}Weight`]}
                            name={`${rollPosition}Weight`}
                            type='number'
                            label={`${rollPosition} Weight`}
                            placeholder={'0'}
                            inputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs={4} sm={2} className='d-flex'>
                        <Form.Group className="align-self-end pb-1" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox" label="Rework?"
                                name={`${rollPosition}Check`}
                                checked={values[`${rollPosition}Check`]}
                                onChange={handleCheck}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            ))}
        </>
    );
};

export default ReportPXFinishedProduct;