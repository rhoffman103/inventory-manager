import React, { useReducer, useEffect, useContext } from 'react';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import { checkValidEmail, compareEmails, checkPasswordStrength, checkMatchingPasswords } from '../../../actions/authFormActions';
import formReducer from '../../../reducers/formReducer';
import useModal from '../../../hooks/useModal';
import ModalContainer from '../Modals/ModalContainer';
import Form from 'react-bootstrap/Form';
import FormField from './FormField';
import Button from 'react-bootstrap/Button';

const SignupForm = () => {

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
        closeModal();
    };

    useEffect(() => {
        const { email, confirmEmail, password, confirmPassword } = values;
        validateDispatch(checkValidEmail(email));
        validateDispatch(compareEmails(email, confirmEmail));
        validateDispatch(checkPasswordStrength(password));
        validateDispatch(checkMatchingPasswords(password, confirmPassword));
    }, [values]);

    return (
        <ModalContainer title='Register'>
            <Form>
                <FormField
                    controlId='formEmail'
                    name='email'
                    type='email'
                    label='Enter Email'
                    placeholder='Enter email'
                    inputChange={handleInputChange}
                    message={!validation.isEmail && values.email ? 'Invalid Email' : ''}
                />
                
                <FormField
                    controlId="formConfirmEmail"
                    name="confirmEmail"
                    type="email"
                    label='Confirm Email Address'
                    placeholder="Confirm Email"
                    inputChange={handleInputChange}
                    message={!validation.emailsMatch && values.confirmEmail ? 'Emails do not match' : ''}
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

                <Button
                    variant="primary"
                    type="button"
                    onClick={onSubmit}
                    disabled={!(validation.isEmail && validation.emailsMatch && validation.isPassword && validation.passwordsMatch)}
                >
                    Submit
                </Button>
            </Form>
        </ModalContainer>
    );
};

export default SignupForm;