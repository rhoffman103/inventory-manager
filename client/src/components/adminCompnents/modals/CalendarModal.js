import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import ModalContainer from '../../common/Modals/ModalContainer';
import Calendar from 'react-calendar';

const CalendarModal = ({ value, onChange }) => {
    const { state } = useContext(appContext);

    return (
        state.modal.calendarModal
        ?   <ModalContainer
                title='Job Jacket Due Date'
                backdrop='static'
                closeHandler='calendarModal'
                confirmOk
                useFooter
            >
                <div className='d-flex justify-content-center'>
                    <Calendar
                        value={value || new Date()}
                        onChange={(date) => onChange({ target: { name: 'dueDate', value: date } })}
                    />
                </div>
            </ModalContainer>
        :   <></>
    );
};

export default CalendarModal;