import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableJobJacket from './DraggableJobJacket';

const DroppableJobJackets = ({ jobs, select, actionType }) => (
    <Droppable droppableId='schedule'>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {jobs.map((job, index) => (
                    job.inSchedule
                        ?   <DraggableJobJacket
                                key={`draggableKey-${job.id}-${index}`}
                                jacket={job}
                                index={index}
                                select={select}
                                actionType={actionType}
                            />
                        :   <React.Fragment key={`fragmentKey-${job.id}-${index}`}/>
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default DroppableJobJackets;