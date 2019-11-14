import React, { useContext, useEffect, useState } from 'react';
import appContext from '../../../../context/appContext';
import { Redirect, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

const SelectJobJacket = ({ redirectPath }) => {
    const { state, stateDispatch } = useContext(appContext);
    const { schedule, selectedJobJacket } = state.db;
    const { jacketId } = useParams();
    const [ selectedId, setSelectedId ] = useState(jacketId ? jacketId : '');
    
    const setSelectJobJacket = (jobJacket) => {
        stateDispatch({
            type: 'SELECT_JOB_JACKET',
            jobJacket
        });
    };

    useEffect(() => {
        if (jacketId && schedule) setSelectJobJacket(schedule.find((jacket) => jacket.id === jacketId));
        else if (schedule && !selectedJobJacket) setSelectedId(schedule[0].id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schedule, jacketId]);

    return (
        <div>
            { selectedId && <Redirect to={`${redirectPath}/${selectedId}`} /> }
            
            { selectedJobJacket &&
                <h5>
                    Current Job Jacket: {`${selectedJobJacket.customer} - ${selectedJobJacket.id}`}
                </h5>
            }
            <Row>
                { schedule &&
                    <Col xs={8} sm={5}>
                        <FormControl
                            as="select"
                            className='br-sharp'
                            onChange={(e) => setSelectedId(e.target.value)}
                        >
                            { schedule.map((jobJacket, index) => (
                                <option
                                    key={jobJacket.jobJacketKey}
                                    value={jobJacket.id}
                                >
                                    {jobJacket.customer}: {jobJacket.id}
                                </option>
                            ))}
                        </FormControl>
                    </Col>
                }
            </Row>
        </div>
    );
};

export default SelectJobJacket;