import React from 'react';
import { Link } from 'react-router-dom';

const SymptomCard = (props) => {
  const symptom = props.symptom;

  return (
    <div className='card-container text-center '>
      <div className='desc card-item'>
        <h2>
          <Link to={`/symptoms/${symptom._id}`}>{symptom.name}</Link>
        </h2>
      </div>
    </div>
  );
};

export default SymptomCard;