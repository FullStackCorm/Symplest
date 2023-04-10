import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link, Container, Grid, Typography } from '@mui/material';

export default function Footer() {
    return (
        // <div className='footer flex items-stretch px-20'>
        //     <ul className='pt-3'>
        //         <a href={'https://www.github.com/FullStackCorm'} className='py-2 px-4 text-lg'><GitHubIcon className='text-2xl'/> Source Code </a>
        //         <span> | </span>
        //         <a href={'https://www.twitter.com/FullStackCorm'}>&copy; FullStackCorm</a>
        //     </ul>
        // </div>
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
                        backgroundColor:'#007bff',
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