import notificationError from '../notification-func';
import clientListTpl from '../templates/event-client-list.hbs';
import refs from '../refs';

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
      .then(addToLocalStorage)
      .then(response => {
        console.log(getEventsFromLocalStorage());
      });
  }

  static remove(event) {
    return fetch(
      `https://event-booster-app-default-rtdb.firebaseio.com/tickets/${event}.json`,
      {
        method: 'DELETE',
      },
    ).then(response => {
      removeFromLocalStorage(event);
      const eventsNumber = getEventsFromLocalStorage().length;

      if (eventsNumber === 0) {
        refs.containerResult.innerHTML = '';
      }

      this.renderList();
    });
  }

  static renderList() {
    const events = getEventsFromLocalStorage();

    events.length ? clientListRender(events) : notificationError();
  }
}

function addToLocalStorage(event) {
  const all = getEventsFromLocalStorage();
  all.push(event);

  localStorage.setItem('clientEvents', JSON.stringify(all));
}

function removeFromLocalStorage(event) {
  const all = getEventsFromLocalStorage();
  const newAll = all.filter(item => item.id !== event);

  localStorage.setItem('clientEvents', JSON.stringify(newAll));
}

function getEventsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('clientEvents') || '[]');
}

function clientListRender(data) {
  const markup = clientListTpl(data);
  refs.containerResult.innerHTML = '';
  refs.containerResult.insertAdjacentHTML('beforeend', markup);
}
