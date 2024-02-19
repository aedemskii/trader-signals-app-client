import React, { useEffect, useState, useRef } from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import '../styles/Select.css';

export const Select = (
    {
      onChange,
      values,
      selectedValue
    } : {
      onChange: (value: string) => void,
      values: { [key: string]: string };
      selectedValue: string
    }
  ) => {

  const { darkTheme } = useThemeContext();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [ selectionOn, setSelectionOn ] = useState(false);
  const longestValue = getLongestValue(values);

  useEffect(() => {
    const cancelSelect = (e: MouseEvent) => {
      e.stopPropagation();
      if (selectRef.current && !selectRef.current.contains(e.target as Node))
        setSelectionOn(false);
    };
    document.addEventListener('click', cancelSelect)

    return(() => {
      window.removeEventListener('click', cancelSelect);
    })
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectionOn(!selectionOn);
  };

  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent;
    if (value === null) {
      throw new Error('Error in Select component');
    }
    onChange(value);
    setSelectionOn(false);
  };

  return (
    <div 
      className={`select-control ${darkTheme ? 'dark' : 'light'} ${selectionOn ? 'select-on' : ''}`}
      ref={selectRef}
      >
      <div
        className='select'
        onClick={handleClick}
        >
        <div className='dummy'>{longestValue}</div>
        <div className='value'>{selectedValue}</div>
      </div>
      {selectionOn &&
        <div className='select-menu-holder'>
          <div className='select-menu'>
            {Object.keys(values).map(key => {
              let className = 'select-menu-item';
              if (values[key] === selectedValue)
                className += ' ' + 'selected'
              return(
                <div 
                  className={className} 
                  key={key}
                  onClick={handleChange}
                  >
                    {values[key]}
                </div>
              );
          })}
          </div>
        </div>
      }
    </div>
  );
};

const getLongestValue = (values: {[key: string]: string}): string => {
  let res = '';
  Object.keys(values).forEach(key => {
    if (values[key].length > res.length)
      res = values[key];
  });
  return res;
};