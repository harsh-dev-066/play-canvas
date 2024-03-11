import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from './reportService';

interface State {
  reportData: Record<string, any>;
  reportList: any[];
  reportPagination: Record<string, any>;
  newReport: Record<string, any>;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isCreateLoading: boolean;
  message: string;
}

const initialState = {
  reportData: {},
  reportList: [],
  newReport: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreateLoading: false,
  message: '',
} as State;

// Get reports
export const getAllReports = createAsyncThunk(
  'reports/getAll',
  async (payload: object, thunkAPI) => {
    try {
      return await reportService.getReports(payload);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create report
export const createReport = createAsyncThunk(
  'reports/create',
  async (reportData: any, thunkAPI) => {
    try {
      const response = await reportService.createReport(reportData.payload);

      return response;
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete report
export const deleteReport = createAsyncThunk('reports/delete', async (payload: any, thunkAPI) => {
  try {
    const res = await reportService.deleteReport(payload.reportId);
    payload.cb();
    return res;
  } catch (err: any) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get report by id
export const getReportById = createAsyncThunk(
  'reports/update',
  async (reportId: string, thunkAPI) => {
    try {
      return await reportService.getReportById(reportId);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create slice
export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isCreateLoading = false;
        state.isSuccess = true;
        state.newReport = action.payload.result;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isCreateLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(getAllReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reportList = action.payload.result;
        state.reportPagination = action.payload.pagination;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(getReportById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReportById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reportData = action.payload.result[0];
      })
      .addCase(getReportById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;
