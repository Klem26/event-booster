import refs from '../refs';
import Events from './Events';
import { signUp } from './firebase-auth';

const signInBtn = refs.authBtn;

signInBtn.addEventListener('click', openModal);

function openModal() {
  createModal('Sign up', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true });
}

export function authFormHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  signUp(email, password);
}

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
