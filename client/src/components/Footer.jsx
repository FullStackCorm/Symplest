import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link, Container, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, pink, ivory } from '../colors';

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
            main: ivory[50]
          }
        }
      });

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ maxWidth: 'xl', direction: 'row' }}>
                <Box>
                    <Grid 
                        sx={{   
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            direction: 'row',
                            alignItems: 'center',
                            bgcolor: 'primary.dark',
                            pt: '0.1rem',
                            pb: '0.1rem'
                        }}
                    >
                        <Grid item xs={12}>
                            <Typography direction='row' color='white'>
                                <Link href={'https://www.github.com/FullStackCorm'}>
                                    <GitHubIcon sx={{ color: 'white', mt: 0.5, mb: 0.5}} />
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>    
        </ThemeProvider>
          
    );
}