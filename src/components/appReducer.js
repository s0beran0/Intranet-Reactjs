// modules/appReducer.js
import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'app',
  initialState: {
    switchValue: false,
    buttonText: 'ITEM 1',
  },
  reducers: {
    setSwitchValue: (state, action) => {
      state.switchValue = action.payload;
      state.buttonText = action.payload ? 'ITEM 1 CONCLUIDO' : 'ITEM 1';
    },
    setButtonText: (state, action) => {
      state.buttonText = action.payload;
    },
  },
});

export const { setSwitchValue, setButtonText } = appReducer.actions;
export default appReducer.reducer;
