import { useState } from "react"
import {useDispatch} from 'react-redux'

//Components //
import {createNote} from '../../features/notes/noteSlice';
import NoteForm from '../forms/NoteForm';

// MUI //
import { Modal, Box, Typography, } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brand } from '../../colors';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f2e2e1',
    border: '2px solid #f1e6e1',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    input: {
        bgcolor: '#fff'
    },
    '& .MuiSelect-select': {
        bgcolor: '#fff'
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'primary.main',
        },
    },
}

const theme = createTheme({
    palette: {
        primary: {
            main: brand[200], // dark pink
            light: brand[50], // light pink
            dark: brand[600], // slate
        },
            text: {
            main: brand[500], // slate
            light: brand[50], // ivory
            dark: brand[600], //dark slate
            contrastText: brand[200] // light pink
        },
        button: {
            main: brand[200],
            hover: brand[100],
            light: brand[100],
            lightHover: brand[50],
            dark: brand[600],
            darkHover: brand[500],
        },
        input: {
            main: brand[50],
            light: brand[100],
        },
        bg: {
            main: brand[800],
            light: brand[50],
            dark: brand[100],
        }
    }
});

const NoteFormModal = (props) => {
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createNote({text}))
        setText('')
    }

    return (
        <ThemeProvider theme={theme}>
                <AddCircleIcon onClick={handleOpen} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                    keepMounted
                >
                    <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2' color='text.main' marginBottom='1em'>
                        Create a New Note
                    </Typography> 
                        <NoteForm />
                    </Box>
                </Modal>
        </ThemeProvider>
    );
}

export default NoteFormModal
