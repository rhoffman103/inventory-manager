import React, { useContext, useState } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import SelectJobJacket from '../productionCommon/SelectJobJacket';
import FormField from '../../common/Forms/FormField';
import { reportScrap } from '../../../actions/reportProductionActions';
import { scrapReasons as scrapReasonList } from '../../../constants/pxConstants';

const ReportScrap = () => {
    const { state, stateDispatch } = useContext(appContext);
    const { selectedJobJacket } = state.db;
    const [scrapArray, setScrapArray] = useState([]);
    const [scrapReasons, setScrapReasons] = useState(scrapReasonList);
    const { values, handleInputChange, emptyValues } = useHandleInputChange({
        rollLength: '',
        rollWeight: '',
        reason: ''
    });

    const addScrap = () => {
        let arrangedReasons = Array.from(scrapReasons);
        arrangedReasons.splice(scrapReasons.indexOf(values.reason), 1);
        arrangedReasons.splice(0, 0, values.reason);
        setScrapReasons(arrangedReasons);
        setScrapArray([values, ...scrapArray]);
        emptyValues();
    };

    const submitForm = () => {
        let scrapObj = {
            scrapArray,
            totalWeight: 0,
            jobJacketKey: selectedJobJacket.jobJacketKey
        };
        scrapArray.forEach(scrap => scrapObj.totalWeight += parseInt(scrap.rollWeight))
        reportScrap(scrapObj, stateDispatch)
        .then(() => setScrapArray([]))
        .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2>Report Scrap</h2>
            <SelectJobJacket redirectPath='/production/px/report-scrap' />
            <Row className='mt-3'>
                <Col xs={8} sm={5}>
                    <FormField
                        controlId='length'
                        name='rollLength'
                        type='number'
                        label='Length'
                        placeholder={'0'}
                        value={values.rollLength}
                        inputChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={8} sm={5}>
                    <FormField
                        controlId='weight'
                        name='rollWeight'
                        type='number'
                        label='Weight'
                        placeholder={'0'}
                        value={values.rollWeight}
                        inputChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={8} sm={5}>
                    <label className='form-label'>Reason For Scrap</label>
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
            <Button
                variant='secondary'
                className='mt-3 mr-3'
                onClick={addScrap}
                disabled={
                    !values.rollLength ||
                    !values.rollWeight ||
                    !values.reason
                }
            >
                Stage Scrap
            </Button>
            <Button
                variant='primary'
                className='mt-3 bm-2'
                onClick={submitForm}
                disabled={
                    !scrapArray.length ||
                    values.rollLength ||
                    values.rollWeight ||
                    values.reason
                }
            >
                Submit All
            </Button>
            
            { scrapArray.map((stagedScrap, index) => (
                <p
                    key={`${stagedScrap.rollWeight}-${index}`}
                    className='my-2'
                >
                    {index + 1}. <span className="font-weight-bold">
                        {stagedScrap.rollWeight}
                    </span> lb. at <span className="font-weight-bold">
                        {stagedScrap.rollLength}
                    </span> ft.
                </p>
            ))}
        </div>
    );
};

export default ReportScrap;