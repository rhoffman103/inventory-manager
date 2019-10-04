import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const JobJacketList = () => {
    const { state } = useContext(appContext);
    const { jobJackets } = state.db;

    return (
        <Row>
        {   jobJackets
            ?   jobJackets.map(job => {
                    return (
                        <React.Fragment key={job.id}>
                            <Col xs={6} md={3}>{job.customer}</Col>
                            <Col xs={6} md={3}>Due: {moment(job.dueDate, 'x').format('MM Do YYYY')}</Col>
                            <Col xs={6} md={2}>PO: {job.purchaseOrder}</Col>
                            <Col xs={6} md={4}>{job.description}</Col>
                        </React.Fragment>
                    );
                })
            :   <></>
        }
        </Row>
    );
};

export default JobJacketList;