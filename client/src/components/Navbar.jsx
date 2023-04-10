import '../App.css';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { AppBar, Box, IconButton, Typography, Menu, Container, Button, Toolbar, Tooltip, MenuItem } from '@mui/material';
import { logout, reset } from '../features/auth/authSlice';
import Favicon from '../images/favicon-32x32.png';

const pages = ['Home', 'Medications', 'Notes'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// https://mui.com/material-ui/react-app-bar/

function NavbarTop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const onLogout = () => {
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
            <AppBar position='static'>
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
                                {pages.map((page) => (
                                    <MenuItem key={ page } onClick={handleCloseNavMenu}>
                                        <Typography textAlign='center'>{ page }</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/** Desktop Menu */}
                        <a href='/'>
                            <img src={Favicon} alt={'Symplest Favicon'} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        </a>
                        <Typography
                            variant='h5'
                            noWrap
                            component='a'
                            href=''
                            sx={{
                                mr: 1,
                                ml: 0.5,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 400,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            Symplest
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs:'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my:2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        {/** Settings Menu */}
                        <Box sx={{ flexGrow: 0}}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                                    <PermIdentityIcon sx={{ color: 'white' }}/>
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign='center'>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
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
            </AppBar>
        </>
    );
}

export default NavbarTop;