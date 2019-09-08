import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormField from '../../../common/Forms/FormField';

const MaterialInput = ({ layer, material, percentage, message, index, handleInputChange }) => (
    <div>
        <Row>
            <Col xs={12} sm={6}>
                <FormField
                    controlId={`layer${layer}material${index}`}
                    value={material || ''}
                    name={`layer${layer}material${index}Name`}
                    type='text'
                    label='Material Name'
                    inputChange={handleInputChange}
                    message={message}
                />
            </Col>
            <Col xs={12} sm={6}>
                <FormField
                    controlId={`layer${layer}percentage${index}`}
                    value={percentage || ''}
                    name={`layer${layer}material${index}Percentage`}
                    type='number'
                    label='Percentage'
                    placeholder="30"
                    inputChange={handleInputChange}
                    message={message}
                />
            </Col>
        </Row>
    </div>
);

export default MaterialInput;