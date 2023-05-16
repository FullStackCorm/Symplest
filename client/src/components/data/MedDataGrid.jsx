import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Components //
import { deleteMedication } from '../../features/medications/medSlice';
import ConfirmDelete from '../common/ConfirmDelete';
import UpdateMedModal from '../modals/UpdateMedModal';

// MUI //
import { Box, Button, Paper, Table, TableHead, TableBody, TableFooter, TableCell, TableContainer, TableRow, TablePagination } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brand } from '../../colors';


function TablePaginationActions(props) {

    const theme = createTheme({
        palette: {
            text: {
                light: brand[50]
            },
            button: {
                light: brand[50]
            }
        },
    });

    // Table Controls //
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };  
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };  
    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };  
    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        
        <ThemeProvider theme={theme}>
            <Box sx={{ flexShrink: 0, ml: 2.5, color: 'text.light' }} >
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                    sx={{ color: 'button.light' }}
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        </ThemeProvider>

    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function MedDataGridTable() {
    const rows = []

    // Constants, Hooks, etc. //
    // const theme = createTheme({
    //     palette: {
    //         text: {
    //             light: brand[50]
    //         }
    //     }
    // });
    
    const dispatch = useDispatch()    
    const { medications } = useSelector(state => state.medications)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Data Mapping //
    function createData(name, directions, timeOfDay, prescriber, _id) {
        return { name, directions, timeOfDay, prescriber, _id };
    };
    
    if (medications) {
        medications.map(medication =>
            {
                rows.push(createData(medication.name, medication.directions, medication.timeOfDay, medication.prescriber, medication._id))
            }
        );
    };

    return (
        <div>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table size='small' sx={{ margin: 'auto', mt: 5, maxWidth: 1200, }} aria-label='medication table'>
                    <TableHead>
                        <TableRow sx={{ color: 'text.contrastText'}}>
                            <TableCell sx={{ color: 'text.contrastText', fontSize: 18 }}>Medication</TableCell>
                            <TableCell sx={{ color: 'text.contrastText', fontSize: 18 }} align='center'>Directions</TableCell>
                            <TableCell sx={{ color: 'text.contrastText', fontSize: 18 }} align='center'>Time of Day</TableCell>
                            <TableCell sx={{ color: 'text.contrastText', fontSize: 18 }} align='center'>Prescriber</TableCell>
                            <TableCell sx={{ color: 'text.contrastText', fontSize: 18 }} align='center'>Edit/Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows && rows.id
                    ).map((row) => (
                        <TableRow key={medications.id}>
                            <TableCell component="th" scope="row" sx={{ color: 'text.light' }}>
                                {row.name}
                            </TableCell>
                            <TableCell align='center' sx={{ color: 'text.light' }}>
                                {row.directions}
                            </TableCell>
                            <TableCell align='center' sx={{ color: 'text.light' }}>
                                {row.timeOfDay}
                            </TableCell>
                            <TableCell align='center' sx={{ color: 'text.light' }}>
                                {row.prescriber}
                            </TableCell>
                            <TableCell align='center' sx={{ fontSize: 16, pt: 0.5, pb: 0.5 }} >
                                    <Button>
                                        <UpdateMedModal />
                                    </Button>
                                    {/* <ConfirmDelete /> */}
                                    <Button
                                        onClick={() => dispatch(deleteMedication(row._id))} sx={{ color: 'button.light', pt: 0.5, pb: 0.5 }}><DeleteIcon />
                                    </Button>    
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} sx={{ color: 'text.light' }} />
                        </TableRow>
                    )}
                    
                    </TableBody>
                    <TableFooter style={{ align: 'right' }}>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
                                count={rows.length + 1}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                    'aria-label': 'use the arrows to change pages',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ color: 'text.contrastText' }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}



