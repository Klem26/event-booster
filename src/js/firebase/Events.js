import notificationError from '../notification-func';
import clientListTpl from '../templates/event-client-list.hbs';
import refs from '../refs';
import {
  getLocalStorageData,
  getClientEvents,
  addToLocalStorage,
  removeFromLocalStorage,
} from '../local-storage';

export default class Events {
  static create(event) {
    checkForUnique(event).then(result => {
      if (result) {
        notificationError('Already added');
        return;
      }

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
          event.dataId = response.name;

          return event;
        })
        .then(addToLocalStorage);
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
      const eventsNumber = getClientEvents().length;

      if (eventsNumber === 0) {
        refs.containerResult.innerHTML = '';
      }

      this.renderList();
    });
  }

  static getEventsFromDatabase() {
    return fetch(
      'https://event-booster-app-default-rtdb.firebaseio.com/tickets.json',
    ).then(response => response.json());
  }

  static renderList() {
    const events = getClientEvents();

    events.length ? clientListRender(events) : notificationError('You don\'t have any events');
  }
}

function clientListRender(data) {
  const markup = clientListTpl(data);
  refs.containerResult.innerHTML = '';
  refs.containerResult.insertAdjacentHTML('beforeend', markup);
}

function checkForUnique(event) {
  return Events.getEventsFromDatabase().then(result => {
    if (result) {
      const clientEvents = Object.values(result);

      console.log(clientEvents);
      const isNotUnique = clientEvents.find(item => item.id === event.id);

      if (isNotUnique) {
        return isNotUnique;
      }
    }
  });
}
