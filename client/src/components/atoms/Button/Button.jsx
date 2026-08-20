import React from 'react';
import './Button.css';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    title = '',
    type = 'button'
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            {children}
        </button>
    );
};

export default Button;