import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { PayloadAction } from '@reduxjs/toolkit';
import { getSessionStorage } from '../../utils/StorageHelper';

// Get user from local storage (stringify converts null -> "null" if localStorage.getItem returns null, as JSON.parse can only take strings)
const user = getSessionStorage('user') as Record<string, any>;

export interface State {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  checkServerLoading: boolean;
  message: PayloadAction | string;
}

// Initial auth state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  checkServerLoading: false,
  message: '',
} as State;

// Register user
export const register = createAsyncThunk('auth/register', async (user: object, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (err: any) {
    // If any error exists put into message
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async (payload: object, thunkAPI) => {
  try {
    return await authService.logout(payload);
  } catch (err: any) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user: Record<string, any>, thunkAPI) => {
  try {
    let res = await authService.login(user);
    return res;
  } catch (err: any) {
    // If any error exists put into message
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// check server
export const checkServer = createAsyncThunk('server/check', async (_, thunkAPI) => {
  try {
    let res = await authService.checkServer();

    return res;
  } catch (err: any) {
    // If any error exists put into message
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Define logic for reducer logic for handling state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.checkServerLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkServer.fulfilled, (state) => {
        state.checkServerLoading = false;
      })
      .addCase(checkServer.pending, (state) => {
        if (!state.checkServerLoading) state.checkServerLoading = true;
      });
    // .addCase(checkServer.rejected, (state) => {
    //   state.checkServerLoading = false;
    // });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
