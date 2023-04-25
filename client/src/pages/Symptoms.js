import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSymptoms } from '../features/symptoms/symptomSlice';
import { reset } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import SymptomItem from '../components/items/SymptomItem';
import { Grid, Container } from '@mui/material';
import SymptomCategoryCheckbox from '../components/forms/SymptomCheckboxForm';
import MoodCard from '../components/cards/MoodCard';

function Symptoms () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { symptoms, isLoading, isError, message } = useSelector((state) => state.symptoms)

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }
  
        dispatch(getSymptoms())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
  
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <Navbar />
                <div
                    className='container'
                    style={{
                        maxWidth: 800,
                        margin: 'auto',
                        marginTop: '5rem'
                    }}
                >
                    <Grid
                        container
                        spacing={0}
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Container>
                            <h1 style={{color: 'white'}}>Symptoms</h1>
                            <section className='content'>
                                <MoodCard />
                                {/* {symptoms && symptoms.length > 0 ? (
                                    <div>
                                        {symptoms.map((symptom) => (
                                            <SymptomItem key={symptom._id} symptom={symptom} />
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <h4>No symptom categories have been added yet.</h4>
                                        <SymptomCategoryCheckbox />
                                    </div>
                                    )} */}
                            </section>
                        </Container>
                    </Grid>
                </div>
            <Footer />
        </div>
    );
}

export default Symptoms