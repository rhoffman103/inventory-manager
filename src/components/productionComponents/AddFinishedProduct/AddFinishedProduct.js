import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Button from 'react-bootstrap/Button';
import SelectJobJacket from '../productionCommon/SelectJobJacket';
import ReportPXFinishedProduct from './ReportPXFinishedProduct';
import { pxRollSet, rollLength, rollWeight, needsRework } from '../../../constants/pxConstants';
import dbReportProduction from '../../../database/reportProductionAccess';
import { collectProductionForm } from '../../../actions/pxProductionActions';

const AddFinishedProduct = ({ line }) => {

    const { state } = useContext(appContext);
    const { selectedJobJacket } = state.db;
    let { values, handleInputChange, emptyValues } = useHandleInputChange({
        ...pxRollSet.reduce((newObj, postion) => ({
            ...newObj,
            [`${postion}_${rollWeight}`]: "",
            [`${postion}_${rollLength}`]: "",
            [`${postion}_${needsRework}`]: false
        }), {}),
        lineSpeed: ""
    });

    const submitForm = () => {
        dbReportProduction.pxAddFinishedProduct(collectProductionForm(values, pxRollSet), selectedJobJacket.jobJacketKey);
        emptyValues();
    };

    return (
        <>
            <h1>{line}: Add New Rolls</h1>
            <div>
                <SelectJobJacket redirectPath={'/production/px/add-new-rolls'} />
                <ReportPXFinishedProduct
                    jobJacketKey={selectedJobJacket ? selectedJobJacket.jobJacketKey : null}
                    values={values}
                    handleInputChange={handleInputChange}
                />
                <Button onClick={submitForm}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default AddFinishedProduct;