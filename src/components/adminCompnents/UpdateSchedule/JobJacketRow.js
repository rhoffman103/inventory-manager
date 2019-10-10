import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const JobJacketRow = ({ job, index, select, actionType, dragHandle }) => {
    
    const { state, stateDispatch } = useContext(appContext);

    return (
        <Row className={`border border-top-0 mx-0 products-list min-w-618 ${job.isSelected && 'selected-product'}`}>
            <Col
                xs={1}
                className='border-right'
                onClick={() => console.log(job.dbId)}
                {...dragHandle}
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
};

export default JobJacketRow;