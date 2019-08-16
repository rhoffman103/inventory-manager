import { useState } from 'react';

const useHandleInputChange = (initial) => {
    const [values, setValue] = useState(initial || {});
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue({ ...values, [name]: value });
    };

    const emptyValues = (keys) => {
        let newObj = {}
        const setNewObj = (arr) => {
            arr.forEach((key) => {
                newObj[key] = ''
            });
        };
        
        if (keys) {
            if (typeof keys === 'string') {
                const keysArr = keys.split(' ');
                setNewObj(keysArr);
            }
            else setNewObj(keys);
        }

        else setNewObj(Object.keys(values));
    
        setValue({ ...values, ...newObj });
    };
    return { values, handleInputChange, emptyValues };
};

export default useHandleInputChange;