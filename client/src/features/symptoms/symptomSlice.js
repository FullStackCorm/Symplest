import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import symptomService from './symptomService';

const initialState = {
  symptoms: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
};

export const createSymptom = createAsyncThunk('symptoms/create', async(noteData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await symptomService.createSymptom(noteData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
  return thunkAPI.rejectWithValue(message)
  }
});

export const getSymptoms = createAsyncThunk('symptoms/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await symptomService.getSymptoms(token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
});

export const deleteSymptom = createAsyncThunk('symptoms/delete', async(_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await symptomService.deleteSymptom(_id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
  return thunkAPI.rejectWithValue(message)
  }
});

export const symptomSlice = createSlice({
  name: 'symptom',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSymptom.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSymptom.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.symptoms.push(action.payload)
      })
      .addCase(createSymptom.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSymptoms.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSymptoms.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.symptoms = action.payload
      })
      .addCase(getSymptoms.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSymptom.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSymptom.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.symptoms = state.symptoms.filter((note) => note._id !== action.payload.id )
      })
      .addCase(deleteSymptom.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const {reset} = symptomSlice.actions;
export default symptomSlice.reducer;