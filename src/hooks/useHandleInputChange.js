import { useState } from 'react';

const useHandleInputChange = (initial) => {
    const [values, setValue] = useState(initial || {});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue({ ...values, [name]: value });
    };
    return { values, handleInputChange };
};

export default useHandleInputChange;