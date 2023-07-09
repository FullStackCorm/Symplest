import * as React from 'react';
import { deleteNote } from '../../features/notes/noteSlice';
import { useDispatch } from 'react-redux';

// MUI //
import { Card, CardContent, Typography, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const style = {
    backgroundColor: '#fff',
    input: { color: 'primary.dark' },
    width: 250,
    height: 'auto',
    margin: 'auto',
    marginTop: 1,
    borderRadius: 3,
    input: {
        textAlign: 'center'
    },

    // '& .MuiIcon-root': {
    //     color: 'primary.dark'
    // },
    // '& .MuiSvgIcon-root': {
    //     color: 'primary.main'
    // },
}

export default function NoteCard({note}) {

    const dispatch = useDispatch()
    
    return (
        <Card variant='outlined' sx={style}>
            <CardContent>
                <Typography 
                    sx={{ 
                        fontSize: 16,
                        justifyContent: 'center',
                        variant: 'body1', component: 'div'
                        }} 
                    gutterBottom 
                >
                    {note.text}
                </Typography>
                    <Typography>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => dispatch(deleteNote(note._id))}>
                            <DeleteIcon />
                        </IconButton>
                    </Typography>
                    <Typography sx={{ fontSize: 12}}>
                        {new Date(note.createdAt).toLocaleString('en-US')}
                    </Typography>
            </CardContent>
        </Card>        
    );
}