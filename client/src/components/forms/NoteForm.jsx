import { useState } from "react"
import {useDispatch} from 'react-redux'
import {createNote} from '../../features/notes/noteSlice'

function NoteForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    dispatch(createNote({text}))
    setText('')
  }

  return (
    <div className='page'>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            {/* <label htmlFor="text" className='mx-2 '>Note: </label> */}
            <textarea 
              type='text' 
              name='text' 
              id='text'
              placeholder='Remember to drink water and stretch 3 times a day' 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              className='form-control'
              rows='5' 
            />
          </div>
          <div className="form-group">
            <button 
              type='submit'
              className='btn btn-primary btn-block'>
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteForm;