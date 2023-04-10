import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function ModalCard() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setClose(false);

    return (
        <div>
            <Button onClick={handleOpen}>+ Add New Medication</Button>
            <Modal
                open={open}
                onClose={func}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Modal Title
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ m2: 2 }}>
                        Modal Description Lorem Ipsum Dolor Est.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}