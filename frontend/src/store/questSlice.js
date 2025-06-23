import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axiosInstance';

export const fetchQuests = createAsyncThunk('quests/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/quest');
    return res.data.quests;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load quests');
  }
});

const questSlice = createSlice({
  name: 'quests',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchQuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questSlice.reducer;
