import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import { getDummySchedule } from '../../../actions/databaseActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Schedule = ({ line }) => {
    const { state, stateDispatch } = useContext(appContext);
    const { schedule } = state.db;

    useEffect(() => {
        getDummySchedule(stateDispatch);
    },[line, stateDispatch]);

    return(
        <div>
            <h1>{line} Shedule</h1>
            {schedule &&
                schedule.map((job => {
                    if (job.productionLine === line) {
                        return (
                            <Row>
                                <Col xs={12} lg={8}>
                                    <Card
                                        key={job.scheduleKey}
                                        body
                                        className='mb-3'
                                    >
                                        <h5>{job.customer} | {job.id}</h5>
                                        <p className='mb-1'>{job.description}</p>
                                        <p className='mb-1'>Total Rolls: {job.totalRolls} | Length: {job.rollLength}</p>
                                        <p className='mb-1'>Special Instructions</p>
                                        {job.instructions.length &&
                                            <ul>
                                                {job.instructions.map((instruction, index) => <li key={`${job.id}-instruction-${index}`}>{instruction}</li>)}
                                            </ul>
                                        }
                                    </Card>
                                </Col>
                            </Row>
                        );
                    }
                    else return (<></>);
                }))
            }
        </div>
    );
};

export default Schedule;