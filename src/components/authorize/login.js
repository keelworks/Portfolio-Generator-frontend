import {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {googleLoginThunk, loginThunk} from '../../services/authorize-thunk';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Link, Alert, Container, Typography, Box, Divider}
  from '@mui/material';
import {InputAdornment, IconButton} from '@mui/material';
import keelworksLog from '../../icons/keelworksIcon.svg';
// import GoogleIcon from '@mui/icons-material/Google';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleAuth from './GoogleAuth';
/**
 * Login.
 *
 * @return {any} - login
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.currentUser);
  // const setLoginFailed = useSelector((state) => state.currentUser.error);

  useEffect(() => {
    // Ensure user object exists and its user property is not null
    if (user && user._id) {
      console.log('Login successful: ', user);
      navigate('/dashBoard');
    } else if (user && user.error === 'User does not exist') {
      setError('User does not exist');
    }
  }, [user, navigate]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // for password toggle purposes
  const [visible, setVisible]= useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await dispatch(loginThunk({username, password}));
    } catch (error) {
      setError('User does not exist');
    }
  };

  const handleGoogleLoginSuccess = async (res) => {
    // Instead of directly making the API request here,
    // dispatch the thunk action.
    try {
      await dispatch(googleLoginThunk({tokenId: res.tokenId}));
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%', // Height is set to 12/7
          width: '100%', // Width is set to 100%
        }}
      >
        <img src={keelworksLog} alt="Logo" style={{width: '70%'}} />
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}
          noValidate sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={!visible ? 'password': 'text'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setVisible(!visible)}>
                    {visible ? <VisibilityOffIcon/>: <RemoveRedEyeIcon/> }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{mt: 3, mb: 3}}
            fullWidth
            style={{fontSize: '20px'}}
          >
                  Log In
          </Button>
          <Typography variant="body2"
            style={{fontWeight: 'bold', marginBottom: '1rem'}}>
            {'Don\'t have an account? '}
            <Link component={RouterLink}
              to="/signup"
              style={{textDecoration: 'none', color: 'blue'}}>
              Sign Up
            </Link>
          </Typography>
          <Link component={RouterLink}
            to="/forgot-password"
            variant="body2"
            style={{color: 'blue', textDecoration: 'none', fontWeight: 'bold'}}
          >
            Forgot password?
          </Link>
          <Box sx={{my: 2, width: '100%', textAlign: 'center'}}>
            <Divider style={{backgroundColor: '#000'}} />
            <Typography variant="caption" component="span"
              sx={{position: 'relative',
                top: '-15px',
                background: '#fff',
                padding: '0 10px',
                fontSize: '15px',
              }}>or
            </Typography>
          </Box>

          {/* <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon/>}
            // style={{
            //   borderColor: 'gray', // change the background color
            //   color: 'gray', // change the text color
            // }}
          >
            Continue with Google
          </Button> */}
          <GoogleAuth onLoginSuccess={handleGoogleLoginSuccess} />
        </Box>

      </Box>
    </Container>
  );
}

export default Login;
