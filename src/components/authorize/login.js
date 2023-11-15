import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginThunk} from '../../services/authorize-thunk';
import {useNavigate} from 'react-router-dom';
import keelworksLog from '../../icons/keelworksIcon.svg';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Button,
  Alert,
  Container,
  Divider,
  Group,
} from '@mantine/core';
import {BrandGoogle} from 'tabler-icons-react';
import {IconAlertCircle} from '@tabler/icons-react';
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
    <Container size={'xs'} p={60} my={32}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex',
        justifyContent: 'center', marginBottom: '30px'}}>
        <img src={keelworksLog} alt="Logo" style={{width: '70%'}}/>
      </div>

      <Paper withBorder shadow="sm"
        p={40} my={30} radius="md">
        {error && <Alert icon={<IconAlertCircle size="1rem" />}
          title="Bummer!" color="red">
          {error}
        </Alert>}
        <TextInput label="Username" placeholder="you@mantine.dev" required
          value={username}
          onChange={handleUsernameChange}/>
        <PasswordInput label="Password" mt={20}
          placeholder="Your password" required value={password}
          onChange={handlePasswordChange}/>
        <Button fullWidth mt={40} type="submit" onClick={handleSubmit}>
          log in
        </Button>
      </Paper>

      <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
        <Anchor size="sm" onClick={() => navigate('/signup')}>
          Create account
        </Anchor>
      </Text>
      {/* <Text color="dimmed" size="sm" align="center" mt={5}>
        <Anchor component="button" size="sm">
              Forgot password?
        </Anchor>
      </Text> */}
      <Divider my="lg" label="or" labelPosition="center" />
      <Group position="center">
        <Button leftIcon={<BrandGoogle />} variant="white" align="center">
          Connect to google
        </Button>
      </Group>
    </Container>
  );
}

export default Login;
