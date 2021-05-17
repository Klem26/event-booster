import firebase from 'firebase/app';
import 'firebase/auth';
import authFormHandler from './auth-modal';

const firebaseConfig = {
  apiKey: 'AIzaSyAalBkuxJcYRoG0ELdN_T_crUpSGAEEyCg',
  authDomain: 'event-booster-app.firebaseapp.com',
  databaseURL: 'https://event-booster-app-default-rtdb.firebaseio.com',
  projectId: 'event-booster-app',
  storageBucket: 'event-booster-app.appspot.com',
  messagingSenderId: '654682605761',
  appId: '1:654682605761:web:fa137863422fe54b4f6c40',
};

firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(userCredential => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch(error => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });