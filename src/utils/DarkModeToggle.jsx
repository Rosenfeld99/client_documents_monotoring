import React from 'react';
import { useTheme } from '../context/ThemeProvider';

const DarkModeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded"
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};

export default DarkModeToggle;
