import { configureStore } from '@reduxjs/toolkit';
import moduleVisibilityReducer from '../src/components/moduleVisibilitySlice';
import appReducer from '../src/components/appReducer';


const store = configureStore({
  reducer: {
    moduleVisibility: moduleVisibilityReducer,
    app: appReducer,

  },
});

export default store;