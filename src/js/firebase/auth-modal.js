import refs from '../refs';
import { signUp, signIn, signOut, onAuthState } from './firebase-auth';
import notificationError from '../notification-func';

const signUpBtn = refs.signUpBtn;
const signInBtn = refs.signInBtn;

signUpBtn.addEventListener('click', () => {
  createModal('Sign up', getAuthForm());

  document.getElementById('auth-form').addEventListener(
    'submit',
    event => {
      event.preventDefault();

      const email = event.target.querySelector('#email').value;
      const password = event.target.querySelector('#password').value;

      signUp(email, password);
      notificationError(
        'Hooray!',
        'You have successfully signed up',
        '#80ff37',
      );
    },
    { once: true },
  );
});

signInBtn.addEventListener('click', () => {
  // if (onAuthState()) {
  // return Promise.resolve(signOut).then(
  //    notificationError('Good!', 'You have successfully signed out'),
  //  );
  // }

  createModal('Sign in', getAuthForm());

  document.getElementById('auth-form').addEventListener(
    'submit',
    event => {
      event.preventDefault();

      const email = event.target.querySelector('#email').value;
      const password = event.target.querySelector('#password').value;

      signIn(email, password);
      notificationError(
        'Hooray!',
        'You have successfully signed in',
        '#80ff37',
      );
    },
    { once: true },
  );
});

// function openModal(title) {
//   createModal('Sign up', getAuthForm());
//   document
//     .getElementById('auth-form')
//     .addEventListener('submit', authFormHandler, { once: true });
// }

// export function authFormHandler(event) {
//   event.preventDefault();

//   const email = event.target.querySelector('#email').value;
//   const password = event.target.querySelector('#password').value;

//   signUp(email, password);
// }

function createModal(title, content) {
  const modal = document.createElement('div');
  modal.classList.add('auth-modal');

  const html = `<h1>${title}</h1><div class='modal-content'>${content}</div>`;
  modal.innerHTML = html;

  mui.overlay('on', modal);
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

//  function authWithEmailAndPassword(email, password) {
//   const apiKey = 'AIzaSyAalBkuxJcYRoG0ELdN_T_crUpSGAEEyCg';
//   return fetch(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         email,
//         password,
//         returnSecureToken: true,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   )
//     .then(response => response.json())
//     .then(data => data.idToken);
// }
