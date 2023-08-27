import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import moduleVisibilityReducer from '../src/components/moduleVisibilitySlice';
import appReducer from '../src/components/appReducer';


const persistConfig = {
  key: 'root', 
  storage, 
};


const persistedAppReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: {
    moduleVisibility: moduleVisibilityReducer,
    app: persistedAppReducer, 
  },
});

const persistor = persistStore(store);

export { store, persistor };