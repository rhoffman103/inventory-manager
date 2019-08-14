import React, { useReducer, useEffect } from 'react';
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import { checkValidEmail } from '../../../actions/authFormActions';
import useModal from '../../../hooks/useModal';
import ModalContainer from '../Modals/ModalContainer';
import Form from 'react-bootstrap/Form';
import FormField from './FormField';
import Button from 'react-bootstrap/Button';
import formReducer from '../../../reducers/formReducer';

const LoginForm = () => {

    const { values, handleInputChange } = useHandleInputChange({
        email: '',
        password: ''
    });
    const [validation, validationDispatch] = useReducer(formReducer, false);
    const { closeModal } = useModal();

    const onSubmit = () => {
        console.log('Login Credentails: ', values);
        closeModal();
    };

    useEffect(() => {
        validationDispatch(checkValidEmail({ key: 'isEmail', value: values.email }));
    }, [values.email]);

    return (
        <ModalContainer title='Login'>
            <Form>
                <FormField
                    controlId='formEmail'
                    name='email'
                    type='email'
                    label='Enter Email'
                    placeholder='Enter Email'
                    inputChange={handleInputChange}
                />

                <FormField
                    controlId="formPassword"
                    name="password"
                    type="password"
                    label='Password'
                    placeholder="Password"
                    inputChange={handleInputChange}
                />

                <Button
                    variant="primary"
                    type="button"
                    onClick={onSubmit}
                    disabled={!validation.isEmail}
                >
                    Login
                </Button>
            </Form>
        </ModalContainer>
    )
};

export default LoginForm;