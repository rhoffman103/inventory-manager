import { useState } from 'react';

const useHandleInputChange = (initial) => {
    const [values, setValue] = useState(initial || {});
    
    const resetValues = (arr) => {
        let obj = {};
        arr.forEach((key) => obj[key] = "");
        return obj;
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue({ ...values, [name]: value });
    };

    const emptyValues = (keys) => {
        
        if (keys) {
            let newObj;
            if (typeof keys === 'string') {
                const keysArr = keys.split(' ');
                newObj = resetValues(keysArr);
            }
            else newObj = resetValues(keys);

            setValue({ ...values, ...newObj });
        }

        else setValue({ ...resetValues(Object.keys(values)) });
    
    };
    return { values, handleInputChange, emptyValues };
};

export default useHandleInputChange;