import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import MaterialInput from './MaterialInput';

const LayerForm = ({ layer, values, handleInputChange }) => {

    const [materials, setMaterials] = useState([1]);
    const [pulseClass, setPulse] = useState('');
    
    const addMaterials = () => {
        const newArr = materials.map(num => num);
        newArr.push(1);
        setMaterials(newArr);
    };

    const pulse = () => {
        setPulse('pulse');
        const timeoutId = setTimeout(() => {
            setPulse('');
            clearTimeout(timeoutId);
        }, 1250);
    };

    return (
        <Row className="border-top new-product-layer">
            <Col xs={12}>
                <h5>Layer {layer}</h5>
            </Col>

            <Col xs={12}>
                <span>Layer {layer} Percent: </span>
                <FormControl
                    className="d-inline col-4 col-md-3"
                    value={values[`layer${layer}Percent`] || ''}
                    name={`layer${layer}Percent`}
                    type="number"
                    placeholder="30"
                    onChange={handleInputChange}
                />

                <div className='my-2 d-flex align-items-center'>
                    <div
                        onClick={() => {
                            pulse();
                            addMaterials();
                        }}
                        className={`${pulseClass} d-inline-flex align-items-center justify-content-center add-icon text-light`}
                    >
                        +
                    </div>
                    <span className='mx-2'>Add New Material</span>
                </div>

                <div className='d-flex flex-column-reverse'>
                    { materials.map((material, index) => {
                        return (
                            <MaterialInput
                                key={`layer${layer}index${index}`}
                                material={values[`layer${layer}material${index}Name`]}
                                percentage={values[`layer${layer}material${index}Percentage`]}
                                index={index}
                                handleInputChange={handleInputChange}
                                layer={layer}
                            />
                        )
                    })}
                </div>
            </Col>

        </Row>
    );
};

export default LayerForm;