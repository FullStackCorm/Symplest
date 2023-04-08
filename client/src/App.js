import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Components //
import Header from './components/Header';
import NavbarTop from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';

// Pages //
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Medications from './pages/Medications';


function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path ='/register' element={<Register />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/medications' element={<Medications />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
