/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAqNXiCPczOKcSazgKrDLY_Wp5sFAyG9WA',
  authDomain: 'portfolio-generator-2916c.firebaseapp.com',
  projectId: 'portfolio-generator-2916c',
  storageBucket: 'portfolio-generator-2916c.appspot.com',
  messagingSenderId: '109334368964',
  appId: '1:109334368964:web:0a5438a611ad95ef652f91',
  measurementId: 'G-93K5N7RBRG',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default firebase;
