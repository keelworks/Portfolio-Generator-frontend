import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {GoogleOAuthProvider} from '@react-oauth/google';
import store from './store';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './index.css';
import Login from './components/authorize/login';
import Signup from './components/authorize/signup';
import DashBoard from './components/index';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
      <GoogleOAuthProvider
        // eslint-disable-next-line max-len
        clientId="929184604144-1vb1k36u2nr0hfeko8lf7ic8v48emt1l.apps.googleusercontent.com"
        redirectUri="http://localhost:3000/login"
        scopes= ""
      >
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={Signup} />
              <Route path="/dashBoard/*" element={<DashBoard/>} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
