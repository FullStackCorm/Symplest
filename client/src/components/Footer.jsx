import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link, Container, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, pink, white } from '../colors';
import CssBaseline from '@mui/material/CssBaseline';

function Copyright() {
    return (
        <Typography variant="body2" color="#fafafa">
            {'Copyright © '}
            <span color="#fafafa">
                FullStackCorm
            </span>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {

    const theme = createTheme({
        palette: {
            primary: {
                main: brown[200],
                light: brown[100],
                dark: brown[500],
                contrastText: brown[50]
            },
            secondary: {
                main: pink[100],
                contrastText: pink[50]
            },
            text: {
                main: white[100]
            }
        }
    });


    return (
        <ThemeProvider theme={theme}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    maxHeight: '100vh'
                }}>
                    <CssBaseline />
                    <Box
                        component='footer'
                        sx={{
                            py: 3,
                            px: 2,
                            mt: '0.5em',
                            bgcolor: 'primary.dark',
                        }}
                    >
                        <Container maxWidth='sm'>
                            <Typography variant='body1' color='white'>
                                <Link href={'https://www.github.com/FullStackCorm'}>
                                    <GitHubIcon sx={{ color: 'white' }} />
                                </Link>
                                <Copyright />
                            </Typography>
                        </Container>
                    </Box>

                </Box>
        </ThemeProvider>
    );
}