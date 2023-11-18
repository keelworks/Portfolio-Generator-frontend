import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
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
import UserPage from './components/profile/UserPage';
import FourZeroFourPage from './components/FourZeroFourPage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/dashboard/*" element={<DashBoard/>} />
            <Route path="/user/:firstname" element={<UserPage/>} />
            <Route path="/user/default" element={<FourZeroFourPage/>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
