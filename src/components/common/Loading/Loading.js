import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {

    let timerIdOne, timerIdTwo;
    const [spinnerTwo, setSpinnerTwo] = useState(false);
    const [spinnerThree, setSpinnerThree] = useState(false);

    const delaySpinner = (time, callback) => {
        return setTimeout(() => {
            callback(true);
        }, time);
    };

    useEffect(() => {
        timerIdOne = delaySpinner(200, setSpinnerTwo);
        timerIdTwo = delaySpinner(400, setSpinnerThree);

        return () => {
            clearTimeout(timerIdOne);
            clearTimeout(timerIdTwo);
        }
    }, []);

    return (
        <>
            <span>Loading</span>
            <Spinner animation="grow" size="sm" role="status" >
                <span className="sr-only">Loading...</span>
            </Spinner>
            { spinnerTwo && <Spinner animation="grow" size="sm" /> }
            { spinnerThree && <Spinner animation="grow" size="sm" /> }
        </>
    );
};

export default Loading;