import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import SelectJobJacket from './SelectJobJacket';

const AddFinishedProduct = ({ line }) => {
    const { state } = useContext(appContext);
    const { selectedJobJacket } = state.db;

    return (
        <>
            <h1>{line}: Add New Rolls</h1>
            <div>
                { selectedJobJacket &&
                    <h5>
                        Current Job Jacket: {`${selectedJobJacket.customer} - ${selectedJobJacket.id}`}
                    </h5>
                }
                <SelectJobJacket />
            </div>
        </>
    );
};

export default AddFinishedProduct;