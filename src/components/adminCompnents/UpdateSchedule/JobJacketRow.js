import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import VerticalDragAndDropGrip from '../../common/Icons/VerticalDragAndDropGrip';

const JobJacketRow = ({ job, select, actionType, dragHandle, bg, draggableIcon }) => {
    
    const { state, stateDispatch } = useContext(appContext);

    return (
        <Row className={`border border-top-0 mx-0 py-2 products-list min-w-618 ${job.isSelected && 'selected-product'} ${bg}`}>
            <Col
                xs={1}
                className='border-right'
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
                <span className='underline mr-3'>{actionType}</span>
                { draggableIcon && <VerticalDragAndDropGrip dragHandle={dragHandle} /> }
            </Col>
        </Row>
    );
};

export default JobJacketRow;