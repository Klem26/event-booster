import firebase from 'firebase/app';
import 'firebase/auth';
import startPageRender from '../first-result';
import notificationError from '../utils/notification-func';

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
      notificationError('Oops!', `${errorCode}: ${errorMessage}`, '#ff2b3d');
    });
}

export function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      mui.overlay('off');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      notificationError('Oops!', `${errorCode}: ${errorMessage}`, '#ff2b3d');
    });
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      startPageRender();
      notificationError('Hey!', 'You have successfully signed out');
    })
    .catch(error => {
      console.log(error);
    });
}
