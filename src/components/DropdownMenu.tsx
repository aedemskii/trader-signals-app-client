import React, { useState, useEffect, useRef } from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import '../styles/DropdownMenu.css';

export const DropdownMenu = ({title, children} : {title: string, children: React.ReactNode[]}) => {
  const { darkTheme } = useThemeContext();
  const [ dropdownOn, setDropdownOn ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cancelDropdown = (e: MouseEvent) => {
      e.stopPropagation();
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setDropdownOn(false);
    };
    document.addEventListener('click', cancelDropdown)

    return(() => {
      window.removeEventListener('click', cancelDropdown);
    })
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setDropdownOn(!dropdownOn);
  };

  return (
    <div 
      className={`dropdown-menu-container ${darkTheme ? 'dark' : 'light'} ${dropdownOn ? 'dropdown-on' : ''}`}
      ref={dropdownRef}
      >
      <div 
        className='dropdown-menu-title'
        onClick={handleClick}
        >
        {title}
      </div>
      {dropdownOn && children &&
        <div className='dropdown-menu'>
          {children.map((child, idx) => (
              <div 
                className='dropdown-menu-item'
                key={idx}
                >
                {child}
              </div>
            ))}
        </div>
      }
    </div>
  );
};