import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

const SelectJobJacket = () => {
    const { state, stateDispatch } = useContext(appContext);
    const { schedule } = state.db;

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
        <Row>
            { schedule &&
                <Col xs={8} sm={5}>
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
                </Col>
            }
        </Row>
    );
};

export default SelectJobJacket;