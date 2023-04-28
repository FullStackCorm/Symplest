import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import painService from './painService';

const initialState = {
  pain: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
};

export const createPain = createAsyncThunk('pain/create', async(noteData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await painService.createPain(noteData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
  return thunkAPI.rejectWithValue(message)
  }
});

export const getPain = createAsyncThunk('pain/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await painService.getPain(token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
});

export const deletePain = createAsyncThunk('pain/delete', async(_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await painService.deletePain(_id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
  return thunkAPI.rejectWithValue(message)
  }
});

export const painSlice = createSlice({
  name: 'pain',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pain.push(action.payload)
      })
      .addCase(createPain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pain = action.payload
      })
      .addCase(getPain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pain = state.pain.filter((note) => note._id !== action.payload.id )
      })
      .addCase(deletePain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const {reset} = painSlice.actions;
export default painSlice.reducer;