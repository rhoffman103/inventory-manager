import React from 'react';
import useAccordionToggle from 'react-bootstrap/useAccordionToggle';
import FormCheck from 'react-bootstrap/FormCheck';

const CheckboxToggle = ({ eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey);
  
    return (
        <FormCheck 
            type='checkbox'
            id={eventKey}
            label='Give Admin Permission'
            onClick={decoratedOnClick}
            className='pl-5'
        />
    );
};

export default CheckboxToggle;