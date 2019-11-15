import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ type, className, value, onChange, placeholder, 'data-testid': dataTestId }) => {
    return (
        <input type={type} className={className} value={value} onChange={onChange} placeholder={placeholder} data-testid={`${dataTestId} Primitive`}/>
    )
}

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    'data-testid': PropTypes.string.isRequired
};

export default InputField;