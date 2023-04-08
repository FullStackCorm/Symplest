import { useDispatch } from 'react-redux';
import {deleteMedication} from '../../features/medications/medSlice';

function MedItem({medication}) {
    const dispatch = useDispatch()

  return (
    <div className="medication">
      <div>
        <table className='table table-dark'>
          <tbody>
            <tr>
              <td><h4>Medication:</h4></td>
              <td><h4>{medication.name} {medication.strength}mg</h4></td>
            </tr>
          <tr>
            <td>Directions:</td>
            <td>{medication.directions}</td>
          </tr>
          <tr>
            <td>Prescriber: </td>
            <td>{medication.prescriber}</td>
          </tr>
          <tr>
            <td>Time of Day:</td>
            <td>{medication.timeOfDay}</td>
          </tr>   
          </tbody>
          
        </table>
        <button 
          type='button'
          onClick={() => dispatch(deleteMedication(medication._id))} 
          className="btn btn-danger btn-lg btn-block">Delete Medication</button>
      </div>
        
    </div>
  )
}

export default MedItem