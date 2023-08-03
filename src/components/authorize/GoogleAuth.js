// import {GoogleLogin} from '@react-oauth/google';
// import {gapi} from 'gapi-script';
// import {useEffect} from 'react';
// // import {useNavigate} from 'react-router-dom';
// import WelcomePage from '../profile/profile';

// eslint-disable-next-line max-len, max-len
// const googleCilentID = '929184604144-bbi4os99924mlue3g44r2mabnor7nuhh.apps.googleusercontent.com';
// let isLoggedIn = false;
// // eslint-disable-next-line require-jsdoc
// function GoogleAuth() {
//   // const navigate = useNavigate();
//   useEffect(() => {
//     const oAuth = async () => {
//       await gapi.load('auth2', () => {
//         gapi.auth2.init({
//           // eslint-disable-next-line max-len
//           client_id: googleCilentID,
//           scope: '',
//         });
//       });
//     };
//     oAuth();
//   }, []);

//   return (
//     <div className="google-signin">
//       <GoogleLogin
//         clientId={googleCilentID}
//         buttonText="Sign in with Google"
//         onSuccess={(res) => {
//           // eslint-disable-next-line max-len
//           // navigate('/dashBoard');
//           isLoggedIn = true;
//           <WelcomePage />;
//           console.log('Login success!', res);
//         }}
//         onFailure={(res) =>{
//           console.log('Login fail!', res);
//         }}
//         onError={(error) => {
//           console.log('error', error);
//         }}
//         cookiePolicy={'same-origin-strict'}
//         isSignedIn={true}
//       />
//     </div>
//   );
// }

// export default GoogleAuth;
