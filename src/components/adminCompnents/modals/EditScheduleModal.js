import React, { useContext, useState, useEffect } from 'react'
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import useModal from '../../../hooks/useModal';
import { removeFromSchedule } from '../../../actions/scheduleActions';
import ModalContainer from '../../common/Modals/ModalContainer';
import FormField from '../../common/Forms/FormField';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const EditScheduleModal = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { modal } = state;
    const { schedule } = state.db;
    const { data } = modal;
    const { values, handleInputChange, emptyValues } = useHandleInputChange();
    const { closeModal } = useModal();

    const [job, setJob] = useState({});

    const addInstruction = (instruction, jacketKey, schedule, emptyValues, stateDispatch) => {
        
        let updatedSchedule = schedule.map(job => {
            if (job.jobJacketKey === jacketKey) {
                let instructions = job.instructions || [];
                instructions.push(instruction);
                return { ...job, instructions };
            }
            else return job;
        });

        stateDispatch({
            type: 'EDIT_JOB_INSTRUCTIONS',
            updatedSchedule,
            jacketKey,
            changedJacket: { inSchedule: true }
        });

        emptyValues('instruction');
    };

    const deleteInstruction = ({jacketKey, index}, schedule, stateDispatch) => {
        let updatedSchedule = schedule.map(job => {
            if (job.jobJacketKey === jacketKey) {
                let instructions = Array.from(job.instructions);
                instructions.splice(index, 1);
                return { ...job, instructions };
            }
            else return job;
        });

        stateDispatch({
            type: 'EDIT_JOB_INSTRUCTIONS',
            updatedSchedule,
            jacketKey,
            changedJacket: { inSchedule: true }
        });
    };

    useEffect(() => {
        if (schedule && data)
        setJob(schedule.find(jacket => jacket.jobJacketKey === data.jobJacketKey));
    },[schedule, data]);

    return (
        modal.editScheduleModal 
        ?   <ModalContainer title={`Edit Job ${data.id} for ${data.customer}`} backdrop='static'>
                <Form>
                    <Row>
                        <Col xs={10}>
                            <FormField
                                label='Special Instructions'
                                name='instruction'
                                value={values.instruction || ''}
                                inputChange={handleInputChange}
                            />
                        </Col>
                        <Col xs={2} className='d-flex align-items-end'>
                            <Button
                                className='mb-3'
                                variant="success"
                                type="button"
                                disabled={!values.instruction}
                                onClick={() => addInstruction(values.instruction, data.jobJacketKey, state.db.schedule, emptyValues, stateDispatch)}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                    {job.instructions &&
                        <Row className='mb-3'>
                            <Col xs={12}><h4>Instructions</h4></Col>
                            {job.instructions.map((instruction, index) => (
                                <Col xs={12} key={`instruction-${index}`} className='border-top py-2'>
                                    <span>{index + 1}. {instruction}</span>
                                    <span
                                        onClick={() => deleteInstruction({ jacketKey: job.jobJacketKey, index}, schedule, stateDispatch)}
                                        className='text-danger underline-hover float-right pointer'
                                    >
                                        Delete
                                    </span>
                                </Col>
                            ))}
                        </Row>
                    }
                    <Row>
                        <Col className='border-top'>
                            <div className="mt-3">
                                <span
                                    className="pointer align-middle ml-2 text-danger underline-hover"
                                    onClick={() => {
                                        closeModal('editScheduleModal');
                                        removeFromSchedule(data, state.db, stateDispatch);
                                    }}
                                >
                                    Remove From Schedule
                                </span>
                                <Button
                                    className='float-right'
                                    variant="primary"
                                    type="button"
                                    onClick={() => closeModal('editScheduleModal')}
                                >
                                    Done
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </ModalContainer>
        :   <></>
    );
};

export default EditScheduleModal;