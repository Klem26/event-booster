import firebase from 'firebase/app';
import 'firebase/auth';
import notificationError from '../notification-func';

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

export function signUp(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      mui.overlay('off');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      notificationError('Oops!', errorMessage);
    });
}

export function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      var user = userCredential.user;
      mui.overlay('off');
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      notificationError('Oops!', errorMessage);
    });
}

export function onAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var uid = user.uid;
    }
  });
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      notificationError('Hey!', 'Sign-out successful');
    })
    .catch(error => {
      // An error happened.
    });
}
