import React from 'react';
import ReactDOM from 'react-dom/client'; // 修改引入路径
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
import DashBoard from './components/DashBoard';
import UserPageInstructionalDesigner from './components/profile/UserPageInstructionalDesigner.js';
import FourZeroFourPage from './components/FourZeroFourPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/dashboard/*" element={<DashBoard/>} />
            {/* <Route path="/user/:userId" element={<UserPageInstructionalDesigner/>} /> */}
            <Route path="/user/default" element={<FourZeroFourPage />} />
            <Route path="/Instruction_Designer/portfolio/:userId" element={<UserPageInstructionalDesigner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashBoard/*" element={<DashBoard />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>,
);

reportWebVitals();
