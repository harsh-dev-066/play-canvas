import { createSlice } from "@reduxjs/toolkit";

interface State {
  cameraConstraints: {
    autoFocus: string;
    whiteBalance: string;
    zoom: number;
    focusDepth: number;
    facingMode?: string | Record<string, any>;
    aspectRatio?: number;
  };
}

const initialState: State = {
  cameraConstraints: {
    autoFocus: "continuous",
    whiteBalance: "continuous",
    zoom: 0,
    focusDepth: 0,
  },
};

// Create slice with action creators
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: () => initialState,
    updateCameraConstraints: (state, action) => {
      state.cameraConstraints = {
        ...state.cameraConstraints,
        ...action.payload,
      };
    },
  },
});

// Export actions and reducer
export const { reset, updateCameraConstraints } = taskSlice.actions;
export default taskSlice.reducer;
