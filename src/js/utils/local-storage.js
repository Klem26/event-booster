function getLocalStorageData() {
  const data = localStorage.getItem('data');
  const parsedData = JSON.parse(data);

  return parsedData;
}

function getClientEvents() {
  return JSON.parse(localStorage.getItem('clientEvents') || '[]');
}

function addToLocalStorage(event) {
  const all = getClientEvents();
  all.push(event);

  localStorage.setItem('clientEvents', JSON.stringify(all));
}

function removeFromLocalStorage(event) {
  const all = getClientEvents();
  const newAll = all.filter(item => item.dataId !== event);

  localStorage.setItem('clientEvents', JSON.stringify(newAll));
}

function findEventById(id) {
  const allEvents = getLocalStorageData();
  const event = allEvents.filter(item => item.id === id);

  return event[0];
}

export {
  getLocalStorageData,
  getClientEvents,
  addToLocalStorage,
  removeFromLocalStorage,
  findEventById,
};