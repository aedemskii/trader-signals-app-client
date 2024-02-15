import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './hooks/useThemeContext';

import AuthPage from './components/AuthPage';
import Home from './components/Home';


function App() {
  return (
    <>
      <Router>
        <ThemeContextProvider>
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<AuthPage />} />
          </Routes>
        </ThemeContextProvider>
      </Router>
    </>
  );
}

export default App;
