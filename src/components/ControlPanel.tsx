import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../hooks/ThemeContext';
import '../styles/ControlPanel.css';

export const ControlPanel = () => {
  const navigate = useNavigate();
  const themeContext = useThemeContext();
  if (themeContext === null) {
    throw new Error('Theme context is null');
  }
  const { darkTheme, toggleTheme } = themeContext;

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
