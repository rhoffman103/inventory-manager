import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Form from 'react-bootstrap/Form';
import OrderSpecs from './OrderSpecs';
import CalendarModal from '../modals/CalendarModal';
import FormulaModal from '../modals/FormulaModal';
import CustomerInfo from './CustomerInfo';
import SelectProduct from './SelectProduct/SelectProduct';
import FormSubmitButtons from '../adminCommon/FormSubmitButtons';

const AddNewJobJacket = () => {

    const { state } = useContext(appContext);
    const { values, handleInputChange, emptyValues } = useHandleInputChange();

    const collectForm = () => {
        let jobJacket = { ...values };
        state.productsList.some(product => {
            if (product.isSelected) {
                jobJacket.product = product;
                return true;
            }
        });
        emptyValues();
        console.log('values: ', jobJacket);
    };

    return (
        <>
            <h1>Add New Job Jacket</h1>
            <Form>

                <CustomerInfo
                    values={values}
                    handleInputChange={handleInputChange}
                />
                    
                <OrderSpecs
                    values={values}
                    handleInputChange={handleInputChange}
                />

                <SelectProduct />
                <FormSubmitButtons
                    onSubmit={collectForm}
                    clearForm={emptyValues}
                />
            </Form>

            { state.isModal && 
                state.quickviewModal
                ?   <FormulaModal />
                :
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