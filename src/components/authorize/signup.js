import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerThunk} from '../../services/authorize-thunk';

/**
 * login。
 *
 * @return {any} - login
 */
function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const [emailMatch, setEmailMatch] = useState('');

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

    if (confirmEmail === email) {
      setEmailMatch(true);
    } else {
      setEmailMatch(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (confirmPassword === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    } catch (error) {
      console.error('Registration failed: ', error);
      // Handle registration error.
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <form onSubmit={handleSubmit} className="border p-3">
              <h2>Sign Up</h2>

              <div className="row mb-3">
                <div className="col-6">
                  <input
                    type="text"
                    value={firstname}
                    className="form-control"
                    placeholder="First name*"
                    onChange={handleFirstnameChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    value={lastname}
                    className="form-control"
                    placeholder="Last name*"
                    onChange={handleLastnameChange}
                    required
                  />
                </div>
              </div>

              <input
                type="email"
                value={email}
                placeholder="Email*"
                className="form-control mb-3"
                onChange={handleEmailChange}
                required
              />
              <input
                type="email"
                placeholder="Confirm Email*"
                className="form-control mb-3"
                onChange={handleConfirmEmailChange}
                required
              />
              {!emailMatch && (
                <p className="text-danger">Email do not match.</p>
              )}
              <input
                type="password"
                value={password}
                placeholder="Password*"
                className="form-control mb-3"
                onChange={handlePasswordChange}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password*"
                className="form-control mb-3"
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordMatch && (
                <p className="text-danger">Password do not match.</p>
              )}
              <button type="submit" className="btn btn-primary mb-3">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
