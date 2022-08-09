import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.Button}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
