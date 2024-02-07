import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './components/AuthPage';
import AssetsPage from './components/AssetsPage';
import AssetDetailsPage from './components/AssetDetailsPage';


function App() {  
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/assets' element={<AssetsPage />} />
          <Route path='/assets/:assetName/:timeframe' element={<AssetDetailsPage />} />
          <Route path='*' element={<AuthPage />} />
        </Routes>
      </div>
    </Router>    
  );
}

export default App;
