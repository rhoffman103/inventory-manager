import React, { useContext } from 'react';
import appContext from '../../../../context/appContext';
import useHandleInputChange from '../../../../hooks/useHandleInputChange';
import { addNewProduct } from '../../../../actions/databaseActions';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormField from '../../../common/Forms/FormField';
import Button from 'react-bootstrap/Button';
import LayerForm from './LayerForm';
import { collectForm } from '../../../../actions/newProductActions';

const NewProductForm = () => {

    const { stateDispatch } = useContext(appContext);
    const { values, handleInputChange, emptyValues } = useHandleInputChange({});

    const onSubmit = () => {
        addNewProduct(collectForm(values), stateDispatch)
            .then(() => emptyValues())
            .catch((err) => console.log(err));
    };

    const clearForm = () => {
        emptyValues();
    };

    return (
        <Form className="overflow-scroll">
            <Form.Row>
                <Col xs={12}>
                    <FormField
                        controlId='productId'
                        value={values.productId || ''}
                        name='productId'
                        type='text'
                        label='Enter Product ID'
                        placeholder='PR000123'
                        inputChange={handleInputChange}
                    />
                </Col>
                <Col xs={12}>
                    <FormField
                        controlId='productDescription'
                        value={values.productDescription || ''}
                        name='productDescription'
                        type='text'
                        label='Enter Product Description'
                        placeholder='WH 1.2 PP 38"'
                        inputChange={handleInputChange}
                    />
                </Col>
            </Form.Row>

            <Form.Row>
                <Col xs={12}><h5>Product Specs</h5></Col>
                <Col xs={12} sm={6} m={4}>
                    <FormField 
                        controlId="color"
                        value={values.color || ''}
                        name="color"
                        type="text"
                        label='Color'
                        placeholder="WH/BlK"
                        inputChange={handleInputChange}
                    />
                </Col>
                <Col xs={12} sm={6} m={4}>
                    <FormField 
                        controlId="gauge"
                        value={values.gauge || ''}
                        name="gauge"
                        type="number"
                        label='Gauge (unit: Mill)'
                        placeholder="1.2"
                        inputChange={handleInputChange}
                    />
                </Col>
                <Col xs={12} sm={6} m={4}>
                    <FormField 
                        controlId="width"
                        value={values.width || ''}
                        name="width"
                        type="number"
                        label='Width (unit: inches)'
                        placeholder="38"
                        inputChange={handleInputChange}
                    />
                </Col>
            </Form.Row>

            <h4>Formula</h4>
            <LayerForm layer='A' values={values} handleInputChange={handleInputChange} />
            <LayerForm layer='B' values={values} handleInputChange={handleInputChange} />
            <LayerForm layer='C' values={values} handleInputChange={handleInputChange} />

            <Form.Row>
                <Col>
                    <div className="float-right mt-4">
                        <Button
                            variant="primary"
                            type="button"
                            onClick={onSubmit}
                        >
                            Create
                        </Button>

                        <span 
                            className="pointer align-middle ml-2"
                            onClick={clearForm}
                        >
                            <u>cancel</u>
                        </span>
                    </div>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default NewProductForm;