import eventsTemplate from '../templates/event-list.hbs';
import refs from './refs';

export default function pageRender(data) {
  const markup = eventsTemplate(data);
  refs.containerResult.innerHTML = '';
  refs.containerResult.insertAdjacentHTML('beforeend', markup);
}