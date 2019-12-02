import React from 'react';
import FormField from '../../../common/Forms/FormField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { pxRollSet, rollLength, rollWeight, needsRework } from '../../../../constants/pxConstants';

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
            <Row>
                <Col xs={8} sm={5}>
                    <FormField
                        controlId='lineSpeedInput'
                        value={values.lineSpeed}
                        name='lineSpeed'
                        type='number'
                        label='Line Speed'
                        placeholder={'0'}
                        inputChange={handleInputChange}
                    />
                </Col>
            </Row>
            { pxRollSet.map((rollPosition, i) => (
                <Row key={`${rollPosition}-${i}`}>
                    <Col xs={8} sm={5}>
                        <FormField
                            controlId={rollPosition}
                            value={values[`${rollPosition}_${rollLength}`]}
                            name={`${rollPosition}_${rollLength}`}
                            type='number'
                            label={`${rollPosition} Length`}
                            placeholder={'0'}
                            inputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs={8} sm={5}>
                        <FormField
                            controlId={rollPosition}
                            value={values[`${rollPosition}_${rollWeight}`]}
                            name={`${rollPosition}_${rollWeight}`}
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
                                name={`${rollPosition}_${needsRework}`}
                                checked={values[`${rollPosition}_${needsRework}`]}
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