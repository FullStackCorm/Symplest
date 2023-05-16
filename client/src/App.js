import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// Components //
import Header from './components/Header';
import NavbarTop from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';

// Pages //
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Notes from './pages/Notes';
import Medications from './pages/Medications';
import Events from './pages/Events';
import Symptoms from './pages/Symptoms';
import NoPage from './pages/NoPage';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3d3737', // mid brown
        light: '#524747', // light brown
        dark: '#343232', // darkest brown
        contrastText: '#cbc0c0' // light brown-gray
      },
      secondary: {
        main: '#e89d9d', // pink
        contrastText: 'c69f9f' // pink-brown
      },
      text: {
        main: '#f8f8f8' // whiteish
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path ='/register' element={<Register />} />
              <Route path='/appointments' element={<Appointments />} />
              <Route path='/notes' element={<Notes />} />
              <Route path='/medications' element={<Medications />} />
              <Route path='/events' element={<Events />} />
              <Route path='/symptoms' element={<Symptoms />} />
              <Route path='*' element={<NoPage />} />
            </Routes>
          </Router>
        </div>
    </ThemeProvider>
    
  );
}

export default App;
