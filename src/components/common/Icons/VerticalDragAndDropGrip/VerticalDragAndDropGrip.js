import React from 'react';
import './style.css';

const VerticalDragAndDropGrip = ({ dragHandle }) => (
    <div
        {...dragHandle}
        className='dnd-grip d-inline-flex flex-row justify-content-center border'
    >
        <div className='flex-column align-self-center'>
            <div className='grip-line'></div>
            <div className='grip-line'></div>
        </div>
    </div>
);

export default VerticalDragAndDropGrip;