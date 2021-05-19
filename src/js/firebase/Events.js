import notificationError from '../utils/notification-func';
import clientListTpl from '../templates/event-client-list.hbs';
import refs from '../utils/refs';
import startPageRender from '../first-result';
import {
  getClientEvents,
  addToLocalStorage,
  removeFromLocalStorage,
} from '../utils/local-storage';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class Events {
  static create(event) {
  const user = firebase.auth().currentUser;

    if (user) {
      checkForUnique(event).then(result => {
        if (result) {
          notificationError('Oops!', 'Already added');
          return;
        }

        return fetch(
          `https://event-booster-app-default-rtdb.firebaseio.com/tickets.json`,
          {
            method: 'POST',
            body: JSON.stringify(event),
            headers: { 'Content-Type': 'application/json' },
          },
        )
          .then(response => response.json())
          .then(response => {
            event.dataId = response.name;
            notificationError('Hooray!', 'Successfully added', '#5cff98');

            return event;
          })
          .then(addToLocalStorage).catch(console.log);
      });
    } else {
      notificationError('Hey!', 'Authorization is required', '#ff2b3d');
    }
  }

  static remove(event) {
    return fetch(
      `https://event-booster-app-default-rtdb.firebaseio.com/tickets/${event}.json`,
      {
        method: 'DELETE',
      },
    ).then(response => {
      removeFromLocalStorage(event);
      notificationError('Hey!', 'Event removed');
      const eventsNumber = getClientEvents().length;

      if (eventsNumber === 0) {
        refs.containerResult.innerHTML = '';
        startPageRender();
      }

      this.renderList();
    }).catch(console.log);
  }

  static getEventsFromDatabase() {
    return fetch(
      'https://event-booster-app-default-rtdb.firebaseio.com/tickets.json',
    ).then(response => response.json()).catch(console.log);
  }

  static renderList() {
    const events = getClientEvents();

    events.length
      ? clientListRender(events)
      : notificationError('Sorry', "You don't have any events");
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

      const isNotUnique = clientEvents.find(item => item.id === event.id);

      if (isNotUnique) {
        return isNotUnique;
      }
    }
  }).catch(console.log);
}
