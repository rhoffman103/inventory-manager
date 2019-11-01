import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import FormControl from 'react-bootstrap/FormControl';

const AddFinishedProduct = ({ line }) => {
    const { state, stateDispatch } = useContext(appContext);
    const { schedule, selectedJobJacket } = state.db;

    const setSelectJobJacket = (jobJacket) => {
        stateDispatch({
            type: 'SELECT_JOB_JACKET',
            jobJacket
        });
    };

    useEffect(() => {
        schedule && setSelectJobJacket(schedule[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schedule]);

    return (
        <>
            <h1>{line}: Add New Rolls</h1>
            <div>
                { selectedJobJacket &&
                    <h5>Select Job Jacket: {`${selectedJobJacket.customer}: ${selectedJobJacket.id}`}</h5>
                }
                { schedule &&
                    <FormControl
                        as="select"
                        className='br-sharp'
                        onChange={(e) => setSelectJobJacket(schedule[e.target.value])}
                    >
                        { schedule.map((jobJacket, index) => (
                            <option
                                key={jobJacket.jobJacketKey}
                                value={index}
                            >
                                {jobJacket.customer}: {jobJacket.id}
                            </option>
                        ))}
                    </FormControl>
                }
            </div>
        </>
    );
};

export default AddFinishedProduct;