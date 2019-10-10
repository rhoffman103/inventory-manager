import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import DroppableJobJackets from './DroppableJobJackets';
import JobJacketRow from './JobJacketRow';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const JobJacketList = ({ title, jobType, select, actionType, inSchedule }) => {
    const { state } = useContext(appContext);
    const jobs = state.db[jobType];
    const jackets = state.db[jobType];

    return (
        jobs
        ?   <div className='products-grid overflow-auto'>
                <h4>{title}</h4>
                <Row className='dark-theme border mx-0 py-2 min-w-618'>
                    <Col xs={1} className='border-right'>{'#'}</Col>
                    <Col xs={2} className='border-right'>Company</Col>
                    <Col xs={3} className='border-right'>Description</Col>
                    <Col xs={2} className='border-right'>Due Date</Col>
                    <Col xs={2} className='border-right'>Jacket ID</Col>
                    <Col xs={1}>{actionType}</Col>
                </Row>

                {inSchedule
                ?   <DroppableJobJackets
                        jobs={jobs}
                        select={select}
                        actionType={actionType}
                    />
                :   jackets.map((jacket, index) => (
                        !jacket.inSchedule
                        ?   <JobJacketRow
                                key={`jacketKey-${jacket.id}-${index}`}
                                job={jacket}
                                index={index}
                                select={select}
                                actionType={actionType}
                            />
                        :   <React.Fragment key={`fragmentKeyNonSchedule-${jacket.id}-${index}`}></React.Fragment>
                ))}
            </div>
        :   <></>
    );
};

export default JobJacketList;