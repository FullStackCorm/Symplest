import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import calendarService from './calendarService';

const initialState = {
  entries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
};

export const createCalendarEntry = createAsyncThunk('calendar/create', async(entryData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await calendarService.createCalendarEntry(entryData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
  return thunkAPI.rejectWithValue(message)
  }
});

export const getCalendarEntries = createAsyncThunk('calendar/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await calendarService.getCalendarEntries(token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
});

export const deleteCalendarEntry = createAsyncThunk('calendar/delete', async(_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await calendarService.deleteCalendarEntry(_id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
  return thunkAPI.rejectWithValue(message)
  }
});

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCalendarEntry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCalendarEntry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.entries.push(action.payload)
      })
      .addCase(createCalendarEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCalendarEntries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCalendarEntries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.entries = action.payload
      })
      .addCase(getCalendarEntries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCalendarEntry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCalendarEntry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.entries = state.entries.filter((entry) => entry._id !== action.payload.id )
      })
      .addCase(deleteCalendarEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = calendarSlice.actions;
export default calendarSlice.reducer;