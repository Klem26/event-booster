import refs from '../refs';
import createModal from './utils';
import Events from './Events';
import { getAuthForm, authWithEmailAndPassword } from './auth';

const signInBtn = refs.authBtn;

signInBtn.addEventListener('click', openModal);

function openModal() {
  createModal('Authorization', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true });
}

export function authFormHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  return authWithEmailAndPassword(email, password);
}
