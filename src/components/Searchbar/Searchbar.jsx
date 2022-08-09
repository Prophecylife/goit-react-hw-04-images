import React from 'react';
import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s['SearchForm-button']}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={input}
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
