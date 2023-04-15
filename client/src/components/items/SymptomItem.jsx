import { useDispatch } from 'react-redux';
import { deleteSymptom } from '../../features/symptoms/symptomSlice';
import { Card, Grid, Button } from '@mui/material';

function SymptomItem({symptom}) {
    const dispatch = useDispatch()

    return (
        <div>
            <Card>

            </Card>
        </div>
    )
}

export default SymptomItem