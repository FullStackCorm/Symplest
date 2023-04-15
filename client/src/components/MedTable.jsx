import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedication } from '../features/medications/medSlice';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDelete from './common/ConfirmDelete';

function MedTable({medication}) {
    const dispatch = useDispatch()
    
    function createData(name, directions, timeOfDay, prescriber, _id) {
        return { name, directions, timeOfDay, prescriber, _id };
    }

    const {medications} = useSelector(state => state.medications)

    const rows = []
    
    if (medications) {
        medications.map(medication =>
            {
                rows.push(createData(medication.name, medication.directions, medication.timeOfDay, medication.prescriber, medication._id))
            }
        );
    }

    return (
        <TableContainer sx={{ margin: 'auto', mt: 5, maxWidth: 1200 }}>
            <Table size='small' aria-label='medication-table'>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color:'#E89D9D', fontSize: 18 }}>Medication</TableCell>
                        <TableCell sx={{ color:'#E89D9D', fontSize: 18 }} align='center'>Directions</TableCell>
                        <TableCell sx={{ color:'#E89D9D', fontSize: 18 }} align='center'>Time of Day</TableCell>
                        <TableCell sx={{ color:'#E89D9D', fontSize: 18 }} align='center'>Prescriber</TableCell>
                        <TableCell sx={{ color:'#E89D9D', fontSize: 18 }} align='center'>Edit/Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component='th' scope='row' sx={{ color: '#CBC0C0', fontSize: 16}}>{row.name}</TableCell>
                            <TableCell align='center' sx={{ color: '#CBC0C0', fontSize: 16 }} >{row.directions}</TableCell>
                            <TableCell align='center' sx={{ color: '#CBC0C0', fontSize: 16 }} >{row.timeOfDay}</TableCell>
                            <TableCell align='center' sx={{ color: '#CBC0C0', fontSize: 16 }} >{row.prescriber}</TableCell>
                            <TableCell align='center' sx={{ color: '#CBC0C0', fontSize: 16, pt: 0.5, pb: 0.5 }} >
                                <Button sx={{ color: '#CBC0C0' }}>
                                    <EditIcon />
                                </Button>
                                <ConfirmDelete />
                                {/* <Button
                                    onClick={() => dispatch(deleteMedication(row._id))} sx={{ color: '#CBC0C0', pt: 0.5, pb: 0.5 }}><DeleteIcon />
                                </Button> */}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MedTable