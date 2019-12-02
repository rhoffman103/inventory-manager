import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import SelectJobJacket from '../productionCommon/SelectJobJacket';
import ProductProgressGrid from './ProductProgressGrid';

const JobJacketProgress = () => {
    const { state } = useContext(appContext);
    const { selectedJobJacket } = state.db;
    const { reportedProducts } = selectedJobJacket || [];

    return (
        <div>
            <h2>Job Jacket Progress</h2>

            <SelectJobJacket redirectPath='/production/px/progress' />

            { reportedProducts &&
                <div className='mt-3'> 
                    <h5 className='mb-3'>
                        Finished Product: {selectedJobJacket.finishedRollCount}
                    </h5>
                    <ProductProgressGrid reportedProducts={reportedProducts} />

                    <h5 className='mb-3'>
                        Rework: { selectedJobJacket.totalRollCount - selectedJobJacket.finishedRollCount }
                    </h5>
                    <ProductProgressGrid reportedProducts={reportedProducts} needsRework={true} />
                </div>
            }
        </div>
    );
};

export default JobJacketProgress;