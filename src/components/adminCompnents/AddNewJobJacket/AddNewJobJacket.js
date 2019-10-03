import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import { selectProduct } from '../../../actions/newProductActions';
import { collectJobJacketForm } from '../../../actions/formActions';
import { addNewJobJacket } from '../../../actions/databaseActions';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Form from 'react-bootstrap/Form';
import OrderSpecs from './OrderSpecs';
import FormRequestModal from '../modals/FormRequestModal';
import CalendarModal from '../modals/CalendarModal';
import FormulaModal from '../modals/FormulaModal';
import CustomerInfo from './CustomerInfo';
import SelectProduct from './SelectProduct/SelectProduct';
import FormSubmitButtons from '../adminCommon/FormSubmitButtons';

const AddNewJobJacket = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { values, handleInputChange, emptyValues } = useHandleInputChange();
    const { productSelected, productsList } = state.db;
    const submitForm = () => {
        addNewJobJacket(collectJobJacketForm(values, productsList), stateDispatch);
        emptyValues();
        selectProduct('none', productsList, stateDispatch);
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

                <SelectProduct handleInputChange={handleInputChange} />
                <FormSubmitButtons
                    onSubmit={submitForm}
                    clearForm={emptyValues}
                    isValid={
                        productSelected &&
                        values.coreDiameter &&
                        values.customer &&
                        values.dueDate &&
                        values.purchaseOrder &&
                        values.rollLength &&
                        values.totalMSF &&
                        values.totalRolls
                    }
                />
            </Form>

            <FormulaModal />
            <CalendarModal
                name='dueDate'
                value={values.dueDate}
                onChange={handleInputChange}
            />
            <FormRequestModal />
        </>
    );
};

export default AddNewJobJacket;