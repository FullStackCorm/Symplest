import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brand } from './colors';

// Pages //
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Medications from './pages/Medications';
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
              <Route path='/notes' element={<Notes />} />
              <Route path='/medications' element={<Medications />} />
              <Route path='/symptoms' element={<Symptoms />} />
              <Route path='*' element={<NoPage />} />
            </Routes>
          </Router>
        </div>
    </ThemeProvider>
    
  );
}

export default App;
