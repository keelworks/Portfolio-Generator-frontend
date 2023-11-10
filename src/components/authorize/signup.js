import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerThunk} from '../../services/authorize-thunk';
import {useNavigate} from 'react-router-dom';
import {Container, Box, Text, Grid, TextInput,
  Button, Paper, Modal} from '@mantine/core';


/**
 * Sign up.
 *
 * @return {any} - Sign up
 */
function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email !== confirmEmail) {
      alert('Emails do not match.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const userData = {
        username: email,
        password: password,
        firstName: firstname,
        lastName: lastname,
      };

      const action = registerThunk(userData);
      const resultAction = await dispatch(action);
      const user = resultAction.payload;

      console.log('Registration successful: ', user);
      // Perform any additional actions after successful registration.
      setOpen(true);
    } catch (error) {
      console.error('Registration failed: ', error);
      // Handle registration error.
    }
  };
  return (
    <>
      <Container size="25rem" px={0}>
        <Box
          style={{
            marginTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text fz="xl" fw= {500} align="center">
            Sign up
          </Text>
          <Paper padding="md" style={{marginTop: '16px'}}>
            <form onSubmit={handleSubmit}>
              <Grid gutter="md">
                <Grid.Col span = {6}>
                  <TextInput
                    autoComplete="fname"
                    required
                    fullWidth
                    autoFocus
                    id="firstName"
                    label="First Name"
                    placeholder="First Name*"
                    value={firstname}
                    onChange={handleFirstnameChange}
                    style={{marginBottom: '12px'}}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="lname"
                    placeholder="Last Name*"
                    value={lastname}
                    onChange={handleLastnameChange}
                    style={{marginBottom: '12px'}}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    required
                    fullWidth
                    id="email"
                    label="Email Address (Username)"
                    autoComplete="email"
                    placeholder="Email Address*"
                    value={email}
                    onChange={handleEmailChange}
                    style={{marginBottom: '12px'}}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    required
                    fullWidth
                    id="confirmEmail"
                    label="Confirm Email Address"
                    autoComplete="confirm-email"
                    placeholder="Confirm Email Address*"
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
                    style={{marginBottom: '12px'}}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    required
                    fullWidth
                    type="password"
                    id="password"
                    label="Password"
                    autoComplete="new-password"
                    placeholder="Password*"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{marginBottom: '12px'}}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    required
                    fullWidth
                    type="password"
                    id="confirmPassword"
                    label="Confirm Password"
                    autoComplete="new-password"
                    placeholder="Confirm Password*"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    style={{marginBottom: '12px'}}
                  />
                </Grid.Col>
              </Grid>
              <Button type="submit" fullWidth
              >
                Sign Up
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
      <Modal
        opened= {open}
        onClose={()=> setOpen(flase)}
        title= "You have successfully registered."
      >
        <div>
          You have successfully registered.
          <div style={{marginTop: '16px', display: 'flex',
            justifyContent: 'flex-end'}}>
            <Button
              onClick={() => {
                setOpen(false);
                navigate('/login');
              }}
              autoFocus
            >
            Ok
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Signup;

