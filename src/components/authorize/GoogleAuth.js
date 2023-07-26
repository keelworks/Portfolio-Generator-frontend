import {GoogleLogin} from '@react-oauth/google';
import {gapi} from 'gapi-script';
import {useEffect} from 'react';

// eslint-disable-next-line max-len
const googleCilentID = '929184604144-1vb1k36u2nr0hfeko8lf7ic8v48emt1l.apps.googleusercontent.com';

// eslint-disable-next-line require-jsdoc
function GoogleAuth() {
  useEffect(() => {
    const oAuth = async () => {
      await gapi.load('auth2', () => {
        gapi.auth2.init({
          // eslint-disable-next-line max-len
          client_id: googleCilentID,
          scope: '',
        });
      });
    };
    oAuth();
  }, []);

  return (
    <div className="google-signin">
      <GoogleLogin
        clientId={googleCilentID}
        buttonText="Sign in with Google"
        onSuccess={(res) => {
          // eslint-disable-next-line max-len
          console.log('credentialResponse', res);
        }}
        onError={(error) => {
          console.log('error', error);
        }}
        cookiePolicy={'same-origin-strict'}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleAuth;
