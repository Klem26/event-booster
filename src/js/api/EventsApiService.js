const API_KEY = 'qE8iBnVwihSK4QSH4hL5UNRfjujJpVDl';
const BASE_URL =
  'https://newsuperserver.herokuapp.com/https://app.ticketmaster.com/discovery/v2/';

export default class EventsApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 0;
    this.totalElements = 0;
    this.totalPages = 0;
    this.country = '';
  }

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

        if (_embedded) {
          return _embedded.events.map(this.normalizeEventObj);
        }

        return [];
      })
      .catch(error => {
        console.log(error);
      });
  }

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

  fetchEventsByCoutry(countryCode) {
    this.country = countryCode;
    
    return this.goFetch(
      `${BASE_URL}events.json?countryCode=${countryCode}&keyword=${this.searchQuery}&page=${this._page}&apikey=${API_KEY}`,
    ).then(response => {
      const stringifiedObj = JSON.stringify(response);
      localStorage.setItem('data', stringifiedObj);

      return response;
    });
  }

  normalizeEventObj(obj) {
    const image = obj.images
      .filter(image => image.width === 640 && image.height === 427)
      .map(image => image.url);

    obj.posterUrl = image[0];
    return obj;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
