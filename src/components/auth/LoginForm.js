import React, { useReducer, useEffect, useContext } from 'react';
import appContext from '../../context/appContext';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import { checkValidEmail } from '../../actions/authFormActions';
import { signIn, resetLoginError } from '../../actions/authActions';
import useModal from '../../hooks/useModal';
import ModalContainer from '../common/Modals/ModalContainer';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FormField from '../common/Forms/FormField';
import Button from 'react-bootstrap/Button';
import formReducer from '../../reducers/formReducer';

const LoginForm = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { values, handleInputChange } = useHandleInputChange({
        email: '',
        password: ''
    });
    const [validation, validationDispatch] = useReducer(formReducer, false);
    const { closeModal } = useModal();

    const onSubmit = () => {
        console.log('Login Credentails: ', values);
        signIn(values, stateDispatch);
    };

    useEffect(() => {
        validationDispatch(checkValidEmail(values.email));
    }, [values.email]);

    useEffect(() => {
        return () => resetLoginError(stateDispatch);
    }, [stateDispatch]);

    return (
        <ModalContainer title='Login' footer={false}>
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

                {!state.auth
                    ?   <></>
                    :   state.auth.loginError &&
                        <Form.Row className="justify-content-center">
                            <p className="text-danger">Incorrect Login Credentails!</p>
                        </Form.Row>
                }

                <Form.Row>
                    <Col>
                        <div className="float-right">
                            <Button
                                variant="primary"
                                type="button"
                                onClick={onSubmit}
                                disabled={!validation.isEmail}
                            >
                                Login
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
        </ModalContainer>
    )
};

export default LoginForm;