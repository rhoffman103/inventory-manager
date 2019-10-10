import React, { useContext, useEffect, useCallback } from 'react';
import appContext from '../../../context/appContext';
import { DragDropContext } from 'react-beautiful-dnd';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import { getJacketsAndScheduleByLine, updateScheduleAndJobJackets, getDummySchedule } from '../../../actions/databaseActions';
import { addToSchedule, removeFromSchedule } from '../../../actions/scheduleActions';
import { emptyDBReducer } from '../../../actions/commonActions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SelectProductionLine from '../adminCommon/SelectProductionLine';
import FormRequestModal from '../modals/FormRequestModal';
import JobJacketList from './JobJacketList';

const UpdateSchedule = () => {
    const { state, stateDispatch } = useContext(appContext);
    const { values, handleInputChange } = useHandleInputChange();
    const { productionLine } = values;
   
    const onDragEnd = useCallback((result) => {
        const { destination, source } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId
            && destination.index === source.index
        ) return;
        
        const column = state.db[source.droppableId];
        const schedule = Array.from(column);
        const job = schedule[source.index];
        const sliceIndex = (source.index < destination.index) ? source.index : destination.index;
        
        schedule.splice(source.index, 1);
        schedule.splice(destination.index, 0, job);
        
        let beginning = schedule.slice(0, sliceIndex);
        let remainder = schedule.slice(sliceIndex).map((job, index) => ({ ...job, position: (index + sliceIndex + 1) }));

        beginning.push(...remainder);

        stateDispatch({
            type: 'SCHEDULE_DRAG_UPDATE',
            schedule: beginning
        })
    }, [state, stateDispatch]);

    useEffect(() => {
        if (productionLine && productionLine !== 'Select')
        //    getJacketsAndScheduleByLine(productionLine, stateDispatch)
        getDummySchedule(stateDispatch);
    }, [productionLine, stateDispatch]);

    useEffect(() => {
        return () => stateDispatch(emptyDBReducer());
    }, [stateDispatch]);
    
    return (
        <DragDropContext
          onDragEnd={onDragEnd}
        >
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
                jobType='schedule'
                select={removeFromSchedule}
                actionType='Remove'
            />
            {state.db.scheduleUpdated &&
                <Button
                    className='mt-3 float-right'
                    onClick={() => updateScheduleAndJobJackets(state.db, productionLine, stateDispatch)}
                >
                    Apply
                </Button>
            }
            <FormRequestModal />
        </DragDropContext>
    );
};

export default UpdateSchedule;