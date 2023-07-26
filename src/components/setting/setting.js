// eslint-disable-next-line max-len
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {logoutThunk, deleteUserThunk} from '../../services/authorize-thunk';

import Button from '@material-ui/core/Button';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line max-len
  const userId = useSelector((state) => state.currentUser ? state.currentUser._id : null);

  const handleLogoutClick = () => {
    // eslint-disable-next-line max-len
    console.log('Logout button clicked');
    // 在这里添加你的注销逻辑
    dispatch(logoutThunk())
        .then(() => {
          navigate('/login'); // 你的登录页面路由，这里假设它是/login
        });
  };

  const handleDeleteAccountClick = () => {
    console.log('Delete Account button clicked');
    // 在这里添加你的删除帐户逻辑
    // eslint-disable-next-line max-len
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      dispatch(deleteUserThunk(userId))
          .then(() => {
            navigate('/login'); // 你的登录页面路由，这里假设它是/login
          });
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Button variant="contained" color="primary" onClick={handleLogoutClick}>
        Logout
      </Button>
      <Button variant="contained" color="secondary"
        onClick={handleDeleteAccountClick} style={{marginTop: '20px'}}>
        Delete Account
      </Button>
    </div>
  );
};

export default SettingsPage;
