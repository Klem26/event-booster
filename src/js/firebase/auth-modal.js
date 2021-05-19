import refs from '../utils/refs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { signUp, signIn, signOut } from './firebase-auth';
import notificationError from '../utils/notification-func';

const signUpBtn = refs.signUpBtn;
const signInBtn = refs.signInBtn;

signUpBtn.addEventListener('click', onSignUp);
signInBtn.addEventListener('click', onSignIn);

function onSignUp() {
  createModal('Sign up', getAuthForm());
  authModalHandler('You have successfully signed up', signUp);
}

function onSignIn() {
  const user = firebase.auth().currentUser;

  if (user) {
    signOut();
  } else {
    createModal('Sign in', getAuthForm());
    authModalHandler('You have successfully signed in', signIn);
  }
}

function createModal(title, content) {
  const modal = document.createElement('div');
  modal.classList.add('auth-modal');

  const html = `<h1>${title}</h1><div class='modal-content'>${content}</div>`;
  modal.innerHTML = html;

  mui.overlay('on', modal);
}

function authModalHandler(text, callback) {
  document.getElementById('auth-form').addEventListener(
    'submit',
    event => {
      event.preventDefault();

      const email = event.target.querySelector('#email').value;
      const password = event.target.querySelector('#password').value;

      callback(email, password);
      notificationError('Hooray!', text, '#5cff98');
    },
    { once: true },
  );
}

function getAuthForm() {
  return `<form class="mui-form" id="auth-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="email" required>
        <label for="email">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password" required>
        <label for="password">Password</label>
      </div>
      <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary"
      >
        Enter
      </button>
    </form>`;
}
