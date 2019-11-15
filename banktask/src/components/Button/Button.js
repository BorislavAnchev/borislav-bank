import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({children, onClick, 'data-testid': dataTestId}) => {
    return (
      <button onClick={onClick} className='btn btn-primary' data-testid={`${dataTestId} Primitive`}>
        {children}
      </button>
    )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  'data-testid': PropTypes.string.isRequired
}

Button.defaultProps = {
  children: 'Button',
  onClick: () => {}
}
export default Button;