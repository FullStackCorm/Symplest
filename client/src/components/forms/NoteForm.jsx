import { useState } from "react"
import {useDispatch} from 'react-redux'
import {createNote} from '../../features/notes/noteSlice'

// MUI //
import { Button, TextField, Stack  } from '@mui/material';


const style = {
  color: 'primary.dark',
  input: { 
    color: 'primary.dark', 
    textAlign: 'center' 
  },
  minWidth: 250,
  maxWidth: 350,
  height: 'auto',
  margin: 'auto',
  marginTop: 1,
}

function NoteForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    dispatch(createNote({text}))
    setText('')
  }

  return (
        <form onSubmit={onSubmit}>
          <Stack sx={style} direction='column' spacing={2}>
            <TextField 
              multiline 
              variant='outlined'
              rows={3}
              maxRows={3}
              placeholder='Remember to drink water and stretch 3 times a day' 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              className='form-control'
              style={{ backgroundColor: '#fff', borderRadius: 4 }}
            />
            <Button
              type='submit'
              sx={{
                bgcolor: 'button.dark',
                color: 'text.light',
                '&:hover': {
                bgcolor: 'button.darkHover',
                color: 'text.light'
                },
                borderRadius: 5
            }}
            variant='contained'
            >
              Add Note
            </Button>
          </Stack>          
        </form>
  );
}

export default NoteForm;