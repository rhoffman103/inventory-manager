import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import { getJobJacketsByProductionLine } from '../../../actions/databaseActions';
import { emptyDBReducer } from '../../../actions/commonActions';
import Form from 'react-bootstrap/Form';
import SelectProductionLine from '../adminCommon/SelectProductionLine';
import FormRequestModal from '../modals/FormRequestModal';
import JobJacketList from './JobJacketList';

const UpdateSchedule = () => {
    const { state, stateDispatch } = useContext(appContext);
    const { values, handleInputChange, emptyValues } = useHandleInputChange();
    const { productionLine } = values;
   
    useEffect(() => {
        if (productionLine && productionLine !== 'Select')
            Promise.all([
                getJobJacketsByProductionLine({ line: productionLine }, stateDispatch),
                getJobJacketsByProductionLine({ line: productionLine, inSchedule: true }, stateDispatch)
            ])
    }, [productionLine]);

    useEffect(() => {
        return () => emptyDBReducer();
    }, []);
    
    return (
        <>
            <h1>Update Schedule</h1>
            <Form>
                <SelectProductionLine onChange={handleInputChange} />
            </Form>
            <JobJacketList
                title='Open Job Jackets'
                jobType='jobJackets'
                select='Add'
            />
            <JobJacketList
                title='Schedule'
                jobType='schedule'
                select='Remove'
            />
            <FormRequestModal />
        </>
    );
};

export default UpdateSchedule;