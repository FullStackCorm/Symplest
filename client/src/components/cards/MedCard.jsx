import React from 'react';
import { Link } from 'react-router-dom';
import { deleteMedication } from '../../features/medications/medSlice';
import { useDispatch } from 'react-redux';

const MedCard = (props) => {
  const medication = props.medication;

  return (
    <div className='card-container'>
      <div className='desc card-item py-5 px-3.5 text-center'>
        <h2>
          <Link to={`/medications/${medication._id}`}>{`${medication.name} ${medication.strength}`}</Link>
        </h2>

        <p>{medication.directions}</p>
      </div>
    </div>
  );
};

export default MedCard;