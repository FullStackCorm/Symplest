import '../App.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '@mui/icons-material'
import { logout, reset } from '../features/auth/authSlice';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Notes from '../pages/Notes';

function NavbarTop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
    };

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/notes'>Notes</Link>
                    </li>
                    <li>
                        <Link to='/medications'>Medications</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default NavbarTop;