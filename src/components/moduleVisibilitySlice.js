// modules/moduleVisibilitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const moduleVisibilitySlice = createSlice({
  name: 'moduleVisibility',
  initialState: {
    insideVisible: false,
  },
  reducers: {
    setInsideVisible: (state, action) => {
      state.insideVisible = action.payload; // Altera a visibilidade com base no payload da action
    },
  },
});

export const { setInsideVisible } = moduleVisibilitySlice.actions;
export default moduleVisibilitySlice.reducer;
