import React, { useEffect, useRef } from 'react'

const CustomModal = ({ children, doOnCilckOutside }) => {
    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            doOnCilckOutside()
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);            
        };
    }, []);

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}

export default CustomModal