import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();

// Список случайных событий
eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
// eventsApiService.query = 'art';
// eventsApiService.fetchEventsByKeyWord().then(console.log).catch(console.log);

// Список событий по стране
// eventsApiService.fetchEventsByCoutry('US').then(console.log).catch(console.log);

// Событие по id
// eventsApiService
//   .fetchEventById('LvZ18bAdUGQ0a38ZgzSwa')
//   .then(console.log)
//   .catch(console.log);

// Список картинок конкретного события по id
// eventsApiService
//   .fetchEventImage('Z698xZbpZ17a4oM')
//   .then(console.log)
//   .catch(console.log);

// Тестовый рендер страницы

// function renderGallery(events) {
//   console.log(eventsApiService.totalPages);
//   console.log(eventsApiService.totalElements);

//   events.forEach(event => {
//     document.body.insertAdjacentHTML(
//       'beforeend',
//       `<div style='width: 310px; border: 3px solid black; margin-bottom: 10px'><img src = ${event.images
//         .filter(image => image.ratio === '4_3')
//         .map(image => image.url)}><h2>${event.name}</h2><p>id: ${
//         event.id
//       }</p><a href="${event.url}" target='blank'>Ссылка на выступление</a></div>`,
//     );
//   });
// }

// Примерная схема отрисовки страницы
// function onLoadPage() {
//   eventsApiService.fetchRandomEvents().then(createGallery).catch(alert('Error!'));
// }

// function createGallery(events) {
//   ref.innerHtml = Template(events)
// }




