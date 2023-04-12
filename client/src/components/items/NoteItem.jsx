import { useDispatch } from 'react-redux';
import { deleteNote } from '../../features/notes/noteSlice';
import { Card, Grid, Button } from '@mui/material';

function NoteItem({note}) {
    const dispatch = useDispatch()

  return (
    <div className="note">
      <Card container
        sx={{
          variant: 'outlined',
          margin: 'auto',
          width: '100%',
          marginBottom: '2rem',
          textAlign:'center',
        }}>
        <Grid item xs={10} paddingBottom='1rem'>
          <h5>{note.text}</h5>
        </Grid>
        <Grid item xs={2} paddingTop='1rem'>
            <button onClick={() => dispatch(deleteNote(note._id))} className="close" style={{color: 'white'}}>X</button>
        </Grid>
        <Grid item xs={10}>
          {new Date(note.createdAt).toLocaleString('en-US')}
        </Grid>
      </Card>
        
    </div>
  );
}

export default NoteItem