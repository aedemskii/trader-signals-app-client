import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/ControlPanel.css';

export const ControlPanel = () => {
  const navigate = useNavigate();
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  const logOut = () => {
    navigate('/auth');
  };

  return (
    <div className='control-panel'>
      <div className='title'>Trading acolyte</div>
      <div className='controls'>
        <div
          className={`control theme ${darkTheme ? 'dark' : 'light'}`}
          onClick={toggleTheme}
        />
        <div className='control log-out' onClick={logOut} />
      </div>
    </div>
  );
};
