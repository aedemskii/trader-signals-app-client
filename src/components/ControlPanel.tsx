import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';
import '../styles/ControlPanel.css';

export const ControlPanel = () => {
  const navigate = useNavigate();
  const { darkTheme, toggleTheme } = useThemeContext();

  const logOut = () => {
    navigate('/auth');
  };

  return (
    <div className={`control-panel ${darkTheme ? 'dark' : 'light'}`}>
      <div className='title'>Trading acolyte</div>
      <div className='controls'>
        <div
          className='control theme'
          onClick={toggleTheme}
        />
        <div className='control log-out' onClick={logOut} />
      </div>
    </div>
  );
};
