import React, { useReducer, useEffect, useContext } from 'react';
import appContext from '../../context/appContext';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import { checkValidEmail } from '../../actions/authFormActions';
import { signIn } from '../../actions/authActions';
import useModal from '../../hooks/useModal';
import ModalContainer from '../common/Modals/ModalContainer';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FormField from '../common/Forms/FormField';
import Button from 'react-bootstrap/Button';
import formReducer from '../../reducers/formReducer';

const LoginForm = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { values, handleInputChange, emptyValues } = useHandleInputChange({
        email: '',
        password: ''
    });
    const [validation, validationDispatch] = useReducer(formReducer, {email: {}});
    const { loginError, displayName } = state.auth;
    const { closeModal } = useModal();

    const onSubmit = (e) => {
        if (validation.isEmail && e.which === 13) signIn(values, stateDispatch);
        else if (!e.which) signIn(values, stateDispatch);
    };

    useEffect(() => {
        validationDispatch(checkValidEmail({ value: values.email }));
    }, [values.email]);

    useEffect(() => {
        if (loginError || displayName) emptyValues('email password');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginError, displayName]);

    return (
        state.modal.login
        ?
            <ModalContainer title='Login'>
                <Form onKeyPress={onSubmit}>
                    <FormField
                        controlId='formEmail'
                        name='email'
                        type='email'
                        value={values.email}
                        label='Enter Email'
                        placeholder='Enter Email'
                        inputChange={handleInputChange}
                    />

                    <FormField
                        controlId="formPassword"
                        name="password"
                        type="password"
                        value={values.password}
                        label='Password'
                        placeholder="Password"
                        inputChange={handleInputChange}
                    />

                    {loginError &&
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
                                    disabled={!validation.email.validated}
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
        :   <></>
    );
};

export default LoginForm;