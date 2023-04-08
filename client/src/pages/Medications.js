import { useDispatch } from 'react-redux'
import { createMedication } from '../features/medications/medSlice';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Medications = (props) => {
    const [medication, setMedication] = useState({
        name:'',
        strength:'',
        directions:'',
        timeOfDay:'',
        prescriber:'',
    });

    const dispatch = useDispatch();

    const onChange = (e) => {
        setMedication({ ...medication, [e.target.name]: e.target.value });
      };
    
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(createMedication({medication}))
      setMedication('')
    };
    // return (
    //     <section className='form'>
    //         <form onSubmit={onSubmit}>
    //             <div className='form-group'>
    //                 <label htmlFor='medication'>Add Medication</label>
    //                 <input
    //                     type='text'
    //                     name='name'
    //                     id='name'
    //                     value={name}
    //                     onChange={(e) => setMedication(e.target.value)} />
    //             </div>
    //             <div className='form-group'>
    //                 <button className='btn btn-block' type='submit'>
    //                     Add Medication
    //                 </button>
    //             </div>
    //         </form>
    //     </section>
    // );

    return (
        <div className='page'>
            <Navbar />
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <br />
                <Link to='/medications' className='btn btn-light float-left'>
                  Show Medication List
                </Link>
              </div>
              <div className='col-md-8 m-auto py-5'>
                <h1 className='display-4 text-center'>Medication Management</h1>
                <p className='lead text-center'>Add a new medication</p>
    
                <form onSubmit={onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Medication Name'
                      name='name'
                      className='form-control'
                      value={medication.name}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='number'
                      placeholder='Strength'
                      name='strength'
                      className='form-control'
                      value={medication.strength}
                      onChange={onChange}
                    />
                  </div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Directions'
                      name='directions'
                      className='form-control'
                      value={medication.directions}
                      onChange={onChange}
                    />
                  </div>
    
              <div className='form-row'>
    
                <div className='form-group col-md-8'>
                    <input
                    type='text'
                    placeholder='Prescriber'
                    name='prescriber'
                    className='form-control'
                    value={medication.prescriber}
                    onChange={onChange}
                  />
                </div>
                
                <select className='form-group form-select mb-3 mr-2 col rounded' data-label='Time of Day' aria-label='Time of Day' onChange={onChange}>
            
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

export default Medications