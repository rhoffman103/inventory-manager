import React from 'react';
import SelectJobJacket from '../productionCommon/SelectJobJacket';

const JobJacketProgress = () => {

    return (
        <div>
            <h2>Job Jacket Progress</h2>
            <SelectJobJacket redirectPath='/production/px/progress' />
        </div>
    );
};

export default JobJacketProgress;