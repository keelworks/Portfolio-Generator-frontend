import {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {loginThunk} from '../../services/authorize-thunk';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Grid, Link, Container, Typography, Alert}
  from '@mui/material';
import Box from '@mui/material/Box';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await dispatch(loginThunk({username, password}));
    } catch (error) {
      setError('User does not exist');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {error && <Alert severity="error">
          {error}</Alert>} {/* Display error message */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
