import React from 'react';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import FormField from '../../common/Forms/FormField';
import Form from 'react-bootstrap/Form';

const AddNewJobJacket = () => {

    const { values, handleInputChange } = useHandleInputChange();
    
    return (
        <>
            <h1>Add New Job Jacket</h1>
            <Form>
                <FormField
                    label='Company'
                    name='company'
                    value={values.company}
                    inputChange={handleInputChange}
                />
            </Form>
        </>
    );
};

export default AddNewJobJacket;