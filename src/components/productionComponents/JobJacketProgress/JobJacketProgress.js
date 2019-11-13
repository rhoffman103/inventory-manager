import React from 'react';
import { useParams } from 'react-router-dom';

const JobJacketProgress = () => {

    const { jacketKey } = useParams();

    return (
        <div>
            <h2>Job Jacket Progress</h2>
            { jacketKey
                ? <p>Jacket Key: {jacketKey}</p>
                : <></>
            }
        </div>
    );
};

export default JobJacketProgress;