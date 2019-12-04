import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import SelectJobJacket from '../productionCommon/SelectJobJacket';
import FormField from '../../common/Forms/FormField';
import { scrapReasons } from '../../../constants/pxConstants';
import { reportDowntime } from '../../../actions/reportProductionActions';

const ReportDowntime = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { selectedJobJacket } = state.db;
    const { values, handleInputChange, emptyValues } = useHandleInputChange({
        reason: '',
        notes: '',
        time: ''
    });

    const submit = () => {
        reportDowntime({
            ...values,
            jobJacketKey: selectedJobJacket.jobJacketKey
        }, stateDispatch)
        .then(() => emptyValues)
        .catch((err) => console.log(err));
    };

    return (
        <>
            <h2>Report Downtime</h2>
            <SelectJobJacket redirectPath='/production/px/report-downtime' />
            <Row className='mt-3'>
                <Col xs={8} sm={5}>
                    <FormControl
                        as='select'
                        className='br-sharp'
                        name='reason'
                        onChange={handleInputChange}
                        value={values.reason || 'Select Reason'}
                    >
                        <option>Select Reason</option>
                        { scrapReasons.map((reason) => (
                            <option key={reason}>{reason}</option>
                        ))}
                    </FormControl>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col xs={8} sm={5}>
                    <FormField
                        controlId='time'
                        name='time'
                        type='number'
                        label='Time (min)'
                        placeholder={'0'}
                        value={values.time}
                        inputChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col xs={8} sm={5}>
                    <FormField
                        as='textarea'
                        controlId='notes'
                        name='notes'
                        type='text'
                        label='Notes'
                        placeholder='Leave a detailed note.'
                        value={values.notes}
                        inputChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Button
                variant='primary'
                className='mt-3 mr-3'
                onClick={submit}
                disabled={
                    !values.time ||
                    !values.notes ||
                    !values.reason
                }
            >
                Report Downtime
            </Button>
        </>
    );
};

export default ReportDowntime;