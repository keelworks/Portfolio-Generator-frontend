import {configureStore} from '@reduxjs/toolkit';
import authorizeReducer from './reducers/authorize-reducer';

const store = configureStore({
  reducer: {
    currentUser: authorizeReducer,
  },
});

export default store;
