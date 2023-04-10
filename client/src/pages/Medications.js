import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import ModalMedForm from '../components/modals/ModalMedForm';
import MedItem from '../components/items/MedItem';
import { getMedications } from '../features/medications/medSlice';
import { reset } from '../features/auth/authSlice';

function Medications () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { medications, isLoading, isError, message } = useSelector((state) => state.medications)

  useEffect(() => {
      if (isError) {
          console.log(message)
  }
      if (!user) {
          navigate('/login')
      }

      dispatch(getMedications())
      return () => {
          dispatch(reset())
      }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
      return <Spinner />
  }

    return (
        <div className='page'>
          <Navbar />
        <div className='container'
          style={{
            maxWidth: 800,
            margin: 'auto',
            marginTop: '5rem'
          }}>
            <h1 className='text-center'>All Medications</h1>
            <ModalMedForm />
            <div className='col-md-11'>
                <br />
                <br />
                <hr />
              </div>
                <section className='content'>
                    {medications !== undefined && medications.length >= 0 ? (
                        <div className='medications'>
                            {medications.map((medication) => (
                                <MedItem key={medication._id} medication={medication} />
                            ))}
                        </div>
                    ) : (<h4>No medications have been added yet.</h4>)}
                </section>
            </div>
          <Footer />
        </div>
      );
}

export default Medications