import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';
import Pagination from 'tui-pagination';
import pageRender from './page-render';
import options from './pagination';

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();

// Список случайных событий
// eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
// eventsApiService.query = 'music';
// eventsApiService
//   .fetchEventsByKeyWord()
//   .then(result => {
//     // Тут функция рендера страницы

//     return result;
//   })
//   .then(result => {
//     const pagination = new Pagination('pagination', options);
//     const totalItems = eventsApiService.totalElements;
//     pagination.reset(totalItems);
//     console.log('Мероприятия: ', result);
//     console.log('Номер страницы: ', eventsApiService._page);

//     return pagination;
//   })
//   .then(pagination => {
//     pagination.on('afterMove', function (eventData) {
//       eventsApiService.fetchEventsByKeyWord(eventData.page - 1).then(result => {
//         console.log('Мероприятия: ', result);
//         console.log('Номер страницы: ', eventsApiService._page);
//       });
//     });
//   });

// Список событий по стране
// eventsApiService.fetchEventsByCoutry('US').then(console.log).catch(console.log);

// Событие по id
// eventsApiService
//   .fetchEventById('LvZ18bkz4-UUwMYZc6OxJ')
//   .then(console.log)
//   .catch(console.log);

// Список картинок конкретного события по id
// eventsApiService
//   .fetchEventImage('Z698xZbpZ17a4oM')
//   .then(console.log)
//   .catch(console.log);