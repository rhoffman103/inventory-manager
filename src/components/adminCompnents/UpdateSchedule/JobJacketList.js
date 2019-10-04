import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck';

const JobJacketList = ({ title, jobType, select }) => {
    const { state } = useContext(appContext);
    const jobs = state.db[jobType];

    return (
        jobs
        ?   <div className='products-grid overflow-auto'>
                <h4>{title}</h4>
                <Row className='dark-theme border mx-0 py-2 min-w-618'>
                    <Col xs={1} className='border-right'>{select ? 'Order' : ''}</Col>
                    <Col xs={2} className='border-right'>Company</Col>
                    <Col xs={3} className='border-right'>Description</Col>
                    <Col xs={2} className='border-right'>Due Date</Col>
                    <Col xs={2} className='border-right'>Jacket ID</Col>
                    <Col xs={1}>{select}</Col>
                </Row>
                
                {jobs.map((job, index) => {
                    return (
                        <Row
                            key={job.dbId}
                            className={`border border-top-0 mx-0 products-list min-w-618 ${job.isSelected && 'selected-product'}`}
                        >
                            <Col
                                xs={1}
                                className='border-right'
                                onClick={() => console.log(job.dbId)}
                            >
                                <span>{index + 1}</span>
                            </Col>
                            <Col xs={2} className='border-right'>{job.customer}</Col>
                            <Col xs={3} className='border-right'>{job.description}</Col>
                            <Col xs={2} className='border-right'>{moment(job.dueDate, 'x').format('MM Do YYYY')}</Col>
                            <Col xs={2} className='border-right'>{job.id}</Col>
                            <Col
                                xs={2}
                                className='cursor-pointer'
                                onClick={() => console.log(job.dbId)}
                            >
                                <span className='underline'>{select}</span>
                            </Col>
                        </Row>
                    );
                })}
            </div>
        :   <></>
    );
};

export default JobJacketList;