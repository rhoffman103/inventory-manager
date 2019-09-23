import React, { useContext } from 'react';
import appContext from '../../../../context/appContext';
import NewProductForm from './NewProductForm';
import FormRequestModal from '../../modals/FormRequestModal';

const NewProduct = () => {

    const { state } = useContext(appContext);

    return (
        <>
            <h1>Create New Product</h1>
            <div className="p-0 mx-0 mb-4">
                <NewProductForm />
                { state.isModal && <FormRequestModal /> }
            </div>
        </>
    );
};

export default NewProduct;