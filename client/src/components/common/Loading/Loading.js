import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = ({ loader }) => {

    const [spinnerTwo, setSpinnerTwo] = useState(false);
    const [spinnerThree, setSpinnerThree] = useState(false);

    const delaySpinner = (time, callback) => {
        return setTimeout(() => {
            callback(true);
        }, time);
    };

    useEffect(() => {
        let timerIdOne, timerIdTwo;
        timerIdOne = delaySpinner(200, setSpinnerTwo);
        timerIdTwo = delaySpinner(400, setSpinnerThree);

        return () => {
            clearTimeout(timerIdOne);
            clearTimeout(timerIdTwo);
        }
    }, []);

    return (
        loader
        ?   <>
                <span>Loading</span>
                <Spinner animation="grow" size="sm" role="status" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
                { spinnerTwo && <Spinner animation="grow" size="sm" /> }
                { spinnerThree && <Spinner animation="grow" size="sm" /> }
            </>
        :   <></>
    );
};

export default Loading;