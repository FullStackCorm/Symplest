import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box, Link, Container, Grid, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

function Copyright() {
    return (
        <Typography variant="body2" color="text.contrastText">
            {'Copyright © '}
            <span color="#fafafa">
                FullStackCorm
            </span>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {

    return (
        <Container maxWidth='xl' position='fixed' bottom='0'>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <CssBaseline />
                <Box
                    component='footer'
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                    }}
                >
                    <Container maxWidth='sm'>
                        <Typography variant='body1'>
                            <Link href={'https://www.github.com/FullStackCorm'}>
                                <GitHubIcon sx={{ color: 'text.contrastText' }} />
                            </Link>
                            <Copyright />
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </Container>         
    );
}