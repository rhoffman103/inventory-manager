import React, { useReducer, useEffect, useContext } from 'react';
import appContext from '../../../context/appContext';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import { checkValidEmail, checkPasswordStrength, checkMatchingPasswords } from '../../../actions/authFormActions';
import { checkHasInput, removeHasInput } from '../../../actions/formActions';
import formReducer from '../../../reducers/formReducer';
import { addNewEmployee } from '../../../actions/authActions';
import FormRequestModal from '../modals/FormRequestModal';
import useModal from '../../../hooks/useModal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormField from '../../common/Forms/FormField';
import Button from 'react-bootstrap/Button';

const SignupForm = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { values, handleInputChange, emptyValues } = useHandleInputChange({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        employeeId: ""
    });
    const [validation, validateDispatch] = useReducer(formReducer, {
        email: { hasHadInput: false },
        password: { hasHadInput: false },
        confirmPassword: { hasHadInput: false },
        firstName: { hasHadInput: false },
        lastName: { hasHadInput: false },
        employeeId: { hasHadInput: false }
    });
    const { showModal } = useModal();

    const clearForm = () => {
        emptyValues();
        validateDispatch(removeHasInput(validation));
    };
    
    const onSubmit = () => {
        addNewEmployee(values, state, stateDispatch)
        .then(() => {
            emptyValues();
            showModal();
            validateDispatch(removeHasInput(validation));
        })
        .catch((err) => showModal());
    };

    useEffect(() => {
        const { email, password, confirmPassword, firstName, lastName, employeeId } = values;
        validateDispatch(checkValidEmail({ value: email, hasHadInput: validation.email.hasHadInput }));
        validateDispatch(checkPasswordStrength({ value: password, hasHadInput: validation.password.hasHadInput }));
        validateDispatch(checkMatchingPasswords({ password, confirmPassword, hasHadInput: validation.confirmPassword.hasHadInput }));
        validateDispatch(checkHasInput({ key: 'firstName', value: firstName, hasHadInput: validation.firstName.hasHadInput, type: 'CHECK_HAS_INPUT' }));
        validateDispatch(checkHasInput({ key: 'lastName', value: lastName, hasHadInput: validation.lastName.hasHadInput, type: 'CHECK_HAS_INPUT' }));
        validateDispatch(checkHasInput({ key: 'employeeId', value: employeeId, hasHadInput: validation.employeeId.hasHadInput, type: 'CHECK_HAS_INPUT' }));
    }, [values]);

    return (
        <>
            <h1>Add New Employee</h1>
            <Row className="p-0 m-0">
                <Col xs={12} md={10} lg={8} className="p-0 m-0">
                    <Card>
                        <Card.Header>Add New Employee</Card.Header>
                        <Card.Body>
                            <Form className="overflow-scroll">
                                <FormField
                                    controlId='formEmail'
                                    value={values.email}
                                    name='email'
                                    type='email'
                                    label='Enter Email'
                                    placeholder='Enter email'
                                    inputChange={handleInputChange}
                                    message={validation.email.message}
                                />

                                <FormField
                                    controlId="formPassword"
                                    value={values.password}
                                    name="password"
                                    type="password"
                                    label='Password'
                                    placeholder="Password"
                                    inputChange={handleInputChange}
                                    message={validation.password.message}
                                />

                                <FormField 
                                    controlId="formConfirmPassword"
                                    value={values.confirmPassword}
                                    name="confirmPassword"
                                    type="password"
                                    label='Confirm Password'
                                    placeholder="Confirm Password"
                                    inputChange={handleInputChange}
                                    message={validation.confirmPassword.message}
                                />

                                <Row>
                                    <Col xs={12} sm={6}>
                                        <FormField 
                                            controlId="firstName"
                                            value={values.firstName}
                                            name="firstName"
                                            type="test"
                                            label='First Name'
                                            placeholder="First Name"
                                            inputChange={handleInputChange}
                                            message={validation.firstName.message}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <FormField 
                                            controlId="lastName"
                                            value={values.lastName}
                                            name="lastName"
                                            type="test"
                                            label='Last Name'
                                            placeholder="Last Name"
                                            inputChange={handleInputChange}
                                            message={validation.lastName.message}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <FormField 
                                            controlId="employeeId"
                                            value={values.employeeId}
                                            name="employeeId"
                                            type="number"
                                            label='Employee ID'
                                            placeholder="Employee ID"
                                            inputChange={handleInputChange}
                                            message={validation.employeeId.message}
                                        />
                                    </Col>
                                </Row>

                                <Form.Row>
                                    <Col>
                                        <div className="float-right">
                                            <Button
                                                variant="primary"
                                                type="button"
                                                onClick={onSubmit}
                                                disabled={!(validation.email.validated && validation.password.validated  && validation.confirmPassword.validated && !validation.firstName.message && !validation.lastName.message && !validation.employeeId.message)}
                                            >
                                                Submit
                                            </Button>

                                            <span 
                                                className="pointer align-middle ml-2"
                                                onClick={clearForm}
                                            >
                                                <u>cancel</u>
                                            </span>
                                        </div>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            { state.isModal && <FormRequestModal /> }
        </>
    );
};

export default SignupForm;