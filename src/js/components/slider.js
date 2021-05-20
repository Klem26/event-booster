import Glide from '@glidejs/glide';
import refs from '../utils/refs';
import EventsApiService from '../api/EventsApiService';
import cardSliderTpl from '../templates/card-slider-tpl.hbs';
// const sliderRef = document.querySelector('.js-slider-container');

const eventsApiService = new EventsApiService();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 5,
  autoplay: 4000,
  hoverpause: true,
  bound: true,
  gap: 30,
  animationDuration: 2500,
  breakpoints: {
     1280: {
      perView: 10,
    },
    1220: {
      perView: 12,
    },
    768: {
      perView: 8,
    },
  },
});

glide.mount();

eventsApiService
  .fetchRandomEvents()
  .then(response => {
    console.log(response)
    refs.sliderRef.innerHTML = cardSliderTpl(response);
  })
  .catch(err => {
    console.log(err);
  });
