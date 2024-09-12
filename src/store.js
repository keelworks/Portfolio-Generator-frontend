// store.js
import { configureStore } from '@reduxjs/toolkit';
import authorizeReducer from './reducers/authorize-reducer';
import localStorageMiddleware from './localStorageMiddleware';

const savedCurrentUser = localStorage.getItem('currentUser');
const preloadedState = {
  currentUser: savedCurrentUser ? JSON.parse(savedCurrentUser) : null,
};
import userByIdReducer from './reducers/website-reducer';
import formReducer from './reducers/form-reducer';

const store = configureStore({
  reducer: {
    currentUser: authorizeReducer,
    userById: userByIdReducer,
    form: formReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
