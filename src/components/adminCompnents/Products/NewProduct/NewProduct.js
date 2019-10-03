import React from 'react';
import NewProductForm from './NewProductForm';
import FormRequestModal from '../../modals/FormRequestModal';

const NewProduct = () => (
    <>
        <h1>Create New Product</h1>
        <div className="p-0 mx-0 mb-4">
            <NewProductForm />
            <FormRequestModal />
        </div>
    </>
);

export default NewProduct;