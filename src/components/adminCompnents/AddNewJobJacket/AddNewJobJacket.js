import React from 'react';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import FormField from '../../common/Forms/FormField';
import Form from 'react-bootstrap/Form';

const AddNewJobJacket = () => {

    const { values, handleInputChange } = useHandleInputChange();
    
    return (
        <Form>
            <FormField
                label='Company'
                name='company'
                value={values.company}
                inputChange={handleInputChange}
            />
        </Form>
    );
};

export default AddNewJobJacket;