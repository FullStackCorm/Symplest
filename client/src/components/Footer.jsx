import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link, Container, Grid, Typography } from '@mui/material';

export default function Footer() {
    return (
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
                        backgroundColor:'black',
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
    );
}