import React, { useReducer, useEffect, useContext } from 'react';
import appContext from '../../context/appContext';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import { checkValidEmail, compareEmails, checkPasswordStrength, checkMatchingPasswords, checkHasInput } from '../../actions/authFormActions';
import formReducer from '../../reducers/formReducer';
import useModal from '../../hooks/useModal';
import { addNewEmployee } from '../../actions/authActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormField from '../common/Forms/FormField';
import Button from 'react-bootstrap/Button';

const SignupForm = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { values, handleInputChange } = useHandleInputChange({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });
    const { closeModal } = useModal();
    const [validation, validateDispatch] = useReducer(formReducer, {});
    
    const onSubmit = () => {
        console.log('Form Credentails: ', values);
        addNewEmployee(values, state, stateDispatch);
        closeModal();
    };

    useEffect(() => {
        const { email, confirmEmail, password, confirmPassword, firstName, lastName, employeeId } = values;
        validateDispatch(checkValidEmail(email));
        validateDispatch(compareEmails(email, confirmEmail));
        validateDispatch(checkPasswordStrength(password));
        validateDispatch(checkMatchingPasswords(password, confirmPassword));
        validateDispatch(checkHasInput({ value: firstName, msgName: 'firstNameMsg', validator: 'isFirstName', type: 'CHECK_FIRST_NAME' }));
        validateDispatch(checkHasInput({ value: lastName, msgName: 'lastNameMsg', validator: 'isLastName', type: 'CHECK_LAST_NAME' }));
        validateDispatch(checkHasInput({ value: employeeId, msgName: 'employeeIdMsg', validator: 'isEmployeeId', type: 'CHECK_EMPLOYEE_ID' }));
    }, [values]);

    return (
        <Row className="p-0 m-0">
            <Col xs={12} md={10} lg={8} className="p-0 m-0">
                <Card>
                    <Card.Header>Add New Employee</Card.Header>
                    <Card.Body>
                        <Form className="overflow-scroll">
                            <FormField
                                controlId='formEmail'
                                name='email'
                                type='email'
                                label='Enter Email'
                                placeholder='Enter email'
                                inputChange={handleInputChange}
                                message={!validation.isEmail && values.email ? 'Invalid Email' : null}
                            />

                            <FormField
                                controlId="formPassword"
                                name="password"
                                type="password"
                                label='Password'
                                placeholder="Password"
                                inputChange={handleInputChange}
                                message={validation.passwordMsg}
                            />

                            <FormField 
                                controlId="formConfirmPassword"
                                name="confirmPassword"
                                type="password"
                                label='Confirm Password'
                                placeholder="Confirm Password"
                                inputChange={handleInputChange}
                                message={validation.confirmPassMsg}
                            />

                            <Row>
                                <Col xs={12} sm={6}>
                                    <FormField 
                                        controlId="firstName"
                                        name="firstName"
                                        type="test"
                                        label='First Name'
                                        placeholder="First Name"
                                        inputChange={handleInputChange}
                                        message={validation.firstNameMsg}
                                    />
                                </Col>
                                <Col xs={12} sm={6}>
                                    <FormField 
                                        controlId="lastName"
                                        name="lastName"
                                        type="test"
                                        label='Last Name'
                                        placeholder="Last Name"
                                        inputChange={handleInputChange}
                                        message={validation.lastNameMsg}
                                    />
                                </Col>
                            </Row>

                            <FormField 
                                controlId="employeeId"
                                name="employeeId"
                                type="number"
                                label='Employee ID'
                                placeholder="Employee ID"
                                inputChange={handleInputChange}
                                message={validation.employeeIdMsg}
                            />

                            <Form.Row>
                                <Col>
                                    <div className="float-right">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        onClick={onSubmit}
                                        disabled={!(validation.isEmail && validation.isPassword  && validation.passwordsMatch && validation.isFirstName && validation.isLastName && validation.isEmployeeId)}
                                    >
                                        Submit
                                    </Button>

                                        <span 
                                            className="pointer align-middle ml-2"
                                            onClick={closeModal}
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
    );
};

export default SignupForm;