import React from 'react';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import useModal from '../../hooks/useModal';
import ModalContainer from '../common/Modals/ModalContainer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignupForm = () => {

    const { values, handleInputChange } = useHandleInputChange({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });

    const { closeModal } = useModal();

    const onSubmit = () => {
        console.log('signup form: ', values);
        closeModal();
    };

    return (
        <ModalContainer>
            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmEmail">
                    <Form.Label>Confirm Email Address</Form.Label>
                    <Form.Control
                        name="confirmEmail"
                        type="email"
                        placeholder="Confirm Email"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="button"
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </ModalContainer>
    );
};

export default SignupForm;