import refs from '../utils/refs';
import Events from './Events';
import firebase from 'firebase/app';
import 'firebase/auth';
import startPageRender from '../first-result';
import { getLocalStorageData, getClientEvents } from '../utils/local-storage';
import notificationError from '../utils/notification-func';

const clientEventsBtn = refs.clientEventsBtn;
const homeButton = refs.homePageBtn;

function onHomePageClick() {
  startPageRender();
  showPagination();
}

function onClientBtnClick() {
  const user = firebase.auth().currentUser;

  if (user) {
    Events.renderList();
    hidePagination();
  } else {
    notificationError('Sorry!', 'Please sign in', '#ff2b3d');
  }
}

function onGalleryBtnClick(event) {
  if (event.target.classList.contains('add_btn')) {
    const galleryElRef = event.target.closest('.event_card');
    const eventId = galleryElRef.dataset.id;

    Events.create(findEventById(eventId));
  } else if (event.target.classList.contains('remove_btn')) {
    const galleryElRef = event.target.closest('.event_card');
    const eventId = galleryElRef.dataset.id;
    const dataId = findClientEventById(eventId).dataId;

    Events.remove(dataId);
  }
}

function findEventById(id) {
  const allEvents = getLocalStorageData();
  const event = allEvents.filter(item => item.id === id);

  return event[0];
}

function findClientEventById(id) {
  const allEvents = getClientEvents();
  const event = allEvents.filter(item => item.id === id);

  return event[0];
}

function hidePagination() {
  refs.paginationRef.classList.add('visually-hidden');
}

function showPagination() {
  refs.paginationRef.classList.remove('visually-hidden');
}

refs.containerResult.addEventListener('click', onGalleryBtnClick);
clientEventsBtn.addEventListener('click', onClientBtnClick);
homeButton.addEventListener('click', onHomePageClick);
