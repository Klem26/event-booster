import refs from './refs';
import pageRender from './page-render'
import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func'
const debounce = require('lodash.debounce');




const eventsApiService = new EventsApiService();
refs.searchInputRef.addEventListener('input', debounce(onSearch, 500));
function onSearch(e) {
     e.preventDefault();
    const form = e.target;
    eventsApiService.query = form.value;
    // console.log(form.value)
    if (eventsApiService.query !== '') {
  
    clearResultContainer()
        fetchEvents()
    return    
    }
     clearResultContainer()
}

function fetchEvents() {
    eventsApiService
        .fetchEventsByKeyWord()
        .then(events => {
            if (events.lenght === 0) {
                return
            
            }
            pageRender(events)
            
            
        })
    .catch(notificationError)
    

}

    
function clearResultContainer() {
     refs.containerResult.innerHTML = ''
};