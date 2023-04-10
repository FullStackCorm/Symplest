import { useDispatch } from 'react-redux';
import { createMedication } from '../../features/medications/medSlice';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Typography, Button, Box } from '@mui/material';

const MedForm = (props) => {

    const [name, setName] = useState('');
    const [strength, setStrength] = useState('');
    const [directions, setDirections] = useState('');
    const [timeOfDay, setTimeOfDay] = useState('');
    const [prescriber, setPrescriber] = useState('');
    
    const dispatch = useDispatch();
    
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(createMedication({name, strength, directions, timeOfDay, prescriber}))
      setName('')
      setStrength('')
      setDirections('')
      setPrescriber('')
      setTimeOfDay('')
    
    };

    

    return (
        <div className=''>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <br />
                <Link to='/medications' className='btn btn-light float-left'>
                  Show Medication List
                </Link>
              </div>
              <div className='col-md-8 m-auto py-5'>
                <p className='lead text-center'>Add a new medication</p>
    
                <form onSubmit={onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Medication Name'
                      name='name'
                      className='form-control'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='number'
                      placeholder='Strength'
                      name='strength'
                      className='form-control'
                      value={strength}
                      onChange={(e) => setStrength(e.target.value)}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Directions'
                      name='directions'
                      className='form-control'
                      value={directions}
                      onChange={(e) => setDirections(e.target.value)}
                    />
                  </div>
    
              <div className='form-row'>
    
                <div className='form-group col-md-8'>
                    <input
                    type='text'
                    placeholder='Prescriber'
                    name='prescriber'
                    className='form-control'
                    value={prescriber}
                    onChange={(e) => setPrescriber(e.target.value)}
                  />
                </div>
                
                <select className='form-group form-select mb-3 mr-2 col rounded' data-label='Time of Day' aria-label='Time of Day' onChange={(e) => setTimeOfDay(e.target.value)}>
            
                  <option defaultValue className='secondary'>Time of Day</option>
                  <option value='morning'>Morning</option>
                  <option value='noon'>Noon</option>
                  <option value='afternoon'>Afternoon</option>
                  <option value='evening'>Evening</option>
                  <option value='bedtime'>Bedtime</option>
                  <option value='asNeeded'>As Needed</option>
    
                </select>
              </div>
                  
                  <input
                    type='submit'
                    className='btn btn-primary btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MedForm