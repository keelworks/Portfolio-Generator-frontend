import {useState} from 'react';
import {Link} from 'react-router-dom';
import {loginUser} from '../services/portfolio-service';

/**
 * login。
 *
 * @return {any} - login
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginUser({username, password});
      console.log('Login successful: ', user);
      // Perform any additional actions after successful login.
    } catch (error) {
      console.error('Login failed: ', error);
      // Handle login error.
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <form onSubmit={handleSubmit} className="border p-3">
              <h2>Log in</h2>

              <input
                type="text"
                value={username}
                placeholder="username"
                className="form-control mb-3"
                onChange={handleUsernameChange}
              />
              <input
                type="password"
                value={password}
                placeholder="password"
                className="form-control mb-3"
                onChange={handlePasswordChange}
              />
              <button type="submit" className="btn btn-primary mb-3">
                Login
              </button>
              <div className="row">
                <div className="col-6">
                  <a href="#" className="text-decoration-none text-primary">
                    Forgot password?
                  </a>
                </div>
                <div className="col-6">
                  <Link
                    to="/signup"
                    className="text-decoration-none text-primary">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
