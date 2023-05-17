import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brand } from './colors';
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
        main: brand[200], // dark pink
        light: brand[50], // light pink
        dark: brand[600], // slate
      },
      // secondary: {
      //   main: brand[300],
      //   light: brand[200],
      //   dark: brand[700]
      // },
      text: {
        main: brand[500],
        light: brand[50],
        contrastText: brand[200]
      },
      button: {
        main: brand[400],
        hover: brand[300],
        light: brand[100],
        lightHover: brand[50],
        dark: brand[500],
        darkHover: brand[600],
      },
      input: {
        main: brand[50],
      }
    }
  })

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
