import '../App.css';
import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, IconButton, Typography, Menu, Container, Button, Toolbar, Tooltip, MenuItem, Grid } from '@mui/material';
import { logout, reset } from '../features/auth/authSlice';
import Favicon from '../images/favicon-32x32.png';

// https://mui.com/material-ui/react-app-bar/

function NavbarTop() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages = [{ page:'/', text: "Dashboard"}, { page: '/medications', text: "Medication Management" }, { page: '/symptoms', text: "Symptom Tracking"}, { page: '/appointments', text: "Appointments" }, { page: '/calendar', text: "Calendar" }, { page: '/notes', text: "Notes" },]
    const navbarHeader = pages.find(el => el.page === location.pathname)?.text

    const handleLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
    };

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position='fixed' elevation='0' sx={{backgroundColor: 'black'}}>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { sx: 'flex', md: 'none'} }}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleOpenNavMenu}
                                color='inherit'
                            >
                                <MenuIcon />
                            </IconButton>

                            {/** Mobile Menu */}
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>
                                        <Link to='/'>Home</Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>
                                        <Link to='/medications'>Medications</Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>
                                        <Link to='/notes'>Notes</Link>
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/** Desktop Menu */}
                        <Link to='/'>
                            <img src={Favicon} alt={'Symplest Favicon'} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        </Link>
                        <Typography
                            variant='h5'
                            noWrap
                            component='a'
                            href='/'
                            sx={{
                                mr: 1,
                                ml: 0.5,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 400,
                                letterSpacing: '0.1rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            Symplest
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs:'none', md: 'flex' } }}>
                            <Button  
                                href='/'
                                onClick={handleCloseNavMenu}
                                sx={{ my:2, color: 'white', display: 'block' }}
                            >
                                 Home
                            </Button>
                            <Button  
                                href='/medications'
                                onClick={handleCloseNavMenu}
                                sx={{ my:2, color: 'white', display: 'block' }}
                            >
                                 Medications
                            </Button>
                            <Button  
                                href='/'
                                onClick={handleCloseNavMenu}
                                sx={{ my:2, color: 'white', display: 'block' }}
                            >
                                 Symptoms
                            </Button>
                            <Button  
                                href='/'
                                onClick={handleCloseNavMenu}
                                sx={{ my:2, color: 'white', display: 'block' }}
                            >
                                 Appointments
                            </Button>
                            <Button  
                                href='/calendar'
                                onClick={handleCloseNavMenu}
                                sx={{ my:2, color: 'white', display: 'block' }}
                            >
                                 Calendar
                            </Button> 
                            <Button  
                                href='/notes'
                                onClick={handleCloseNavMenu}
                                sx={{ my:2, color: 'white', display: 'block' }}
                            >
                                 Notes
                            </Button>        
                        </Box>     
                        <Box sx={{ flexGrow: 1, display: { xs:'none', md: 'flex' } }}>
                            <Typography
                                variant='h1'
                                noWrap
                                sx={{
                                    display: {xs: 'none', sm: 'flex' },
                                    flexGrow: 1,
                                    fontWeight: 400,
                                    letterSpacing: '0.1rem',
                                    color: 'inherit',
                                    textAlign: 'center',

                                }}
                            >
                                <h4>{navbarHeader}</h4>
                            </Typography>
                        </Box>

                        {/** Settings/Logout Menu */}
                        <Box sx={{ flexGrow: 0}}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                                    <AccountCircleIcon sx={{ color: 'white' }}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign='center' onClick={handleCloseUserMenu}>Account</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign='center' onClick={handleCloseUserMenu}>Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign='center' onClick={handleLogout}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default NavbarTop;