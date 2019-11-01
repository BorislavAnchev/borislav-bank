import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({buttonText, onClick, 'data-testid': dataTestId}) => {
    return (
      <button onClick={onClick} className='btn btn-primary' data-testid={`${dataTestId} Primitive`}>
        {buttonText}
      </button>
    )
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  'data-testid': PropTypes.string.isRequired
}

Button.defaultProps = {
  onClick: () => {}
}
export default Button;