import React from 'react';
import { filmTypes } from '../adminConstants';

const FilmTypeOptionsList = () => (
    filmTypes.map((type, index) => <option key={`${type}-${index}`}>{type}</option>)
);

export default FilmTypeOptionsList;