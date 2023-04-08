import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import medService from './medService';

const initialState = {
    medications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createMedication = createAsyncThunk('medications/create', async (medicationData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await medService.createMedication(medicationData, token);
        } catch (error) {
            const message = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getMedications = createAsyncThunk('medications/getAll', async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await medService.getMedications(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateMedication = createAsyncThunk('medications/update', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await medService.updateMedication(id, token);
    } catch (error) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
    }
})

export const deleteMedication = createAsyncThunk('medications/delete', async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await medService.deleteMedication(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
);

export const medSlice = createSlice({
    name: 'medication',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMedication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMedication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.medications.push(action.payload);
            })
            .addCase(createMedication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMedications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMedications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.medications = action.payload;
            })
            .addCase(getMedications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateMedication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMedication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.medications = action.payload;
            })
            .addCase(updateMedication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMedication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMedication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.medications = state.medications.filter(
                    (medication) => medication._id !== action.payload.id
                );
            })
            .addCase(deleteMedication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = medSlice.actions;
export default medSlice.reducer;
