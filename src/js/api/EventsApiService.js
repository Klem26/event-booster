const API_KEY = 'qE8iBnVwihSK4QSH4hL5UNRfjujJpVDl';
const BASE_URL =
  'https://newsuperserver.herokuapp.com/https://app.ticketmaster.com/discovery/v2/';

export default class EventsApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 0;
    this.totalElements = 0;
    this.totalPages = 0;
  }

  // Приносит что угодно по url
  goFetch(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(({ page, _embedded }) => {
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;

        return _embedded.events.map(this.normalizeEventObj);
      });
  }

  // События при загрузке страницы
  fetchRandomEvents(activePage = 0) {
    this._page = activePage;

    return this.goFetch(
      `${BASE_URL}events.json?size=20&page=${this._page}&sort=random&apikey=${API_KEY}`,
    ).then(response => {
      const stringifiedObj = JSON.stringify(response);
      localStorage.setItem('data', stringifiedObj);

      return response;
    });
  }

  // События из строки поиска (поиск по названию)
  fetchEventsByKeyWord(activePage = 0) {
    this._page = activePage;

    return this.goFetch(
      `${BASE_URL}events.json?keyword=${this.searchQuery}&source=universe&page=${this._page}&apikey=${API_KEY}`,
    ).then(response => {
      const stringifiedObj = JSON.stringify(response);
      localStorage.setItem('data', stringifiedObj);

      return response;
    });
  }

  // Получить событие по id
  // fetchEventById(id) {
  //   return this.goFetch(
  //     `${BASE_URL}events.json?id=${id}&source=universe&apikey=${API_KEY}`,
  //   ).then(response => {
  //     if (response) {
  //       return response[0];
  //     }
  //   });
  // }

  // Получить событие по стране
  fetchEventsByCoutry(countryCode) {
    return this.goFetch(
      `${BASE_URL}events.json?countryCode=${countryCode}&keyword=${this.searchQuery}&page=${this._page}&apikey=${API_KEY}`,
    ).then(response => {
      const stringifiedObj = JSON.stringify(response);
      localStorage.setItem('data', stringifiedObj);

      return response;
    });
  }

  // Получить картинки события по id
  fetchEventImage(id) {
    return fetch(`${BASE_URL}events/${id}/images.json?apikey=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(response => response.images);
  }

  // Нормализация

  normalizeEventObj(obj) {
    const image = obj.images
      .filter(image => image.ratio === '4_3')
      .map(image => image.url);

    obj.posterUrl = image[0];
    return obj;
  }

  // Информация о текущей странице
  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }

  // Результаты поискового запроса
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
