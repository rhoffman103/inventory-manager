import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Button from 'react-bootstrap/Button';
import SelectJobJacket from './SelectJobJacket';
import ReportPXFinishedProduct from './ReportPXFinishedProduct';
import { pxRollSet } from '../../../constants/pxConstants';

const AddFinishedProduct = ({ line }) => {

    const { state } = useContext(appContext);
    const { selectedJobJacket } = state.db;
    let { values, handleInputChange, emptyValues } = useHandleInputChange(
        pxRollSet.reduce((newObj, key) => ({
            ...newObj,
            [`${key}Weight`]: "",
            [`${key}Length`]: "",
            [`${key}Check`]: false
        }), {})
    );

    const collectForm = (values, rollSet) => (
        rollSet.map((position) => ({
            [`${position}Weight`]: values[`${position}Weight`],
            [`${position}Length`]: values[`${position}Length`],
            [`${position}Check`]: values[`${position}Check`]
        }))
    );

    useEffect(() => {
        console.log(values);
    }, [values]);

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
                <ReportPXFinishedProduct
                    jobJacketKey={selectedJobJacket ? selectedJobJacket.jobJacketKey : null}
                    values={values}
                    handleInputChange={handleInputChange}
                />
                <Button onClick={() => {
                    console.log(collectForm(values, pxRollSet));
                    emptyValues();
                }}>Submit</Button>
            </div>
        </>
    );
};

export default AddFinishedProduct;