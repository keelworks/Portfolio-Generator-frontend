import {useState} from 'react';

/**
 * Signup.
 *
 * @return {number} The sum of the two numbers.
 */
function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log('Hello World');
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
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
                  required
                />
                <input
                  type="password"
                  value={password}
                  placeholder="password"
                  className="form-control mb-3"
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control mb-3"
                />

                <button type="submit" className="btn btn-primary mb-3">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Signup;
