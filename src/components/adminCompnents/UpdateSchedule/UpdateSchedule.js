import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import { 
    getJacketsAndScheduleByLine,
    addToSchedule,
    removeFromSchedule,
    updateScheduleAndJobJackets
} from '../../../actions/databaseActions';
import { emptyDBReducer } from '../../../actions/commonActions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
                getJacketsAndScheduleByLine(productionLine, stateDispatch),
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
                inSchedule={false}
                jobType='jobJackets'
                select={addToSchedule}
                actionType='Add'
            />
            <JobJacketList
                title='Schedule'
                inSchedule={true}
                jobType='jobJackets'
                select={removeFromSchedule}
                actionType='Remove'
            />
            {state.db.schedule &&
                <Button
                    className='mt-3 float-right'
                    onClick={() => updateScheduleAndJobJackets(state.db, productionLine, stateDispatch)}
                >
                    Apply
                </Button>
            }
            <FormRequestModal />
        </>
    );
};

export default UpdateSchedule;