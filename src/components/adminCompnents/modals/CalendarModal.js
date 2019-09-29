import React from 'react'
import ModalContainer from '../../common/Modals/ModalContainer';
import Calendar from 'react-calendar';

const CalendarModal = ({ value, onChange}) => (
    <ModalContainer title='Job Jacket Due Date' confirmOk useFooter>
        <div className='d-flex justify-content-center'>
            <Calendar
                value={value || new Date()}
                onChange={(date) => onChange({ target: { name: 'dueDate', value: date } })}
            />
        </div>
    </ModalContainer>
);

export default CalendarModal;