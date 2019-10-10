import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import JobJacketRow from './JobJacketRow';

const DraggableJacket = ({ jacket, select, actionType, index, bg }) => (
    <Draggable
        draggableId={`draggable-${jacket.jobJacketKey}`}
        index={index}
    >
            {(provided) => (
            <div
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                <JobJacketRow
                    bg={bg}
                    job={jacket}
                    index={index}
                    select={select}
                    actionType={actionType}
                    dragHandle={provided.dragHandleProps}
                />
            </div>
        )}
    </Draggable>
);

export default DraggableJacket;