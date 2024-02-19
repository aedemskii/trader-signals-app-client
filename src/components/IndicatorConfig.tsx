import React from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import '../styles/IndicatorConfig.css';

export const IndicatorConfig = ({
  indicatorName,
  visible,
  toggleVisible,
}: {
  indicatorName: string,
  visible: boolean,
  toggleVisible: () => void,
}) => {
  const { darkTheme } = useThemeContext();

  return (
    <div className={`indicator-config ${darkTheme ? 'dark' : 'light'}`}>
      <div className='flex flex-gap-5'>
        <div 
          className={`indicator-config-control visible-control ${visible ? 'visible' : 'hidden'}`}
          onClick={toggleVisible}
          />
        <div className={`title ${visible ? 'crossed' : ''}`}>{indicatorName}</div>
      </div>
      <div className='flex flex-gap-5'>
        <div className='indicator-config-control settings-control' />
        <div className='indicator-config-control delete-control' />
      </div>
    </div>
  );
};