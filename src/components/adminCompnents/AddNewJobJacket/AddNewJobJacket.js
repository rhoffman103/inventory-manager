import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Form from 'react-bootstrap/Form';
import OrderSpecs from './OrderSpecs';
import CalendarModal from '../modals/CalendarModal';
import CustomerInfo from './CustomerInfo';
import SelectProduct from './SelectProduct/SelectProduct';

const AddNewJobJacket = () => {

    const { state } = useContext(appContext);
    const { values, handleInputChange } = useHandleInputChange();

    return (
        <>
            <h1>Add New Job Jacket</h1>
            <Form>

                <CustomerInfo
                    values={values}
                    handleInputChange={handleInputChange}
                />
                    
                <SelectProduct />

                <OrderSpecs
                    values={values}
                    handleInputChange={handleInputChange}
                />
            </Form>
            { state.isModal && 
                <CalendarModal
                    name='dueDate'
                    value={values.dueDate}
                    onChange={handleInputChange}
                />
            }
        </>
    );
};

export default AddNewJobJacket;