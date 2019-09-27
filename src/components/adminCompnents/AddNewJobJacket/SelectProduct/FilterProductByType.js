import React, { useContext } from 'react';
import appContext from '../../../../context/appContext';
import { getProductsByType } from '../../../../actions/databaseActions';
import FilmTypeOptionsList from '../../adminCommon/FilmTypeOptionsList';
import Form from 'react-bootstrap/Form';

const FilterProductByType = () => {
    const { stateDispatch } = useContext(appContext);

    return (
        <Form.Group controlId="filterType">
            <Form.Label>Filter Products by Type</Form.Label>
            <Form.Control
                as="select"
                className='br-sharp'
                onChange={(e) => getProductsByType(e.target.value, stateDispatch)}
            >
                <FilmTypeOptionsList />
            </Form.Control>
        </Form.Group>
    );
};

export default FilterProductByType;