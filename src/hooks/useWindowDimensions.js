import { useState, useEffect } from 'react';

const useWindowDimensions = () => {

    const [windowDimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const handleDimensions = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleDimensions);
        return () => window.removeEventListener('resize', handleDimensions);
    }, []);

    return windowDimensions;
};

export default useWindowDimensions;