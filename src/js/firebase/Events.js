import notificationError from '../notification-func';
import pageRender from '../page-render';

export default class Events {
  static create(event) {
    return fetch(
      'https://event-booster-app-default-rtdb.firebaseio.com/tickets.json',
      {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then(response => response.json())
      .then(response => {
        event.id = response.name;
        return event;
      })
      .then(addToLocalStorage);
  }

  static renderList() {
    const events = getEventsFromLocalStorage();

    events.length ? pageRender(events) : notificationError();
  }
}

function addToLocalStorage(event) {
  const all = getEventsFromLocalStorage();
  all.push(event);

  localStorage.setItem('clientEvents', JSON.stringify(all));
}

function getEventsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('clientEvents') || '[]');
}
