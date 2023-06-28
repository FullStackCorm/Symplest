import { useState } from 'react';
import { useDispatch } from 'react-redux';

 // Components //
import { updateMedication } from '../../features/medications/medSlice';
import UpdateMedForm from '../forms/UpdateMedForm';

// MUI //
import { Modal, Typography, Box, Grid, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
    '& .MuiIcon-root': {
        color: 'primary.main'
    },
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    },
};

const UpdateMedModal = (props) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <EditIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleOpen} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                    keepMounted
                >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2' color='text.main' marginBottom='1em'>
                        Edit Medication
                    </Typography> 
                    <UpdateMedForm />
                </Box>
            </Modal>   
        </Box>
    );
}

export default UpdateMedModal