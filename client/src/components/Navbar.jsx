import '../App.css';
import Favicon from '../images/favicon-32x32.png';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, IconButton, Typography, Menu, Container, Button, Toolbar, Tooltip, MenuItem } from '@mui/material';

function NavbarTop() {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const pages = [{ page:'/', text: "Dashboard"}, { page: '/medications', text: "Medication Management" }, { page: '/symptoms', text: "Symptom Tracking"}, { page: '/appointments', text: "Appointments" }, { page: '/events', text: "Calendar" }, { page: '/notes', text: "Notes" },]
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
        <div>
            <div>
                <AppBar position='fixed' elevation={0} sx={{ bgcolor: 'primary.dark', color: 'text.light', }} >
                    <Container maxWidth='xl'>
                        <Toolbar disableGutters>
                                <img id='logo' src={Favicon} alt={'Symplest Favicon'} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}  />
                            

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
                                {/* <IconButton
                                    size='large'
                                    aria-label='account of current user'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleOpenNavMenu}
                                    color='inherit'
                                >
                                    <MenuIcon />
                                </IconButton> */}

                                {/** Mobile Menu */}
                                {/* <Menu
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
                                        color: 'text.main' 
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
                                            <Link to='/symptoms'>Symptoms</Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign='center'>
                                            <Link to='/notes'>Notes</Link>
                                        </Typography>
                                    </MenuItem>
                                </Menu> */}
                            </Box>

                            {/** Desktop Menu */}
                            {/* <Typography
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
                            </Typography> */}
                            <Box sx={{ flexGrow: 1, display: { xs:'none', md: 'flex' } }}>
                                <Typography component='h1' variant='h5' margin='0.5rem'>Symplest</Typography>
                                {/* <Button  
                                    href='/'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'white', display: 'block' }}
                                >
                                    Home
                                </Button> */}
                                {/* <Button  
                                    href='/medications'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'white', display: 'block', '&:hover': {color: '#f8f8f8'} }}
                                >
                                    Medications
                                </Button> */}
                                {/* <Button  
                                    href='/symptoms'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'white', display: 'block' }}
                                >
                                    Symptoms
                                </Button> */}
                                {/* <Button  
                                    href='/appointments'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'white', display: 'block' }}
                                >
                                    Appointments
                                </Button>
                                <Button  
                                    href='/events'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'white', display: 'block' }}
                                >
                                    Calendar
                                </Button>  */}
                                {/* <Button  
                                    href='/notes'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'white', display: 'block' }}
                                >
                                    Notes
                                </Button>         */}
                            </Box>     
                            {/* <Box sx={{ flexGrow: 1, display: { xs:'none', md: 'flex' } }}>
                                <Typography
                                    variant='h4'
                                    noWrap
                                    sx={{
                                        display: {xs: 'none', sm: 'flex' },
                                        flexGrow: 1,
                                        fontWeight: 400,
                                        letterSpacing: '0.1rem',
                                        textAlign: 'center',
                                        color: 'text.light'
                                    }}
                                >
                                    {navbarHeader}
                                </Typography>
                            </Box> */}

                            {/** Settings/Logout Menu */}
                            <Box sx={{ flexGrow: 0}}>
                                <Tooltip title='Open settings'>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                                        <AccountCircleIcon sx={{ color: 'white' }}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px'}}
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
                                    {/* <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign='center' onClick={handleCloseUserMenu} sx={{ color: 'text.contrastText' }} >Account</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign='center' onClick={handleCloseUserMenu} sx={{ color: 'text.contrastText' }} >Settings</Typography>
                                    </MenuItem> */}
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign='center' onClick={handleLogout} sx={{ color: 'text.contrastText' }} >Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </div>        
    );
}

export default NavbarTop;