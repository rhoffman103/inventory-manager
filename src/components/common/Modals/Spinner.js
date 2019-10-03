import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import * as SpinWheel from 'react-bootstrap/Spinner';

const Spinner = () => {

    const { state } = useContext(appContext);

    return (
        state.modal.spinner
        ?   <div className="fade modal-backdrop show modal-dialog-centered justify-content-center">
                <SpinWheel className="" animation="border" variant="primary" />
            </div>
        :   <></>
    );
};

export default Spinner;