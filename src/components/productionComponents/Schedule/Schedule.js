import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import Loading from '../../common/Loading/Loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Schedule = ({ line }) => {
    const { state } = useContext(appContext);
    const { schedule } = state.db;

    return(
        <div>
            <h1>{line} Shedule</h1>
            <Loading loader={state.components.showLoadingWheel && !schedule} />
            {schedule &&
                schedule.map((job => {
                    if (job.productionLine === line) {
                        return (
                            <Row key={job.scheduleKey}>
                                <Col xs={12} lg={8}>
                                    <Card
                                        body
                                        className='mb-3'
                                    >
                                        <h5>{job.customer} | {job.id}</h5>
                                        <p className='mb-1'>{job.description}</p>
                                        <p className='mb-1'>Total Rolls: {job.totalRolls} | Length: {job.rollLength}</p>
                                        {job.instructions.length > 0 &&
                                            <>
                                                <p className='mb-1'>Special Instructions</p>
                                                <ul>
                                                    {job.instructions.map((instruction, index) => (
                                                        <li key={`${job.id}-instruction-${index}`}>
                                                            {instruction}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        }
                                    </Card>
                                </Col>
                            </Row>
                        );
                    }
                    else return (<React.Fragment key={`${job.scheduleKey}-other-line`} />);
                }))
            }
        </div>
    );
};

export default Schedule;