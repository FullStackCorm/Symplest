import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components //
import { getPain } from '../../features/pain/painSlice';
import { reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner';
import PainChart from '../data/PainChart';

const PainChartModal = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useSelector((state) => state.auth)
    const { pain, isLoading, isError, message } = useSelector((state) => state.pain)

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }
    
        dispatch(getPain())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
            <PainChart />
    );
}

export default PainChartModal