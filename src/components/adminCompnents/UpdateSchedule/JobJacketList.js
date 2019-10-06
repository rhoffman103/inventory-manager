import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const JobJacketList = ({ title, jobType, select, actionType, inSchedule }) => {
    const { state, stateDispatch } = useContext(appContext);
    const jobs = state.db[jobType];

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
                
                {jobs.map((job, index) => {
                    if (inSchedule === job.inSchedule)
                    return (
                        <Row
                            key={job.dbId || `${job.id}-${index}`}
                            className={`border border-top-0 mx-0 products-list min-w-618 ${job.isSelected && 'selected-product'}`}
                        >
                            <Col
                                xs={1}
                                className='border-right'
                                onClick={() => console.log(job.dbId)}
                            >
                                <span>{job.position ? job.position : 0}</span>
                            </Col>
                            <Col xs={2} className='border-right'>{job.customer}</Col>
                            <Col xs={3} className='border-right'>{job.description}</Col>
                            <Col xs={2} className='border-right'>{moment(job.dueDate, 'x').format('MMM Do YYYY')}</Col>
                            <Col xs={2} className='border-right'>{job.id || job.jacketId}</Col>
                            <Col
                                xs={2}
                                className='cursor-pointer'
                                onClick={() => select(job, state.db, stateDispatch)}
                            >
                                <span className='underline'>{actionType}</span>
                            </Col>
                        </Row>
                    );
                })}
            </div>
        :   <></>
    );
};

export default JobJacketList;