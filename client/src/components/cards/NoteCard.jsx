import * as React from 'react';
import { Link } from 'react-router-dom';
import { deleteNote } from '../../features/notes/noteSlice';
import { useDispatch } from 'react-redux';
import { Box, Card, CardContent, Button, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NoteCard({note}) {

    const dispatch = useDispatch()
    
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
        >
            <Grid item xs={3}>
            <Box 
                sx={{ 
                    minWidth: 200, 
                    maxWidth: 300, 
                    borderRadius: 2,
                    p: 1,
                    
                }}
            >
                <Card 
                    variant='outlined' 
                    sx={{
                        color: 'white'
                    }}
                >
                    <CardContent 
                        sx={{ 
                            backgroundColor: 'black', 
                            minHeight: 200,
                            maxHeight: 300, 
                            p: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                      <Typography 
                        sx={{ 
                            fontSize: 16,
                            justifyContent: 'center'
                            }} 
                        color='' 
                        gutterBottom 
                        variant='h5' 
                        component='div'
                        >
                        {note.text}
                        <Typography>
                          <Button className='' style={{color: 'white'}}>
                              <EditIcon />
                          </Button>
                          <Button onClick={() => dispatch(deleteNote(note._id))} className='' style={{color: 'white'}}>
                              <DeleteIcon />
                          </Button>
                        </Typography>
                        <Typography sx={{ fontSize: 12}} color='white'>
                          {new Date(note.createdAt).toLocaleString('en-US')}
                        </Typography>
                      </Typography>
                    </CardContent>
                </Card>
            </Box>
            </Grid>
        </Grid>
        
    );
}